import { Bell, LayoutGrid, MessageSquare, Split } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Segmented } from '../components/ui';
import { useAppState } from './AppState';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', Icon: LayoutGrid },
  { to: '/alerts', label: 'Alerts', Icon: Bell },
  { to: '/rules', label: 'Routing rules', Icon: Split, adminOnly: true },
  { to: '/channels', label: 'Channels', Icon: MessageSquare, adminOnly: true },
];

export function Sidebar() {
  const { isAdmin, role, setRole, openAlertCount } = useAppState();
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-tile" />
        <div className="brand-text">
          <span className="brand-name">PlantOps</span>
          <span className="brand-sub">PLANT 2 · LINE A–C</span>
        </div>
      </div>
      <nav className="nav">
        <span className="nav-label">NEW FEATURES</span>
        {NAV.filter((n) => isAdmin || !n.adminOnly).map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => 'nav-item' + (isActive ? ' is-active' : '')}>
            <Icon size={18} strokeWidth={2.2} />
            <span className="nav-item-label">{label}</span>
            {to === '/alerts' && openAlertCount > 0 && <span className="count-pill">{openAlertCount}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span className="mono-label">SIGNED IN AS</span>
        <span className="signed-in">Ross Bendal · {role}</span>
        {/* Demo-only role switch; derive role from auth in production. */}
        <Segmented items={['Admin', 'User']} value={role} onChange={setRole} style={{ display: 'flex' }} />
      </div>
    </aside>
  );
}
