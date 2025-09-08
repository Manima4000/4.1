/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        romantic: ["Dancing Script", "cursive"],
      },
      colors: {
        love: {
          light: "#ffe4e6",
          DEFAULT: "#ec4899",
          dark: "#be185d",
        },
      },
    },
  },
  plugins: [],
};