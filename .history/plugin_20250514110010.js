const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = plugin(
  function ({ addBase, theme, addComponents, addUtilities }) {
    // Add custom keyframes animations
    addBase({
      "@keyframes accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" }
      },
      "@keyframes accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" }
      },
      "@keyframes fade-in": {
        "0%": { opacity: "0", transform: "translateY(5px)" },
        "100%": { opacity: "1", transform: "translateY(0)" }
      },
      "@keyframes fade-out": {
        "0%": { opacity: "1" },
        "100%": { opacity: "0" }
      },
      "@keyframes pulse-bg": {
        "0%, 100%": { backgroundColor: "rgba(var(--primary-rgb), 0.05)" },
        "50%": { backgroundColor: "rgba(var(--primary-rgb), 0.1)" },
      },
      "@keyframes move-bg": {
        "0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" },
      },
      "@keyframes scale-in": {
        "0%": { transform: "scale(0.95)", opacity: "0" },
        "100%": { transform: "scale(1)", opacity: "1" }
      },
      "@keyframes scale-out": {
        "0%": { transform: "scale(1)", opacity: "1" },
        "100%": { transform: "scale(0.95)", opacity: "0" }
      },
      "@keyframes shimmer": {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(100%)" }
      },
      "@keyframes scrollDown": {
        "0%": { transform: "translateY(0)" },
        "100%": { transform: "translateY(100%)" },
      },
      "@keyframes dotPatternMotion": {
        "0%": { transform: "translate(0, 0)" },
        "100%": { transform: "translate(16px, 16px)" },
      }
    });

    // Add custom utilities for animations
    addUtilities({
      '.animate-accordion-down': {
        animation: 'accordion-down 0.2s ease-out'
      },
      '.animate-accordion-up': {
        animation: 'accordion-up 0.2s ease-out'
      },
      '.animate-fade-in': {
        animation: 'fade-in 0.3s ease-out'
      },
      '.animate-fade-out': {
        animation: 'fade-out 0.3s ease-out'
      },
      '.animate-pulse-bg': {
        animation: 'pulse-bg 3s ease-in-out infinite'
      },
      '.animate-move-bg': {
        animation: 'move-bg 3s ease infinite'
      },
      '.animate-scale-in': {
        animation: 'scale-in 0.2s ease-out'
      },
      '.animate-scale-out': {
        animation: 'scale-out 0.2s ease-out'
      },
      '.animate-shimmer': {
        animation: 'shimmer 2s infinite linear'
      },
      '.animate-scroll-down': {
        animation: 'scrollDown 10s linear infinite'
      },
      '.animate-dot-pattern-motion': {
        animation: 'dotPatternMotion 1s linear infinite'
      },
      '.no-scrollbar': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      '.themed-scrollbar': {
        'scrollbar-width': 'thin',
        'scrollbar-color': 'hsl(var(--scrollbar-thumb)) hsl(var(--scrollbar-track))',
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'hsl(var(--scrollbar-track))',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'hsl(var(--scrollbar-thumb))',
          borderRadius: '10px',
          border: '2px solid hsl(var(--scrollbar-track))',
          transition: 'background-color 0.2s ease',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'hsl(var(--scrollbar-hover))',
        },
        '&::-webkit-scrollbar-corner': {
          backgroundColor: 'transparent',
        },
      },
      '.minimal-scrollbar': {
        'scrollbar-width': 'thin',
        'scrollbar-color': 'hsl(var(--scrollbar-thumb)) transparent',
        '&::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'hsl(var(--scrollbar-thumb))',
          borderRadius: '10px',
          transition: 'background-color 0.2s ease',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'hsl(var(--scrollbar-hover))',
        },
      },
      '.scrollbar-none': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      '.custom-scrollbar': {
        'scrollbar-width': 'thin',
        'scrollbar-color': 'hsl(var(--scrollbar-thumb)) hsl(var(--scrollbar-track))',
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'hsl(var(--scrollbar-track))',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'hsl(var(--scrollbar-thumb))',
          borderRadius: '10px',
          transition: 'background-color 0.2s ease',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'hsl(var(--scrollbar-hover))',
        },
      },
      '.dropdown-scrollbar': {
        'max-height': 'calc(90vh - 60px)',
        'overflow-y': 'auto',
        'scrollbar-width': 'thin',
        'scrollbar-color': 'hsl(var(--scrollbar-thumb)) transparent',
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'hsl(var(--scrollbar-thumb))',
          borderRadius: '10px',
          transition: 'background-color 0.2s ease',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'hsl(var(--scrollbar-hover))',
        },
      },
    });

    // Add custom root-level styles and components
    addBase({
      ":root": {
        "--border": "240 5.9% 90%",
        "--input": "240 5.9% 90%",
        "--ring": "240 5.9% 10%",
        "--background": "0 0% 100%",
        "--foreground": "240 10% 3.9%",
        "--primary": "240 5.9% 10%",
        "--primary-foreground": "0 0% 98%",
        "--secondary": "240 4.8% 95.9%",
        "--secondary-foreground": "240 5.9% 10%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "0 0% 98%",
        "--muted": "240 4.8% 95.9%",
        "--muted-foreground": "240 3.8% 46.1%",
        "--accent": "240 4.8% 95.9%",
        "--accent-foreground": "240 5.9% 10%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "240 10% 3.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "240 10% 3.9%",
        "--sidebar-background": "0 0% 100%",
        "--sidebar-foreground": "240 10% 3.9%",
        "--sidebar-primary": "240 5.9% 10%",
        "--sidebar-primary-foreground": "0 0% 98%",
        "--sidebar-accent": "240 4.8% 95.9%",
        "--sidebar-accent-foreground": "240 5.9% 10%",
        "--sidebar-border": "240 5.9% 90%",
        "--sidebar-ring": "240 5.9% 10%",
        "--scrollbar-thumb": "240 5.9% 90%",
        "--scrollbar-track": "0 0% 100%",
        "--scrollbar-hover": "240 5.9% 80%",
        "--radius": "0.75rem",
        "--primarylw": "#000000",
        "--primarylw-2": "#222222",
        "--darklw": "#ffffff",
        "--darklw-2": "#f0f0f0",
      },
      ".dark": {
        "--background": "240 10% 3.9%",
        "--foreground": "0 0% 98%",
        "--card": "240 10% 3.9%",
        "--card-foreground": "0 0% 98%",
        "--popover": "240 10% 3.9%",
        "--popover-foreground": "0 0% 98%",
        "--primary": "0 0% 98%",
        "--primary-foreground": "240 5.9% 10%",
        "--secondary": "240 3.7% 15.9%",
        "--secondary-foreground": "0 0% 98%",
        "--muted": "240 3.7% 15.9%",
        "--muted-foreground": "240 5% 64.9%",
        "--accent": "240 3.7% 15.9%",
        "--accent-foreground": "0 0% 98%",
        "--destructive": "0 62.8% 30.6%",
        "--destructive-foreground": "0 0% 98%",
        "--border": "240 3.7% 15.9%",
        "--input": "240 3.7% 15.9%",
        "--ring": "240 4.9% 83.9%",
        "--sidebar-background": "240 10% 3.9%",
        "--sidebar-foreground": "0 0% 98%",
        "--sidebar-primary": "0 0% 98%",
        "--sidebar-primary-foreground": "240 5.9% 10%",
        "--sidebar-accent": "240 3.7% 15.9%",
        "--sidebar-accent-foreground": "0 0% 98%",
        "--sidebar-border": "240 3.7% 15.9%",
        "--sidebar-ring": "240 4.9% 83.9%",
        "--scrollbar-thumb": "240 3.7% 15.9%",
        "--scrollbar-track": "240 10% 3.9%",
        "--scrollbar-hover": "240 5% 34.9%",
        "--primarylw": "#ffffff",
        "--primarylw-2": "#f0f0f0",
        "--darklw": "#000000",
        "--darklw-2": "#222222",
      }
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: "16px",
      },
      extend: {
        fontFamily: {
          primarylw: [
            '"Inter"',
            'ui-sans-serif',
            'system-ui',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
            'Roboto',
            'Arial',
          ],
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))'
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))'
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))'
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))'
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))'
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))'
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))'
          },
          sidebar: {
            DEFAULT: 'hsl(var(--sidebar-background))',
            foreground: 'hsl(var(--sidebar-foreground))',
            primary: 'hsl(var(--sidebar-primary))',
            'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
            accent: 'hsl(var(--sidebar-accent))',
            'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
            border: 'hsl(var(--sidebar-border))',
            ring: 'hsl(var(--sidebar-ring))'
          },
          scrollbar: {
            thumb: 'hsl(var(--scrollbar-thumb))',
            track: 'hsl(var(--scrollbar-track))',
            hover: 'hsl(var(--scrollbar-hover))'
          },
          primarylw: {
            DEFAULT: "var(--primarylw)",
            "2": "var(--primarylw-2)",
          },
          darklw: {
            DEFAULT: "var(--darklw)",
            "2": "var(--darklw-2)",
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)'
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' }
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' }
          },
          'fade-in': {
            '0%': { opacity: '0', transform: 'translateY(5px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' }
          },
          'fade-out': {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' }
          },
          'pulse-bg': {
            '0%, 100%': { backgroundColor: 'rgba(var(--primary-rgb), 0.05)' },
            '50%': { backgroundColor: 'rgba(var(--primary-rgb), 0.1)' },
          },
          'move-bg': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
          'scale-in': {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' }
          },
          'scale-out': {
            '0%': { transform: 'scale(1)', opacity: '1' },
            '100%': { transform: 'scale(0.95)', opacity: '0' }
          },
          'shimmer': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' }
          },
          'scrollDown': {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(100%)' },
          },
          'dotPatternMotion': {
            '0%': { transform: 'translate(0, 0)' },
            '100%': { transform: 'translate(16px, 16px)' }, 
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'fade-in': 'fade-in 0.3s ease-out',
          'fade-out': 'fade-out 0.3s ease-out',
          'pulse-bg': 'pulse-bg 3s ease-in-out infinite',
          'move-bg': 'move-bg 3s ease infinite',
          'scale-in': 'scale-in 0.2s ease-out',
          'scale-out': 'scale-out 0.2s ease-out',
          'shimmer': 'shimmer 2s infinite linear',
          'scroll-down': 'scrollDown 10s linear infinite',
          'dotPatternMotion': 'dotPatternMotion 1s linear infinite',
        },
        transitionTimingFunction: {
          'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },
      }
    },
  }
);