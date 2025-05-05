/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Noto Sans TC", "sans-serif"], // Replace 'Roboto' with your font name
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
