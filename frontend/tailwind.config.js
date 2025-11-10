import { colors } from "tailwindcss/colors";
import scrollbarPlugin from "tailwind-scrollbar";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: { min: "640px", max: "1370px" },
      lg: { min: "1370px" },
    },
    extend: {
      colors: {
        ...colors,
        mainColor: "#4338ca",
        mainColor2: "#0f766e",
        lightIndigo: "#6366f1",
        lightTeal: "#2dd4bf",
        SecondryTeal: "#14b8a6",
      },
      direction: {
        rtl: "rtl",
        ltr: "ltr",
      },
    },
  },
  plugins: [scrollbarPlugin({ nocompatible: true })],
};

export default config;
