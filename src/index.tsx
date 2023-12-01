import React from 'react';

import ReactDOM from 'react-dom/client';

import { App } from './app/App';
import TodolistStore from './stores/todolist-store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App todolistsStore={new TodolistStore()} />);
