/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#8D519E',
        'purple-secondary': '#6366F1',
      },
    },
  },
  plugins: [],
};
