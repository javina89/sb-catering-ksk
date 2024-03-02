/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './public/**/*.{html,js}',],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

