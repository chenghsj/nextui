import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#2900FF',
        gray_l1: '#DDDBE7',
        gray_l2: '#555266',
        gray_l3: '#353340',
        gray_l4: '#17171A',
        gray_b: '#04001A',
        record: '#FF6565',
      },
    },
    container: {
      center: true,
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {},
    }),
  ],
};
