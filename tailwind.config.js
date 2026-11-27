/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f4',
          100: '#e0ece4',
          200: '#c2d9cb',
          300: '#97bda6',
          400: '#6a9d7f',
          500: '#488163',
          600: '#35674d',
          700: '#2b523f',
          800: '#244234',
          900: '#1d352b',
          950: '#0f1e17',
        },
        gold: {
          50: '#fdfaf0',
          100: '#faf3da',
          200: '#f4e5b5',
          300: '#ecd084',
          400: '#e3b854',
          500: '#d9a234',
          600: '#c08127',
          700: '#9d5f23',
          800: '#824c23',
          900: '#6e3f22',
          950: '#3f1f0f',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
