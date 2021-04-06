import * as React from 'react';

import { makeStyles, Theme, createStyles, fade } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 100,
      minHeight: 40,
      fontSize: 18,
      padding: theme.spacing(0.75, 2.5),
    },
    label: {
      textTransform: 'none',
      fontWeight: 500,
    },
    outlined: {
      padding: '0 2em',
    },
    outlinedPrimary: {
      borderColor: theme.palette.primary.light,
      color: theme.palette.primary.light,
      '&:hover': {
        borderColor: theme.palette.primary.light,
        color: theme.palette.primary.light,
        backgroundColor: fade(theme.palette.primary.light, 0.4),
      },
    },
    outlinedSecondary: {
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.light,
      '&:hover': {
        borderColor: theme.palette.secondary.light,
        color: theme.palette.secondary.light,
        backgroundColor: fade(theme.palette.secondary.light, 0.4),
      },
    },
    contained: {
      boxShadow: theme.shadows[0],
      '&:active': {
        boxShadow: theme.shadows[0],
      },
    },
    sizeLarge: {
      fontSize: 20,
      padding: '5px 32px',
      [theme.breakpoints.down('sm')]: {
        padding: '0.3em 1.4em',
      },
    },
    sizeSmall: {
      padding: theme.spacing(0.5, 1.75),
      minHeight: 30,
      fontSize: 14,
    },
  })
);

interface Props extends ButtonProps {
  children: any;
  className?: string;
}

const TwitterButton = React.forwardRef((props: Props, ref) => {
  const classes = useStyles();

  return (
    <Button
      classes={classes}
      className={props.className}
      variant={props.variant || 'outlined'}
      color={props.color || 'primary'}
      size={props.size || 'large'}
      {...props}
      ref={ref as React.RefObject<HTMLButtonElement> | null | undefined}
    >
      {props.children}
    </Button>
  );
});

export default TwitterButton;
