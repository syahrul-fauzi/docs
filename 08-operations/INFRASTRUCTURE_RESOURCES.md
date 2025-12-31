---
title: SBA-Agentic Infrastructure & Resources
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: medium
tags: [infrastructure, database, redis, performance, optimization]
---

# SBA-Agentic Infrastructure & Resources

Panduan pengelolaan dan optimasi sumber daya infrastruktur (Database, Redis, dan Storage) untuk SBA-Agentic.

## 1. Optimasi Performa Database (PostgreSQL)

### Analisis Query

- Identifikasi slow query menggunakan log level `query` di Prisma (saat dev).
- Gunakan `EXPLAIN ANALYZE` untuk menganalisis rencana eksekusi query berat.

### Strategi Indeks

- Tambahkan indeks komposit pada tabel dengan volume data tinggi (misal: `UsageMetric(tenantId, name, occurredAt)`).
- Gunakan indeks pada kolom foreign key dan kolom yang sering di-sort/filter.

### Connection Pooling

- Gunakan **PgBouncer** atau fitur pooling eksternal untuk manajemen koneksi yang efisien.
- Konfigurasikan `PGPOOL_MAX` sesuai dengan concurrency puncak API dan worker.

## 2. Manajemen Redis (Cache & Queue)

- **Rate Limiting**: Redis digunakan sebagai backend untuk *sliding window* rate limiter.
- **Queue (BullMQ)**: Redis menyimpan state antrean pekerjaan latar belakang.
- **Eviction Policy**: Gunakan kebijakan `allkeys-lru` untuk memastikan memori tetap tersedia untuk data baru.
- **Monitoring**: Pantau penggunaan memori Redis dan jumlah kunci yang kedaluwarsa.

## 3. Retensi & Pembersihan Data (Data Retention)

- **Audit Logs**: Simpan log audit selama minimal 90 hari (atau sesuai kepatuhan industri).
- **Cleanup Cron**: Jalankan job berkala untuk membersihkan data temporer atau log lama yang sudah melewati masa retensi.
- **Metrics**: Agregasi data metrik mentah ke dalam ringkasan jangka panjang untuk menghemat ruang penyimpanan.

## 4. Pengiriman Konten (CDN)

- Gunakan CDN untuk mengirimkan aset statis (JS, CSS, Images).
- Aktifkan kompresi **Brotli** atau Gzip pada level CDN/Origin.
- Terapkan kebijakan cache yang tepat (`Cache-Control`) untuk mempercepat pemuatan halaman bagi pengguna akhir.
