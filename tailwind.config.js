/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        mutedWhite: 'rgba(255, 255, 255, 0.8)',
        darkBlack: "#141414",
        lightBlack: "#212121",
      },
      fontSize: {
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}
