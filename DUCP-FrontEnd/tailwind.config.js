/** @type {import('tailwindcss').Config} */
export default {
  content: [ './index.html',
  './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0B316A', 
        'yellow': '#EEC351',
        'dark-yellow':'#b78a12'
      },
      fontFamily: {
        'sedan': ['"Sedan SC"', 'serif'], // Add this under extend
      }
    },
  },
  plugins: [],
}

