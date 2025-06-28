/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,md,njk,js}"],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {},
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
