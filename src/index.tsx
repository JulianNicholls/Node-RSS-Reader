import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { FeedsProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <FeedsProvider>
      <App />
    </FeedsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
