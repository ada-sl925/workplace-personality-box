import { VercelRequest, VercelResponse } from '@vercel/node';
import type { TestResultData } from '../../src/types/analytics';

// 简单的内存存储（与log.ts共享）
let testResults: TestResultData[] = [];

// 尝试从文件加载数据（如果启用了文件存储）
async function loadDataFromFile() {
  try {
    if (process.env.USE_FILE_STORAGE === 'true') {
      const fs = await import('fs/promises');
      const data = await fs.readFile('/tmp/analytics-data.json', 'utf-8');
      testResults = JSON.parse(data);
    }
  } catch (error) {
    // 文件不存在是正常的
    if ((error as any).code !== 'ENOENT') {
      console.warn('Failed to load data from file:', error);
    }
  }
}

// 从 Supabase 获取数据
async function fetchDataFromSupabase(
  limit: number,
  offset: number,
  sortBy: string,
  order: string
): Promise<{ data: TestResultData[]; total: number }> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase 配置未设置');
  }

  // 映射前端字段名到数据库字段名
  const fieldMapping: Record<string, string> = {
    'timestamp': 'timestamp',
    'recommendation.title': 'recommendation_title'
  };

  const dbSortBy = fieldMapping[sortBy] || 'timestamp';

  // 构建查询参数
  const queryParams = new URLSearchParams({
    select: '*',
    order: `${dbSortBy}.${order}`,
    limit: limit.toString(),
    offset: offset.toString()
  });

  // 发送请求获取数据（包含 count=exact 获取总数）
  const dataResponse = await fetch(
    `${supabaseUrl}/rest/v1/test_results?${queryParams.toString()}`,
    {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'count=exact' // 获取总数
      }
    }
  );

  if (!dataResponse.ok) {
    throw new Error(`Supabase 数据请求失败: ${dataResponse.status}`);
  }

  // 从响应头获取总数
  let total = 0;
  const countHeader = dataResponse.headers.get('content-range');
  if (countHeader) {
    // 格式如 "0-9/123"
    const match = countHeader.match(/\/(\d+)/);
    if (match) {
      total = parseInt(match[1], 10);
    }
  }

  const supabaseData = await dataResponse.json();

  // 转换 Supabase 数据格式为 TestResultData 格式
  const data: TestResultData[] = supabaseData.map((row: any) => ({
    sessionId: row.session_id,
    timestamp: row.timestamp,
    answers: row.answers,
    recommendation: {
      title: row.recommendation_title,
      description: row.recommendation_description,
      emoji: row.recommendation_emoji
    },
    deviceInfo: row.device_info,
    privacy: {
      anonymized: row.anonymized,
      consentGiven: true // Supabase 中存储的数据都是用户同意的
    }
  }));

  return { data, total };
}

// 简单的API密钥验证（生产环境应使用更安全的验证方式）
function isAuthorized(request: VercelRequest): boolean {
  const apiKey = request.headers['x-api-key'] || request.query.apiKey;

  // 允许在开发环境无需密钥
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // 生产环境需要验证API密钥
  const validApiKey = process.env.ANALYTICS_API_KEY;
  if (!validApiKey) {
    console.warn('ANALYTICS_API_KEY not set, allowing all requests');
    return true;
  }

  return apiKey === validApiKey;
}

// 从内存获取数据（备选方案）
function getDataFromMemory(
  limit: number,
  offset: number,
  sortBy: string,
  order: string
): { data: TestResultData[]; total: number; recommendations: Record<string, number> } {
  // 过滤数据（简单实现）
  let filteredData = [...testResults];

  // 按时间排序
  filteredData.sort((a, b) => {
    const aValue = a[sortBy as keyof TestResultData];
    const bValue = b[sortBy as keyof TestResultData];

    // 处理 undefined 值
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return order === 'asc' ? -1 : 1;
    if (bValue === undefined) return order === 'asc' ? 1 : -1;

    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // 分页
  const paginatedData = filteredData.slice(offset, offset + limit);

  // 统计信息
  const recommendations = testResults.reduce((acc, result) => {
    const title = result.recommendation.title;
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    data: paginatedData,
    total: testResults.length,
    recommendations
  };
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // 验证API密钥
  if (!isAuthorized(request)) {
    return response.status(401).json({
      success: false,
      message: 'Unauthorized. Invalid or missing API key.'
    });
  }

  // 只允许GET请求
  if (request.method !== 'GET') {
    return response.status(405).json({
      success: false,
      message: 'Method not allowed. Use GET.'
    });
  }

  try {
    // 查询参数
    const limit = request.query.limit ? parseInt(request.query.limit as string) : 100;
    const offset = request.query.offset ? parseInt(request.query.offset as string) : 0;
    const sortBy = (request.query.sortBy as string) || 'timestamp';
    const order = (request.query.order as string) || 'desc';

    let data: TestResultData[] = [];
    let total = 0;
    let recommendations: Record<string, number> = {};
    let source: 'database' | 'memory' = 'memory';

    // 先尝试从 Supabase 获取数据
    try {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && supabaseKey) {
        console.log('尝试从 Supabase 获取数据...');
        const result = await fetchDataFromSupabase(limit, offset, sortBy, order);
        data = result.data;
        total = result.total;
        source = 'database';

        // 从数据库数据计算推荐统计
        recommendations = data.reduce((acc, result) => {
          const title = result.recommendation.title;
          acc[title] = (acc[title] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        console.log(`从 Supabase 获取了 ${data.length} 条数据`);
      } else {
        console.log('Supabase 配置未设置，使用内存数据');
      }
    } catch (error) {
      console.warn('从 Supabase 获取数据失败，回退到内存数据:', error);
    }

    // 如果数据库没有数据或获取失败，使用内存数据
    if (source === 'memory' || data.length === 0) {
      // 加载内存数据（如果启用了文件存储）
      await loadDataFromFile();

      const memoryResult = getDataFromMemory(limit, offset, sortBy, order);
      data = memoryResult.data;
      total = memoryResult.total;
      recommendations = memoryResult.recommendations;
      source = 'memory';

      console.log(`从内存获取了 ${data.length} 条数据`);
    }

    // 计算分页信息
    const page = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const stats = {
      total,
      showing: data.length,
      page,
      totalPages,
      recommendations,
      source
    };

    // 添加缓存头（1分钟缓存）
    response.setHeader('Cache-Control', 'public, max-age=60');

    return response.status(200).json({
      success: true,
      data,
      stats,
      pagination: {
        limit,
        offset,
        total
      }
    });

  } catch (error) {
    console.error('Error fetching analytics data:', error);

    return response.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}