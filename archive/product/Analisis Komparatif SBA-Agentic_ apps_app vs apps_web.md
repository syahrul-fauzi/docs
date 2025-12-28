# Analisis Komparatif SBA-Agentic: apps/app vs apps/web

## Ringkasan Eksekutif

- apps/app berfungsi sebagai aplikasi utama App Router dengan middleware keamanan, RBAC, observability dan integrasi Supabase.
- apps/web berperan sebagai aplikasi web tambahan yang memanfaatkan SDK observability, rute API khusus (health/metrics/csp-report/chat) dan integrasi audit/rate-limit.
- Keduanya selaras dengan visi SBA-Agentic: asisten bisnis otonom dengan kontrol akses, observability berlabel tenant, dan UX yang konsisten.

## 1. Objective Requirements

- Tujuan bisnis
  - apps/app: portal inti operasional; stabilitas, keamanan (CSP, rate limit), metrik latensi p95/p99, error rate ≤0.5%.
  - apps/web: dashboard/feature‑specific; pengayaan analitik (heatmap, metrics), percobaan fitur dan integrasi.
- Tujuan teknis
  - apps/app: App Router tersentralisasi, middleware guard (RBAC, ensureTenantHeader), observability exporter, Supabase factories.
  - apps/web: SDK observability web, validasi timestamp/JWT, audit logging, rate‑limit rute sensitif.
- KPI
  - p95 ≤ 500ms; error ≤ 0.5%; cakupan test kritis ≥ 80%; konsistensi RBAC; a11y baseline.
- Konsistensi
  - Kedua platform melengkapi: apps/app sebagai core; apps/web sebagai satelit dengan fitur analitik dan percobaan.

## 2. Use Case Implementasi

- Aktor: End‑User, Admin/Owner, Ops/QA.
- Use Case utama
  - Observability metrics: UI membaca `sba_latency_p95_seconds/p99` (apps/app) dan teks Prometheus (apps/web).
  - Security & RBAC: akses rute API dibatasi per role (analytics:read, agent:run).
  - Analytics Heatmap: tracker klik → `POST /api/analytics/heatmap` (apps/app), konsumsi metrik di apps/web.
  - Audit & Rate‑Limit: webhook audit penerima (apps/web), rate limit chat, health.
- User Flow perbedaan
  - apps/app: App Router + middleware global; halaman sistem; fokus core UX.
  - apps/web: rute API tematik (health/metrics/csp-report/chat) dengan validasi header, rate limit, audit.

## 3. Functional Requirements

- Fitur utama & prioritas
  - Keamanan: CSP nonce, security headers, rate limit Upstash (apps/app); JWT/timestamp & HMAC webhook (apps/web).
  - RBAC: guard `withRBAC` lintas rute; audit allow/deny.
  - Observability: `withMetrics` dan ekspor Prometheus/OTel (apps/app); SDK web untuk konsumsi (apps/web).
  - Supabase: factories SSR/browser; penyimpanan audit (apps/web) + query endpoint.
- Perbedaan teknis
  - apps/app: middleware global, exporter metrics server‑side.
  - apps/web: util web (security.ts), rate‑limit in‑memory, audit sender/receiver.
- Konsistensi & gap
  - Konsistensi: tenant header, RBAC roles/permissions.
  - Gap: standar lintas rute untuk format error; penyatuan rate‑limit store; harmonisasi audit schema.

## 4. Integrasi Sistem

- Komunikasi & sinkronisasi
  - UI tracker → API heatmap; metrics → Prometheus; audit webhook → penyimpanan Supabase.
  - Tenant header wajib; RBAC guard; timestamp/JWT validasi.
- Eksternal & performa
  - Prometheus/OTel scraping; Sentry opsional; bottleneck potensial pada limit 429 dan jalur audit.

## 5. Dokumentasi

- Workspace `_xref.md` menyajikan PRD/Arsitektur/Flows/API dengan RACI dan checklist; perlu menambah tautan apps/web spesifik.
- README & docs mendeskripsikan keamanan/observability/testing/go‑live; selaras untuk apps/app; apps/web memerlukan penguatan referensi komponen baru.

## 6. Matriks Perbandingan (ringkas)

- Keamanan: apps/app (CSP, Upstash) | apps/web (JWT/Timestamp, HMAC audit)
- RBAC: konsisten roles/permissions
- Observability: server exporter (app) | web SDK & konsumsi (web)
- Data: Supabase factories (app) | audit storage & query (web)
- UX/a11y: App Router sistem pages (app) | panel runs/agents (web)

## 7. Rekomendasi & Roadmap

- Standardisasi rate‑limit dan audit schema lintas platform.
- Konsolidasi error response & a11y lint/pattern.
- KPI tracking lintas platform dengan dashboard terpusat.
- Roadmap: audit → refactor guard → observability alignment → docs sync → UAT → canary.

## Lampiran

- Referensi file/line: README (7–14, 79–99, 86–94, 126–159), docs README (22–31, 33–49, 67–80), workspace `_xref.md` (41–66, 98–126).
