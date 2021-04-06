import * as React from 'react';

import { Menu } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

const StyledMenu = withStyles((theme: Theme) => ({
  paper: {
    border: `1px solid ${theme.palette.border.main}`,
    maxHeight: 500,
  },
  list: {
    padding: 0,
  },
}))(Menu);

interface Props {
  open: boolean;
  anchorEl: HTMLElement | undefined | HTMLButtonElement | null;
  onClose: (event: React.MouseEvent<EventTarget, MouseEvent>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  down?: boolean;
}

const Dropdown: React.FC<Props> = React.forwardRef((props: Props, ref: React.Ref<typeof Menu>) => {
  return (
    <StyledMenu
      ref={ref}
      anchorEl={props.anchorEl}
      keepMounted
      open={props.open}
      onClose={props.onClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: props.down ? 'bottom' : 'top',
        horizontal: props.down ? 'left' : 'right',
      }}
    >
      {props.children}
    </StyledMenu>
  );
});

export default Dropdown;
