/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "color-1": "#7e4b27", // Brown
        "color-2": "#98cba6", // Mint
        "color-3": "#f1ab23", // Yellow
        "color-4": "#e9861a", // Orange
        "color-5": "#f6e9ac", // Beige
      },
    },
  },
  plugins: [],
};
