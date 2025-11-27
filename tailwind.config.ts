import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2f5ffc",
          dark: "#2042b0",
          light: "#587ffc",
        },
        secondary: {
          DEFAULT: "#fccc2f",
          dark: "#b08e20",
          light: "#fcd658",
        },
      },
    },
  },
  plugins: [],
};

export default config;
