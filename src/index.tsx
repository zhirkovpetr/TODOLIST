import React from 'react';

import ReactDOM from 'react-dom/client';

import { App } from './components/app';
import { TodolistStore } from './stores/index';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App todolistsStore={new TodolistStore()} />);
