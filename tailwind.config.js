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
      },
      keyframes: {
        'safari-bounce': {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
            'animation-delay': '0.1s'
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
            'animation-delay': '0.1s'
          },
        },
      },
      animation: {
        'safari-bounce': 'safari-bounce 1s infinite',
      },
    },
  },
  plugins: [],
}

