# Use Case: Otomatisasi Proses Bisnis

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen pendalaman awal.
  Penanggung Jawab: SBA Docs Team — contact: docs@sba.local

## Deskripsi

Mendefinisikan dan menjalankan workflow terjadwal/berbasis event untuk mengotomasi tindakan lintas sistem (CRM, ERP, ticketing), dengan monitoring, logging, metrik, dan strategi kompensasi.

Referensi: docs/README.md:91-101

## Aktor

- Admin (definisi workflow, trigger)
- Pengguna (monitoring, eskalasi)
- SistemEksternal (CRM/ERP/ticketing)
- apps/api (queue & workers)
- apps/app (monitor stream)

## Preconditions

- Integrasi eksternal aktif dan kredensial diset
- Peran/izin ditentukan untuk akses tindakan

## Postconditions

- Tindakan tercermin di sistem eksternal
- Log lengkap dan metrik tersimpan; kompensasi bila gagal

## Alur Utama

1. Definisikan proses dan langkah-langkah
2. Konfigurasi trigger (jadwal/event)
3. Enqueue job via apps/api; worker mengeksekusi
4. Monitor stream, log, metrik; handle hasil

## Alur Alternatif & Pengecualian

- Idempotensi mencegah duplikasi tindakan
- Kegagalan langkah → kompensasi dan eskalasi
- Batas panggilan API → throttle, backoff

## Aturan Bisnis

- Otorisasi integrasi ketat; audit semua tindakan
- IdempotencyKey wajib untuk operasi side-effect

## Persyaratan Non-Fungsional

- Skalabilitas queue; SLA eksekusi per langkah
- Observability menyeluruh (metrics/traces/logs)

## Diagram Use Case

```mermaid
usecaseDiagram
actor Admin
actor Pengguna
actor External as SistemEksternal

Admin -- (Definisikan Workflow)
Admin -- (Konfigurasikan Trigger)
(Definisikan Workflow) ..> (Eksekusi Langkah) : <<include>>
(Eksekusi Langkah) ..> (Kompensasi Saat Gagal) : <<extend>>
Pengguna -- (Monitor & Eskalasi)
External -- (Perubahan Tercermin)
```

## Acceptance Criteria

- Workflow berjalan sesuai definisi dan aman dari duplikasi
- Kompensasi dan eskalasi bekerja; metrik tersedia

## Referensi Teknis

- docs/architecture/README.md:67-70
- docs/architecture/RELATIONS.md:19-24
