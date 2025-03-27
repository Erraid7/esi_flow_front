/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
       // Mode 1 colors
        "neutral-50": "#F6F6F6FF",
        "neutral-100": "#E7E7E7FF",
        "neutral-200": "#D1D1D1FF",
        "neutral-300": "#B0B0B0FF",
        "neutral-400": "#888888FF",
        "neutral-500": "#6D6D6DFF",
        "neutral-600": "#5D5D5DFF",
        "neutral-700": "#4F4F4FFF",
        "neutral-800": "#454545FF",
        "neutral-900": "#3D3D3DFF",
        "neutral-950": "#262626FF",
        "neutral-990": "#141414FF",
        "white": "#FFFFFFFF",
        "black": "#000000FF",
        "primary-50": "#F1F7FEFF",
        "primary-100": "#E2EDFCFF",
        "primary-200": "#BEDAF9FF",
        "primary-300": "#85BBF4FF",
        "primary-400": "#4498ECFF",
        "primary-500": "#1C7BDBFF",
        "primary-600": "#0D57ABFF",
        "primary-700": "#0D4C97FF",
        "primary-800": "#0F427DFF",
        "primary-900": "#123868FF",
        "primary-950": "#0C2345FF",
        "card-bg": "#284CFF0D"
      },
      fontFamily: {
        'russo': ['"Russo One"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
};