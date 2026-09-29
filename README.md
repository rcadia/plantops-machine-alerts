# PlantOps · Machine Alerts

React implementation of the Claude Design handoff "Machine Alerts & Capacity Dashboard".

```sh
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Pages
- `/dashboard`: machine capacity vs. alert threshold, plus part and consumable life
- `/alerts`: alert feed with a department filter and acknowledge
- `/rules` (Admin only): department routing rules and the "Add rule" modal
- `/channels` (Admin only): channel toggles, message template, and a live email/chat/SMS preview

## Structure
```
src/
  app/            router, layout, sidebar, demo banner, app state (context)
  pages/          Dashboard, Alerts, Rules, Channels
  components/     MachineCard, CapacityBar, PartLifeRow, AlertRow, RuleRow, RuleModal, ChannelCard, MessagePreview
  components/ui/  ported Demo IQ design-system components
  api/            sample data (swap for real endpoints)
  lib/            template fill, severity, machine status helpers
  styles/ds/      design-system tokens + component CSS (from the handoff)
```

## Before production
- Remove `DemoBanner` and the Admin/User role switch in `Sidebar`. Take the role from auth instead.
- Replace the sample data in `src/api/` with real endpoints: `GET /machines`, `GET /alerts`, `POST /alerts/:id/ack`, `GET/POST/PATCH /rules`, `GET/PATCH /channels`, `GET/PUT /templates/:event`. `@tanstack/react-query` is a good fit for polling live machine status.
