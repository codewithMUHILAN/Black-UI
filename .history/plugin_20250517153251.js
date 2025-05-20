// Black UI Tailwind Plugin
module.exports = function blackUIPlugin({ addUtilities, addBase, theme }) {
  // Add base styles
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
      '--scrollbar-hover': '0 0% 65%'
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
      '--scrollbar-hover': '0 0% 35%'
    }
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
  });
};