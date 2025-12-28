# GO-LIVE CHECKLIST — SBA-Agentic

## Pra-Rilis (Konfigurasi & Lingkungan)

- Pastikan `.env` berisi minimal: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- Supabase: gunakan factories internal `@sba/supabase/clients/client` (browser) dan `@sba/supabase/clients/server` (SSR); tidak ada hardcode URL/key di kode klien.
- Jalankan verifikasi rahasia: `pnpm run ci:guard` (harus hijau).
- **Automated Check**: Jalankan `./scripts/verify-release.sh` untuk validasi otomatis.

## Build, Type-Check, Testing

- Build semua aplikasi yang relevan: `pnpm -r --parallel --filter apps/* build`.
- Type-check hijau lintas `apps/*` dan `packages/*`: `pnpm -r type-check`.
- Testing lulus tanpa flakiness: `pnpm -r test`; cakupan paket kritis ≥ 80% (statements/branches/functions/lines).

## Keamanan

- CSP active nonce; tidak ada inline script tanpa nonce.
- Rate limiting Upstash aktif (bucket publik vs auth) dan env produksi terpasang.
- RBAC aktif; verifikasi akses berdasarkan peran/tenant.
- Tidak ada service key muncul di bundle klien (guard hijau).

## Observability & Alerts

- Endpoint metrik tersedia: `GET /metrics` dan `GET /metrics/workers` (API), serta endpoint metrik app bila relevan.
- Scraping Prometheus/OTel aktif; dashboard metrik siap.
- Target alert: p95 latensi ≤ 500ms; error rate ≤ 0.5%; notifikasi terhubung (Slack/Email/Pager).
- Logging terstruktur (request-id, tenant-id) aktif.

## Runtime & Konfigurasi Next

- API yang memerlukan Node diberi `export const runtime = 'nodejs'` bila perlu.
- `next.config.js`: `images.remotePatterns` dan headers keamanan konsisten.

## A11y & UX

- Navigasi keyboard, ARIA, fokus states; tidak ada blockers.
- Responsif lintas viewport; metrik web-vitals pada halaman utama baik.

## Deployment & Canary

- Staging smoke tests sukses; health checks terpasang.
- Siapkan rollback plan terukur (langkah, owner, waktu) dan uji cepat.
- Canary: rollout awal 5% dengan observasi 30 menit; lanjut minimal 4 jam sambil memantau p95/error rate.

## Dokumentasi & Sign-off

- Catat metrik dan anomali di `docs/deployment/*` (metrics/anomaly schema).
- Update `docs/deployment/canary-WS-Edge-YYYY-MM-DD.md` selama observasi.
- Lakukan sign-off lintas fungsi (Tech Lead, QA, Ops) sebelum meningkatkan persentase rollout.
