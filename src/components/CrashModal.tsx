import * as React from 'react';

import {
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { createStyles, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';

import editorTheme from 'assets/theme/editor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      position: 'absolute',
      top: 5,
      right: 5,
    },
  })
);
interface Props {
  error?: any;
}
export default function CrashModal({ error }: Props): JSX.Element {
  const classes = useStyles();
  const refresh = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    window.location.reload();
  };

  const startChat = () => {
    if ((window as any).Tawk_API) {
      (window as any).Tawk_API.toggle();
    }
  };

  return (
    <MuiThemeProvider theme={editorTheme}>
      <Dialog open={true}>
        <DialogTitle>
          <ErrorIcon color="error" className={classes.icon} fontSize="large" />
          Error
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Oh no! An error occurred!</Typography>
          <Typography gutterBottom>
            If you need help your best bet is to ask in our{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/du4YKzf">
              discord :-)
            </a>{' '}
            {error}
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* <Button variant="outlined" onClick={startChat} color="primary">
          Contact us
        </Button> */}
          <Button variant="contained" onClick={refresh} color="primary">
            Refresh
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
}
