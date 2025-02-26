import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './global.css';

// Initialisation de Supabase
import './lib/supabase';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);