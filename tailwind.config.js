/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#129575",
        secondary: "#ff9c00",
        rating: "#fead30"

      }
    },
  },
  plugins: [],
}