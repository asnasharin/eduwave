/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#6358A9",
        "secondary": "#251B2F",
        "mycard-body": "#302343",
        "my-ring": "#4d2389",
        "my-input": "#261538",
        "my-bg-dark": "#1A092C"
      },
      gradientColorStops: {
        'custom-gradient': {
          'start': '#492553', // start color
          'end': '#251B2F', // end color
        },
      },
    },
  },
  plugins: [require('flowbite/plugin'),],
}
