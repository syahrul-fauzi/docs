---
title: Apps Comparison - apps/app vs apps/web
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [product, comparison, apps-app, apps-web, architecture]
---

# Analisis Komparatif SBA-Agentic: apps/app vs apps/web

## 1. Objective Requirements

- **Bisnis**: `apps/app` sebagai portal operasional inti; `apps/web` untuk analitik/eksperimen fitur.
- **Teknis**: App Router + middleware (CSP, RBAC, metrics) vs rute API tematik (health/metrics/csp-report/chat) dengan JWT/timestamp, HMAC, rate‑limit, audit.
- **KPI**: p95 ≤500ms, error ≤0.5%, coverage ≥80%, RBAC konsisten, a11y baseline.
- **Keselarasan**: keduanya mendukung visi asisten otonom, observability tenant, kontrol akses.

## 2. Use Case Implementasi

- **Aktor**: End‑User, Admin, Ops.
- **Use Case kunci**:
  - **Observability Metrics**: `apps/app` UI baca p95/p99; `apps/web` fetch teks Prometheus untuk dashboard.
  - **Security & RBAC**: Guard `withRBAC` per rute; audit allow/deny; cookie test untuk dev.
  - **Analytics Heatmap**: Tracker klik → `POST /api/analytics/heatmap`.
  - **Audit & Rate‑Limit**: Webhook audit (HMAC) & rate‑limit chat/health; audit storage Supabase.

## 3. Functional Requirements

- **Fitur per platform**:
  - `apps/app`: CSP nonce, security headers, Upstash RL, RBAC, withMetrics, Supabase factories.
  - `apps/web`: JWT/timestamp, verify HMAC, rate‑limit util, audit sender/receiver, observability SDK web.
- **Arsitektur & Stack**: `apps/app` exporter server, middleware global; `apps/web` util web, in‑memory limiter, webhook receiver.

## 4. Integrasi Sistem

- **Komunikasi**: UI → App Router API; tracker heatmap; metrics scraping; audit webhook.
- **Sinkronisasi data**: tenant header; audit logs; metrik p95/p99.
- **Integrasi eksternal**: Prometheus/OTel, Sentry, Supabase DB.

## 5. Matriks Perbandingan

| Area | apps/app | apps/web | Catatan |
| :--- | :--- | :--- | :--- |
| Keamanan | CSP, Upstash RL | JWT/timestamp, HMAC webhook | Selaras |
| RBAC | withRBAC global | withRBAC per rute | Konsisten roles/permissions |
| Observability | withMetrics server | SDK web, fetch prom/json | Target KPI sama |
| Data | Supabase factories | Audit storage & query | Harmonisasi schema |

## 6. SWOT Analysis

- **Strengths**: Keamanan kuat, observability matang, RBAC konsisten.
- **Weaknesses**: Standarisasi error/limit lintas platform belum 100%.
- **Opportunities**: Dashboard KPI lintas platform, shared utilities.
- **Threats**: Beban audit spikes, 429 flakiness.

## 7. Rekomendasi Strategis

1. Konsolidasi guard/middleware ke shared package.
2. Harmonisasi audit schema dan format error.
3. Dashboard KPI lintas platform dengan alert rules.
