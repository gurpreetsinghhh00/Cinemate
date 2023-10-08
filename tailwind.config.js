/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        rotationRight: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(180deg)" },
        },
        rotationLeft: {
          from: { transform: "rotate(180deg)" },
          to: { transform: "rotate(0deg)" },
        },
      },

      animation: {
        "rotate-right": "rotationRight 0.2s linear",
        "rotate-left": "rotationLeft 0.2s linear",
      },

      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        creepster: ["Creepster", "cursive"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
