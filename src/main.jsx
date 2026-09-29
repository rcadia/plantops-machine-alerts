import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppStateProvider } from './app/AppState';
import { router } from './app/router';
import './styles/ds/styles.css';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  </StrictMode>,
);
