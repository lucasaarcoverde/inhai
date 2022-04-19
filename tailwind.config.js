module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        128: '32rem',
      },
      height: {
        148: '46rem',
      },
      boxShadow: {
        medium:
          '0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
    },
    function ({ addVariant }) {
      addVariant('last-child', '& > :last-child')
    },
    require('@tailwindcss/typography'),
  ],
}
