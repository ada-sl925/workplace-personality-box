// 性格类型到推荐岗位的映射
export const personalityResults = {
  // 支配型/领导型
  dominant: {
    title: "项目管理/团队负责人",
    description: "你是天生的指挥家，眼里容不得沙子。适合带团队冲锋陷阵，但小心别把队友都吓跑了。",
    emoji: "👑"
  },
  leader: {
    title: "创业公司CEO/部门总监",
    description: "野心写在脸上，掌控欲满分。给你一个团队，你能搅动风云；给你一个公司，你能颠覆行业（或者搞垮它）。",
    emoji: "🚀"
  },
  assertive: {
    title: "销售总监/谈判专家",
    description: "嗓门大、气场强，会议室里你说第二没人敢说第一。适合去搞定难缠的客户，但请注意音量控制。",
    emoji: "💰"
  },

  // 严谨型/分析型
  conscientious: {
    title: "审计/质量控制",
    description: "细节控晚期患者，报告里一个标点错误都能让你失眠。世界需要你这样的守门员，但请放过同事的PPT字体。",
    emoji: "🔍"
  },
  analytical: {
    title: "数据分析师/战略顾问",
    description: "理性到冷血，逻辑至上。你相信数据不说谎，但有时候人类的情结也需要被计算进去。",
    emoji: "📊"
  },
  thorough: {
    title: "研究员/技术专家",
    description: "不把源码读三遍不罢休，不搞清原理睡不着觉。深度是你的超能力，但deadline可能不是你的朋友。",
    emoji: "🔬"
  },

  // 亲和型/协作型
  agreeable: {
    title: "HR/员工关系专员",
    description: "职场老好人，笑容是你的招牌。调解纠纷、安抚情绪你最在行，但小心别变成全公司的情绪垃圾桶。",
    emoji: "🤝"
  },
  mediator: {
    title: "客户成功经理/公关",
    description: "说话的艺术大师，总能找到各方都能接受的中间点。适合处理客诉危机，但别总是自己背锅。",
    emoji: "☕️"
  },
  collaborative: {
    title: "团队协作教练/敏捷教练",
    description: "相信1+1>2，擅长激发团队化学反应。你能让一群猫一起拉车，虽然车可能走得歪歪扭扭。",
    emoji: "🧩"
  },

  // 创意型/灵活型
  creative: {
    title: "产品经理/创意总监",
    description: "脑子里的想法比头发还多，虽然一半不靠谱，但剩下的一半能改变世界。记得给技术同事留条活路。",
    emoji: "🎨"
  },
  expressive: {
    title: "市场策划/品牌宣传",
    description: "舞台王者，聚光灯追随者。你能把一碗泡面讲出米其林三星的故事，但请确保产品真能吃。",
    emoji: "🎭"
  },
  flexible: {
    title: "自由职业者/远程工作顾问",
    description: "朝九晚五是你的噩梦，打卡机是你的仇敌。适合自己安排时间，但小心别把一天过成一星期。",
    emoji: "🌍"
  },

  // 规划型/组织型
  organizer: {
    title: "运营经理/活动策划",
    description: "Excel是你的武器，甘特图是你的圣经。能把混沌整理成秩序，但请允许世界有一点随机性。",
    emoji: "📋"
  },
  planner: {
    title: "产品运营/项目经理",
    description: "未来三个月的工作已经排好，意外是你字典里不存在的词。直到服务器宕机、老板变卦、队友请假...",
    emoji: "🗓️"
  },
  strategic: {
    title: "商业分析师/战略规划",
    description: "走一步看十步，下棋永远多想三手。宏观视野满分，但小心别在微观执行上摔跤。",
    emoji: "♟️"
  },

  // 社交型/连接型
  networker: {
    title: "商务拓展/渠道经理",
    description: "微信好友5000+，朋友圈点赞秒回。人脉是你的金矿，但记得区分酒肉朋友和真伙伴。",
    emoji: "🤳"
  },
  connector: {
    title: "生态合作经理/联盟经理",
    description: "擅长把不相干的人和事撮合到一起，创造神奇化学反应。你是职场月老，但别乱点鸳鸯谱。",
    emoji: "💑"
  },
  social: {
    title: "企业文化专员/团队建设",
    description: "办公室气氛组组长，团建活动灵魂人物。你能让加班变得像开派对，虽然大家可能更想回家。",
    emoji: "🎉"
  },

  // 独立型/专注型
  reserved: {
    title: "技术研发/后端工程师",
    description: "人狠话不多，代码写得比说得好。适合独立攻坚，但记得偶尔从显示器前抬起头呼吸。",
    emoji: "💻"
  },
  focused: {
    title: "学术研究/深度写作",
    description: "进入心流状态后，外界消失。你能产出惊人深度的作品，但可能错过午饭、晚饭和会议。",
    emoji: "📚"
  },
  independent: {
    title: "独立开发者/咨询顾问",
    description: "自己的老板，自己的节奏。享受自由的同时，请准备好应对孤独和不确定的收入曲线。",
    emoji: "🦄"
  },

  // 其他类型
  learner: {
    title: "培训师/知识付费创作者",
    description: "学习上瘾者，证书收集家。你享受掌握新技能的快感，现在是时候让别人为你的知识付费了。",
    emoji: "🎓"
  },
  pragmatic: {
    title: "运维工程师/技术支持",
    description: "不管黑猫白猫，能抓到老鼠就是好猫。解决问题第一，优雅第二，适合救火队长的角色。",
    emoji: "🛠️"
  },
  risk_aware: {
    title: "风控专员/合规官",
    description: "看到机会第一反应是风险，想到收益马上计算成本。你是公司的刹车片，虽然有时候刹得太急。",
    emoji: "⚠️"
  },

  // 新增技术能力型
  competent: {
    title: "全栈工程师/技术主管",
    description: "技术栈丰富，能独立搞定前后端。你是团队的技术支柱，但小心别变成永远的救火队员。",
    emoji: "⚡"
  },
  expert: {
    title: "首席技术官/架构师",
    description: "技术深度和广度都令人敬畏，能设计支撑百万用户的系统。只是有时候你讲的原理没人听得懂。",
    emoji: "🏆"
  },
  organized: {
    title: "流程优化专员/运营专员",
    description: "能把混乱的流程梳理得井井有条，效率提升专家。但请接受世界上总有些人不按流程办事。",
    emoji: "📈"
  },

  // 其他现有问题中的类型
  critical: {
    title: "质量测试/代码审查",
    description: "眼光毒辣，总能发现别人忽略的问题。你是产品的守门人，但请对新手程序员温柔一点。",
    emoji: "🔎"
  },
  realistic: {
    title: "产品经理/需求分析师",
    description: "务实派，知道理想和现实的差距。能在资源限制下找到最优解，但偶尔会被吐槽缺乏想象力。",
    emoji: "🎯"
  },
  achiever: {
    title: "销售冠军/业务拓展",
    description: "目标驱动，业绩导向。为了达成KPI可以拼尽全力，只是有时候会忽略团队合作。",
    emoji: "🏅"
  },
  community: {
    title: "开源社区经理/技术布道师",
    description: "热爱分享，擅长构建技术社区。你能把冷门技术讲得火热，但别忘了公司的KPI也要完成。",
    emoji: "🌐"
  },
  structured: {
    title: "系统管理员/IT运维",
    description: "喜欢一切都井井有条，服务器配置、网络拓扑都要规范清晰。混乱是你的天敌。",
    emoji: "🖥️"
  },
  supportive: {
    title: "团队助理/行政支持",
    description: "默默支持团队运转，确保大家没有后顾之忧。你是团队的润滑剂，只是功劳常常被忽略。",
    emoji: "🤲"
  },
  consultative: {
    title: "咨询顾问/解决方案架构师",
    description: "善于借鉴外部经验，快速找到最佳实践。客户信任你的专业建议，但方案落地可能需要更多细节。",
    emoji: "💼"
  },
  cautious: {
    title: "安全工程师/合规审核",
    description: "谨慎小心，凡事考虑最坏情况。你是公司的安全网，但有时候过度谨慎会错失机会。",
    emoji: "🛡️"
  },
  diplomatic: {
    title: "外交官/政府关系",
    description: "说话得体，处事圆滑，能在复杂关系中游刃有余。适合处理敏感事务，但小心别失去原则。",
    emoji: "🕊️"
  },
  tolerant: {
    title: "客户服务/用户支持",
    description: "耐心十足，能忍受各种不合理要求。你是公司的形象代言人，但别让用户的负能量影响自己。",
    emoji: "😊"
  },
  observant: {
    title: "市场研究员/用户研究",
    description: "观察入微，能从细节中发现趋势。你的洞察力能指导产品方向，但数据需要结合人性理解。",
    emoji: "👀"
  },
  defensive: {
    title: "法务顾问/合规专员",
    description: "善于保护自己和团队，规避法律风险。你是公司的防护盾，但别让防御心态阻碍创新。",
    emoji: "⚖️"
  },
  improvement: {
    title: "流程改进工程师/精益专家",
    description: "永不满足现状，总能找到优化点。持续改进是你的信仰，但别为了优化而优化。",
    emoji: "🔄"
  },
  sensitive: {
    title: "心理咨询师/员工关怀",
    description: "情感细腻，能察觉他人情绪变化。适合做员工关怀工作，但记得也要照顾好自己的情绪。",
    emoji: "💖"
  },
  factual: {
    title: "技术文档工程师/数据管理员",
    description: "注重事实和证据，讨厌模糊表述。你能确保信息的准确性和一致性，但创意讨论需要一些弹性。",
    emoji: "📄"
  }
};

// 技术相关类型定义 - 增加权重考虑
const technicalTypes = [
  "competent",    // 全栈工程师/技术主管
  "expert",       // 首席技术官/架构师
  "pragmatic",    // 运维工程师/技术支持
  "reserved",     // 技术研发/后端工程师
  "structured",   // 系统管理员/IT运维
  "thorough",     // 研究员/技术专家
  "critical",     // 质量测试/代码审查
  "community",    // 开源社区经理/技术布道师
  "analytical",   // 数据分析师/战略顾问
  "realistic",    // 产品经理/需求分析师
  "organized",    // 流程优化专员/运营专员
];

// 技术类型权重因子 (1.5表示技术类型出现一次算1.5次)
const TECHNICAL_WEIGHT = 1.5;

// 根据选择的类型数组推荐岗位
export function recommendPosition(selectedTypes: string[]): typeof personalityResults[keyof typeof personalityResults] {
  // 统计每种类型出现的次数，技术类型有额外权重
  const typeCounts: Record<string, number> = {};
  selectedTypes.forEach(type => {
    const baseCount = typeCounts[type] || 0;
    // 如果是技术类型，增加权重
    const increment = technicalTypes.includes(type) ? TECHNICAL_WEIGHT : 1;
    typeCounts[type] = baseCount + increment;
  });

  // 找出出现次数最多的类型
  let maxCount = 0;
  let maxType = "creative"; // 默认值

  for (const [type, count] of Object.entries(typeCounts)) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  }

  // 如果存在多个相同最高次数的类型，按优先级选择
  const maxTypes = Object.entries(typeCounts)
    .filter(([_, count]) => count === maxCount)
    .map(([type]) => type);

  // 按优先级选择：技术型 > 领导型 > 创意型 > 分析型 > 亲和型 > 其他
  const priorityOrder = [
    // 技术能力型优先
    "expert", "competent", "reserved", "pragmatic", "structured", "analytical",
    // 领导型
    "leader", "dominant", "assertive",
    // 创意型
    "creative", "expressive",
    // 其他
    "strategic", "agreeable", "mediator", "organizer"
  ];

  for (const priorityType of priorityOrder) {
    if (maxTypes.includes(priorityType)) {
      maxType = priorityType;
      break;
    }
  }

  // 返回对应的结果，如果不存在则返回默认值
  return personalityResults[maxType as keyof typeof personalityResults] || personalityResults.creative;
}

// ==================== MBTI相关功能 ====================

// MBTI维度评分映射
const mbtiDimensionMapping: Record<string, {
  E: number; I: number;   // 外向/内向
  S: number; N: number;   // 感觉/直觉
  T: number; F: number;   // 思考/情感
  J: number; P: number;   // 判断/感知
}> = {
  // 外向(E)倾向类型
  dominant: { E: 2, I: 0, S: 1, N: 1, T: 2, F: 0, J: 2, P: 0 },
  leader: { E: 2, I: 0, S: 0, N: 2, T: 2, F: 0, J: 2, P: 0 },
  assertive: { E: 2, I: 0, S: 1, N: 1, T: 1, F: 1, J: 1, P: 1 },
  expressive: { E: 2, I: 0, S: 1, N: 1, T: 1, F: 1, J: 0, P: 2 },
  collaborative: { E: 2, I: 0, S: 1, N: 1, T: 1, F: 2, J: 1, P: 1 },
  connector: { E: 2, I: 0, S: 1, N: 1, T: 1, F: 1, J: 1, P: 1 },
  networker: { E: 2, I: 0, S: 1, N: 1, T: 1, F: 1, J: 0, P: 2 },
  social: { E: 2, I: 0, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 },
  mediator: { E: 2, I: 0, S: 1, N: 1, T: 0, F: 2, J: 1, P: 1 },
  community: { E: 2, I: 0, S: 1, N: 1, T: 1, F: 1, J: 0, P: 2 },

  // 内向(I)倾向类型
  reserved: { E: 0, I: 2, S: 2, N: 0, T: 2, F: 0, J: 1, P: 1 },
  independent: { E: 0, I: 2, S: 1, N: 1, T: 2, F: 0, J: 0, P: 2 },
  analytical: { E: 0, I: 2, S: 1, N: 1, T: 2, F: 0, J: 1, P: 0 },
  conscientious: { E: 0, I: 2, S: 2, N: 0, T: 1, F: 1, J: 2, P: 0 },
  thorough: { E: 0, I: 2, S: 2, N: 1, T: 2, F: 0, J: 1, P: 0 },
  focused: { E: 0, I: 2, S: 1, N: 1, T: 1, F: 1, J: 1, P: 1 },
  critical: { E: 0, I: 2, S: 1, N: 1, T: 2, F: 0, J: 1, P: 0 },
  realistic: { E: 0, I: 1, S: 2, N: 0, T: 2, F: 0, J: 1, P: 1 },
  risk_aware: { E: 0, I: 2, S: 1, N: 1, T: 2, F: 0, J: 2, P: 0 },
  structured: { E: 0, I: 1, S: 2, N: 0, T: 1, F: 0, J: 2, P: 0 },
  learner: { E: 0, I: 2, S: 1, N: 1, T: 1, F: 1, J: 1, P: 1 },
  competent: { E: 0, I: 1, S: 1, N: 1, T: 2, F: 0, J: 1, P: 1 },
  expert: { E: 0, I: 2, S: 1, N: 1, T: 2, F: 0, J: 2, P: 0 },
  organized: { E: 0, I: 1, S: 2, N: 0, T: 1, F: 0, J: 2, P: 0 },

  // 其他类型
  agreeable: { E: 1, I: 1, S: 1, N: 1, T: 0, F: 2, J: 1, P: 1 },
  creative: { E: 1, I: 1, S: 0, N: 2, T: 1, F: 1, J: 0, P: 2 },
  flexible: { E: 1, I: 1, S: 1, N: 1, T: 1, F: 1, J: 0, P: 2 },
  organizer: { E: 1, I: 1, S: 2, N: 0, T: 1, F: 0, J: 2, P: 0 },
  planner: { E: 0, I: 2, S: 1, N: 1, T: 1, F: 0, J: 2, P: 0 },
  pragmatic: { E: 1, I: 1, S: 2, N: 0, T: 2, F: 0, J: 1, P: 1 },
  strategic: { E: 0, I: 2, S: 0, N: 2, T: 2, F: 0, J: 2, P: 0 },
  supportive: { E: 1, I: 1, S: 1, N: 1, T: 0, F: 2, J: 1, P: 1 },
  consultative: { E: 1, I: 1, S: 1, N: 1, T: 1, F: 1, J: 1, P: 1 },
  cautious: { E: 0, I: 2, S: 2, N: 0, T: 1, F: 0, J: 2, P: 0 },
  diplomatic: { E: 1, I: 1, S: 1, N: 1, T: 0, F: 2, J: 1, P: 1 },
  tolerant: { E: 1, I: 1, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 },
  observant: { E: 0, I: 2, S: 2, N: 0, T: 1, F: 1, J: 1, P: 1 },
  defensive: { E: 0, I: 2, S: 1, N: 1, T: 1, F: 0, J: 2, P: 0 },
  improvement: { E: 0, I: 2, S: 1, N: 1, T: 1, F: 0, J: 2, P: 0 },
  sensitive: { E: 0, I: 2, S: 1, N: 1, T: 0, F: 2, J: 1, P: 1 },
  factual: { E: 0, I: 2, S: 2, N: 0, T: 2, F: 0, J: 1, P: 0 }
};

// 16种MBTI类型的职场特征描述
const mbtiDescriptions: Record<string, { title: string; description: string }> = {
  "ISTJ": { title: "检查者", description: "务实、有条理、可靠，注重细节和流程" },
  "ISFJ": { title: "保护者", description: "忠诚、体贴、有责任心，善于支持团队" },
  "INFJ": { title: "倡导者", description: "富有洞察力、理想主义，善于理解他人需求" },
  "INTJ": { title: "战略家", description: "理性、独立、有远见，擅长制定长期计划" },
  "ISTP": { title: "工匠", description: "灵活、务实、善于解决问题，喜欢动手实践" },
  "ISFP": { title: "艺术家", description: "敏感、有创造力、适应性强，注重和谐氛围" },
  "INFP": { title: "调解者", description: "理想主义、有同理心，追求意义和价值" },
  "INTP": { title: "思想家", description: "好奇、分析力强，喜欢探索理论和可能性" },
  "ESTP": { title: "企业家", description: "精力充沛、务实、善于应变，喜欢行动和冒险" },
  "ESFP": { title: "表演者", description: "热情、社交能力强，善于营造愉快氛围" },
  "ENFP": { title: "倡导者", description: "热情、有创造力，善于激励和连接他人" },
  "ENTP": { title: "辩论家", description: "聪明、好奇、善于辩论，喜欢智力挑战" },
  "ESTJ": { title: "管理者", description: "高效、务实、有组织能力，善于执行计划" },
  "ESFJ": { title: "供给者", description: "热心、合作、注重和谐，善于照顾他人" },
  "ENFJ": { title: "教育家", description: "有魅力、有同理心，善于指导和激励他人" },
  "ENTJ": { title: "指挥官", description: "果断、有战略眼光，善于领导和组织" }
};

// MBTI计算函数
export function calculateMBTI(selectedTypes: string[]): {
  type: string; // 如 "INTJ"
  title: string; // 如 "战略家"
  description: string; // 职场特征描述
  dimensions: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number };
} {
  const dimensionScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  // 累加各维度得分
  selectedTypes.forEach(type => {
    const mapping = mbtiDimensionMapping[type];
    if (mapping) {
      dimensionScores.E += mapping.E;
      dimensionScores.I += mapping.I;
      dimensionScores.S += mapping.S;
      dimensionScores.N += mapping.N;
      dimensionScores.T += mapping.T;
      dimensionScores.F += mapping.F;
      dimensionScores.J += mapping.J;
      dimensionScores.P += mapping.P;
    }
  });

  // 确定每个维度的倾向
  const eScore = dimensionScores.E > dimensionScores.I ? 'E' : 'I';
  const sScore = dimensionScores.S > dimensionScores.N ? 'S' : 'N';
  const tScore = dimensionScores.T > dimensionScores.F ? 'T' : 'F';
  const jScore = dimensionScores.J > dimensionScores.P ? 'J' : 'P';

  const mbtiType = `${eScore}${sScore}${tScore}${jScore}`;
  const mbtiInfo = mbtiDescriptions[mbtiType] || {
    title: "未定义类型",
    description: "无法确定具体人格类型"
  };

  return {
    type: mbtiType,
    title: mbtiInfo.title,
    description: mbtiInfo.description,
    dimensions: dimensionScores
  };
}

// 完整结果函数（返回职位推荐和MBTI信息）
export function getCompleteResult(selectedTypes: string[]): {
  position: typeof personalityResults[keyof typeof personalityResults];
  mbti: {
    type: string;
    title: string;
    description: string;
    dimensions: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number };
  };
} {
  const position = recommendPosition(selectedTypes);
  const mbti = calculateMBTI(selectedTypes);

  return { position, mbti };
}