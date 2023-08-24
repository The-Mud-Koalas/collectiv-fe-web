import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          200: "#E1F1A3",
          300: "#DEF67E",
          700: "#234438"
        },
        "secondary": "#FFFDEF",
        "tertiary": "#FDD3FF"
      }
    },
  },
  plugins: [],
}
export default config
