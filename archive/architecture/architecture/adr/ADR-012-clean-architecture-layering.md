---
title: ADR-012 — Clean Architecture Layering & DI
status: Proposed
date: 2025-12-10
---

Context

- Perlu pemisahan concerns untuk skalabilitas dan maintainability lintas apps.

Decision

- Terapkan layering: presentation, application, domain, infrastructure.
- Gunakan interface contracts dan DIP untuk dependency injection.
- Sediakan adapter bridge untuk refactor bertahap tanpa mematahkan publik API.

Consequences

- Struktur konsisten, testable, dan memudahkan ekstensi fitur.
- Membutuhkan penyesuaian path alias dan panduan kontribusi.
