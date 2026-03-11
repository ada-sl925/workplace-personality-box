import type { TestResultData, AnalyticsResponse } from '../types/analytics';

// 生成匿名会话ID
export function generateSessionId(): string {
  // 使用时间戳 + 随机数生成唯一ID
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `session_${timestamp}_${random}`;
}

// 获取设备信息
export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    platform: navigator.platform,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

// 发送测试结果到分析服务
export async function logTestResult(
  answers: TestResultData['answers'],
  recommendation: TestResultData['recommendation'],
  options: {
    anonymized?: boolean;
    consentGiven?: boolean;
  } = {}
): Promise<AnalyticsResponse> {
  // 检查是否启用分析功能
  const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED !== 'false';
  if (!analyticsEnabled) {
    return {
      success: false,
      message: 'Analytics disabled'
    };
  }

  const {
    anonymized = import.meta.env.VITE_ANALYTICS_DEFAULT_ANONYMIZE !== 'false',
    consentGiven = true // 默认假设用户同意，实际中应该获取用户明确同意
  } = options;

  // 如果没有用户同意，不发送数据
  if (!consentGiven) {
    return {
      success: false,
      message: 'Consent not given'
    };
  }

  const sessionId = localStorage.getItem('personality_test_session_id') || generateSessionId();

  // 存储会话ID供后续使用
  if (!localStorage.getItem('personality_test_session_id')) {
    localStorage.setItem('personality_test_session_id', sessionId);
  }

  const data: TestResultData = {
    sessionId,
    timestamp: new Date().toISOString(),
    answers,
    recommendation,
    deviceInfo: getDeviceInfo(),
    privacy: {
      anonymized,
      consentGiven
    }
  };

  try {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    const endpoint = `${apiUrl}/api/analytics/log`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const result = await response.json() as AnalyticsResponse;
    return result;

  } catch (error) {
    console.error('Failed to log test result:', error);

    // 失败时静默处理，不影响用户体验
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// 获取统计数据
export async function getAnalyticsStats() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    const endpoint = `${apiUrl}/api/analytics/stats`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Failed to fetch analytics stats:', error);
    return null;
  }
}

// 检查分析服务是否可用
export async function checkAnalyticsService(): Promise<boolean> {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || '';

    // 如果未配置API URL，假设分析服务不可用
    if (!apiUrl) {
      return false;
    }

    const response = await fetch(`${apiUrl}/api/analytics/stats`, {
      method: 'HEAD'
    });

    return response.ok;
  } catch {
    return false;
  }
}