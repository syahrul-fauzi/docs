---
title: Use Case — Auth Login & RBAC
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [auth, rbac]
---

# Deskripsi

- Pengguna melakukan login, sistem memverifikasi kredensial, membuat sesi, dan menetapkan role untuk akses ke halaman authenticated.

# Aktor

- User (end‑user)
- Web App (Next.js)
- Auth API (`/api/auth/login`)
- Supabase (session/jwt)

# Prasyarat

- Konfigurasi Supabase valid.
- Endpoint login tersedia.

# Alur Normal

1. User mengisi form dan submit.
2. Web mengirim `POST /api/auth/login`.
3. API memverifikasi ke Supabase; sukses → set cookie dan role.
4. Web menegakkan guard RBAC dan redirect ke dashboard.

# Alur Alternatif / Edge Cases

- Kredensial salah → pesan error, throttling percobaan.
- Supabase down → fallback pesan dan retry masalah sementara.
- Tidak ada role → akses ditolak, minta elevasi peran.

# Postcondition

- Sesi aktif atau penjelasan error ditampilkan.

# Acceptance Criteria

- Respons login ≤500ms p95; error rate <0.5%.
- RBAC mencegah akses tanpa peran yang sesuai.

# Dependensi

- Supabase client factories, withRBAC guard, rate limiting.

# Diagram

- Lihat `docs/architecture/mermaid/auth_sequence.md`.
