module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e', // green-500
        accent: '#16a34a',  // green-600
      },
      boxShadow: {
        'card-glow': '0 6px 18px rgba(34,197,94,0.12)',
      },
    },
  },
  plugins: [],
};
