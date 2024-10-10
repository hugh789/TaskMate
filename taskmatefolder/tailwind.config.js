// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
  ],
}
