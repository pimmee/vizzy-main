import { Button, ButtonProps, makeStyles, Theme, createStyles } from '@material-ui/core';
import cx from 'classnames';

import { primaryMain, primaryDark, primaryContrastText } from 'assets/theme/main/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: primaryContrastText,
      background: primaryMain,
      '&:hover': {
        background: primaryDark,
      },
    },
  })
);
export const PrimaryButton = ({ className, ...props }: ButtonProps) => {
  const classes = useStyles();

  return <Button {...props} className={cx(classes.button, className)} />;
};
