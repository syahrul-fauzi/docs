# Paket: @sba/auth (Authentication)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen awal.

## Peran & Tanggung Jawab

- Abstraksi autentikasi (login/signup/session) dan guard tenant.

## Fitur Utama

- Helper auth Supabase; middleware/guards; token handling (tanpa menyimpan secret).

## Integrasi

- Dipakai `apps/web` untuk UI login; `apps/api` untuk guard.

## Persyaratan Teknis

- Supabase auth, TypeScript.

## Tujuan Implementasi

- Autentikasi konsisten multi-tenant.

## Batasan

- Tidak menyentuh manajemen identitas kompleks.

## Error Handling

- Error auth terformat.

## Logging & Monitoring

- Audit minimal; serahkan ke backend.

## Kontribusi ke SBA

- Keamanan akses dan pemisahan tenant.

## Skenario Utama

- Login → session → akses fitur.

## Acceptance Criteria

- Guard bekerja; session valid.

## Test Plan

- Unit helper; integrasi UI.

## Flowchart

```mermaid
flowchart TD
  User --> Auth[@sba/auth]
  Auth --> Apps
```
