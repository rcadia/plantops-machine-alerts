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

## E2E tests
```
e2e/
-- locators = JSON files of selectors, one per page
-- pages    = page object models (actions and elements, built from locators)
-- tests    = spec files, grouped by page
```

## CI/CD
[`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) builds the app in GitHub Actions, then deploys it with the Vercel CLI:
- Pull request to `main`: build, then a **preview** deploy
- Push to `main`: build, then a **production** deploy
