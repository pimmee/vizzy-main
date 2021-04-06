import * as React from 'react';

import { MenuItem, Typography, Icon } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';

import { menuItemStyles } from 'assets/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      margin: theme.spacing(0, 1),
    },
    icon: {
      fontSize: '0.9rem',
    },
  })
);

export const StyledMenuItem = withStyles((theme: Theme) => ({
  root: {
    ...menuItemStyles(theme),
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface Props {
  text: React.ReactNode;
  icon?: any;
  endIcon?: any;
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  children?: any;
  disabled?: boolean;
  className?: string;
}

const DropdownItem = React.forwardRef((props: Props, ref: any) => {
  const classes = useStyles();
  const icon = React.isValidElement(props.icon) ? ( // <SomeComponent/>
    props.icon
  ) : typeof props.icon === 'object' ? (
    <props.icon className={classes.icon} />
  ) : typeof props.icon === 'string' ? (
    <Icon className={classes.icon}>{props.icon}</Icon>
  ) : null;
  const endIcon =
    typeof props.endIcon === 'object' ? (
      <props.endIcon className={classes.icon} />
    ) : typeof props.endIcon === 'string' ? (
      <Icon className={classes.icon}>{props.endIcon}</Icon>
    ) : null;
  return (
    <StyledMenuItem
      onClick={props.onClick}
      ref={ref}
      disabled={props.disabled}
      className={props.className}
    >
      {icon}
      <Typography className={classes.text} variant="caption" component="div">
        {props.text}
      </Typography>
      {endIcon}
      {props.children}
    </StyledMenuItem>
  );
});

export default DropdownItem;
