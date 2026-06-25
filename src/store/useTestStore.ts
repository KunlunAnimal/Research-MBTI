import { create } from "zustand";
import { questions, easterEggLabels } from "../data/questions";
import { personas } from "../data/personas";
import { getProjectedResearchType, getMatchCount, matchLevels, getDimDiffText, mbtiTags } from "../data/mbti";

interface TestState {
  // 当前页面
  currentStep: "home" | "test" | "mbti-input" | "result";
  // 测试进度
  currentQuestion: number;
  answers: Record<number, string>;
  // 计算结果
  researchType: string;
  easterEgg: string;
  realMBTI: string;
  matchCount: number;
  matchLevel: string;
  dimDiffs: string[];

  // 动作
  setStep: (step: TestState["currentStep"]) => void;
  goToNextQuestion: () => void;
  goToPrevQuestion: () => void;
  setAnswer: (questionId: number, optionScore: string) => void;
  setRealMBTI: (mbti: string) => void;
  calculateResult: () => void;
  reset: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

const STORAGE_KEY = "research_mbti_state";

export const useTestStore = create<TestState>((set, get) => ({
  currentStep: "home",
  currentQuestion: 0,
  answers: {},
  researchType: "",
  easterEgg: "",
  realMBTI: "",
  matchCount: 0,
  matchLevel: "",
  dimDiffs: [],

  setStep: (step) => set({ currentStep: step }),

  goToNextQuestion: () => {
    const { currentQuestion, answers } = get();
    const totalQuestions = questions.length;
    if (currentQuestion < totalQuestions - 1) {
      set({ currentQuestion: currentQuestion + 1 });
    } else {
      // 完成所有题目，计算结果
      get().calculateResult();
      set({ currentStep: "mbti-input" });
    }
    get().saveToStorage();
  },

  goToPrevQuestion: () => {
    const { currentQuestion } = get();
    if (currentQuestion > 0) {
      set({ currentQuestion: currentQuestion - 1 });
      get().saveToStorage();
    }
  },

  setAnswer: (questionId, optionScore) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionScore },
    }));
  },

  setRealMBTI: (mbti) => {
    set({ realMBTI: mbti });
  },

  calculateResult: () => {
    const { answers } = get();
    const scores: Record<string, number> = {
      L: 0,
      C: 0,
      N: 0,
      A: 0,
      M: 0,
      X: 0,
      O: 0,
      B: 0,
    };

    // 计算 1-24 题得分
    for (let i = 1; i <= 24; i++) {
      const answer = answers[i];
      if (answer && scores[answer] !== undefined) {
        scores[answer]++;
      }
    }

    // 彩蛋题
    const easterEggAnswer = answers[25];
    const easterEgg = easterEggAnswer ? easterEggLabels[easterEggAnswer] || "" : "";

    const dim1 = scores.L >= scores.C ? "L" : "C";
    const dim2 = scores.N >= scores.A ? "N" : "A";
    const dim3 = scores.M >= scores.X ? "M" : "X";
    const dim4 = scores.O >= scores.B ? "O" : "B";
    const researchType = dim1 + dim2 + dim3 + dim4;

    set({ researchType, easterEgg });
  },

  reset: () => {
    set({
      currentStep: "home",
      currentQuestion: 0,
      answers: {},
      researchType: "",
      easterEgg: "",
      realMBTI: "",
      matchCount: 0,
      matchLevel: "",
      dimDiffs: [],
    });
    localStorage.removeItem(STORAGE_KEY);
  },

  saveToStorage: () => {
    const { currentStep, currentQuestion, answers, researchType, easterEgg, realMBTI, matchCount, matchLevel, dimDiffs } =
      get();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentStep,
        currentQuestion,
        answers,
        researchType,
        easterEgg,
        realMBTI,
        matchCount,
        matchLevel,
        dimDiffs,
      })
    );
  },

  loadFromStorage: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        set(data);
      }
    } catch {
      // ignore
    }
  },
}));