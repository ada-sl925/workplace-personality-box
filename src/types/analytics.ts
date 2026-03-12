// 数据分析类型定义

// 用户测试结果数据
export interface TestResultData {
  // 会话信息
  sessionId: string;  // 匿名会话ID
  timestamp: string;  // ISO格式时间戳

  // 测试结果
  answers: {
    questionId: number;
    optionId: string;
    optionType: string;
  }[];

  // 推荐结果
  recommendation: {
    title: string;
    description: string;
    emoji: string;
  };

  // 设备信息（可选）
  deviceInfo?: {
    userAgent?: string;
    screenWidth: number;
    screenHeight: number;
    language: string;
    platform?: string;
    timezone?: string;
  };

  // 隐私设置
  privacy: {
    anonymized: boolean;  // 是否匿名化处理
    consentGiven: boolean; // 用户是否同意数据收集
  };
}

// API响应
export interface AnalyticsResponse {
  success: boolean;
  message?: string;
  sessionId?: string;
}

// 统计数据
export interface AnalyticsStats {
  totalTests: number;
  recommendations: Record<string, number>; // 岗位推荐统计
  averageCompletionTime?: number; // 平均完成时间（秒）
  deviceBreakdown?: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
}