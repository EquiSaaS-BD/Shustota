## 2024-05-18 - Missing ARIA labels on top navigation components
**Learning:** Found a recurring pattern in the app where icon-only buttons like "Notifications", "Toggle menu", and inline table actions ("Edit", "Delete") lack `aria-label` attributes. This causes screen readers to have difficulty interpreting what the button does.
**Action:** Always ensure that any button containing only an icon has a descriptive `aria-label` attribute, especially in navigation headers and data table actions.
