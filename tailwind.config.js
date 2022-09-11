/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#008DB9",
        },
        dark: {
          50: "#1e293b",
        },
      },
    },
  },
  plugins: [],
};
