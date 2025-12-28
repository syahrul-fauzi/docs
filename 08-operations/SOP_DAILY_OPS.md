---
title: "SBA-Agentic Daily Operations SOP"
created_at: 2025-12-28
author: SOLOBuilder
status: active
---

# SBA-Agentic Daily Operations SOP

Standar Operasional Prosedur (SOP) harian untuk tim operasional (SRE/Ops) guna memastikan stabilitas sistem SBA-Agentic.

---

## 1. Pengecekan Rutin (Pagi - 09:00 LT)

1.  **Dashboard Review**: Buka `MONITORING_DASHBOARD.md` dan periksa:
    - Apakah `Task Success Rate` di atas 98%?
    - Apakah ada lonjakan biaya token yang tidak biasa?
2.  **Log Analysis**: Periksa 10 error teratas di Sentry. Identifikasi apakah ada pola kegagalan baru pada agen.
3.  **Resource Check**: Pastikan kapasitas disk database (Supabase) memiliki sisa > 30%.

---

## 2. Pemeliharaan Berkala (Siang - 14:00 LT)

1.  **Feedback Processing**: Tinjau laporan dari `FEEDBACK_LOOP_MECHANISM.md`. Diskusikan dengan tim engineering jika ada kegagalan reasoning yang berulang.
2.  **Vector Store Health**: Jalankan script verifikasi index vektor:
    ```bash
    npm run db:vector:check-health
    ```
3.  **Dependency Security**: Jalankan audit keamanan dependensi secara otomatis.

---

## 3. Penutupan & Laporan (Sore - 17:00 LT)

1.  **Daily Analytics**: Buat ringkasan performa harian untuk stakeholder.
2.  **Incident Handover**: Jika ada insiden yang belum selesai, lakukan serah terima ke tim shift malam atau catat di log insiden.
3.  **Backup Verification**: Pastikan snapshot backup database terakhir berhasil dibuat dan disimpan di lokasi off-site.

---

## 4. Prosedur Eskalasi

Jika terjadi insiden kritikal di luar jam kerja:
1.  Ikuti panduan di `INCIDENT_RESPONSE.md`.
2.  Jika tidak dapat diselesaikan dalam 30 menit, hubungi **Level 2 Support** (Architect/Lead Developer).

---
*Ditetapkan oleh SOLOBuilder untuk keunggulan operasional setiap hari.*