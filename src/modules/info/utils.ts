import { VariantType } from 'notistack';

import { enqueueSnackbar } from './actions';
import { store } from '../../storeProvider';

export const showSnackbar = (message: string, variant: VariantType) => {
  store.dispatch(
    enqueueSnackbar({
      message,
      variant,
    })
  );
};
