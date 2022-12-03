import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);


