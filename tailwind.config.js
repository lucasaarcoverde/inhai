module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
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
