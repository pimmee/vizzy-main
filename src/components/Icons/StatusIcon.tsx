import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SuccessIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import cx from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.down('xs')]: {
        width: '100vw',
      },
    },
    statusIcon: {
      margin: theme.spacing(0, 1),
      fontSize: 16,
    },
    successIcon: {
      color: theme.palette.success.main,
    },
    warningIcon: {
      color: theme.palette.warning.main,
    },
    errorIcon: {
      color: theme.palette.error.main,
    },
  })
);

interface Props {
  severity: 'warning' | 'success' | 'error';
  className?: string;
}

export default function StatusIcon({ severity, className }: Props) {
  const classes = useStyles();

  let icon = null;
  if (severity === 'success') {
    icon = (
      <SuccessIcon
        className={cx(classes.statusIcon, classes.successIcon, className)}
      />
    );
  } else if (severity === 'warning') {
    icon = (
      <WarningIcon
        className={cx(classes.statusIcon, classes.warningIcon, className)}
      />
    );
  } else {
    icon = (
      <ErrorIcon
        className={cx(classes.statusIcon, classes.errorIcon, className)}
      />
    );
  }

  return icon;
}
