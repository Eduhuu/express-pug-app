/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/public/view/**/*.pug"],
  theme: {
    extend: {},
  },
  plugins: [
    {
    tailwindcss: {},
    autoprefixer: {},
    },
    ],
}
