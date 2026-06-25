import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { useTestStore } from "../store/useTestStore";
import { personas } from "../data/personas";
import { getProjectedResearchType, mbtiTags, matchLevels } from "../data/mbti";
import {
  Zap,
  AlertTriangle,
  Lightbulb,
  RotateCcw,
  Copy,
  Image,
  Share2,
} from "lucide-react";

export default function ResultPage() {
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);
  const researchType = useTestStore((s) => s.researchType);
  const easterEgg = useTestStore((s) => s.easterEgg);
  const realMBTI = useTestStore((s) => s.realMBTI);
  const matchCount = useTestStore((s) => s.matchCount);
  const matchLevel = useTestStore((s) => s.matchLevel);
  const dimDiffs = useTestStore((s) => s.dimDiffs);
  const reset = useTestStore((s) => s.reset);

  const persona = personas[researchType];
  const projectedType = realMBTI ? getProjectedResearchType(realMBTI) : "";
  const mbtiTag = realMBTI ? mbtiTags[realMBTI] || "" : "";

  useEffect(() => {
    if (!researchType) {
      navigate("/test");
    }
  }, [researchType, navigate]);

  const handleCopy = useCallback(async () => {
    if (!persona) return;
    const lines = [
      `🔬 我的科研 MBTI 是：${researchType} ${persona.name}`,
      `"${persona.subtitle}"`,
      ``,
      `💡 科研超能力：`,
      ...persona.superpowers.map((s) => `  • ${s}`),
      ``,
      `⚠️ 科研副作用：`,
      ...persona.risks.map((r) => `  • ${r}`),
      ``,
      realMBTI
        ? `🧬 真实 MBTI：${realMBTI} ${mbtiTag} | 一致度：${matchCount}/4 ${matchLevel}`
        : "",
      easterEgg ? `🎯 标签：${easterEgg}` : "",
      ``,
      `来测测你的科研 MBTI 👉`,
    ].filter(Boolean).join("\n");

    await navigator.clipboard.writeText(lines);
    alert("结果已复制到剪贴板！");
  }, [persona, researchType, realMBTI, matchCount, matchLevel, mbtiTag, easterEgg]);

  const handlePoster = useCallback(async () => {
    if (!resultRef.current) return;
    try {
      const dataUrl = await toPng(resultRef.current, {
        backgroundColor: "#0a0a0f",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `科研MBTI_${researchType}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      alert("生成海报失败，请重试");
    }
  }, [researchType]);

  const handleRetake = () => {
    reset();
    navigate("/");
  };

  if (!persona) return null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 relative">
      <div className="fixed inset-0 bg-dark-bg -z-10" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-green/3 blur-[120px] -z-10" />

      <div ref={resultRef} className="relative z-10 w-full max-w-lg">
        {/* 人格标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-white/40 font-mono mb-2">你的科研 MBTI 是</p>
          <h1 className="text-5xl md:text-6xl font-black font-mono neon-text mb-3 tracking-wider">
            {researchType}
          </h1>
          <h2 className="text-2xl font-bold text-white mb-1">{persona.name}</h2>
          <p className="text-sm text-white/50 italic">"{persona.subtitle}"</p>
          {easterEgg && (
            <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-mono bg-neon-purple/20 text-neon-purple">
              🎯 {easterEgg}
            </span>
          )}
        </motion.div>

        {/* 核心描述 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-4"
        >
          <p className="text-white/80 leading-relaxed text-sm">{persona.description}</p>
        </motion.div>

        {/* 科研超能力 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5 mb-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap size={18} className="text-neon-green" />
            <h3 className="text-sm font-bold text-white font-mono">科研超能力</h3>
          </div>
          <ul className="space-y-2">
            {persona.superpowers.map((sp, i) => (
              <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-neon-green mt-0.5 flex-shrink-0">▸</span>
                {sp}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 科研副作用 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5 mb-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-yellow-400" />
            <h3 className="text-sm font-bold text-white font-mono">科研副作用</h3>
          </div>
          <ul className="space-y-2">
            {persona.risks.map((r, i) => (
              <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">▸</span>
                {r}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 生存建议 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5 mb-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-neon-blue" />
            <h3 className="text-sm font-bold text-white font-mono">生存建议</h3>
          </div>
          <ul className="space-y-2">
            {persona.advice.map((a, i) => (
              <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-neon-blue mt-0.5 flex-shrink-0">▸</span>
                {a}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 真实 MBTI 对比 */}
        {realMBTI && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-5 mb-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Share2 size={18} className="text-neon-purple" />
              <h3 className="text-sm font-bold text-white font-mono">生活人格 vs 科研人格</h3>
            </div>

            {/* 对比 */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-xs text-white/40 mb-1">真实 MBTI</p>
                <p className="text-xl font-black font-mono text-white">{realMBTI}</p>
                <p className="text-xs text-white/40">{mbtiTag}</p>
              </div>
              <div className="text-white/20 text-2xl">→</div>
              <div className="text-center">
                <p className="text-xs text-white/40 mb-1">科研 MBTI</p>
                <p className="text-xl font-black font-mono neon-text">{researchType}</p>
                <p className="text-xs text-white/40">{persona.name}</p>
              </div>
            </div>

            {/* 一致度条 */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>一致度</span>
                <span>{matchLevel}</span>
              </div>
              <div className="progress-bar h-2">
                <div
                  className="progress-bar-fill h-full"
                  style={{ width: `${(matchCount / 4) * 100}%` }}
                />
              </div>
              <p className="text-center text-xs text-white/30 mt-1 font-mono">
                {matchCount} / 4 维度匹配
              </p>
            </div>

            {/* 维度差异 */}
            {dimDiffs.length > 0 && (
              <div className="space-y-2">
                {dimDiffs.map((diff, i) => (
                  <p
                    key={i}
                    className="text-sm text-white/60 leading-relaxed border-l-2 border-neon-purple/30 pl-3"
                  >
                    {diff}
                  </p>
                ))}
              </div>
            )}

            {/* 总结金句 */}
            {matchCount < 4 && (
              <p className="mt-4 text-xs text-white/30 italic text-center">
                {matchCount <= 1
                  ? `你把 ${realMBTI} 留给了生活，把科研人格交给了 deadline 和组会。`
                  : `你的人生和科研大体一致，但科研总有一些"意外"让事情变得有趣。`}
              </p>
            )}
          </motion.div>
        )}

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3 mb-8"
        >
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
              bg-white/5 text-white/70 hover:bg-white/10 transition-all font-mono text-sm"
          >
            <Copy size={16} />
            复制结果
          </button>

          <button
            onClick={handlePoster}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
              bg-white/5 text-white/70 hover:bg-white/10 transition-all font-mono text-sm"
          >
            <Image size={16} />
            生成我的科研人格海报
          </button>

          <button
            onClick={handleRetake}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
              border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20
              transition-all font-mono text-sm"
          >
            <RotateCcw size={16} />
            再测一次
          </button>
        </motion.div>

        <p className="text-center text-xs text-white/15 mb-8">
          仅供科研娱乐，不建议作为退学依据
        </p>
      </div>
    </div>
  );
}