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
      gradients: {
        'gradient-top': 'linear-gradient(0deg, var(--tiffany-blue), var(--citrine), var(--antiflash-white), var(--taupe-gray), var(--space-cadet))',
        'gradient-right': 'linear-gradient(90deg, var(--tiffany-blue), var(--citrine), var(--antiflash-white), var(--taupe-gray), var(--space-cadet))',
        'gradient-bottom': 'linear-gradient(180deg, var(--tiffany-blue), var(--citrine), var(--antiflash-white), var(--taupe-gray), var(--space-cadet))',
      },
    },
  },
  plugins: [],
}
