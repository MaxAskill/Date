import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#fff5f7",
          100: "#ffe4ea",
          200: "#ffc9d4",
          300: "#ff9eb1",
          400: "#ff6f8f",
          500: "#f43f6d",
          600: "#d92555",
          700: "#b31b45",
          800: "#971a40",
          900: "#801a3d",
        },
        cream: {
          50: "#fdfaf6",
          100: "#f9f1e7",
          200: "#f1e3cf",
        },
        lavender: {
          50: "#f7f4ff",
          100: "#ede7ff",
          200: "#d8c9ff",
          300: "#bba3ff",
          400: "#9c7bff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(244, 63, 109, 0.18)",
        card: "0 20px 50px -20px rgba(155, 123, 255, 0.25)",
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
          "radial-gradient(ellipse at top, #ffe4ea 0%, #fff5f7 35%, #f7f4ff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
