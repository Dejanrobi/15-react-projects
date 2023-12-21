import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* enclosing all the children with the App Provider to be able to access the App's Context */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
