import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* enclosing the entire App with the AppContext in order to access the app's context, meaning the context can be accessed within these children */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
