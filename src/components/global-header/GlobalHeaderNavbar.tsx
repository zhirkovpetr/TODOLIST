import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import { ROUTERS } from '../../constants/constants';
import { appStore } from '../../stores';
import { CustomizedSnackbars } from '../errorSnackBar';

export const GlobalHeader: React.FC = observer(() => (
  <>
    <CustomizedSnackbars />
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TODOLIST
        </Typography>
        <NavLink
          to={ROUTERS.LOGIN}
          className={({ isActive }) => (isActive ? 's.active' : '')}
        >
          LOGIN
        </NavLink>
      </Toolbar>
    </AppBar>
    <Box sx={{ width: '100%' }}>
      {appStore.status === 'loading' && (
        <LinearProgress /* variant="determinate" value={progress} */ />
      )}
    </Box>
  </>
));
