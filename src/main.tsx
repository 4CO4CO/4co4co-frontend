// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
import MVP from './pages/handInteraction/MVP.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <MVP />,
  // </StrictMode>,
);
