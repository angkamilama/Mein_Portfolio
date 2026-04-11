/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./app.js",
  ],
  safelist: [
    'grid',
    'grid-cols-2',
    'grid-cols-4',
    'gap-4',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}