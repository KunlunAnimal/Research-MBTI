import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTestStore } from "../store/useTestStore";
import { questions } from "../data/questions";
import { ChevronLeft } from "lucide-react";

export default function TestPage() {
  const navigate = useNavigate();
  const currentQuestion = useTestStore((s) => s.currentQuestion);
  const answers = useTestStore((s) => s.answers);
  const setAnswer = useTestStore((s) => s.setAnswer);
  const goToNextQuestion = useTestStore((s) => s.goToNextQuestion);
  const goToPrevQuestion = useTestStore((s) => s.goToPrevQuestion);
  const currentStep = useTestStore((s) => s.currentStep);

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const selectedAnswer = answers[question?.id];

  // 如果不在测试状态，跳转
  useEffect(() => {
    if (currentStep !== "test") {
      // 允许从结果页回退
    }
  }, [currentStep]);

  const handleSelect = useCallback(
    (score: string) => {
      if (selectedAnswer) return; // 已选则不允许再改
      setAnswer(question.id, score);
      // 延迟一小段时间后自动跳转
      setTimeout(() => {
        goToNextQuestion();
      }, 300);
    },
    [question, selectedAnswer, setAnswer, goToNextQuestion]
  );

  // 完成后跳转
  useEffect(() => {
    if (currentStep === "mbti-input") {
      navigate("/mbti-input");
    }
  }, [currentStep, navigate]);

  if (!question) return null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 relative">
      {/* 背景微光 */}
      <div className="fixed inset-0 bg-dark-bg -z-10" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-green/3 blur-[120px] -z-10" />

      {/* 顶部导航 */}
      <div className="w-full max-w-lg flex items-center gap-4 mb-8">
        <button
          onClick={() => {
            if (currentQuestion === 0) {
              navigate("/");
            } else {
              goToPrevQuestion();
            }
          }}
          className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronLeft size={18} />
          <span className="text-sm font-mono">
            {currentQuestion === 0 ? "返回" : "上一题"}
          </span>
        </button>

        <div className="flex-1">
          <div className="progress-bar h-1.5">
            <div
              className="progress-bar-fill h-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="text-sm text-white/40 font-mono tabular-nums min-w-[60px] text-right">
          {currentQuestion + 1} / {totalQuestions}
        </span>
      </div>

      {/* 题目卡片 */}
      <div className="w-full max-w-lg flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1"
          >
            {/* 题目文字 */}
            <div className="glass-card p-6 mb-6">
              {question.special && (
                <span className="inline-block mb-2 px-2 py-0.5 rounded text-xs font-mono bg-neon-purple/20 text-neon-purple">
                  彩蛋题
                </span>
              )}
              <h2 className="text-xl font-bold text-white leading-relaxed">
                {question.text}
              </h2>
            </div>

            {/* 选项按钮 */}
            <div className="flex flex-col gap-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedAnswer === opt.score;
                const letter = question.special
                  ? ["A", "B", "C", "D"][idx]
                  : ["A", "B"][idx];
                return (
                  <motion.button
                    key={opt.score}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    onClick={() => handleSelect(opt.score)}
                    disabled={!!selectedAnswer}
                    className={`option-btn w-full text-left p-4 rounded-xl font-body
                      ${isSelected ? "selected" : "glass-card"}
                      ${selectedAnswer && !isSelected ? "opacity-40" : ""}
                      ${question.special ? "text-base" : "text-base"}`}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold
                          ${isSelected
                            ? "bg-neon-green text-black"
                            : "bg-white/5 text-white/50"}`}
                      >
                        {letter}
                      </span>
                      <span className="text-white/90">{opt.text}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* 已选提示 */}
            {selectedAnswer && currentQuestion < totalQuestions - 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-xs text-white/30"
              >
                正在跳转下一题...
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}