---
id: security.security.rbac
version: 1.0.0
author: Security Team
status: active
scope: global
tags: [security, rbac, schema]
---

# RBAC Schema

- Roles: `admin`, `user`, `owner`, `member`, `viewer`, `guest`.
- Permissions:
  - `analytics.read`
  - `run.read`, `run.create`, `run.update`
  - `agent.run`

Mapping:

- `admin`: semua di atas.
- `user`, `owner`, `member`: `analytics.read`.
- `viewer`, `guest`: tidak ada.

Penerapan:

- Web API routes menggunakan helper `withRBAC(resource, action)` untuk gating.
- API (NestJS) menggunakan `JwtAuthGuard` + `RolesGuard` dan decorator `@Roles(...)`.

Audit:

- Akses ditolak: tulis event audit dengan `status=forbidden` dan metadata (tenant, endpoint, userId).
- Akses diizinkan: tulis event audit dengan `status=allowed`.
