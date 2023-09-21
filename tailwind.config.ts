import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      flex: {
        "2" : "2 2 0%"
      },
      colors: {
        "primary": {
          50: "#EAFFD6",
          100: "#DEFFBD",
          200: "#CFFCA3",
          300: "#BAF67E",
          400: "#99E54D",
          500: "#5C863D",
          600: "#3F6D1C",
          700: "#274A0D",
          800: "#163300",
          900: "#102600"
        },
        "secondary": {
          100: "#FAEDF7",
          200: "#FDD3FF",
          300: "#DC93CB",
          400: "#964784",
          500: "#641252"
        },
        "tertiary": {
          100: "#FFFCEF"
        },
        "danger": {
          100: "#641252",
          200: "#FF8F7D",
          300: "#FB282F",
          400: "#FB282F",
          500: "#780733"
        }
      }
    },
  },
  plugins: [],
}
export default config
