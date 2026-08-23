import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#fbf6ef",
          100: "#efe2d1",
          200: "#d8c2aa",
          300: "#bd947e",
          400: "#98645c",
          500: "#7a253f",
          600: "#681831",
          700: "#560d27",
          800: "#43081d",
          900: "#340014",
        },
        cream: {
          50: "#f8f1e8",
          100: "#ede1d0",
          200: "#d7c5af",
        },
        lavender: {
          50: "#f3f1ec",
          100: "#ded8cd",
          200: "#bcb2a3",
          300: "#9b8e7e",
          400: "#74665a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 14px 34px -18px rgba(52, 0, 20, 0.45)",
        card: "0 24px 70px -34px rgba(52, 0, 20, 0.42)",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "100%": { transform: "translateY(-120vh) scale(1.4)", opacity: "0" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.6)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        confettiFall: {
          "0%": { transform: "translateY(-20px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floatUp: "floatUp 12s linear infinite",
        sparkle: "sparkle 2.5s ease-in-out infinite",
        confettiFall: "confettiFall 3s ease-in forwards",
        fadeIn: "fadeIn 0.6s ease-out forwards",
      },
      backgroundImage: {
        "romantic-gradient":
          "radial-gradient(ellipse at top, #d8c2aa 0%, #f8f1e8 38%, #ded8cd 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
