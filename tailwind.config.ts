import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        phone: {
          bg: "#1c1c1e",
          dock: "rgba(255,255,255,0.15)",
        },
      },
      fontFamily: {
        rounded: ["var(--font-rounded)", "system-ui", "sans-serif"],
        dynapuff: ["var(--font-dynapuff)", "var(--font-rounded)", "system-ui", "sans-serif"],
        maruko: ["Maruko", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "sans-serif"],
        qiantuxiaotuti: ["QianTuXiaoTuTi", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "sans-serif"],
        zcoolZh: ["var(--font-zh-zcool)", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
