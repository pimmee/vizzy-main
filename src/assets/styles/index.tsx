import { createStyles, Theme } from '@material-ui/core';

import imagesStyles from './imageStyles';
import {
  primaryMain,
  primaryDark,
  successMain,
  infoMain,
  warningMain,
  whiteColor,
  blackColor,
  primaryXDark,
} from 'assets/theme/main/colors';

export { imagesStyles };
export const hexToRgb = (input: string) => {
  input = input + '';
  input = input.replace('#', '');
  const hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error('input is not a valid hex color.');
  }
  if (input.length === 3) {
    const first = input[0];
    const second = input[1];
    const last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase();
  const first = input[0] + input[1];
  const second = input[2] + input[3];
  const last = input[4] + input[5];
  return parseInt(first, 16) + ', ' + parseInt(second, 16) + ', ' + parseInt(last, 16);
};

export const unstyledLink = {
  textDecoration: 'none',
  outline: 'none',
  color: 'inherit',
};

export const menuItemStyles = (theme: Theme) => ({
  ...theme.typography.body2,
  minHeight: 30,
  padding: theme.spacing(0.5, 2),
});

export const container = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
  '@media (min-width: 576px)': {
    maxWidth: '540px',
  },
  '@media (min-width: 768px)': {
    maxWidth: '720px',
  },
  '@media (min-width: 992px)': {
    maxWidth: '960px',
  },
  '@media (min-width: 1200px)': {
    maxWidth: '1140px',
  },
};

export const gridListStyle = createStyles({
  gridList: {
    width: '100%',
    transform: 'translateZ(0)',
    overflowY: 'auto',
  },
});

export const boxShadow = {
  boxShadow:
    '0 10px 30px -12px rgba(' +
    hexToRgb(blackColor) +
    ', 0.42), 0 4px 25px 0px rgba(' +
    hexToRgb(blackColor) +
    ', 0.12), 0 8px 10px -5px rgba(' +
    hexToRgb(blackColor) +
    ', 0.2)',
};

export const primaryBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' +
    hexToRgb(blackColor) +
    ',.14), 0 7px 10px -5px rgba(' +
    hexToRgb(primaryMain) +
    ',.4)',
};
export const infoBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' +
    hexToRgb(blackColor) +
    ',.14), 0 7px 10px -5px rgba(' +
    hexToRgb(infoMain) +
    ',.4)',
};
export const successBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' +
    hexToRgb(blackColor) +
    ',.14), 0 7px 10px -5px rgba(' +
    hexToRgb(successMain) +
    ',.4)',
};
export const warningBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' +
    hexToRgb(blackColor) +
    ',.14), 0 7px 10px -5px rgba(' +
    hexToRgb(warningMain) +
    ',.4)',
};

export const defaultBoxShadow = {
  border: '0',
  borderRadius: '3px',
  boxShadow:
    '0 10px 20px -12px rgba(' +
    hexToRgb(blackColor) +
    ', 0.42), 0 3px 20px 0px rgba(' +
    hexToRgb(blackColor) +
    ', 0.12), 0 8px 10px -5px rgba(' +
    hexToRgb(blackColor) +
    ', 0.2)',
  padding: '10px 0',
  transition: 'all 150ms ease 0s',
};

export const backgroundColors = {
  primary: {
    backgroundColor: primaryMain,
    color: whiteColor,
    ...defaultBoxShadow,
  },
  info: {
    backgroundColor: infoMain,
    color: whiteColor,
    ...defaultBoxShadow,
  },
  success: {
    backgroundColor: successMain,
    color: whiteColor,
    ...defaultBoxShadow,
  },
  warning: {
    backgroundColor: warningMain,
    color: whiteColor,
    ...defaultBoxShadow,
  },
};

export const iconButtonSmall = {
  padding: 10,
  fontSize: 18,
  '@media (max-width: 768px)': {
    fontSize: 14,
  },
};

export const anchorButton = {
  background: 'none !important',
  border: 'none',
  padding: '0 !important',
  color: '#069',
  textDecoration: 'underline',
  cursor: 'pointer',
};

export const primaryMainButton = {
  background: primaryMain,
  color: whiteColor,
  '&:hover': {
    background: primaryDark,
  },
};
export const primaryMainButtonDark = {
  background: primaryDark,
  color: whiteColor,
  '&:hover': {
    background: primaryXDark,
  },
  '&:focus': {
    background: primaryXDark,
  },
};

export const drawerWidth = 260;

export const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

export const overlayStyles = createStyles({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.4)',
    },
  },
  overlayButton: {
    cursor: 'pointer',
    opacity: 0,
    transition: 'all .2s ease',
    background: 'transparent',
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 28,
    borderRadius: 17,
    fontSize: 12,
    fontWeight: 400,
  },
});
