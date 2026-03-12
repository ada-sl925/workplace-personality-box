import { VercelRequest, VercelResponse } from '@vercel/node';
import type { TestResultData, AnalyticsResponse } from '../../src/types/analytics';

// 简单的内存存储（仅用于演示，生产环境需要持久化存储）
// 注意：在 Serverless Functions 中，每次请求都是独立的，这个数组不会持久化
// 在实际部署中，需要使用数据库（如 Supabase、MongoDB 等）
let testResults: TestResultData[] = [];

// 如果启用了文件存储，尝试从文件加载数据
async function loadDataFromFile() {
  try {
    if (process.env.USE_FILE_STORAGE === 'true') {
      const fs = await import('fs/promises');
      const data = await fs.readFile('/tmp/analytics-data.json', 'utf-8');
      testResults = JSON.parse(data);
      console.log(`📂 从文件加载了 ${testResults.length} 条测试数据`);
    }
  } catch (error) {
    // 文件不存在是正常的
    if ((error as any).code !== 'ENOENT') {
      console.warn('Failed to load data from file:', error);
    }
  }
}

// 保存数据到文件（如果启用了文件存储）
async function saveDataToFile() {
  try {
    if (process.env.USE_FILE_STORAGE === 'true') {
      const fs = await import('fs/promises');
      await fs.writeFile('/tmp/analytics-data.json', JSON.stringify(testResults, null, 2));
    }
  } catch (error) {
    console.warn('Failed to save data to file:', error);
  }
}

// 初始化时加载数据
loadDataFromFile();

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // 只允许POST请求
  if (request.method !== 'POST') {
    return response.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.'
    });
  }

  // 检查Content-Type
  if (request.headers['content-type'] !== 'application/json') {
    return response.status(400).json({
      success: false,
      message: 'Content-Type must be application/json'
    });
  }

  try {
    const data = request.body as TestResultData;

    // 验证必要字段
    if (!data.sessionId || !data.timestamp || !data.answers || !data.recommendation) {
      return response.status(400).json({
        success: false,
        message: 'Missing required fields: sessionId, timestamp, answers, recommendation'
      });
    }

    // 检查用户是否同意数据收集
    if (!data.privacy?.consentGiven) {
      return response.status(200).json({
        success: true,
        message: 'Data not stored due to missing consent',
        sessionId: data.sessionId
      });
    }

    // 匿名化处理（如果启用）
    const processedData = {
      ...data,
      // 如果启用匿名化，移除或哈希化敏感信息
      ...(data.privacy?.anonymized && {
        sessionId: `anon_${hashString(data.sessionId)}`,
        deviceInfo: data.deviceInfo ? {
          ...data.deviceInfo,
          userAgent: data.deviceInfo.userAgent ? hashString(data.deviceInfo.userAgent) : undefined
        } : undefined
      })
    };

    // 尝试存储到数据库（如 Supabase）
    const storedInDatabase = await sendToAnalyticsServices(processedData);

    // 如果数据库存储失败或未配置，使用内存存储作为备选
    if (!storedInDatabase) {
      // 存储数据到内存（备选方案）
      testResults.push(processedData);

      // 限制存储数量，避免内存泄漏
      if (testResults.length > 1000) {
        testResults.shift();
      }

      // 保存到文件（如果启用了文件存储）
      await saveDataToFile();

      if (process.env.NODE_ENV !== 'production') {
        console.log('📊 Test result stored in memory (database not available):', {
          sessionId: processedData.sessionId,
          recommendation: processedData.recommendation.title,
          answersCount: processedData.answers.length,
          timestamp: processedData.timestamp
        });
      }
    } else {
      // 数据库存储成功
      if (process.env.NODE_ENV !== 'production') {
        console.log('📊 Test result stored in database:', {
          sessionId: processedData.sessionId,
          recommendation: processedData.recommendation.title,
          answersCount: processedData.answers.length,
          timestamp: processedData.timestamp
        });
      }
    }

    const result: AnalyticsResponse = {
      success: true,
      message: 'Test result logged successfully',
      sessionId: processedData.sessionId
    };

    return response.status(200).json(result);

  } catch (error) {
    console.error('Error logging test result:', error);

    return response.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

// 简单的字符串哈希函数（用于匿名化）
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// 发送到其他分析服务（可扩展）
// 返回是否成功存储到主数据库（Supabase）
async function sendToAnalyticsServices(data: TestResultData): Promise<boolean> {
  const services = [];
  let hasDatabaseStorage = false;
  let databaseService: Promise<boolean> | null = null;

  // Supabase（如果配置了）- 主数据库存储
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    hasDatabaseStorage = true;
    databaseService = sendToSupabase(data);
    services.push(databaseService);
  }

  // Google Analytics 4（如果配置了GA4测量ID）- 辅助分析服务
  if (process.env.GA4_MEASUREMENT_ID && process.env.GA4_API_SECRET) {
    services.push(sendToGoogleAnalytics(data));
  }

  // 自定义Webhook（如果配置了）- 辅助分析服务
  if (process.env.ANALYTICS_WEBHOOK_URL) {
    services.push(sendToWebhook(data));
  }

  // 并行发送到所有服务
  const results = await Promise.allSettled(services);

  // 检查主数据库存储是否成功
  if (hasDatabaseStorage && databaseService) {
    const index = services.indexOf(databaseService);
    const result = results[index];
    if (result.status === 'fulfilled' && result.value === true) {
      return true; // 数据库存储成功
    }
    console.warn('主数据库存储失败，将使用内存存储作为备选');
    return false;
  }

  // 如果没有配置数据库存储，返回false表示需要内存存储
  return false;
}

async function sendToGoogleAnalytics(data: TestResultData): Promise<boolean> {
  try {
    const measurementId = process.env.GA4_MEASUREMENT_ID;
    const apiSecret = process.env.GA4_API_SECRET;

    const eventData = {
      client_id: data.sessionId,
      events: [{
        name: 'personality_test_completed',
        params: {
          recommendation: data.recommendation.title,
          answers_count: data.answers.length,
          anonymized: data.privacy?.anonymized || false
        }
      }]
    };

    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      }
    );

    if (!response.ok) {
      console.warn('Failed to send to Google Analytics:', response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.warn('Error sending to Google Analytics:', error);
    return false;
  }
}

async function sendToWebhook(data: TestResultData): Promise<boolean> {
  try {
    const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL;

    const response = await fetch(webhookUrl!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.warn('Failed to send to webhook:', response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.warn('Error sending to webhook:', error);
    return false;
  }
}

async function sendToSupabase(data: TestResultData): Promise<boolean> {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // 检查 Supabase 配置是否存在
    if (!supabaseUrl || !supabaseKey) {
      console.log('Supabase 配置未设置，跳过数据库存储');
      return false;
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/test_results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        session_id: data.sessionId,
        timestamp: data.timestamp,
        answers: data.answers,
        recommendation_title: data.recommendation.title,
        recommendation_description: data.recommendation.description,
        recommendation_emoji: data.recommendation.emoji,
        anonymized: data.privacy?.anonymized || false,
        device_info: data.deviceInfo
      })
    });

    if (!response.ok) {
      console.warn('Failed to send to Supabase:', response.status);
      return false;
    }

    console.log('✅ 数据已存储到 Supabase');
    return true;
  } catch (error) {
    console.warn('Error sending to Supabase:', error);
    return false;
  }
}