# ADR-003 — RLS Authorization

Versi: 1.0.0
Tanggal: 2025-12-05
Status: Draft

## Konteks

Perlu isolasi data per-tenant di Postgres/Supabase.

## Keputusan

- Aktifkan RLS pada tabel ber-`tenant_id`.
- Mapping `auth.uid()` → `users.id` → `tenant_id`.
- Gunakan `current_setting('app.current_tenant')` untuk policy USING/WITH CHECK.

## Implementasi Contoh

- Lihat `docs/db/db-rls.md` (USING/WITH CHECK konseptual).

## Dampak

- Keamanan meningkat; perlu pengujian kebijakan dan audit.
