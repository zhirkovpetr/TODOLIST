import React, { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { appStore } from '../../stores';
import { GlobalHeader } from '../global-header/GlobalHeaderNavbar';

import './App.css';

export type FilterType = 'All' | 'Active' | 'Completed';

export const App: React.FC = observer(() => {
  useEffect(() => {
    appStore.setMe();
  }, []);

  if (!appStore.isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="todolist-block">
      <GlobalHeader />
      <Container fixed>
        <Outlet />
      </Container>
    </div>
  );
});
