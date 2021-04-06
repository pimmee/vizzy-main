import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import editorTheme from '../editor';
import darkApplyOverrides from '../editor/overrides';
import * as color from './colors';
import applyOverrides from './overrides';

interface SurfaceColor {
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
  six?: string;
}
// Extend theme to Allow custom variables to be added
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    dark: PaletteColor;
    border: PaletteColor;
    surface: SurfaceColor;
  }

  interface PaletteOptions {
    dark: PaletteColorOptions;
    border: PaletteColorOptions;
    surface: SurfaceColor;
  }
}

declare module '@material-ui/core/styles/shape' {
  interface Shape {
    borderRadius: number;
    borderRadiusSmooth: number;
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: color.primaryLight,
      main: color.primaryMain,
      dark: color.primaryDark,
      contrastText: color.primaryContrastText,
    },
    secondary: {
      light: color.secondaryLight,
      main: color.secondaryMain,
      dark: color.secondaryDark,
      contrastText: color.secondaryContrastText,
    },
    success: {
      light: color.successLight,
      main: color.successMain,
      dark: color.successDark,
      contrastText: color.successContrastText,
    },
    info: {
      light: color.infoLight,
      main: color.infoMain,
      dark: color.infoDark,
      contrastText: color.infoContrastText,
    },
    warning: {
      light: color.warningLight,
      main: color.warningMain,
      dark: color.warningDark,
      contrastText: color.warningContrastText,
    },
    error: {
      main: color.errorMain,
      contrastText: color.errorContrastText,
    },
    dark: {
      light: '#616161',
      main: '#212121',
      dark: '#121212',
      contrastText: color.whiteColor,
    },
    background: {
      default: color.background,
      paper: color.paper,
    },
    surface: {},
    border: {
      main: '#333',
      light: '#d9dbe4',
    },
    common: {
      black: color.blackColor,
      white: color.whiteColor,
    },
  },
  shape: {
    borderRadius: 4,
    borderRadiusSmooth: 10,
  },
  typography: {
    fontFamily: "'SourceSansPro', sans-serif",

    h1: {
      fontSize: '86px',
    },
    h2: {
      fontSize: '3em',
    },

    h3: {
      fontSize: '2.225em',
    },

    h4: {
      fontSize: '1.6em',
    },

    h5: {
      fontSize: '1.5em',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1.3em',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.9rem',
      lineHeight: '1.43',
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: '1.5',
    },
  },
});

const darkTheme = responsiveFontSizes(
  darkApplyOverrides({
    ...theme,
    palette: {
      ...editorTheme.palette,
      background: {
        default: '#181626',
        paper: '#2a293f',
      },
    },
  })
);

export { darkTheme };

export default responsiveFontSizes(applyOverrides(theme));
