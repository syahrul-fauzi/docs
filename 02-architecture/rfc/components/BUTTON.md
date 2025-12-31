---
title: "Button Component Specification"
created_at: 2025-12-28
author: UI/UX Team
status: active
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
