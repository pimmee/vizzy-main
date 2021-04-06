import * as React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

import { Portal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import DropdownItem from './DropdownItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      zIndex: theme.zIndex.modal,
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.border.main}`,
    },
  })
);

interface MenuItemInterface {
  text: string;
  action: string;
  onClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: Record<string, string>,
    target: HTMLElement
  ) => void;
  icon?: string;
  disabled?: boolean;
}

interface ContextMenuProps {
  id: string;
  hideOnLeave?: boolean;
  onShow?: () => void;
}

interface Props extends ContextMenuProps {
  items: MenuItemInterface[];
}

export default function DefaultContextMenu({ items, ...other }: Props) {
  const classes = useStyles();

  const containerElement = document.getElementById('editor-base');

  return (
    <Portal container={containerElement}>
      <ContextMenu className={classes.paper} {...other}>
        {items.map(item => (
          <MenuItem
            onClick={item.onClick}
            data={{ action: item.action }}
            key={item.text}
            disabled={item.disabled}
          >
            <DropdownItem text={item.text} icon={item.icon} disabled={item.disabled} />
          </MenuItem>
        ))}
      </ContextMenu>
    </Portal>
  );
}
