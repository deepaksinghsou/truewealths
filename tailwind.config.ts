import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f7fbff",
          100: "#eef6ff",
          500: "#3a6ea5",
          700: "#2d527d"
        }
      }
    }
  },
  plugins: []
};

export default config;
