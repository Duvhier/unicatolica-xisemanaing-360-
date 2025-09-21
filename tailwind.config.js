/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uniblue: "#002D72",
        uniblueLight: "#0056A6",
        unigold: "#F4B400",
        unigray: "#666666",
      },
    },
  },
  plugins: [],
}
