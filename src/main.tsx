import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/global.css';
import App from './app/App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('index.html no tiene el elemento #root');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
