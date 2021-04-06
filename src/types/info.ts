import { SnackbarMessage, OptionsObject, VariantType, SnackbarKey } from 'notistack';

export interface SnackbarNotification {
  message: SnackbarMessage;
  dismissed?: boolean;
  options?: OptionsObject;
  key?: SnackbarKey;
  variant?: VariantType;
}
