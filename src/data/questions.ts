export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: string;
  }[];
  special?: boolean;
}

export const questions: Question[] = [
  // 维度 L/C：科研能量来源 1-6
  {
    id: 1,
    text: "导师突然抛出一个新选题，你第一反应是？",
    options: [
      { text: "回去自己先想三天", score: "L" },
      { text: "立刻找人 brainstorm", score: "C" },
    ],
  },
  {
    id: 2,
    text: "代码或实验卡住时，你更可能？",
    options: [
      { text: "深夜独自搜索解决方案", score: "L" },
      { text: "直接在群里发截图求救", score: "C" },
    ],
  },
  {
    id: 3,
    text: "写论文时你需要？",
    options: [
      { text: "关掉消息，进入孤岛模式", score: "L" },
      { text: "开共享文档，边聊边改", score: "C" },
    ],
  },
  {
    id: 4,
    text: "你的好点子通常来自？",
    options: [
      { text: "散步、洗澡、发呆", score: "L" },
      { text: "聊天、组会、被人质疑", score: "C" },
    ],
  },
  {
    id: 5,
    text: "看到合作者改了你的段落，你会？",
    options: [
      { text: "先沉默消化半小时", score: "L" },
      { text: "马上连麦开始解释", score: "C" },
    ],
  },
  {
    id: 6,
    text: "科研压力大时，你通常？",
    options: [
      { text: "隐身，自己慢慢修复", score: "L" },
      { text: "找同门吐槽恢复血量", score: "C" },
    ],
  },
  // 维度 N/A：选题风格 7-12
  {
    id: 7,
    text: "你更喜欢哪种选题？",
    options: [
      { text: "没什么人做过的新问题", score: "N" },
      { text: "前人做过但还能推进的问题", score: "A" },
    ],
  },
  {
    id: 8,
    text: "看到一个冷门现象，你会？",
    options: [
      { text: "想给它起一个新概念", score: "N" },
      { text: "先查有没有前人定义过", score: "A" },
    ],
  },
  {
    id: 9,
    text: "开题时你更想强调？",
    options: [
      { text: "这个问题为什么新", score: "N" },
      { text: "这个问题如何接续已有研究", score: "A" },
    ],
  },
  {
    id: 10,
    text: "读文献时你最兴奋的是？",
    options: [
      { text: "发现一个没人填的坑", score: "N" },
      { text: "看清一个领域的演化脉络", score: "A" },
    ],
  },
  {
    id: 11,
    text: "被问'创新点在哪'时，你会？",
    options: [
      { text: "激动描述未来可能性", score: "N" },
      { text: "严谨解释和前人的差异", score: "A" },
    ],
  },
  {
    id: 12,
    text: "你理想中的论文贡献是？",
    options: [
      { text: "开辟一个新方向", score: "N" },
      { text: "把一个老问题讲清楚", score: "A" },
    ],
  },
  // 维度 M/X：推进方式 13-18
  {
    id: 13,
    text: "遇到新问题，你通常先？",
    options: [
      { text: "画框架、列变量、想机制", score: "M" },
      { text: "先跑个 demo 或 pilot", score: "X" },
    ],
  },
  {
    id: 14,
    text: "方法不稳定时，你倾向于？",
    options: [
      { text: "回到理论逻辑重新推", score: "M" },
      { text: "改参数、换数据、继续试", score: "X" },
    ],
  },
  {
    id: 15,
    text: "开始实验或写代码前，你需要？",
    options: [
      { text: "一个相对完整的方案", score: "M" },
      { text: "一个能跑起来的最小版本", score: "X" },
    ],
  },
  {
    id: 16,
    text: "Reviewer 质疑你时，你更想补？",
    options: [
      { text: "理论解释和逻辑链", score: "M" },
      { text: "实验结果和对比图", score: "X" },
    ],
  },
  {
    id: 17,
    text: "哪种结果更让你安心？",
    options: [
      { text: "机制解释闭环", score: "M" },
      { text: "曲线明显变好", score: "X" },
    ],
  },
  {
    id: 18,
    text: "学一个新工具时，你会？",
    options: [
      { text: "先看文档和原理", score: "M" },
      { text: "直接复制 demo 改起来", score: "X" },
    ],
  },
  // 维度 O/B：时间管理方式 19-24
  {
    id: 19,
    text: "距离 deadline 还有一个月，你会？",
    options: [
      { text: "排时间表，拆任务", score: "O" },
      { text: "先让灵感自然发酵", score: "B" },
    ],
  },
  {
    id: 20,
    text: "写论文时，你更常？",
    options: [
      { text: "边做边整理材料", score: "O" },
      { text: "最后统一考古所有文件", score: "B" },
    ],
  },
  {
    id: 21,
    text: "你的文件命名更像？",
    options: [
      { text: "fig3_final_clean_v1", score: "O" },
      { text: "final_final_really_final2", score: "B" },
    ],
  },
  {
    id: 22,
    text: "周末科研安排通常是？",
    options: [
      { text: "有固定进度", score: "O" },
      { text: "看危机程度决定", score: "B" },
    ],
  },
  {
    id: 23,
    text: "数据和图表你会？",
    options: [
      { text: "边跑边归档", score: "O" },
      { text: "投稿前疯狂抢救", score: "B" },
    ],
  },
  {
    id: 24,
    text: "合作任务快到期时，你会？",
    options: [
      { text: "提前提醒大家", score: "O" },
      { text: "最后一天爆发神迹", score: "B" },
    ],
  },
  // 彩蛋题 25
  {
    id: 25,
    text: "你最近的科研精神状态最接近？",
    special: true,
    options: [
      { text: "我觉得还能再改一点", score: "A" },
      { text: "先交了再说", score: "B" },
      { text: "我想开个新坑", score: "C" },
      { text: "谁来救救我的代码 / 实验", score: "D" },
    ],
  },
];

export const easterEggLabels: Record<string, string> = {
  A: "永恒修改鬼",
  B: "投稿冲锋兵",
  C: "开坑异能者",
  D: "Debug 受害者",
};