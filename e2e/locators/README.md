# Locators

One JSON file per page (plus `common.json` and `sidebar.json`). Each entry is a flat `"key": "selector"` pair that page objects pass to `page.locator()`.

## Naming convention

Keys are camelCase and start with a prefix for the element type:

| Prefix | Element                                            | Example          |
| ------ | -------------------------------------------------- | ---------------- |
| `btn`  | button                                             | `btnSave`        |
| `txt`  | textbox / textarea                                 | `txtRuleName`    |
| `ddl`  | dropdown (select)                                  | `ddlDepartment`  |
| `chk`  | checkbox                                           | `chkChannel`     |
| `tgl`  | toggle switch                                      | `tglRule`        |
| `tab`  | tab                                                | `tabSeverity`    |
| `lnk`  | link                                               | `lnkNav`         |
| `dlg`  | dialog                                             | `dlgNewRule`     |
| `lbl`  | read-only text (headings, badges, values, messages) | `lblStatus`      |

Containers (`nav`, `rows`, `row`, `card`, `kpi`, ...) have no prefix.

## Selector syntax

- CSS: `".alert-row"`
- Role: `"role=button[name='Save rule']"` (`[name="X"]` matches the whole name; use `[name=/X/]` for a partial match)
- Text filter: `".chip:has-text('QA lead')"` (partial, case-insensitive)
- Scoping: `"A >> B"` finds B inside A
- Placeholders: `{name}` is filled in by the page object via `sel()`, e.g. `"role=tab[name='{severity}']"`
