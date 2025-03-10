import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      scrollBehavior: "smooth",
      fontFamily: {
        sans: ["Arial", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "navBarGradient-light": "linear-gradient(to right, #0056b3, #00aaff)",
        "navBarGradient-dark": "linear-gradient(to right, #191919, #302b2b)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        backgroundSecondary: "hsl(var(--background-secondary))",
        foreground: "hsl(var(--foreground))",
        foregroundNav: "hsl(var(--foreground-nav))",
        navHover: "hsl(var(--nav-hover))",
        text: "hsl(var(--text))",
        boldBlue: "hsl(var(--bold-blue))",
        title: "hsl(var(--title))",
        subtitle: "hsl(var(--subtitle))",
        sectionTitle: "hsl(var(--section-title))",
        ctaTitle: "hsl(var(--cta-title))",
        link: "hsl(var(--link))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
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
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        slideLeftToRight: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        slideRightToLeft: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },

        loadingBar: {
          "0%": { left: "-100%" },
          "50%": { left: "0%" },
          "100%": { left: "100%" },
        },
      },
      animation: {
        "loading-bar": "loadingBar 2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "slide-left-to-right": "slideLeftToRight 1s ease-in-out",
        "slide-right-to-left": "slideRightToLeft 1s ease-in-out",
        slideUp: "slideUp 0.5s ease-out",
      },
    },
  },

  plugins: [tailwindcssAnimate, typography],
} satisfies Config;

export default config;
