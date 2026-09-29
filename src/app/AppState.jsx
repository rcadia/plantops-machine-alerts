import { createContext, useContext, useMemo, useState } from 'react';
import { ALERTS } from '../api/alerts';
import { CHANNELS, DEFAULT_TEMPLATE } from '../api/channels';
import { RULES } from '../api/rules';

// Client-side state for the prototype. In production, `role` comes from auth and
// acked / rules / channels / template are server state (fetch + mutate via api/).
const AppStateContext = createContext(null);

// The department a "User" belongs to in the mock.
export const USER_DEPT = 'Maintenance';

export function AppStateProvider({ children }) {
  const [role, setRoleState] = useState('Admin');
  const [deptFilter, setDeptFilter] = useState('All');
  const [acked, setAcked] = useState({});
  const [rules, setRules] = useState(RULES);
  const [channels, setChannels] = useState(CHANNELS);
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);

  const value = useMemo(() => {
    const isAdmin = role === 'Admin';
    const visibleAlerts = isAdmin ? ALERTS : ALERTS.filter((a) => a.dept === USER_DEPT);
    return {
      role,
      isAdmin,
      setRole: (next) => {
        setRoleState(next);
        setDeptFilter('All');
      },
      deptFilter,
      setDeptFilter,
      visibleAlerts,
      openAlertCount: visibleAlerts.filter((a) => !acked[a.id]).length,
      acked,
      ackAlert: (id) => setAcked((s) => ({ ...s, [id]: true })),
      rules,
      addRule: (rule) => setRules((rs) => [...rs, { ...rule, id: Math.max(0, ...rs.map((r) => r.id)) + 1, enabled: true }]),
      toggleRule: (id) => setRules((rs) => rs.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))),
      channels,
      toggleChannel: (name) => setChannels((c) => ({ ...c, [name]: !c[name] })),
      template,
      setTemplate: (patch) => setTemplate((t) => ({ ...t, ...patch })),
    };
  }, [role, deptFilter, acked, rules, channels, template]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used inside <AppStateProvider>');
  return ctx;
}
