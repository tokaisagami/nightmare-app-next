/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zenKurenaido: ['Zen Kurenaido', 'sans-serif'],
        kleeOne: ['Klee One', 'sans-serif'],
        Shizuru: ['Shizuru', 'sans-serif'],
        KaiseiOpti: ['Kaisei Opti', 'sans-serif'],
        KosugiMaru: ['Kosugi Maru', 'sans-serif'],
      },
      colors: {
        'title': '#dd6dfe', // カスタムカラーを追加
      },
    },
  },
  plugins: [],
};
