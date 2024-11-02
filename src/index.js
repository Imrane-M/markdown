import React from 'react';
import { createRoot } from 'react-dom/client'; // importez createRoot au lieu de ReactDOM.render
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // créez la racine avec createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
