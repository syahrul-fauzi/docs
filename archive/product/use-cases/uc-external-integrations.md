# Use Case: Integrasi dengan Sistem Eksternal

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen pendalaman awal.
  Penanggung Jawab: SBA Docs Team — contact: docs@sba.local

## Deskripsi

Mengelola konektor layanan eksternal (LLM/OpenRouter, Stripe, Supabase, dsb.), termasuk registrasi, konfigurasi kredensial, uji koneksi, penggunaan di run/workflow, serta observability per layanan.

Referensi: docs/README.md:102-112

## Aktor

- Admin (registrasi, konfigurasi, uji)
- SistemEksternal (penyedia layanan)
- apps/api (pemanggilan layanan, rate limit)
- apps/web/app (konsumsi hasil)

## Preconditions

- Kredensial tersedia dan kebijakan keamanan diset
- Konektor diaktifkan untuk tenant

## Postconditions

- Koneksi stabil; metrik dan log integrasi tercatat
- Layanan siap digunakan lintas fitur SBA

## Alur Utama

1. Registrasi konektor dan set parameter
2. Simpan kredensial secara aman (server-side)
3. Uji koneksi dan verifikasi kuota
4. Gunakan dalam run/workflow; pantau metrik

## Alur Alternatif & Pengecualian

- Rotasi kunci berkala; notifikasi kedaluwarsa
- Batas panggilan tercapai → throttle dan penjadwalan ulang
- Kegagalan auth → disable sementara dan peringatan

## Aturan Bisnis

- Tidak menyimpan secrets di klien
- Kebijakan rate limit dan biaya per layanan

## Persyaratan Non-Fungsional

- Keamanan kredensial tinggi (enkripsi, akses terbatas)
- Observability khusus per integrasi

## Diagram Use Case

```mermaid
usecaseDiagram
actor Admin
actor External as PenyediaLayanan

Admin -- (Registrasi Konektor)
Admin -- (Konfigurasi Kredensial)
(Registrasi Konektor) ..> (Uji Koneksi) : <<include>>
(Uji Koneksi) ..> (Gunakan di Workflow/Run) : <<extend>>
PenyediaLayanan -- (Respon Layanan)
```

## Acceptance Criteria

- Konektor terkonfigurasi dengan aman dan berfungsi
- Metrik dan log integrasi tersedia dan dapat dianalisis

## Referensi Teknis

- docs/architecture/README.md:5-8,67-70
- docs/architecture/RELATIONS.md:14-24,25-30
