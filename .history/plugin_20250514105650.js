const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = plugin(
  function ({ addBase, theme, addComponents, addUtilities }) {
    // Add custom keyframes animations
    addBase({

    });

    // Add custom utilities for animations
    addUtilities({
   
    });


    // Add custom root-level styles and components
    addBase({
   
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
            '"Inter"', // Primary font
            'ui-sans-serif', // Generic sans-serif font for better compatibility
            'system-ui', // Default system font
            'sans-serif', // Fallback generic sans-serif
            '"Apple Color Emoji"', // Emojis for Apple devices
            '"Segoe UI Emoji"', // Emojis for Windows devices
            '"Segoe UI Symbol"', // Emojis for Windows devices
            '"Noto Color Emoji"', // Emojis for Android/Google devices
            'Roboto', // Additional common font
            'Arial', // Additional fallback
            ...defaultTheme.fontFamily.sans, // Default sans-serif fonts from Tailwind
          ],
        },
        colors: {
          primarylw: {
            DEFAULT: "var(--primarylw)", // Default value from root
            "2": "var(--primarylw-2)",  // -2 value from root
          },
          darklw: {
            DEFAULT: "var(--darklw)",    // Default value from root
            "2": "var(--darklw-2)",     // -2 value from root
          },
        },
      },
    },
  }
);
