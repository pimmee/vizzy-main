import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';

import { primaryMain, primaryDark } from 'assets/theme/main/colors';
import StatusIcon from 'components/Icons/StatusIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.down('xs')]: {
        width: '100vw',
      },
    },
    paper: {
      padding: theme.spacing(1.5, 1),
      [theme.breakpoints.up('sm')]: {
        minWidth: 400,
      },
    },
    statusIcon: {
      // margin: '0px 15px 0px 10px',
    },
    acceptButton: {
      background: primaryMain,
      '&:hover': {
        background: primaryDark,
      },
    },
  })
);

interface Props {
  title: string;
  text: string;
  open: boolean;
  acceptText?: string;
  declineText?: string;
  onClose: (value: boolean) => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onlyAccept?: boolean;
  icon?: 'warning' | 'success';
  additionalContent?: JSX.Element;
}
export default function AlertDialog({
  title,
  text,
  open,
  acceptText,
  declineText,
  onClose,
  onAccept,
  onDecline,
  onlyAccept,
  icon,
  additionalContent,
}: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleDecline = () => {
    onClose(false);
    onDecline && onDecline();
  };

  const handleAccept = () => {
    onClose(false);
    onAccept && onAccept();
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      fullWidth={isMobile}
      classes={{ container: classes.container }}
      PaperProps={{ className: classes.paper }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box display="flex">
          <Box width="15%" height="100%">
            {icon && (
              <StatusIcon severity={icon} className={classes.statusIcon} />
            )}
          </Box>
          <DialogContentText variant="body1">{text}</DialogContentText>
        </Box>
        {additionalContent}
      </DialogContent>
      <DialogActions>
        {!onlyAccept && (
          <Button onClick={handleDecline}>{declineText || 'Cancel'}</Button>
        )}
        <Button
          onClick={handleAccept}
          className={classes.acceptButton}
          autoFocus
          focusRipple={false}
        >
          {acceptText || 'Agree'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
