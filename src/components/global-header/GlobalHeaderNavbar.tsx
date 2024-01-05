import React, { useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { appStore, loginStore } from '../../stores';
import { CustomizedSnackbars } from '../errorSnackBar';

export const GlobalHeader: React.FC = observer(() => {
  const onClickLogoutHandler = useCallback(
    (): Promise<void> => loginStore.logoutUser(),
    [],
  );
  return (
    <>
      <CustomizedSnackbars />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODOLIST
          </Typography>
          {loginStore.login.isLoggedIn && (
            <Button color="inherit" onClick={onClickLogoutHandler}>
              LOG OUT
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%' }}>
        {appStore.status === 'loading' && (
          <LinearProgress /* variant="determinate" value={progress} */ />
        )}
      </Box>
    </>
  );
});
