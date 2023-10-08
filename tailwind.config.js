/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        creepster: ["Creepster", "cursive"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
