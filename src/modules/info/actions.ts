import { SnackbarKey } from 'notistack';
import { createAction } from 'typesafe-actions';

import { SnackbarNotification } from 'types/info';

export const enqueueSnackbar = createAction(
  'ENQUEUE_SNACKBAR',
  action => (notification: SnackbarNotification) => action({ notification })
);

export const closeSnackbar = createAction(
  'CLOSE_SNACKBAR',
  action => (key?: string) => action({ dismissAll: !key, key }) // dismiss all if no key has been defined
);

export const removeSnackbar = createAction('REMOVE_SNACKBAR', action => (key: SnackbarKey) =>
  action({ key })
);

export const setTheme = createAction('SET_THEME', action => (theme: 'dark' | 'light') =>
  action({ theme })
);

export const reset = createAction('INFO_RESET');

export const setShowInfoTour = createAction('TOGGLE_INFO_TOUR', action => (show: boolean) =>
  action({ show })
);
