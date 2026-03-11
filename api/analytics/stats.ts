import { VercelRequest, VercelResponse } from '@vercel/node';
import type { AnalyticsStats } from '../../src/types/analytics';

// 这里应该从数据库获取数据，但为了演示使用内存存储
// 在实际项目中，你需要连接到数据库（如Supabase、MongoDB等）
const testResults: any[] = []; // 这里应该是从数据库获取的数据

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // 只允许GET请求
  if (request.method !== 'GET') {
    return response.status(405).json({
      success: false,
      message: 'Method not allowed. Use GET.'
    });
  }

  try {
    // 这里应该从数据库查询统计数据
    // 以下为示例数据

    // 假设我们从数据库获取了testResults数组
    const totalTests = testResults.length;

    // 计算岗位推荐统计
    const recommendations: Record<string, number> = {};
    testResults.forEach(result => {
      const title = result.recommendation?.title || '未知';
      recommendations[title] = (recommendations[title] || 0) + 1;
    });

    // 设备分布（示例）
    const deviceBreakdown = {
      mobile: Math.floor(totalTests * 0.6),
      desktop: Math.floor(totalTests * 0.35),
      tablet: Math.floor(totalTests * 0.05)
    };

    const stats: AnalyticsStats = {
      totalTests,
      recommendations,
      deviceBreakdown
    };

    // 添加缓存头（5分钟缓存）
    response.setHeader('Cache-Control', 'public, max-age=300');

    return response.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching analytics stats:', error);

    return response.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

// 数据库查询函数（需要根据实际数据库实现）
/*
async function getTestResultsFromDatabase(): Promise<any[]> {
  // 示例：使用Supabase
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10000); // 限制数量

    if (error) throw error;
    return data || [];
  }

  // 如果没有配置数据库，返回空数组
  return [];
}

async function getAnalyticsStatsFromDatabase(): Promise<AnalyticsStats> {
  const testResults = await getTestResultsFromDatabase();

  // 实际计算逻辑...
  return {
    totalTests: testResults.length,
    recommendations: {},
    // ...其他统计
  };
}
*/