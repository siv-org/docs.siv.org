/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{md,ts}x',
    './theme.config.tsx',
    './components/**/*.tsx'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
