/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        accent: '#FF4D6D',
        secondary: '#60A5FA',
        background: {
          DEFAULT: '#0F1724',
          light: '#1F2937'
        }
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom, #0F1724, #1F2937)'
      }
    },
  },
  plugins: [],
});
