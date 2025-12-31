---
title: Auth & RBAC Standard
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [security, auth, rbac, supabase, clerk, architecture]
---

# SBA-Agentic Auth & RBAC Standard

Dokumen ini mendefinisikan arsitektur autentikasi, otorisasi, dan manajemen akses terpadu untuk ekosistem SBA-Agentic.

## 1. Arsitektur Identitas (Identity Layer)

SBA-Agentic menggunakan **Supabase Auth** (atau Clerk, sesuai konfigurasi) sebagai penyedia identitas utama.

### Komponen Utama

1. **Supabase Auth**: Mengelola pendaftaran, login, dan penerbitan JWT.
2. **JWT Issuance & Validation**: Token JWT berisi klaim `sub` (user_id) dan metadata tenant.
3. **Session & Context Layer**: Resolusi otomatis dari `user_id` ke `tenant_id` dan `role` melalui middleware.

## 2. Model Otorisasi (Zero Trust RBAC)

Akses dikontrol menggunakan prinsip **Zero Trust Architecture** dengan isolasi tenant yang ketat dan verifikasi eksplisit untuk setiap permintaan.

### 2.1 Prinsip Zero Trust

1. **Least Privilege**: Akses diberikan hanya pada level minimum yang diperlukan.
2. **Explicit Verification**: Setiap akses divalidasi identitasnya (mTLS/JWT) dan skor risikonya.
3. **Assume Breach**: Sistem dirancang dengan asumsi perimeter keamanan dapat ditembus, sehingga fokus pada perlindungan data di level aplikasi.

### 2.2 Matriks Peran (Role Matrix)

Detail pemisahan tugas antara Manusia dan AI didefinisikan secara formal dalam [ROLE_MATRIX.yaml](../04-rules/ROLE_MATRIX.yaml).

- **SuperAdmin (Human)**: Kontrol penuh sistem dan kebijakan tata kelola.
- **Supervisor (Human)**: Peninjauan hasil agen dan persetujuan tugas berisiko tinggi.
- **AgenticEngineer (Human)**: Pengembangan prompt dan penyetelan model.
- **ExecutionAgent (AI)**: Eksekusi tugas operasional dalam sandbox.
- **ReviewAgent (AI)**: Validasi output agen lain untuk mencegah halusinasi.

## 3. Implementasi Keamanan (Security Headers)

Semua komunikasi API wajib menyertakan header keamanan berikut:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-...' ...
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 4. Pemantauan Kesehatan Auth (Auth Health Check)

Mekanisme validasi rutin untuk memastikan integritas sistem autentikasi:

- **Token Validation Test**: Memastikan JWT divalidasi dengan benar oleh gateway.
- **RBAC Leak Test**: Memastikan user dari Tenant A tidak dapat mengakses data Tenant B.
- **Session Expiry Test**: Memastikan refresh token bekerja sesuai kebijakan rotasi.

## 5. Prosedur Penanganan Insiden Keamanan

Jika terjadi kegagalan autentikasi massal atau indikasi kebocoran:

1. **Revoke Sessions**: Cabut semua session aktif untuk user/tenant terdampak.
2. **Rotate Secrets**: Perbarui JWT Secret di Supabase/Edge Functions.
3. **Audit Log Review**: Analisis log akses untuk mengidentifikasi vektor serangan.
