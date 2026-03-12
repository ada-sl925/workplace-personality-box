import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { TestResultData } from '../types/analytics';

interface AnalyticsData {
  data: TestResultData[];
  stats: {
    total: number;
    showing: number;
    page: number;
    totalPages: number;
    recommendations: Record<string, number>;
  };
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * limit;
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        sortBy,
        order: sortOrder
      });

      if (apiKey) {
        queryParams.set('apiKey', apiKey);
      }

      const apiUrl = import.meta.env.VITE_API_URL || '';
      const endpoint = `${apiUrl}/api/analytics/data?${queryParams}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        if (response.status === 401) {
          setError('未授权：需要有效的API密钥');
          setShowApiKeyInput(true);
          return;
        }
        throw new Error(`API响应错误: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setAnalyticsData(result);
      } else {
        setError(result.message || '获取数据失败');
      }
    } catch (error) {
      console.error('获取分析数据失败:', error);
      setError(error instanceof Error ? error.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 尝试从localStorage加载API密钥
    const savedApiKey = localStorage.getItem('analytics_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    fetchAnalyticsData();
  }, [page, limit, sortBy, sortOrder]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem('analytics_api_key', apiKey);
    }
    setShowApiKeyInput(false);
    fetchAnalyticsData();
  };

  const handleRefresh = () => {
    fetchAnalyticsData();
  };

  const handleExportCSV = () => {
    if (!analyticsData?.data.length) return;

    const headers = ['时间戳', '会话ID', '推荐岗位', '答案数量', '设备类型', '语言', '匿名化'];
    const csvData = analyticsData.data.map(item => [
      new Date(item.timestamp).toLocaleString('zh-CN'),
      item.sessionId,
      item.recommendation.title,
      item.answers.length.toString(),
      item.deviceInfo?.screenWidth && item.deviceInfo.screenWidth < 768 ? '移动端' : '桌面端',
      item.deviceInfo?.language || '未知',
      item.privacy.anonymized ? '是' : '否'
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Vibe Check：职场人格盲盒数据_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading && !analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin text-3xl mb-4">⏳</div>
              <p className="text-gray-400">正在加载分析数据...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部工具栏 */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                数据分析仪表板
              </h1>
              <p className="text-gray-400 text-sm">
                实时查看Vibe Check：职场人格盲盒的匿名测试数据
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-medium"
              >
                刷新数据
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExportCSV}
                disabled={!analyticsData?.data.length}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                导出CSV
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 font-medium"
              >
                {apiKey ? '更新密钥' : '设置密钥'}
              </motion.button>
            </div>
          </div>

          {/* API密钥输入 */}
          {showApiKeyInput && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
            >
              <form onSubmit={handleApiKeySubmit} className="flex gap-3">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="请输入API密钥"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-700 text-white font-medium"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => setShowApiKeyInput(false)}
                  className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 font-medium"
                >
                  取消
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                提示：API密钥用于访问数据分析接口。如果没有设置密钥，请查看部署环境配置。
              </p>
            </motion.div>
          )}

          {/* 错误提示 */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-900/30 border border-red-700/50 rounded-xl"
            >
              <div className="flex items-center">
                <span className="text-red-400 mr-2">⚠️</span>
                <span className="text-red-300">{error}</span>
              </div>
            </motion.div>
          )}
        </header>

        {/* 统计卡片 */}
        {analyticsData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                {analyticsData.stats.total}
              </div>
              <div className="text-gray-400 text-sm mt-2">总测试次数</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                {Object.keys(analyticsData.stats.recommendations).length}
              </div>
              <div className="text-gray-400 text-sm mt-2">推荐岗位类型</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                {analyticsData.stats.showing}
              </div>
              <div className="text-gray-400 text-sm mt-2">本页显示</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                {analyticsData.stats.page}/{analyticsData.stats.totalPages}
              </div>
              <div className="text-gray-400 text-sm mt-2">当前页/总页数</div>
            </motion.div>
          </div>
        )}

        {/* 控制面板 */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-gray-400 text-sm mb-1">每页显示</label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white"
              >
                <option value={10}>10条</option>
                <option value={20}>20条</option>
                <option value={50}>50条</option>
                <option value={100}>100条</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">排序方式</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white"
              >
                <option value="timestamp">时间</option>
                <option value="recommendation.title">岗位类型</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">排序顺序</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white"
              >
                <option value="desc">最新优先</option>
                <option value="asc">最早优先</option>
              </select>
            </div>
          </div>
        </div>

        {/* 数据表格 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin text-2xl mb-3">⏳</div>
              <p className="text-gray-400">正在加载数据...</p>
            </div>
          ) : analyticsData?.data.length ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800/80">
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">时间</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">会话ID</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">推荐岗位</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">答案</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">设备</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">语言</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">匿名化</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {analyticsData.data.map((item, index) => (
                      <motion.tr
                        key={item.sessionId + index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            {new Date(item.timestamp).toLocaleString('zh-CN')}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <code className="text-xs bg-gray-900 px-2 py-1 rounded text-cyan-300">
                            {item.sessionId.substring(0, 12)}...
                          </code>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <span className="text-xl mr-2">{item.recommendation.emoji}</span>
                            <div>
                              <div className="font-medium">{item.recommendation.title}</div>
                              <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                {item.recommendation.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            <span className="font-medium">{item.answers.length}</span> 个答案
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            {item.deviceInfo ? (
                              <>
                                <div>{item.deviceInfo.screenWidth}×{item.deviceInfo.screenHeight}</div>
                                <div className="text-xs text-gray-500">
                                  {item.deviceInfo.screenWidth < 768 ? '📱 移动端' : '💻 桌面端'}
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-500">未知</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            {item.deviceInfo?.language || '未知'}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.privacy.anonymized
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {item.privacy.anonymized ? '已匿名' : '未匿名'}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 分页 */}
              <div className="flex justify-between items-center p-6 border-t border-gray-700/50">
                <div className="text-sm text-gray-500">
                  显示第 {(page - 1) * limit + 1} - {Math.min(page * limit, analyticsData.pagination.total)} 条，
                  共 {analyticsData.pagination.total} 条
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    上一页
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= analyticsData.stats.totalPages}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-medium mb-2">暂无数据</h3>
              <p className="text-gray-400 mb-4">还没有用户完成测试，或者数据尚未同步</p>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-700 text-white font-medium"
              >
                刷新数据
              </button>
            </div>
          )}
        </div>

        {/* 推荐岗位分布 */}
        {analyticsData?.stats.recommendations && Object.keys(analyticsData.stats.recommendations).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
          >
            <h3 className="text-lg font-medium mb-4">推荐岗位分布</h3>
            <div className="space-y-4">
              {Object.entries(analyticsData.stats.recommendations)
                .sort(([, a], [, b]) => b - a)
                .map(([title, count]) => {
                  const percentage = (count / analyticsData.stats.total * 100).toFixed(1);
                  return (
                    <div key={title} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{title}</span>
                        <span className="text-gray-400">{count} 次 ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* 底部信息 */}
        <footer className="mt-8 text-center text-xs text-gray-500">
          <p>© 2026 Vibe Check：职场人格盲盒 • 数据分析仪表板 • 数据每60秒自动缓存</p>
          <p className="mt-1">
            提示：所有数据均已匿名化处理，不包含任何个人身份信息
          </p>
        </footer>
      </div>
    </div>
  );
}