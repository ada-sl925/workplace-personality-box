import { VercelRequest, VercelResponse } from '@vercel/node';
import type { TestResultData, AnalyticsResponse } from '../../src/types/analytics';

// 简单的内存存储（仅用于演示，生产环境需要持久化存储）
const testResults: TestResultData[] = [];

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

    // 存储数据（这里使用内存，生产环境应使用数据库）
    testResults.push(processedData);

    // 限制存储数量，避免内存泄漏
    if (testResults.length > 1000) {
      testResults.shift();
    }

    // 记录到控制台（开发环境）
    if (process.env.NODE_ENV !== 'production') {
      console.log('📊 Test result logged:', {
        sessionId: processedData.sessionId,
        recommendation: processedData.recommendation.title,
        answersCount: processedData.answers.length,
        timestamp: processedData.timestamp
      });
    }

    // 可选：发送到其他分析服务
    await sendToAnalyticsServices(processedData);

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
async function sendToAnalyticsServices(data: TestResultData): Promise<void> {
  const services = [];

  // Google Analytics 4（如果配置了GA4测量ID）
  if (process.env.GA4_MEASUREMENT_ID && process.env.GA4_API_SECRET) {
    services.push(sendToGoogleAnalytics(data));
  }

  // 自定义Webhook（如果配置了）
  if (process.env.ANALYTICS_WEBHOOK_URL) {
    services.push(sendToWebhook(data));
  }

  // Supabase（如果配置了）
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    services.push(sendToSupabase(data));
  }

  // 并行发送到所有服务
  await Promise.allSettled(services);
}

async function sendToGoogleAnalytics(data: TestResultData): Promise<void> {
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
    }
  } catch (error) {
    console.warn('Error sending to Google Analytics:', error);
  }
}

async function sendToWebhook(data: TestResultData): Promise<void> {
  try {
    const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL;

    const response = await fetch(webhookUrl!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.warn('Failed to send to webhook:', response.status);
    }
  } catch (error) {
    console.warn('Error sending to webhook:', error);
  }
}

async function sendToSupabase(data: TestResultData): Promise<void> {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const response = await fetch(`${supabaseUrl}/rest/v1/test_results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey!,
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
    }
  } catch (error) {
    console.warn('Error sending to Supabase:', error);
  }
}