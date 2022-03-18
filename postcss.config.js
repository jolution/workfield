// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    //require('tailwindcss')('tailwind.js'),
    require('tailwindcss'),
    //require('autoprefixer'),
  ]
}