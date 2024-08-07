import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', lg:'2rem', xl: '12rem', },
      screens: { xs: '500px', sm: '600px', md: '728px', lg: '1024px', xl: '1240px', '2xl': '1496px', },
    },
    extend: {
      colors: {
        border: "#403b4a",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#393E46",
          foreground: "#222831",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#00bf63",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#222831",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#7F8487",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: theme => ({
        'gradient-primary': 'linear-gradient(to right, #8a858f, #1b1b26)',
        'gradient-secondary': 'linear-gradient(to right, #d1c1d1, #2e2e45)',
        'gradient-to-top': 'linear-gradient(to top, rgba(45, 43, 44, 1), rgba(46, 46, 69, 0.1))',
      }),
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config