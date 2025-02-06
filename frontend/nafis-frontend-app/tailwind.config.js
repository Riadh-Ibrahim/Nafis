/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'tiffany-blue': '#77C5CDff',
        'citrine': '#C5C020ff',
        'antiflash-white': '#F2F3F5ff',
        'taupe-gray': '#7E7E8Dff',
        'space-cadet': '#2D2C5Fff',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(250px, 1fr))',
      }
    },
  },
  plugins: [],
}
