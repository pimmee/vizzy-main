import * as React from 'react';

import { withStyles, IconButton, Theme, IconButtonProps } from '@material-ui/core';

export const IconButtonWrapper = React.forwardRef((props: IconButtonProps, ref: any) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (props.onClick) props.onClick(event);
  };
  return <IconButton {...props} onClick={onClick} ref={ref} />;
});

export const StyledIconButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.action.disabled,
    '&:hover': {
      color: theme.palette.action.active,
      background: 'transparent',
      opacity: 1,
    },
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.secondary.dark,
      background: 'transparent',
    },
  },
  colorPrimary: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
      background: 'transparent',
    },
  },
}))(IconButtonWrapper);

StyledIconButton.defaultProps = {
  size: 'small',
  disableRipple: true,
  disableFocusRipple: true,
};

export default StyledIconButton;
