/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { createTheme, PaletteOptions, Theme } from '@mui/material';
import { AppTheme, DefaultTheme } from '../../shared/dto/AppSettings';

export function getTheme(userTheme: AppTheme): Theme {
  const paletteOptions: PaletteOptions = {
    mode: 'light',
    action: {
      active: '#6B7280',
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)',
    },
    background: {
      default: userTheme && userTheme.background ? userTheme.background : DefaultTheme.background,
      paper: userTheme && userTheme.secondaryBackgroundColor ? userTheme.secondaryBackgroundColor : DefaultTheme.secondaryBackgroundColor,
    },
    divider: '#E6E8F0',
    primary: {
      main: userTheme && userTheme.primaryBackgroundColor ? userTheme.primaryBackgroundColor : DefaultTheme.primaryBackgroundColor,
    },
    secondary: {
      main: userTheme && userTheme.secondaryBackgroundColor ? userTheme.secondaryBackgroundColor : DefaultTheme.secondaryBackgroundColor,
    },
    success: {
      main: '#14B8A6',
    },
    info: {
      main: '#2196F3',
    },
    warning: {
      main: '#FFB020',
    },
    error: {
      main: '#D14343',
    },
    text: {
      primary: userTheme && userTheme.primaryColor ? userTheme.primaryColor : DefaultTheme.primaryColor,
      secondary: userTheme && userTheme.secondaryColor ? userTheme.secondaryColor : DefaultTheme.secondaryColor,
      disabled: 'rgba(55, 65, 81, 0.48)',
    },
  };

  const baseTheme = createTheme({
    palette: paletteOptions,
    shadows: [
      'none',
      '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
      '0px 1px 2px rgba(100, 116, 139, 0.12)',
      '0px 1px 4px rgba(100, 116, 139, 0.12)',
      '0px 1px 5px rgba(100, 116, 139, 0.12)',
      '0px 1px 6px rgba(100, 116, 139, 0.12)',
      '0px 2px 6px rgba(100, 116, 139, 0.12)',
      '0px 3px 6px rgba(100, 116, 139, 0.12)',
      '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
      '0px 5px 12px rgba(100, 116, 139, 0.12)',
      '0px 5px 14px rgba(100, 116, 139, 0.12)',
      '0px 5px 15px rgba(100, 116, 139, 0.12)',
      '0px 6px 15px rgba(100, 116, 139, 0.12)',
      '0px 7px 15px rgba(100, 116, 139, 0.12)',
      '0px 8px 15px rgba(100, 116, 139, 0.12)',
      '0px 9px 15px rgba(100, 116, 139, 0.12)',
      '0px 10px 15px rgba(100, 116, 139, 0.12)',
      '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
      '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
      '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
      '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
      '0px 25px 50px rgba(100, 116, 139, 0.25)',
      '0px 25px 50px rgba(100, 116, 139, 0.25)',
      '0px 25px 50px rgba(100, 116, 139, 0.25)',
      '0px 25px 50px rgba(100, 116, 139, 0.25)',
    ],
    typography: {
      button: {
        fontWeight: 600,
      },
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.57,
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.75,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57,
      },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.5px',
        lineHeight: 2.5,
        textTransform: 'uppercase',
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.66,
      },
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.375,
      },
      h2: {
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1.375,
      },
      h3: {
        fontWeight: 700,
        fontSize: '2.25rem',
        lineHeight: 1.375,
      },
      h4: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.375,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.375,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.375,
      },
    },
    shape: {
      borderRadius: 0,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000,
        lg: 1200,
        xl: 1920,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },
          html: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: userTheme && userTheme.primaryColor ? userTheme.primaryColor : DefaultTheme.primaryColor,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: userTheme && userTheme.secondaryColor ? userTheme.secondaryColor : DefaultTheme.secondaryColor,
            },
          },
          '#__next': {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          root: {
            '.MuiBadge-badge': {
              color: userTheme && userTheme.highlightColor ? userTheme.highlightColor : DefaultTheme.highlightColor,
              backgroundColor: userTheme && userTheme.highlightBackgroundColor ? userTheme.highlightBackgroundColor : DefaultTheme.highlightBackgroundColor,
            },
          },
        },
      },
      // Table
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: 'none',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid',
            borderBottomColor: userTheme && userTheme.primaryBackgroundColor ? userTheme.primaryBackgroundColor : DefaultTheme.primaryBackgroundColor,
            color: userTheme && userTheme.secondaryColor ? userTheme.secondaryColor : DefaultTheme.secondaryColor,
            backgroundColor: userTheme && userTheme.secondaryBackgroundColor ? userTheme.secondaryBackgroundColor : DefaultTheme.secondaryBackgroundColor,
            '.MuiTableCell-root': {
              color: userTheme && userTheme.secondaryColor ? userTheme.secondaryColor : DefaultTheme.secondaryColor,
            },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            border: '1px solid',
            borderColor: userTheme && userTheme.primaryBackgroundColor ? userTheme.primaryBackgroundColor : DefaultTheme.primaryBackgroundColor,
            borderBottom: 'none',
            borderRadius: '0',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '.MuiTableCell-root': {
              color: userTheme && userTheme.primaryColor ? userTheme.primaryColor : DefaultTheme.primaryColor,
              backgroundColor: userTheme && userTheme.primaryBackgroundColor ? userTheme.primaryBackgroundColor : DefaultTheme.primaryBackgroundColor,
            },
            borderBottom: 'none',
            '& .MuiTableCell-root': {
              borderBottom: 'none',
              fontSize: '12px',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            },
            '& .MuiTableCell-paddingCheckbox': {
              paddingTop: 4,
              paddingBottom: 4,
            },
            '& .Mui-active': {
              color: userTheme && userTheme.primaryColor ? userTheme.primaryColor : DefaultTheme.primaryColor,
            },
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            color: userTheme && userTheme.secondaryColor ? userTheme.secondaryColor : DefaultTheme.secondaryColor,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 28,
            color: userTheme && userTheme.primaryColor ? userTheme.primaryColor : '#fff',
          },
          sizeSmall: {
            padding: '6px 16px',
          },
          sizeMedium: {
            padding: '8px 20px',
          },
          sizeLarge: {
            padding: '11px 24px',
          },
          textSizeSmall: {
            padding: '7px 12px',
          },
          textSizeMedium: {
            padding: '9px 16px',
          },
          textSizeLarge: {
            padding: '12px 16px',
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '32px 24px',
            '&:last-child': {
              paddingBottom: '32px',
            },
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: {
            variant: 'h6',
          },
          subheaderTypographyProps: {
            variant: 'body2',
          },
        },
        styleOverrides: {
          root: {
            padding: '32px 24px',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: userTheme && userTheme.primaryBackgroundColor ? userTheme.primaryBackgroundColor : '#fff',
            color: 'red',
            padding: '3px',
          },
        },
      },
    },
  });

  return baseTheme;
}
