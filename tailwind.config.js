/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        psu: {
          navy: '#041026',
          dark: '#081730',
          blue: '#164CFF',
          accent: '#0084FF',
          lime: '#D5F44A',
          limeBright: '#E3FF54',
          slate: '#8FA1B7',
          card: '#0D2040',
          border: '#1B3154'
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
        display: ['Space Grotesk', 'Manrope', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif']
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.03em',
        tight: '-0.015em'
      }
    },
  },
  plugins: [],
}
