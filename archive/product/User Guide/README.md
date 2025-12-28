# SBA-Agentic User Guide

## 1. Pendahuluan

- Tujuan: Membantu pengguna dan operator menginstall, mengkonfigurasi, dan menggunakan SBA-Agentic secara efektif.
- Audiens: Pengguna bisnis, admin/staff IT, developer integrasi.

## 2. Panduan Instalasi dan Konfigurasi

- Prasyarat:
  - Node.js LTS, pnpm
  - Akses ke Supabase (URL, ANON KEY)
  - Upstash Redis (REST URL, TOKEN) untuk rate limiting
- Instalasi:
  - `pnpm install`
  - Jalankan dev: `pnpm --filter @sba/app dev`
- Konfigurasi env:
  - `NEXT_PUBLIC_APP_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
- Keamanan:
  - Middleware CSP + nonce aktif
  - Header keamanan di Next config

## 3. Petunjuk Penggunaan Lengkap

- Login: `/auth/login`
- Dashboard: `/dashboard` — melihat statistik agent, aktivitas terkini
- Agents:
  - Buat agent: `/agents/new`
  - Chat dengan agent: `/agents/[id]/chat`
- Analytics: `/analytics` — metrik sukses/gagal, durasi, biaya, token
- Knowledge: `/knowledge` — ingest & list sumber pengetahuan; fitur pencarian dengan rencana agentic (expand → parallel → rerank → merge)
- Run Controls: `/run-controls` — melihat logs dan status run

## 4. Contoh Kasus Penggunaan

- Customer Support Agent: tangani percakapan, beri rekomendasi, eskalasi melalui interrupts
- Workflow Otomasi Dokumen: generate dokumen, approval via interrupts, logging meta-events
- Analitik Operasional: pantau p95/p99, error rate, throughput via `/api/metrics` dan halaman analytics

## 5. Troubleshooting Umum

- Build gagal karena lint: gunakan `eslint.ignoreDuringBuilds: true` (sudah diset) atau perbaiki konfigurasi parser TS.
- Error cookies di build: supabase server client sudah aman dengan fallback; jika perlu set `export const runtime = 'nodejs'` pada route API yang memerlukan Node API.
- Rate limit error di dev/test: middleware fallback ke `rate_limit_unavailable` (status 200) agar tidak memblok.
- Ikon tak tersedia: pastikan ikon `lucide-react` valid dan diimpor sesuai.

## 6. API Runtime Requirements (nodejs)

- Ditandai di kode dengan komentar: `// Runtime Requirement: nodejs ...` dan deklarasi `export const runtime = 'nodejs'`.
- Daftar API bertanda nodejs:
  - `/api/tenants/[id]`
  - `/api/metrics/prometheus`
  - `/api/analytics/metrics`
  - `/api/agent/control`
  - `/api/proxy/agui/[...path]`
- Dependensi Node.js spesifik:
  - `@supabase/ssr` (cookies/headers SSR)
  - Streaming `ReadableStream`, manipulasi `Headers`

## 7. Pemeriksaan Pra-Produksi

- Pastikan seluruh API bertanda nodejs memiliki komentar dan deklarasi runtime.
- Verifikasi build produksi (`pnpm --filter @sba/app build`) sukses.
- Jalankan smoke test di staging dan cek metrik `/api/metrics`.

---

## Lampiran: Dokumentasi API Runtime Node.js

- API yang membutuhkan Node API (SSR Supabase, akses cookies/headers) harus diberi `runtime = 'nodejs'` dan didokumentasikan:
  - `/api/tenants/[id]` — `export const runtime = 'nodejs'`
  - `/api/metrics/prometheus` — bergantung pada `@supabase/ssr` dan filesystem/Node headers
  - `/api/analytics/metrics` — menggunakan `@supabase/ssr`
- Komentar khusus ditambahkan di file terkait di atas deklarasi ekspor:
  - `// Runtime Requirement: nodejs — uses @supabase/ssr and Node APIs`

## Dependensi Node.js Spesifik

## 8. Fitur Knowledge Search (Agentic)

- Endpoint: `GET /api/knowledge/search?q=<query>`
- Respons: `{ ok: boolean, hits: Array<{id,title,snippet}>, plan: Array<{step,status}> }`
- UI: form pencarian dengan hasil dan panel "Retrieval Plan".
- Cara pakai:
  - Buka `/knowledge`
  - Isi kolom "Knowledge query" lalu klik "Search"
  - Lihat hasil dan rencana pengambilan di dua panel terpisah

- `@supabase/ssr` (mengakses cookies/headers Next via Node)
- Integrasi observability (opentelemetry/sentry) yang berjalan di environment Node

## Checklist Identifikasi Runtime Node.js

- Cari penggunaan `@supabase/ssr.createServerClient`, `cookies()` dari `next/headers`, atau akses khusus Node.
- Tandai dengan komentar dan, jika perlu, `export const runtime = 'nodejs'`.
- Verifikasi build dan jalur eksekusi API berjalan di runtime Node.
