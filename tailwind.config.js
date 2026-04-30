/** @type {import('tailwindcss').Config} */
module.exports = {
  // Disable Tailwind preflight so it does not override Aksel v8 layered CSS.
  corePlugins: { preflight: false },
  plugins: [],
  presets: [require("@navikt/ds-tailwind")],
};
