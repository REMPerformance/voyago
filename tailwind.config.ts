import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./config/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Témovateľné (menia sa medzi svetlým a tmavým režimom)
        paper: "rgb(var(--paper) / <alpha-value>)",
        "paper-dim": "rgb(var(--paper-dim) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        "line-soft": "rgb(var(--line-soft) / <alpha-value>)",
        // Fixné (nemenné v oboch režimoch)
        cream: "#EFF1F0", // svetlý text/plochy na tmavých pásoch
        navy: { DEFAULT: "#0A1622", soft: "#13283C" },
        teal: { DEFAULT: "#1C5BC0", dark: "#16489B", light: "#3D7AD6" },
        brass: { DEFAULT: "#A8772E", light: "#C99A4E", dark: "#86601F" },
        terra: { DEFAULT: "#B23A2E", light: "#CB5446" },
        green: { DEFAULT: "#13624A", soft: "#1C7D5E", light: "#3FA17E" },
      },
      fontFamily: {
        display: ['"Newsreader"', "ui-serif", "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: { xl2: "1.1rem" },
      boxShadow: {
        card: "0 1px 2px rgba(8,18,30,0.05), 0 12px 32px -22px rgba(8,18,30,0.35)",
        lift: "0 18px 50px -26px rgba(8,18,30,0.45)",
        pass: "0 30px 70px -34px rgba(8,18,30,0.6)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(14px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "stamp-in": { "0%": { opacity: "0", transform: "rotate(-22deg) scale(1.5)" }, "60%": { opacity: "1" }, "100%": { opacity: "1", transform: "rotate(-8deg) scale(1)" } },
        "slide-down": { "0%": { opacity: "0", transform: "translateY(-8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "stamp-in": "stamp-in 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "slide-down": "slide-down 0.35s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
