/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./main.js", "./Components/**/*.js"],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0a192f',
        'light-blue': '#112240',
        'highlight': '#64ffda',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'drop-in': 'dropIn 1s ease-out',
        'fly-left': 'flyLeft 1s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        dropIn: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '60%': { transform: 'translateY(20%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flyLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      height: {
        screen: '100vh',
      },
      minHeight: {
        screen: '100vh',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

