/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "white": "#FFFFFF",
        "black" : "#000000",
        "primary": "#680F26",
        "secondary": "#FCE8CD"
      },
      fontFamily:{
        "atteron" : ['atteron', 'serif'],
        "poppins" : ['poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

