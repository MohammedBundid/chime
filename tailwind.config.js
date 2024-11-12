/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,js,tsx,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'text': '#eff4f4',
        'background': '#040807',
        'primary': '#99cece',
        'secondary': '#317b7b',
        'accent': '#4ac3c3',
       },
       
    },
  },
  plugins: [],
}

