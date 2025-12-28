# Rencana Eksekusi Mendalam: Use Case + ReFactory Arsitektur SBA‑Agentic

## Tujuan
- Menyelaraskan use case prioritas, arsitektur, dan rencana refactory agar pengembangan SBA‑Agentic stabil, terukur, dan mudah diuji.

## Use Case Prioritas
- Login → Dashboard: autentikasi, status sesi, ringkasan metrik dan health.
- Chat Stream Asisten: prompt, respons streaming, unggah konten (teks/gambar/file), riwayat percakapan.
- Upload & Metrics: unggah multi tipe, validasi, ingest metrik ke `/api/metrics/ingest`, verifikasi delta melalui `/api/metrics/prometheus`.
- Observability Operasional: health, baseline assertions di E2E, widget dashboard untuk simpan baseline.

## Aktor
- Pengguna Aplikasi (Business Operator)
- Frontend (Next.js App Router)
- Backend (API + Prisma/Postgres)
- Orkestrator Agent (pipelines/konten)
- Observability & CI (Prometheus/OTel/Playwright/GitHub Actions)

## Arsitektur & Boundary
- Frontend (`apps/web`, `apps/app`): halaman App Router, komponen UI, halaman global error/not‑found/loading, widget baseline.
- Backend (`apps/api`): endpoint bisnis, akses data via Prisma, guard/middleware untuk Auth.
- Shared: tipe/util, lapisan stub untuk layanan environment‑dependent (Redis, Supabase, OTel) saat testing.
- Observability: routes metrics (`/api/metrics/prometheus`, `/api/metrics/ingest`, `/api/metrics/baseline`), parser, helper, Playwright assertions.

## Diagram Alur (Deskriptif)
- Auth: User login → validasi → buat sesi/token → navigasi ke dashboard.
- Chat: Input → proses agent → streaming → tampilkan di UI → catat metrik.
- Upload: Pilih file → validasi → kirim → proses → ingest metrik → tampilkan status.
- Metrics: Ambil Prometheus → bandingkan baseline → laporkan delta → simpan baseline bila perlu.

## Rencana Refactory
- ESM `next.config.mjs` dan alias/stub untuk isolasi frontend dari paket backend.
- Konsistensi `tsconfig.*` dan konfigurasi vitest/playwright; modul alias untuk paket internal.
- Stubbing layanan eksternal saat test; guard runtime untuk produksi saja.
- Dokumentasi teknis, standar kode, dan otomasi lint/type‑check/test/build.

## Dependensi Utama
- pnpm workspaces, Turborepo; Next.js App Router; Prisma/Postgres; Redis/BullMQ; Socket.IO; Supabase; OpenTelemetry; Prometheus; Vitest; Playwright; GitHub Actions.

## Risiko & Mitigasi
- Ketergantungan lingkungan → stub & guard; env aman di test.
- Flakiness E2E → webServer build+start, wait‑on, reporter konsisten; baseline delta yang jelas.
- Konflik artefak baseline CI → penamaan artefak bercabang dan `concurrency` opsional.

## Urutan Eksekusi
- Fondasi & isolasi modul → Auth↔Prisma → Observability & baseline → E2E → CI artefak baseline → UI polish & performa.

## Kriteria Penerimaan
- Build stabil, type‑safe; E2E lulus dengan delta metrik sesuai; widget baseline berfungsi; artefak baseline tersimpan di CI.

