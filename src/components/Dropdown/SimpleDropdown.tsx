import { useState } from 'react';
import * as React from 'react';

import { IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { usePopupState, bindMenu, bindToggle } from 'material-ui-popup-state/hooks';

import { HoverIconButton } from 'components/Button';
import Dropdown, { DropdownItem, Submenu } from 'components/Dropdown';

export interface DropdownElement {
  actionId: string;
  name: string;
  id?: string;
  children?: DropdownElement[];
  disabled?: boolean;
  icon?: string | JSX.Element;
}

interface Props {
  items: DropdownElement[];
  onSelect: (actionId: string, cid?: string) => void;
  icon?: JSX.Element;
  verySmall?: boolean;
  noButtonPadding?: boolean;
  buttonType: 'hover' | 'icon' | 'default';
  className?: string;
  popupId: string;
  text?: string;
  allowClickSubmenu?: boolean;
}

const SimpleDropdown = (props: Props) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: props.popupId,
  });
  const [hasClicked, setHasClicked] = useState(false);

  const onClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    actionId: string,
    cid?: string
  ) => {
    event.stopPropagation();
    props.onSelect(actionId, cid);
    popupState.close();
  };

  const getElement = (element: DropdownElement) => {
    return element.children ? (
      <Submenu
        key={element.id || element.actionId}
        parentPopupState={popupState}
        popupId={element.actionId}
        text={element.name}
        disabled={element.disabled}
        onClick={event =>
          props.allowClickSubmenu ? onClick(event, element.actionId, element.id) : null
        }
      >
        {element.children.map(child => getElement(child))}
      </Submenu>
    ) : (
      <DropdownItem
        key={element.id || element.actionId}
        onClick={event => onClick(event, element.actionId, element.id)}
        text={element.name}
        disabled={element.disabled}
        icon={element.icon}
      />
    );
  };

  const buttonStyles = {
    fontSize: props.verySmall ? '0.25rem' : 'inherit',
    padding: props.noButtonPadding ? 0 : undefined,
  };

  return (
    <>
      {props.buttonType === 'hover' && (
        <HoverIconButton
          style={buttonStyles}
          size="small"
          {...bindToggle(popupState)}
          onClick={event => {
            event.stopPropagation();
            setHasClicked(true);
            popupState.toggle(event);
          }}
          className={props.className}
        >
          {props.icon ? props.icon : <MoreVertIcon />}
        </HoverIconButton>
      )}
      {props.buttonType === 'icon' && (
        <IconButton
          {...bindToggle(popupState)}
          onClick={event => {
            event.stopPropagation();
            setHasClicked(true);
            popupState.toggle(event);
          }}
          color="primary"
          size="small"
          className={props.className}
        >
          {props.icon ? props.icon : <MenuIcon />}
        </IconButton>
      )}
      {props.buttonType === 'default' && (
        <Button
          size="small"
          {...bindToggle(popupState)}
          onClick={event => {
            event.stopPropagation();
            setHasClicked(true);
            popupState.toggle(event);
          }}
          color="primary"
          className={props.className}
        >
          {props.text}
        </Button>
      )}
      {hasClicked && (
        <Dropdown
          {...bindMenu(popupState)}
          onClose={event => {
            event.stopPropagation();
            popupState.close();
          }}
        >
          {props.items.map(child => getElement(child))}
        </Dropdown>
      )}
    </>
  );
};

SimpleDropdown.defaultProps = {
  popupId: 'dropdownMenu',
  buttonType: 'hover',
};

export default SimpleDropdown;
