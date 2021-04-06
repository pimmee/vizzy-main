import { Theme } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';

import { primaryContrastText, primaryMain, primaryDark } from '../main/colors';
import { infoLight as editorInfoLight } from './editorColors';

export default function applyOverrides(theme: Theme): Theme {
  return {
    ...theme,
    props: {
      MuiIconButton: {
        onKeyUp: event => event.preventDefault(),
      },
    } as ComponentsProps,
    overrides: {
      MuiCssBaseline: {
        '@global': {
          a: {
            color: editorInfoLight,
          },
        },
      },
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
        outlinedSizeSmall: {
          fontSize: theme.typography.body2.fontSize,
        },
        containedPrimary: {
          backgroundColor: primaryMain,
          color: primaryContrastText,
          '&:hover': {
            backgroundColor: primaryDark,
          },
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
        sizeSmall: {
          fontSize: 18,
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
      MuiToggleButtonGroup: {
        grouped: {
          padding: '0px 6px',
          height: 24,
        },
      },
      MuiMenuItem: {
        root: {
          ...theme.typography.caption,
          minHeight: '38px',
          '&:focus': {
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
              color: '#fff',
            },
          },
        },
      },
      MuiSwitch: {
        root: {
          display: 'inline-flex',
          width: 42,
          height: 23,
          overflow: 'hidden',
          padding: 6,
          boxSizing: 'border-box',
          position: 'relative',
          flexShrink: 0,
          zIndex: 0, // Reset the stacking context.
          verticalAlign: 'middle', // For correct alignment with the text.
        },
        switchBase: {
          position: 'absolute',
          padding: 4,
          top: 0,
          left: 0,
          zIndex: 1, // Render above the focus ripple.
          color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
          transition: theme.transitions.create(['left', 'transform'], {
            duration: theme.transitions.duration.shortest,
          }),
          '&$checked': {
            transform: 'translateX(80%)',
          },
          '&$disabled': {
            color:
              theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
          },
          '&$checked + $track': {
            opacity: 0.5,
          },
          '&$disabled + $track': {
            opacity: theme.palette.type === 'light' ? 0.12 : 0.1,
          },
        },
        /* Pseudo-class applied to the internal SwitchBase component's disabled class. */
        disabled: {},
        checked: {},
        /* Styles used to create the thumb passed to the internal `SwitchBase` component `icon` prop. */
        thumb: {
          boxShadow: theme.shadows[1],
          backgroundColor: 'currentColor',
          width: 15,
          height: 15,
          borderRadius: '50%',
        },
        /* Styles applied to the track element. */
        track: {
          height: '100%',
          width: '100%',
          borderRadius: 24 / 2,
          zIndex: -1,
          transition: theme.transitions.create(['opacity', 'background-color'], {
            duration: theme.transitions.duration.shortest,
          }),
          backgroundColor:
            theme.palette.type === 'light'
              ? theme.palette.common.black
              : theme.palette.common.white,
          opacity: theme.palette.type === 'light' ? 0.38 : 0.3,
        },
      },
      MuiFormControlLabel: {
        label: {
          ...theme.typography.body2,
        },
      },
      MuiDialog: {
        paper: {
          borderRadius: theme.shape.borderRadiusSmooth,
        },
      },
      MuiToggleButton: {
        root: {
          height: 24,
          padding: theme.spacing(0, 1.25),
        },
        sizeSmall: {
          height: 24,
        },
      },
      // MuiSlider: {
      //   colorPrimary: {
      //     color: primaryMain,
      //   },
      //   thumbColorPrimary: {
      //     color: primaryMain,
      //   },
      //   valueLabel: {
      //     '& > span > span': {
      //       color: primaryContrastText,
      //     },
      //   },
      // },
    } as Overrides,
  };
}
