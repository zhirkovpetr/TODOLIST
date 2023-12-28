import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { GlobalHeader } from '../global-header/GlobalHeaderNavbar';

import './App.css';

export type FilterType = 'All' | 'Active' | 'Completed';

export const App: React.FC = observer(() => (
  <div className="todolist-block">
    <GlobalHeader />
    <Container fixed>
      <Grid container spacing={10}>
        <Outlet />
      </Grid>
    </Container>
  </div>
));
