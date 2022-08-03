import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';

import './styles/normalize.scss';
import './styles/scroll.scss';
import './styles/general.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

