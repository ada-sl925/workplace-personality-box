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
  }
};

// 根据选择的类型数组推荐岗位
export function recommendPosition(selectedTypes: string[]): typeof personalityResults[keyof typeof personalityResults] {
  // 统计每种类型出现的次数
  const typeCounts: Record<string, number> = {};
  selectedTypes.forEach(type => {
    typeCounts[type] = (typeCounts[type] || 0) + 1;
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

  // 按优先级选择：领导型 > 创意型 > 分析型 > 亲和型 > 其他
  const priorityOrder = ["leader", "dominant", "assertive", "creative", "expressive", "analytical", "strategic", "agreeable", "mediator", "organizer"];

  for (const priorityType of priorityOrder) {
    if (maxTypes.includes(priorityType)) {
      maxType = priorityType;
      break;
    }
  }

  // 返回对应的结果，如果不存在则返回默认值
  return personalityResults[maxType as keyof typeof personalityResults] || personalityResults.creative;
}