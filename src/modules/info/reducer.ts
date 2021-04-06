import produce from 'immer';
import { ActionType, getType } from 'typesafe-actions';

import * as ProjectActions from '../project/actions';
import * as Actions from './actions';
import { SnackbarNotification } from 'types/info';

export interface InfoState {
  notifications: SnackbarNotification[];
  showInfoTour: boolean;
  theme: 'dark' | 'light';
}

const initState: InfoState = {
  notifications: [],
  showInfoTour: false,
  theme: 'dark',
};

type Action = ActionType<typeof Actions & typeof ProjectActions>;

const reducer = produce((draft: InfoState, action: Action) => {
  switch (action.type) {
    case getType(Actions.enqueueSnackbar): {
      const { notification } = action.payload;
      if (notification.variant) {
        notification.options = {
          ...notification.options,
          variant: notification.variant,
        };
      }
      const key = notification.options && notification.options.key;
      draft.notifications.push({
        ...notification,
        key: key || (notification.message as string),
      });

      return;
    }

    case getType(Actions.closeSnackbar): {
      const { key, dismissAll } = action.payload;
      draft.notifications = draft.notifications.map(notification =>
        dismissAll || notification.key === key
          ? { ...notification, dismissed: true }
          : { ...notification }
      );
      return;
    }

    case getType(Actions.removeSnackbar): {
      const { key } = action.payload;
      draft.notifications = draft.notifications.filter(
        notification => notification.key !== key
      );
      return;
    }

    case getType(Actions.setTheme): {
      const { theme } = action.payload;
      draft.theme = theme;
      return;
    }

    case getType(Actions.setShowInfoTour): {
      const { show } = action.payload;
      draft.showInfoTour = show;
      return;
    }

    case getType(Actions.reset): {
      return initState;
    }
    default:
      break;
  }
}, initState);

export default reducer;
