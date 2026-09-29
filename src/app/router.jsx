import { createBrowserRouter, Navigate } from 'react-router-dom';
import Alerts from '../pages/Alerts';
import Channels from '../pages/Channels';
import Dashboard from '../pages/Dashboard';
import Rules from '../pages/Rules';
import { useAppState } from './AppState';
import { Layout } from './Layout';

function AdminOnly({ children }) {
  const { isAdmin } = useAppState();
  return isAdmin ? children : <Navigate to="/dashboard" replace />;
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'alerts', element: <Alerts /> },
      { path: 'rules', element: <AdminOnly><Rules /></AdminOnly> },
      { path: 'channels', element: <AdminOnly><Channels /></AdminOnly> },
      { path: '*', element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);
