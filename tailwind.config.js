/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        karla: ['Karla', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          bright: 'rgb(var(--primary-bright) / <alpha-value>)',
          brightest: 'rgb(var(--primary-brightest) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          bright: 'rgb(var(--secondary-bright) / <alpha-value>)',
          brightest: 'rgb(var(--secondary-brightest) / <alpha-value>)',
        },
      },
      screens: {
        min: '320px', // => @media (min-width: 320px) { ... }
        small: '450px', // => @media (min-width: 450px) { ... }
        med: '500px', // => @media (min-width: 500px) { ... }
        big: '900px', // => @media (min-width: 900px) { ... }
        bigger: '1200px', // => @media (min-width: 1200px) { ... }
        large: '2000px', // => @media (min-width: 2000px) { ... }
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
