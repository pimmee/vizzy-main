import * as React from 'react';

import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import capitalize from '@material-ui/core/utils/capitalize';
import cx from 'classnames';

import { menuItemStyles } from 'assets/styles';

export const StyledMenuItem = withStyles((theme: Theme) => ({
  root: {
    ...menuItemStyles(theme),
    '&:focus &:hover': {
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[600] : theme.palette.grey[300],
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
  selected: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[500] : theme.palette.grey[500],
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: theme.palette.common.white,
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      marginTop: 2,
      minWidth: 100,
      background: theme.palette.surface.three,
    },
    selectRoot: {
      borderRadius: 2,
    },
    select: {
      ...theme.typography.body2,
      padding: theme.spacing(1, 3, 1, 1.5),
      '&:focus': {
        background: 'none',
        outline: 'none',
      },
      '&$dense': {
        padding: theme.spacing(0, 0.5, 0.5, 0.75),
      },
    },
    categoryText: {
      color: theme.palette.info.main,
      lineHeight: '30px',
    },
    dense: {},
    denseIcon: {
      top: 'calc(50% - 9px)',
    },
    noTopMargin: {
      marginTop: 0,
    },
  })
);

export interface SelectItem {
  value: number | string;
  text: string;
  categoryItem?: boolean;
}

interface Props {
  items: SelectItem[];
  value?: string | number;
  defaultValue?: string | number;
  onChange: (value: string | number) => void;
  labelText?: string;
  className?: string;
  selectClassName?: string;
  margin?: 'dense' | 'normal';
  dense?: boolean;
  variant?: 'outlined' | 'filled';
  style?: React.CSSProperties;
  disabled?: boolean;
  anchorOrigin?: {
    vertical: number | 'center' | 'bottom' | 'top';
    horizontal: number | 'left' | 'right' | 'center';
  };
  native?: boolean;
  noTopMargin?: boolean;
  getItemClassName?: (id: string) => string;
}
export default function DefaultSelect({
  items,
  value,
  defaultValue,
  onChange,
  labelText,
  className,
  selectClassName,
  margin,
  dense,
  variant,
  style,
  disabled,
  anchorOrigin,
  native,
  noTopMargin,
  getItemClassName,
}: Props) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    onChange(event.target.value as number | string);
  };

  return (
    <FormControl
      className={cx(classes.root, className, noTopMargin && classes.noTopMargin)}
      margin={margin}
    >
      {labelText && <InputLabel id="select-label">{labelText}</InputLabel>}
      <Select
        native={native}
        disabled={disabled}
        labelId="select-label"
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        classes={{
          select: cx(classes.select, dense && classes.dense),
          icon: classes.denseIcon,
        }}
        onKeyDown={event => event.key === 'Space' && event.preventDefault()}
        className={cx(classes.selectRoot, selectClassName)}
        disableUnderline
        SelectDisplayProps={{ style: { borderRadius: 2 } }}
        variant={variant}
        style={style}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin,
        }}
      >
        {items.map(item =>
          item.categoryItem ? (
            <ListSubheader key={item.value} className={classes.categoryText} disableSticky>
              {item.text}
            </ListSubheader>
          ) : native ? (
            <option
              key={item.value}
              value={item.value}
              className={getItemClassName ? getItemClassName(item.value as string) : undefined}
            >
              {capitalize(item.text)}
            </option>
          ) : (
            <StyledMenuItem key={item.value} value={item.value}>
              {capitalize(item.text)}
            </StyledMenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
}

DefaultSelect.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
};
