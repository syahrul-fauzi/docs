---
title: "SBA-Agentic Workflow & Reasoning Patterns"
created_at: 2025-12-28
author: SOLOCoder
status: active
---

# SBA-Agentic Workflow & Reasoning Patterns

Dokumen ini menetapkan pola alur kerja (workflow) dan penalaran (reasoning) standar untuk agen di ekosistem SBA-Agentic. Pola ini memastikan bahwa setiap tindakan agen didasarkan pada logika yang dapat diverifikasi dan terstruktur.

---

## 1. Pola Scratchpad Reasoning (CoT)

Semua agen wajib menggunakan pola *Chain-of-Thought* (CoT) melalui mekanisme *Scratchpad* sebelum memberikan jawaban akhir.

**Struktur Reasoning:**

1. **Thought**: Analisis terhadap input user dan identifikasi tujuan.
2. **Plan**: Daftar langkah-langkah konkret untuk mencapai tujuan.
3. **Observation**: Hasil dari eksekusi tool atau pencarian memori.
4. **Reflection**: Evaluasi apakah hasil observasi sudah menjawab tujuan. Jika belum, buat rencana baru.
5. **Final Answer**: Respon akhir ke user.

---

## 2. Pola Multi-Agent Orchestration

Untuk tugas yang kompleks, gunakan pola kolaborasi antar agen:

- **Supervisor Pattern**: Satu agen utama mengelola delegasi tugas ke beberapa sub-agen spesialis.
- **Hierarchical Planning**: Memecah tugas besar menjadi sub-task yang dikelola oleh agen yang berbeda secara berjenjang.
- **Review Loop**: Hasil kerja agen eksekutor wajib diperiksa oleh agen reviewer sebelum dikirim ke user.

---

## 3. Penanganan Ketidakpastian (Ambiguity)

- **Clarification Trigger**: Jika tingkat kepercayaan (confidence score) di bawah 70%, agen wajib berhenti dan meminta klarifikasi ke user.
- **Proactive Suggestion**: Berikan maksimal 3 opsi jika terdapat beberapa cara untuk menyelesaikan tugas yang ambigu.

---

## 4. Error Recovery Patterns

- **Self-Healing Loop**: Jika eksekusi tool gagal, agen harus menganalisis pesan error dan mencoba strategi alternatif (misal: menggunakan parameter yang berbeda atau tool cadangan).
- **Graceful Degradation**: Jika semua tool gagal, berikan penjelasan transparan kepada user mengenai hambatan teknis yang dihadapi.

---

## 5. Standar Output (Structured Outputs)

Semua output internal antar agen wajib menggunakan format JSON yang valid untuk memudahkan parsing dan integrasi sistem.

---

*Ditetapkan oleh SOLOCoder untuk standarisasi logika operasional agen.*
