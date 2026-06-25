/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        neon: {
          green: "#00ff88",
          purple: "#a855f7",
          blue: "#3b82f6",
        },
        dark: {
          bg: "#0a0a0f",
          card: "rgba(15, 15, 25, 0.6)",
          border: "rgba(255, 255, 255, 0.06)",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Noto Sans SC"', "monospace"],
        body: ['"Noto Sans SC"', '"JetBrains Mono"', "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out 2s infinite",
        "float-slow": "float 10s ease-in-out 4s infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 255, 136, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 255, 136, 0.6)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
