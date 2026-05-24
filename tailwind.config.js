/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        moon: {
          cream: "#FFFFFF",
          rice: "#E8E8E8",
          red: "#000000",
          redDark: "#000000",
          jade: "#000000",
          ink: "#000000",
          soy: "#000000",
          gold: "#000000"
        }
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0, 0, 0, 0.06)"
      }
    }
  },
  plugins: []
};
