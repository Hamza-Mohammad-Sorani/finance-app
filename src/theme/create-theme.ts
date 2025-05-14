import { Direction, createTheme } from '@mui/material';

const theme = (direction: Direction) =>
  createTheme({
    typography: {
      fontFamily:
        direction === 'rtl' ? 'var(--font-cairo)' : 'var(--font-inter)',
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#2563eb',
        light: '#3b82f6',
        dark: '#1d4ed8',
      },
      secondary: {
        main: '#7c3aed',
        light: '#8b5cf6',
        dark: '#6d28d9',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            boxShadow:
              '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: '#f8fafc',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            boxShadow:
              '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
          outlined: {
            borderColor: '#e2e8f0',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
    direction,
  });

export default theme;
