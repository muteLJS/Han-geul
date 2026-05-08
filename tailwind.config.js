// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['var(--font-title)', 'serif'],
        body:  ['var(--font-body)',  'sans-serif'],
        hani:  ['var(--font-hani)',  'cursive'],
      },
      colors: {
        ink:   'var(--color-ink)',
        hanji: 'var(--color-hanji)',
      },
    },
  },
  plugins: [],
}
