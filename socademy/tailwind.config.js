/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Primary farger for SocAdemy (kan endres)
      colors: {
        primary: "#2F7FA3",
        secondary: "#8FC3D9",
      },
    },
  },
  plugins: [],
}