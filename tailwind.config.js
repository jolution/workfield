// tailwind.config.js
module.exports = {
  //purge: [],
  purge: [
    './index.html', './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'bg-semi-75': 'rgba(0, 0, 0, 0.75)'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}