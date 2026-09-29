import { Outlet } from 'react-router-dom';
import { DemoBanner } from './DemoBanner';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <DemoBanner />
        <Outlet />
      </main>
    </div>
  );
}
