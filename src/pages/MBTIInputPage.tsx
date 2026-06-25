import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTestStore } from "../store/useTestStore";
import { getProjectedResearchType, getMatchCount, matchLevels, getDimDiffText, mbtiTags } from "../data/mbti";
import { ArrowRight, SkipForward } from "lucide-react";

const mbtiOptions = [
  { label: "I", dim: "I" },
  { label: "E", dim: "E" },
  { label: "N", dim: "N" },
  { label: "S", dim: "S" },
  { label: "T", dim: "T" },
  { label: "F", dim: "F" },
  { label: "J", dim: "J" },
  { label: "P", dim: "P" },
];

const allMBTIs = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

export default function MBTIInputPage() {
  const navigate = useNavigate();
  const researchType = useTestStore((s) => s.researchType);
  const setRealMBTI = useTestStore((s) => s.setRealMBTI);
  const saveToStorage = useTestStore((s) => s.saveToStorage);
  const setStep = useTestStore((s) => s.setStep);

  const [selectedDims, setSelectedDims] = useState<Record<string, string>>({});
  const [showFullList, setShowFullList] = useState(false);

  const currentMBTI =
    (selectedDims["EI"] || "") +
    (selectedDims["NS"] || "") +
    (selectedDims["TF"] || "") +
    (selectedDims["JP"] || "");

  const isComplete = currentMBTI.length === 4;

  useEffect(() => {
    if (!researchType) {
      navigate("/test");
    }
  }, [researchType, navigate]);

  const handleDimSelect = (group: string, dim: string) => {
    setSelectedDims((prev) => ({ ...prev, [group]: dim }));
  };

  const handleFullSelect = (mbti: string) => {
    setSelectedDims({
      EI: mbti[0],
      NS: mbti[1],
      TF: mbti[2],
      JP: mbti[3],
    });
  };

  const handleConfirm = () => {
    if (!isComplete) return;
    setRealMBTI(currentMBTI);
    setStep("result");
    const projected = getProjectedResearchType(currentMBTI);
    const matchCount = getMatchCount(researchType, projected);
    const matchLevel = matchLevels[matchCount];
    const dimDiffs = getDimDiffText(currentMBTI, researchType);
    useTestStore.setState({ matchCount, matchLevel, dimDiffs });
    saveToStorage();
    navigate("/result");
  };

  const handleSkip = () => {
    setRealMBTI("");
    setStep("result");
    useTestStore.setState({ matchCount: 0, matchLevel: "", dimDiffs: [] });
    saveToStorage();
    navigate("/result");
  };

  const dimGroups = [
    { key: "EI", label: "能量来源", options: ["I", "E"] },
    { key: "NS", label: "信息获取", options: ["N", "S"] },
    { key: "TF", label: "决策方式", options: ["T", "F"] },
    { key: "JP", label: "生活方式", options: ["J", "P"] },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 relative">
      <div className="fixed inset-0 bg-dark-bg -z-10" />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-neon-purple/3 blur-[120px] -z-10" />

      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold font-mono text-white mb-3">
            你愿意输入真实 MBTI 吗？
          </h2>
          <p className="text-sm text-white/40">
            看看生活人格和科研人格打起来了吗
          </p>
        </motion.div>

        {/* 维度选择 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          {dimGroups.map((group) => (
            <div key={group.key} className="glass-card p-4">
              <div className="text-xs text-white/40 mb-3 font-mono">
                {group.label}
              </div>
              <div className="flex gap-2">
                {group.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleDimSelect(group.key, opt)}
                    className={`flex-1 py-3 rounded-lg font-mono font-bold text-lg transition-all
                      ${selectedDims[group.key] === opt
                        ? "bg-neon-green text-black shadow-[0_0_20px_rgba(0,255,136,0.2)]"
                        : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* 当前 MBTI 预览 */}
        {currentMBTI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            <span className="text-sm text-white/40">你的真实 MBTI：</span>
            <span className="ml-2 text-2xl font-black font-mono neon-text-purple">
              {currentMBTI}
            </span>
            {mbtiTags[currentMBTI] && (
              <span className="ml-2 text-sm text-white/40">
                {mbtiTags[currentMBTI]}
              </span>
            )}
          </motion.div>
        )}

        {/* 确认按钮 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0.4 }}
          onClick={handleConfirm}
          disabled={!isComplete}
          className={`w-full py-4 rounded-xl font-bold text-lg font-mono transition-all mb-4
            ${isComplete
              ? "bg-neon-green text-black hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:scale-105"
              : "bg-white/5 text-white/30 cursor-not-allowed"}`}
        >
          <span className="inline-flex items-center gap-2">
            生成完整报告
            <ArrowRight size={18} />
          </span>
        </motion.button>

        {/* 直达 16 型 */}
        <div className="mb-4">
          <button
            onClick={() => setShowFullList(!showFullList)}
            className="text-xs text-white/30 hover:text-white/50 transition-colors font-mono"
          >
            {showFullList ? "收起" : "或直接选择你的 MBTI 类型"}
          </button>
          {showFullList && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="grid grid-cols-4 gap-2 mt-3"
            >
              {allMBTIs.map((mbti) => (
                <button
                  key={mbti}
                  onClick={() => handleFullSelect(mbti)}
                  className={`py-2 px-1 rounded-lg text-xs font-mono transition-all
                    ${currentMBTI === mbti
                      ? "bg-neon-purple/30 text-neon-purple border border-neon-purple/50"
                      : "bg-white/5 text-white/40 hover:bg-white/10"}`}
                >
                  {mbti}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* 跳过 */}
        <button
          onClick={handleSkip}
          className="w-full py-3 text-sm text-white/25 hover:text-white/40 transition-colors font-mono inline-flex items-center justify-center gap-2"
        >
          <SkipForward size={16} />
          我不知道 / 跳过 → 仅生成科研 MBTI 结果
        </button>
      </div>
    </div>
  );
}