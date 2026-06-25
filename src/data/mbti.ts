export const dimMap: Record<string, string> = {
  I: "L",
  E: "C",
  N: "N",
  S: "A",
  T: "M",
  F: "X",
  J: "O",
  P: "B",
};

export const mbtiTags: Record<string, string> = {
  INTJ: "战略黑箱",
  INTP: "概念洞穴人",
  ENTJ: "项目总控王",
  ENTP: "开题永动机",
  INFJ: "意义炼金师",
  INFP: "灵魂开坑人",
  ENFJ: "组会牧师",
  ENFP: "灵感烟花筒",
  ISTJ: "表格守门员",
  ISFJ: "后勤菩萨",
  ESTJ: "进度巡检官",
  ESFJ: "协作润滑剂",
  ISTP: "工具拆解侠",
  ISFP: "审美实验员",
  ESTP: "现场救火队",
  ESFP: "氛围数据员",
};

export const matchLevels: Record<number, string> = {
  4: "灵魂同构型",
  3: "主线一致型",
  2: "双系统运行型",
  1: "反差萌科研人",
  0: "科研人格被邪神接管型",
};

export function getProjectedResearchType(mbti: string): string {
  if (mbti.length !== 4) return "";
  return mbti
    .split("")
    .map((c) => dimMap[c] || "")
    .join("");
}

export function getMatchCount(researchType: string, projectedType: string): number {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if (researchType[i] === projectedType[i]) count++;
  }
  return count;
}

// 维度差异文案
const dimDiffTexts: Record<string, string> = {
  // I/E vs L/C
  "I→C": "生活里你是内向人，科研里你被迫开麦。组会是你的临时外向药。",
  "E→L": "生活里你很外向，但科研时你选择闭关。说明你的社交电池不想献给论文。",
  "I→L": "你的生活和科研都需要独处充电，别打扰你，你正在和宇宙变量对话。",
  "E→C": "你是真正的讨论型科研人，越聊越清醒，越开会越来电。",
  // N/S vs N/A
  "N→A": "生活里你爱想象，科研里却变成考古学家。你把浪漫藏起来，把引用格式摆上台面。",
  "S→N": "生活里你务实，科研里突然发疯开坑。可能是论文把你的隐藏脑洞逼出来了。",
  "N→N": "你的人生和科研都离不开脑洞，唯一的问题是：坑太多，命太短。",
  "S→A": "你是稳定推进型选手，别人负责上天，你负责确认梯子是否合规。",
  // T/F vs M/X
  "T→X": "生活里你讲逻辑，科研里却开始炼丹。说明实验结果已经把你教育得很彻底。",
  "F→M": "生活里你重视感受，科研里你冷静搭模型。你把温柔留给人类，把严谨留给论文。",
  "T→M": "你是逻辑闭环爱好者，没有机制解释的结果在你眼里都像玄学。",
  "F→X": "你相信反馈、现象和真实反应。先让结果说话，再让理论补票。",
  // J/P vs O/B
  "J→B": "生活中你想规划，科研中你被 deadline 夺舍。不是你不自律，是论文太会拖。",
  "P→O": "生活里你随缘，科研里却开始建表。说明你不是不会规划，你只是需要足够恐惧。",
  "J→O": "你是时间线守护者，连 figure 命名都透露着秩序之光。",
  "P→B": "你和 deadline 是宿命伴侣。不到最后一刻，你的科研人格不会完全加载。",
};

export function getDimDiffText(
  realMBTI: string,
  researchType: string
): string[] {
  const diffs: string[] = [];
  const realDims = realMBTI.split("");
  const dimPairs = [
    [0, "I/E"],
    [1, "N/S"],
    [2, "T/F"],
    [3, "J/P"],
  ];

  for (let i = 0; i < 4; i++) {
    const realDim = realDims[i];
    const projectedDim = dimMap[realDim];
    const researchDim = researchType[i];
    if (projectedDim !== researchDim) {
      const key = `${realDim}→${researchDim}`;
      if (dimDiffTexts[key]) {
        diffs.push(dimDiffTexts[key]);
      }
    }
  }
  return diffs;
}