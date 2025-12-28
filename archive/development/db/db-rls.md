# Kebijakan RLS (Row Level Security)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft kebijakan RLS.
  Penanggung Jawab: SBA Data Team — contact: data@sba.local

## Prinsip Umum

- Aktifkan RLS pada semua tabel yang memiliki `tenant_id`
- Izinkan akses hanya jika `users.tenant_id = table.tenant_id`
- Batasi operasi berdasarkan peran (`admin`, `user`)

## Contoh Kebijakan (konseptual Supabase)

- SELECT policy:

```
USING (tenant_id = current_setting('app.current_tenant')::uuid)
```

- INSERT/UPDATE policy (role `user`):

```
WITH CHECK (tenant_id = current_setting('app.current_tenant')::uuid)
```

- Peran `admin` memiliki tambahan akses untuk `UPDATE` status tertentu

## Catatan Implementasi

- Mapping `auth.uid()` → `users.id` untuk mengidentifikasi tenant
- Gunakan fungsi helper untuk menetapkan `current_tenant` pada sesi

## Audit & Kepatuhan

- Log semua operasi tulis ke `audit_logs`
- Redaksi metadata untuk mencegah kebocoran data sensitif
