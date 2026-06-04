export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.jsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9ebff',
          500: '#1d67d2',
          600: '#1756b6',
          700: '#123f8a',
          900: '#0b2454',
        },
        medal: {
          gold: '#d89b21',
          silver: '#9aa4b2',
          bronze: '#b36b2c',
        },
      },
      boxShadow: {
        soft: '0 14px 40px rgba(15, 35, 70, 0.08)',
      },
      fontFamily: {
        sans: ['Aptos', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
