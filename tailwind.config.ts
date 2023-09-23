import type { Config } from "tailwindcss";
import {
  accentColor,
  bgColor,
  primaryColor,
  secondaryColor,
  textColor,
} from "./theme/themeConfig";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    theme: {},
    extend: {
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: bgColor,
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        text: textColor,
      },
    },
  },
  plugins: [],
};
export default config;
