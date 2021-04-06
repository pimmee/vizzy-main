import { FC } from 'react';

import { Tooltip, TooltipProps } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';

const CustomTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.dark.light,
    color: theme.palette.dark.contrastText,
    boxShadow: theme.shadows[5],
    ...theme.typography.body2,
  },
  tooltipPlacementTop: {
    margin: theme.spacing(1),
  },
}))(Tooltip) as any;

interface Props extends TooltipProps {
  disabled?: boolean;
}

const DefaultTooltip: FC<Props> = props => (
  <CustomTooltip
    placement={props.placement || 'top'}
    {...props}
    disableFocusListener={props.disabled}
    disableHoverListener={props.disabled}
    disableTouchListener={props.disabled}
  >
    {props.children}
  </CustomTooltip>
);

export default DefaultTooltip;
