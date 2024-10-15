// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'black',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        heading: ['Roboto', 'sans-serif'],
        body: ['Lora', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin'),
    require('preline/plugin'),
    require('@tailwindcss/typography'), // Add the Typography plugin here
  ],
};
