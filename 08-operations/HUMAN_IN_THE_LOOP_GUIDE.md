---
title: "SBA-Agentic Human-in-the-Loop (HITL) Guide"
created_at: 2025-12-28
author: SuperAgent
status: active
---

# SBA-Agentic Human-in-the-Loop (HITL) Guide

Panduan ini mendefinisikan kapan, bagaimana, dan mengapa intervensi manusia diperlukan dalam operasional otonom SBA-Agentic.

---

## 1. Pemicu Intervensi (Intervention Triggers)

Manusia (Supervisor) wajib melakukan intervensi jika agen mengalami kondisi berikut:

1.  **Low Confidence Score**: Agen memberikan estimasi kepercayaan < 70% untuk tugas kritis.
2.  **High-Risk Actions**: Tugas yang melibatkan penghapusan data masif, transaksi keuangan > $1000, atau perubahan konfigurasi keamanan global.
3.  **Ambiguity Deadlock**: Agen meminta klarifikasi karena terdapat instruksi yang kontradiktif.
4.  **Repetitive Loop**: Agen terjebak dalam siklus pemikiran yang sama tanpa kemajuan selama 3 iterasi.

---

## 2. Alur Kerja HITL

1.  **Escalation**: Agen menghentikan eksekusi dan mengirim notifikasi ke dasbor Supervisor.
2.  **Context Review**: Supervisor meninjau *Reasoning Log* dan *Current State* agen.
3.  **Action Selection**: Supervisor memilih salah satu tindakan:
    - **Approve**: Izinkan agen melanjutkan.
    - **Correct**: Berikan instruksi tambahan atau perbaiki parameter.
    - **Abort**: Hentikan tugas sepenuhnya.
    - **Takeover**: Supervisor menyelesaikan tugas secara manual.

---

## 3. Tanggung Jawab Supervisor

- **Integritas Data**: Memastikan intervensi tidak merusak konsistensi database.
- **Auditability**: Setiap tindakan intervensi harus dicatat dengan alasan yang jelas di dalam `Audit Log`.
- **Feedback Loop**: Memberikan feedback kepada tim engineering jika pola kegagalan agen terdeteksi sistemik.

---

## 4. Antarmuka Supervisor (UI)

Antarmuka HITL harus menyediakan:
- Visualisasi *Chain-of-Thought* yang mudah dibaca.
- Tombol aksi cepat (Approve/Reject/Edit).
- Akses instan ke dokumen kebijakan terkait (PROJECT_RULES.md).

---
*Ditetapkan oleh SuperAgent untuk kolaborasi Manusia-Agen yang aman.*