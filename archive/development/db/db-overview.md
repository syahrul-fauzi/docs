# Database Overview — SBA

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft dokumentasi database awal.
  Penanggung Jawab: SBA Data Team — contact: data@sba.local

## Tujuan

Memberikan rancangan skema database relasional untuk fitur utama SBA: tenants, users, conversations, messages, documents, agent runs & events, workflows, integrations, dan audit logs. Mengacu pada Supabase Postgres sebagai penyimpanan utama dan Redis sebagai state sementara/queue.

## Ruang Lingkup

- Tabel inti untuk aplikasi `apps/web` dan `apps/api`
- Relasi antar entitas, indeks, dan kebijakan RLS
- Query dasar untuk CRUD dan listing per-tenant

## Referensi Arsitektur

- docs/architecture/README.md:59-70
- docs/architecture/RELATIONS.md:19-24
