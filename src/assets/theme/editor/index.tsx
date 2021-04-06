import { Theme } from '@material-ui/core';

import { DARK_MODAL_BG } from './editorColors';
import editorTheme from './editorTheme';

export const modalOverlay = (theme: Theme) => ({
  width: 800,
  height: 800,
  background: DARK_MODAL_BG,
  border: `1px solid ${theme.palette.border.main}`,
});

export default editorTheme;
