import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { FeedsProvider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <React.StrictMode>
    <FeedsProvider>
      <App />
    </FeedsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
