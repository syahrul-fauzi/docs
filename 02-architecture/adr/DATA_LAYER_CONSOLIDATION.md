---
title: "3. Data Layer Consolidation"
created_at: 2025-12-28
author: Architecture Team
status: active
---

# 3. Data Layer Consolidation

Status: Accepted

Tujuan:

- Menyatukan cara pembuatan dan penggunaan klien Supabase lintas monorepo agar konsisten dan siap produksi.
- Menghapus tumpang tindih antara `apps/api`, `packages/supabase`, dan `packages/db`.

Keputusan:

- Satu sumber kebenaran untuk klien Supabase ada di `packages/supabase`.
  - `clients/browser`: klien browser (anon) untuk UI.
  - `clients/server`: klien SSR Next dengan manajemen cookies.
  - `clients/node-admin`: klien Node server-side menggunakan Service Role untuk API/worker.
- Tipe database (`Database`, `Tables`, dsb.) berada di `packages/supabase/types` dan menjadi referensi tunggal.
- `apps/api` wajib menggunakan `clients/node-admin` dan tidak menggunakan `NEXT_PUBLIC_*` di server.
- `packages/db` dinyatakan deprecated. Jika diperlukan, fungsinya digabung ke `packages/supabase` atau dihapus pada rilis berikutnya.

Motivasi:

- Mengurangi inkonsistensi konfigurasi env dan header tenant.
- Memudahkan audit dan keamanan: pemisahan jelas antara anon (browser) dan service role (server).
- Memperjelas arsitektur untuk skala dan go‑live.

Konsekuensi:

- Migrasi impor: ganti `@sba/db` dan penggunaan langsung `@supabase/supabase-js` di aplikasi dengan `@sba/supabase/*` sesuai konteks.
- Pengetatan env: server hanya membaca `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SERVICE_KEY`.
- Penegakan tenant: helper `setTenantContext` digunakan di sisi server sebelum query.

Langkah Migrasi:

- UI (apps/app, apps/web, apps/docs): gunakan `@sba/supabase` (`clients/client`/`clients/server`).
- API dan workers: gunakan `@sba/supabase/clients/node-admin` dan panggil `setTenantContext` saat perlu isolasi tenant.
- Hapus modul lokal `shared/lib/supabase.ts` di apps jika fungsinya sama.
- Tandai `packages/db` sebagai deprecated dan rencanakan penghapusan setelah migrasi selesai.