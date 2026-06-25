import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTestStore } from "../store/useTestStore";
import ParticleBackground from "../components/ParticleBackground";
import { FlaskConical, Microscope, FileText, Coffee } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const setStep = useTestStore((s) => s.setStep);
  const loadFromStorage = useTestStore((s) => s.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleStart = () => {
    setStep("test");
    navigate("/test");
  };

  const floatingIcons = [
    { Icon: FlaskConical, className: "top-[15%] left-[10%] animate-float", size: 28 },
    { Icon: Microscope, className: "top-[25%] right-[12%] animate-float-delayed", size: 32 },
    { Icon: FileText, className: "bottom-[25%] left-[15%] animate-float-slow", size: 26 },
    { Icon: Coffee, className: "bottom-[20%] right-[10%] animate-float-delayed", size: 24 },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <ParticleBackground />

      {/* 浮动图标 */}
      {floatingIcons.map(({ Icon, className, size }, i) => (
        <div
          key={i}
          className={`absolute text-white/5 ${className}`}
        >
          <Icon size={size} />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* 顶部标签 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/50 font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse-soft" />
          娱乐向科研人格测试
        </motion.div>

        {/* 标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-black font-mono tracking-tight mb-4"
        >
          <span className="neon-text">测测你的</span>
          <br />
          <span className="neon-text-purple">科研 MBTI</span>
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-white/50 mb-10 leading-relaxed"
        >
          看看你的论文灵魂是
          <span className="text-white/70">月球基地总设计师</span>
          ，还是
          <span className="text-white/70">群聊爆改火箭队长</span>
        </motion.p>

        {/* CTA 按钮 */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={handleStart}
          className="group relative px-10 py-4 rounded-xl bg-neon-green text-black font-bold text-lg font-mono
            hover:shadow-[0_0_40px_rgba(0,255,136,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">开始测试</span>
          <div className="absolute inset-0 rounded-xl bg-neon-green/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
        </motion.button>

        {/* 题目数提示 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-4 text-xs text-white/30 font-mono"
        >
          约 25 题 · 约 3 分钟 · 完全免费
        </motion.p>

        {/* 免责声明 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 text-xs text-white/20 leading-relaxed max-w-sm"
        >
          本测试仅用于科研娱乐与自我调侃，不构成心理学诊断，
          也不建议作为导师选择、转博决策、退学申请依据。
        </motion.p>
      </div>
    </div>
  );
}