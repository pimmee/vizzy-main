import { Theme } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';

import {
  primaryMain as editorPrimaryMain,
  successContrastText,
  successMain,
} from '../editor/editorColors';

export default function applyOverrides(theme: Theme): Theme {
  return {
    ...theme,
    /*props: {
      MuiIconButton: {
        disableRipple: true,
        disableTouchRipple: true,
        disableFocusRipple: true,
      },
    } as ComponentsProps,*/
    overrides: {
      MuiTab: {
        root: {
          fontWeight: 400,
          textTransform: 'none',
        },
      },
      MuiButton: {
        root: {
          textTransform: 'none',
          padding: '5px 16px',
        },
        text: {
          padding: '5px 6px',
        },
        outlined: {
          padding: '5px 16px',
        },
      },
      MuiFilledInput: {
        inputMarginDense: {
          padding: '8px 12px 6px 10px !important',
        },
      },
      MuiIconButton: {
        root: {
          padding: 6,
        },
      },
      MuiSvgIcon: {
        root: {
          fontSize: '1.2rem',
        },
        fontSizeSmall: {
          fontSize: '1rem',
        },
        fontSizeLarge: {
          fontSize: '1.5rem',
        },
      },
      MuiMenu: {
        list: {
          padding: 0,
        },
      },
      MuiList: {
        padding: {
          padding: 0,
        },
      },
      MuiMenuItem: {
        root: {
          fontSize: '0.7rem',
          minHeight: '38px',
          '&:focus': {
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
              color: '#fff',
            },
          },
        },
      },
      MuiDialog: {
        paper: {
          borderRadius: theme.shape.borderRadiusSmooth,
        },
      },
      MuiSnackbarContent: {
        root: {
          '&[class*="variantInfo"]': {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
          },
          '&[class*="variantSuccess"]': {
            backgroundColor: successMain,
            color: successContrastText,
          },
          '&[class*="variantError"]': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          },
          '&[class*="variantWarning"]': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
          },
        },
      },
    } as Overrides,
  };
}
