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
          50: '#eef4ff',
          100: '#dbe6ff',
          500: '#3657b3',
          600: '#2b4899',
          700: '#213975',
          900: '#13224d',
        },
        accent: {
          50: '#fff3ed',
          100: '#ffe0d3',
          500: '#e37e2d',
          600: '#c8671f',
          700: '#a8511a',
        },
        medal: {
          gold: '#d89b21',
          silver: '#9aa4b2',
          bronze: '#b36b2c',
        },
      },
      boxShadow: {
        soft: '0 14px 40px rgba(19, 34, 77, 0.10)',
        lift: '0 20px 60px rgba(54, 87, 179, 0.16)',
      },
      fontFamily: {
        sans: ['Netflix Sans', 'Aptos', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
