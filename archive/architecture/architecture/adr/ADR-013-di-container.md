---
title: ADR-013 — Dependency Injection Container
status: Proposed
date: 2025-12-10
---

Context

- Diperlukan mekanisme DI konsisten lintas apps untuk menghubungkan ports/adapters.

Decision

- Gunakan container ringan berbasis registry/factory untuk dev/test/prod.
- Registrasi service pada boundary `application` dengan dependency ke `infrastructure` melalui interfaces.

Consequences

- Memudahkan swapping implementasi (mis. Redis ↔ in-memory) tanpa ubah call site.
- Perlu panduan kontribusi dan contoh registrasi per environment.
