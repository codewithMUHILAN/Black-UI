const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = plugin(
function blackuiPlugin({ addUtilities, addBase, theme }) {
  // Add base styles and CSS variables
  addBase({
    ':root': {
      '--background': '0 0% 100%',
      '--foreground': '0 0% 0%',
      '--card': '0 0% 100%',
      '--card-foreground': '0 0% 0%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '0 0% 0%',
      '--primary': '0 0% 0%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '0 0% 96%',
      '--secondary-foreground': '0 0% 0%',
      '--muted': '0 0% 96%',
      '--muted-foreground': '0 0% 45%',
      '--accent': '0 0% 96%',
      '--accent-foreground': '0 0% 0%',
      '--destructive': '0 84% 60%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '0 0% 90%',
      '--input': '0 0% 90%',
      '--ring': '0 0% 0%',
      '--radius': '0.5rem',
      '--scrollbar-thumb': '0 0% 75%',
      '--scrollbar-track': '0 0% 95%',
      '--scrollbar-hover': '0 0% 65%',
      '--sidebar-background': '0 0% 100%',
      '--sidebar-foreground': '222.2 47.4% 11.2%',
      '--sidebar-primary': '222.2 47.4% 11.2%',
      '--sidebar-primary-foreground': '210 40% 98%',
      '--sidebar-accent': '210 40% 96.1%',
      '--sidebar-accent-foreground': '222.2 47.4% 11.2%',
      '--sidebar-border': '214.3 31.8% 91.4%',
      '--sidebar-ring': '215 20.2% 65.1%'
    },
    '.dark': {
      '--background': '0 0% 0%',
      '--foreground': '0 0% 100%',
      '--card': '0 0% 5%',
      '--card-foreground': '0 0% 100%',
      '--popover': '0 0% 5%',
      '--popover-foreground': '0 0% 100%',
      '--primary': '0 0% 100%',
      '--primary-foreground': '0 0% 0%',
      '--secondary': '0 0% 15%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '0 0% 15%',
      '--muted-foreground': '0 0% 65%',
      '--accent': '0 0% 15%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '0 62% 30%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '0 0% 20%',
      '--input': '0 0% 20%',
      '--ring': '0 0% 100%',
      '--scrollbar-thumb': '0 0% 25%',
      '--scrollbar-track': '0 0% 10%',
      '--scrollbar-hover': '0 0% 35%',
      '--sidebar-background': '224 71% 4%',
      '--sidebar-foreground': '213 31% 91%',
      '--sidebar-primary': '210 40% 98%',
      '--sidebar-primary-foreground': '222.2 47.4% 1.2%',
      '--sidebar-accent': '216 34% 17%',
      '--sidebar-accent-foreground': '210 40% 98%',
      '--sidebar-border': '216 34% 17%',
      '--sidebar-ring': '216 34% 17%'
    },
    // Global scrollbar styling
    '*': {
      'scrollbar-width': 'thin',
      'scrollbar-color': 'hsl(var(--scrollbar-thumb)) hsl(var(--scrollbar-track))'
    },
    '::-webkit-scrollbar': {
      width: '8px',
      height: '8px'
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: 'hsl(var(--scrollbar-track))',
      borderRadius: '10px'
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'hsl(var(--scrollbar-thumb))',
      borderRadius: '10px',
      border: '2px solid hsl(var(--scrollbar-track))'
    },
    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'hsl(var(--scrollbar-hover))'
    },
    '::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent'
    },

    // Command dialog and popover styles
    'body.command-dialog-open, body.popover-open': {
      '@apply overflow-hidden': {}
    },

    'body.command-dialog-open::after, body.popover-open::after': {
      content: '""',
      position: 'fixed',
      inset: '0',
      zIndex: '39',
      backdropFilter: 'blur(4px)',
      pointerEvents: 'none',
      transition: 'backdrop-filter 0.2s ease'
    }
  });

  // Add keyframes
  addUtilities({




    '@keyframes fade-in': {
      '0%': { opacity: '0', transform: 'translateY(5px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' }
    },
    '@keyframes fade-out': {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' }
    },
    '@keyframes pulse-bg': {
      '0%, 100%': { backgroundColor: 'rgba(var(--primary-rgb), 0.05)' },
      '50%': { backgroundColor: 'rgba(var(--primary-rgb), 0.1)' }
    },
    '@keyframes move-bg': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' }
    },
    '@keyframes scale-in': {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' }
    },
    '@keyframes scale-out': {
      '0%': { transform: 'scale(1)', opacity: '1' },
      '100%': { transform: 'scale(0.95)', opacity: '0' }
    },
    '@keyframes shimmer': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' }
    },
    '@keyframes scrollDown': {
      '0%': { transform: 'translateY(0)' },
      '100%': { transform: 'translateY(100%)' }
    },
    '@keyframes dotPatternMotion': {
      '0%': { transform: 'translate(0, 0)' },
      '100%': { transform: 'translate(16px, 16px)' }
    },
    '@keyframes toast-enter': {
      '0%': {
        transform: 'translateX(100%)',
        opacity: '0'
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: '1'
      }
    },
    '@keyframes toast-exit': {
      '0%': {
        transform: 'translateX(0)',
        opacity: '1'
      },
      '100%': {
        transform: 'translateX(100%)',
        opacity: '0'
      }
    },
    '@keyframes toast-enter-mobile': {
      '0%': {
        transform: 'translateY(-100%)',
        opacity: '0'
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: '1'
      }
    },
    '@keyframes toast-exit-mobile': {
      '0%': {
        transform: 'translateY(0)',
        opacity: '1'
      },
      '100%': {
        transform: 'translateY(-100%)',
        opacity: '0'
      }
    },
    '@keyframes aurora-1': {
      '0%': {
        top: '0',
        right: '0'
      },
      '50%': {
        top: '100%',
        right: '75%'
      },
      '75%': {
        top: '100%',
        right: '25%'
      },
      '100%': {
        top: '0',
        right: '0'
      }
    },
    '@keyframes aurora-2': {
      '0%': {
        top: '-50%',
        left: '0%'
      },
      '60%': {
        top: '100%',
        left: '75%'
      },
      '85%': {
        top: '100%',
        left: '25%'
      },
      '100%': {
        top: '-50%',
        left: '0%'
      }
    },
    '@keyframes aurora-3': {
      '0%': {
        bottom: '0',
        left: '0'
      },
      '40%': {
        bottom: '100%',
        left: '75%'
      },
      '65%': {
        bottom: '40%',
        left: '50%'
      },
      '100%': {
        bottom: '0',
        left: '0'
      }
    },
    '@keyframes aurora-4': {
      '0%': {
        bottom: '-50%',
        right: '0'
      },
      '50%': {
        bottom: '0%',
        right: '40%'
      },
      '90%': {
        bottom: '50%',
        right: '25%'
      },
      '100%': {
        bottom: '-50%',
        right: '0'
      }
    },
    '@keyframes aurora-border': {
      '0%': {
        borderRadius: '37% 29% 27% 27% / 28% 25% 41% 37%'
      },
      '25%': {
        borderRadius: '47% 29% 39% 49% / 61% 19% 66% 26%'
      },
      '50%': {
        borderRadius: '57% 23% 47% 72% / 63% 17% 66% 33%'
      },
      '75%': {
        borderRadius: '28% 49% 29% 100% / 93% 20% 64% 25%'
      },
      '100%': {
        borderRadius: '37% 29% 27% 27% / 28% 25% 41% 37%'
      }
    }
  });

  // Add animation utilities
  addUtilities({
    '.animate-accordion-down': { animation: 'accordion-down 0.2s ease-out' },
    '.animate-accordion-up': { animation: 'accordion-up 0.2s ease-out' },
    '.animate-fade-in': { animation: 'fade-in 0.3s ease-out' },
    '.animate-fade-out': { animation: 'fade-out 0.3s ease-out' },
    '.animate-pulse-bg': { animation: 'pulse-bg 3s ease-in-out infinite' },
    '.animate-move-bg': { animation: 'move-bg 3s ease infinite' },
    '.animate-scale-in': { animation: 'scale-in 0.2s ease-out' },
    '.animate-scale-out': { animation: 'scale-out 0.2s ease-out' },
    '.animate-shimmer': { animation: 'shimmer 2s infinite linear' },
    '.animate-scroll-down': { animation: 'scrollDown 10s linear infinite' },
    '.animate-dotPatternMotion': { animation: 'dotPatternMotion 1s linear infinite' }
  });

  // Add custom scrollbar utilities
  addUtilities({
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
    '.no-scrollbar': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '.scrollbar-none': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '.hide-scrollbar': {
      'scrollbar-width': 'none',
      '-ms-overflow-style': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '.custom-scrollbar': {
      'scrollbar-width': 'thin',
      'scrollbar-color': 'hsl(var(--scrollbar-thumb)) hsl(var(--scrollbar-track))',
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(120, 120, 120, 0.3)',
        borderRadius: '10px',
        transition: 'all 0.2s ease',
      },
      '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(120, 120, 120, 0.5)',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(120, 120, 120, 0.7)',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent',
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
    '.sidebar-scrollable-syntax::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '.sidebar-scrollable-syntax::-webkit-scrollbar-track': {
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
    },
    '.sidebar-scrollable-syntax::-webkit-scrollbar-thumb': {
      backgroundColor: '#505050',
      borderRadius: '10px',
      border: '2px solid #f0f0f0',
    },
    '.sidebar-scrollable-syntax::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#b3b3b3',
    },
    '.no-scroll': {
      overflow: 'hidden',
    }
  });

  // Add component-specific classes
  addUtilities({
    '.card-hover': {
      '@apply transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg': {}
    },
    '.toggle-switch': {
      '@apply relative w-10 h-5 rounded-full bg-secondary transition-colors duration-200': {}
    },
    '.toggle-switch.active': {
      '@apply bg-background': {}
    },
    '.toggle-switch .toggle-knob': {
      '@apply absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-foreground transition-transform duration-200': {}
    },
    '.toggle-switch.active .toggle-knob': {
      '@apply transform translate-x-5 bg-background': {}
    },
    '.dropdown-hover-item': {
      '@apply flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors': {}
    },
    '.dropdown-category': {
      '@apply text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 px-2': {}
    },
    '.dropdown-category-item': {
      '@apply flex items-center gap-2 w-full text-sm': {}
    },
    '.tabs-bg-indicator': {
      '@apply absolute rounded-sm bg-background transition-all duration-200 ease-out shadow-sm': {},
      'transform-origin': 'center center'
    },
    '.sidebar-menu-indicator': {
      '@apply absolute rounded-sm bg-background/10 transition-all duration-200 ease-out shadow-sm': {}
    },
    '.dropdown-content, .select-content, .popover-content, .command-dialog': {
      'max-height': 'calc(90vh - 2rem)',
      'overflow-y': 'auto'
    },
    '.flex-wrap-tabs': {
      '@apply flex flex-wrap gap-1': {}
    },
    '.syntax-coding': {
      'text-shadow': '0 5px 25px'
    }
  });
}
);
