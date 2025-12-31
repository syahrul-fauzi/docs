---
title: "Apps Runbook"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# Apps Runbook

## Ports

- `@sba/web`: `http://localhost:3000`
- `@sba/app`: `http://localhost:3001`
- `docs`: `http://localhost:3004`
- `@sba/marketing`: `http://localhost:3005`
- `@sba/api`: default Node (see env), start via `pnpm -C apps/api dev`
- `@sba/orchestrator`: default Node, start via `pnpm -C apps/orchestrator dev`

## Start / Stop

- Web: `pnpm -C apps/web dev` / Ctrl+C
- App: `NEXT_PUBLIC_APP_URL=http://localhost:3001 pnpm -C apps/app dev -p 3001` / Ctrl+C
- Docs: `pnpm -C apps/docs dev -p 3004` / Ctrl+C
- Marketing: `pnpm -C apps/marketing dev` / Ctrl+C
- API: `pnpm -C apps/api dev` / Ctrl+C
- Orchestrator: `pnpm -C apps/orchestrator dev` / Ctrl+C

Dependencies:

- Node 18+
- pnpm workspace
- Ports bebas konflik

## Verifikasi Pasca Deployment

- Root: `curl -I <base>/` harus `200`
- Dashboard: `curl -I <base>/dashboard` `200`
- API: `curl -I <base>/API` `200` (atau endpoint kesehatan masing-masing)
- App health: `curl -s <app_base>/api/health`

## Masalah Umum & Troubleshooting

- Port konflik: gunakan flag `-p <port>` atau script `dev:port`.
- Kompilasi lambat awal: tunggu “Ready” sebelum verifikasi curl.
- “React is not defined”: pastikan import React default di komponen TSX dan JSX transform otomatis aktif.
- Warning CJS `import.meta`: gunakan `process.env` untuk deteksi pada bundel CJS.

## Fitur Admin & Pemeliharaan

### Audit Log Export

- **Pengecekan**: Pastikan endpoint `GET /admin/audit/export` dapat diakses oleh user dengan role `admin`.
- **Troubleshooting**: Jika export gagal, cek koneksi ke database Prisma dan pastikan library `@sba/security` terpasang dengan benar untuk masking.
- **Log Lokasi**: Cek log di `apps/api` untuk error terkait "Failed to export audit logs".

### Agent Benchmarking

- **Pengecekan**: Buka tab "Performance" di Internal Console untuk melihat grafik benchmark.
- **Troubleshooting**: Jika data kosong, pastikan `AgentRun` terekam di database dan metadata memiliki `agentId` yang valid.
- **Refresh**: Gunakan tombol refresh di UI untuk memicu fetch ulang dari API.

## Kontak Darurat

- Web: Owner Web Team — <web-team@example.com>
- App: App Team — <app-team@example.com>
- Docs: Docs Team — <docs-team@example.com>
- Marketing: Marketing Web Team — <marketing-team@example.com>
- API: Backend/API Team — <api-team@example.com>
- Orchestrator: Platform Team — <platform-team@example.com>
