/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#8D519E',
        'purple-secondary': '#6366F1',
      },
      animation: {
        'scroll-logos': 'scroll-logos 40s linear infinite',
      },
      keyframes: {
        'scroll-logos': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
