import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Dela Gothic One", "cursive"],
        secondary: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
