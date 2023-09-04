import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          50: "#FDF8E1",
          100: "#FCEFB4",
          200: "#FAE588",
          300: "#F9DC5C",
        },
        secondary: {
          400: "#FECF3E",
          500: "#FDB833",
        },
        accent: {
          500: "#003566",
        },
      },
    },
  },
  plugins: [],
};
export default config;
