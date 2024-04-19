import defaultTheme from "tailwindcss/defaultTheme"
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5c6ac5",
        secondary: "#ffffff",
        background: "#ffffff",
        input: "#000000",
        muted:"#e5e7eb",
        // ...
      },
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      
    },
  },
  plugins: [],
};

// primary: "#fafafa",
// secondary: "#262626",
// background: "#0a0a0a",
// input: "#262626",
// muted:"#262626",