---
title: Design Tokens — Workspace
version: 1.0.0
created_at: 2025-12-06
last_modified: 2025-12-06
changelog:
  - 2025-12-06: initial tokens directory and sync guide
owner: lead@sba
author: team@sba
reviewer: qa@sba
approver: pm@sba
status: Draft
priority: P2
tags: [design-system, tokens]
---

# Design Tokens

- Format: Style Dictionary JSON (design → semantic tokens).
- Sinkronisasi: diekspor dari Figma API → normalisasi → commit di folder ini.
- Konsumsi: diubah ke `packages/ui/src/theme` via transform script.

## Struktur File

- `color.json` — palet warna (brand, semantic).
- `typography.json` — font, size, line-height.
- `spacing.json` — scale spacing.
- `radius.json` — corner radius.
- `shadow.json` — elevation/shadows.
