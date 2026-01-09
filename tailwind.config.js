/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vapor: {
          dark: '#171a21',
          darker: '#1b2838',
          blue: '#1b8edb',
          lightblue: '#66c0f4',
        }
      }
    },
  },
  plugins: [],
}
