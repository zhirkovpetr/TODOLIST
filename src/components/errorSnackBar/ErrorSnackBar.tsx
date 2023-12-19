import * as React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { observer } from 'mobx-react-lite';

import appStore from '../../stores/app-store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const CustomizedSnackbars = observer((): React.ReactElement => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    appStore.setError(null);
  };

  return (
    <Snackbar
      open={appStore.error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {appStore.error}
      </Alert>
    </Snackbar>
  );
});
