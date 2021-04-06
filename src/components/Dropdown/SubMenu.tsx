import * as React from 'react';

import { Typography, Icon, PopoverOrigin } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { bindHover, bindMenu, PopupState } from 'material-ui-popup-state/core';
import { usePopupState } from 'material-ui-popup-state/hooks';
import Menu from 'material-ui-popup-state/HoverMenu';

import { StyledMenuItem } from './DropdownItem';
/*function SubMenu(props: Props) {
  const classes = useStyles();
  (
  // Unfortunately, MUI <Menu> injects refs into its children, which causes a
  // warning in some cases unless we use forwardRef here.
  React.forwardRef(({ classes, title, popupId, children, ...props }:, ref) => {
    const parentPopupState = React.useContext(ParentPopupState);
    const popupState = usePopupState({
      popupId,
      variant: 'popover',
      parentPopupState,
    });
    return (
      <ParentPopupState.Provider value={popupState}>
        <MenuItem {...bindHover(popupState)} selected={popupState.isOpen} ref={ref}>
          <ListItemText className={classes.title}>{title}</ListItemText>
          <ChevronRight className={classes.moreArrow} />
        </MenuItem>
        <Menu
          {...bindMenu(popupState)}
          className={classes.menu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          getContentAnchorEl={null}
          {...props}
        >
          {children}
        </Menu>
      </ParentPopupState.Provider>
    );
  })
);*/
/* eslint-disable @typescript-eslint/no-explicit-any */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontSize: '0.7rem',
      flexGrow: 1,
      margin: theme.spacing(0, 1),
    },
    icon: {
      fontSize: '0.9rem',
    },
    moreArrow: {
      marginRight: theme.spacing(-1),
    },
    menu: {
      top: theme.spacing(-1),
    },
  })
);

interface Props {
  popupId: string;
  parentPopupState: PopupState;
  text: string;
  icon?: any;
  children?: any;
  disabled?: boolean;
  className?: string;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const Submenu = React.forwardRef((props: Props, ref: any) => {
  const classes = useStyles();

  const popupState = usePopupState({
    popupId: props.popupId,
    variant: 'popper',
    parentPopupState: props.parentPopupState,
  });

  const icon =
    typeof props.icon === 'object' ? (
      <props.icon className={classes.icon} />
    ) : typeof props.icon === 'string' ? (
      <Icon className={classes.icon}>{props.icon}</Icon>
    ) : null;
  return (
    <>
      <StyledMenuItem
        {...bindHover(popupState)}
        selected={popupState.isOpen}
        ref={ref}
        className={props.className}
        onClick={props.onClick}
      >
        {icon}
        <Typography className={classes.text}>{props.text}</Typography>
        <ChevronRightIcon className={classes.moreArrow} />
        <Menu
          {...bindMenu(popupState)}
          className={classes.menu}
          anchorOrigin={props.anchorOrigin}
          transformOrigin={props.transformOrigin}
          getContentAnchorEl={null}
        >
          {props.children}
        </Menu>
      </StyledMenuItem>
    </>
  );
});

Submenu.defaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
  transformOrigin: { vertical: 'top', horizontal: 'left' },
};

export default Submenu;
