import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

import * as color from './editorColors';
import applyOverrides from './overrides';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
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
    error: {
      light: color.errorLight,
      main: color.errorMain,
      dark: color.errorDark,
      contrastText: color.errorContrastText,
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
    dark: {
      light: color.darkLight,
      main: color.darkMain,
      dark: color.darkDark,
      contrastText: color.darkContrastText,
    },
    common: {
      black: color.blackColor,
      white: color.whiteColor,
    },
    background: {
      paper: color.darkLight,
      default: color.darkMain,
    },
    surface: {
      one: color.surfaceOne,
      two: color.surfaceTwo,
      three: color.surfaceThree,
      four: color.surfaceFour,
      five: color.surfaceFive,
      six: color.surfaceSix,
    },
    border: {
      light: color.borderLight,
      main: color.borderMain,
      dark: color.borderDark,
    },
  },
  shape: {
    borderRadius: 4,
    borderRadiusSmooth: 10,
  },
  typography: {
    fontFamily: '"SourceSansPro", sans-serif',
    h1: {
      fontSize: '2.6em',
    },

    h2: {
      fontSize: '2.4em',
    },

    h3: {
      fontSize: '1.825em',
    },

    h4: {
      fontSize: '1.3em',
    },

    h5: {
      fontSize: '1.25em',
    },
    h6: {
      fontSize: '13px',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: '0.9rem',
    },
    body2: {
      fontSize: '0.825rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
  },
});

export default responsiveFontSizes(applyOverrides(theme)) as Theme;
