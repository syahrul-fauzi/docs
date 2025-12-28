---
title: Endpoint Security Guidelines for SBA-Agentic
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [security, endpoints, rbac, tls]
---

# Endpoint Security Guidelines

## Prinsip Umum

- Gunakan TLS untuk semua akses publik.
- Jangan hard‑code secrets; gunakan environment/secret manager.
- Terapkan RBAC: admin untuk endpoint observability tertentu.

## Guard & Roles

- API `/metrics` — hanya `admin` (JwtAuthGuard + RolesGuard)
- API `/metrics/workers` — hanya `admin` (JwtAuthGuard + RolesGuard)
- API `/metrics/workers/history` — hanya `admin` (JwtAuthGuard + RolesGuard)
- Web `/api/metrics/prometheus` — dev/testing; lindungi di produksi via allowlist atau auth.

### Kategori Endpoint

- System-level endpoints: tidak memerlukan header `X-Tenant-ID`, wajib auth sesuai peran
  - `GET /metrics` → `JwtAuthGuard` + `RolesGuard` + `@Roles('admin')`
  - `GET /metrics/workers` → `JwtAuthGuard` + `RolesGuard` + `@Roles('admin')`
  - `GET /metrics/workers/history` → `JwtAuthGuard` + `RolesGuard` + `@Roles('admin')`
  - `GET /health` → `JwtAuthGuard` + `RolesGuard` + `@Roles('user','admin')`

- Tenant-bound endpoints: wajib urutan guard `TenantGuard → JwtAuthGuard → RolesGuard`
  - Tools API (`/api/v1/tools/*`) → lihat controller untuk rincian peran
  - Runs API (`/api/v1/runs/*`) → `@Roles('user','admin')`
  - Sessions API (`/api/v1/sessions/*`) → `@Roles('user','admin')`
  - Storage Upload (`/api/v1/storage/*`) → guard termasuk `RateLimitGuard` sesuai controller

## Authorization via Reverse Proxy

- Gunakan reverse proxy untuk menambahkan header Authorization saat scrape Prometheus:
  - Nginx: `ops/proxy/nginx-prometheus-auth.conf`
  - Apache: `ops/proxy/apache-prometheus-auth.conf`
- Token admin diinjeksikan via env `PROM_AUTH_TOKEN`; jangan commit ke repo.

## Rate Limiting & Anti‑Abuse

- Aktifkan rate limiting di API untuk endpoint publik; kembalikan `429` JSON konsisten.
- Terapkan input validation ketat dan sanitasi.

## Header Keamanan

- Tambahkan `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Content-Security-Policy` sesuai kebutuhan.

## Firewall & Network

- Allowlist IP Prometheus untuk port reverse proxy TLS (contoh iptables pada `ops/proxy/README.md`).
- Tempatkan exporter internal pada jaringan privat.

## Audit & Logging

- Log akses ke endpoint admin; simpan metadata (user, waktu, resource).
- Review berkala izin dan peran; terapkan prinsip least privilege.

## Troubleshooting Keamanan

- 401/403: periksa token dan role.
- Panel kosong: cek job scrape, label `job`/`queue_name` dan akses proxy.
- 5xx: periksa upstream health dan konfigurasi firewall/proxy.

## Rate Limiting

- Alerts/Notifications/Workflows/Knowledge upsert: enforce token bucket or fixed window limits per tenant and IP.
- Return `429 Too Many Requests` with retry hints.

## Security Headers

- Add `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy` minimal, `X-Frame-Options: DENY`, CSP ketat, dan `Strict-Transport-Security` di production.

## RBAC

- All mutation endpoints require valid auth and role checks; deny by default.
- Use `withRBAC` wrapper for App routes; in dev-only bypass dapat dihapus di production.
- Production: cookie role diabaikan, hanya session (server) yang dipakai.

## Input Validation

- Validate JSON schemas on POST endpoints; bound payload sizes; sanitize strings.

## OWASP Top 10 Considerations

- Injection: parameterize DB queries; avoid string concatenation.
- Broken Auth: require session tokens; enforce role scopes.
- Sensitive Data: do not log secrets; use HTTPS; redact PII.
- SSRF/XSS: apply strict fetch allowlists; encode outputs; use CSP.
- Security Misconfig: consistent headers; secrets managed via env.

## Monitoring & Audit

- Log security-relevant events; export Prometheus metrics for rate-limit, auth failures.
