---
id: architecture.rfc.components.button
version: 1.0.0
author: UI/UX Team
status: active
scope: global
tags: [rfc, ui, components, button]
---

# Button Component Specification

- Tujuan: menyediakan aksi utama/sekunder konsisten berbasis tokens.
- API:
  - `variant`: `primary | secondary | ghost`
  - `size`: `sm | md | lg`
  - `state`: `default | loading | disabled`
  - `iconLeft`/`iconRight`: optional Icon
- A11y:
  - `aria-busy` saat loading, fokus ring, kontrast AA.
- States:
  - hover/focus/active/disabled/loading.
- Perf: hindari re-render berlebih; gunakan memo untuk icon slots.
- Open Questions: integrasi dengan form submit; i18n RTL paddings.
