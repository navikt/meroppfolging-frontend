/** @type {import('tailwindcss').Config} */
module.exports = {
  // Preflight is disabled by importing tailwindcss/theme + tailwindcss/utilities
  // separately in globals.css (skipping tailwindcss/preflight).
  plugins: [],
  presets: [require("@navikt/ds-tailwind")],
};
