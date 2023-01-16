const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './content/**/*.md'
  ],
  darkMode: 'class', // remove for 'media'
  theme: {
    colors: {
      transparent: 'transparent',
      gray: colors.slate
    },
    extend: {}
  }
}
