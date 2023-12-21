import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* enclosing the entire app with the AppProvider (children where the entire app context can be accessed.) */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
