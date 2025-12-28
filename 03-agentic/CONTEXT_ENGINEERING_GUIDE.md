---
id: sba.agentic.context_engineering
version: 1.0.0
author: SOLOCoder
status: active
scope: global
tags: [agentic, context, engineering, production]
---

# SBA-Agentic Context Engineering Guide

Panduan ini mendefinisikan standar profesional untuk mengelola "Context Stack" di dalam SBA-Agentic. Pengelolaan konteks yang efisien adalah kunci untuk akurasi reasoning, minimalisasi halusinasi, dan optimasi biaya token.

---

## 1. Arsitektur Context Stack

Context Stack dibagi menjadi 4 lapisan utama yang harus dikelola secara hierarkis:

1.  **System Instructions (Static)**: Core identity, rules, dan batasan agen.
2.  **Dynamic Context (Session)**: Sejarah percakapan aktif dan variabel state saat ini.
3.  **Retrieved Context (RAG)**: Data relevan yang ditarik dari Knowledge Base (Supabase Vector).
4.  **Tool Output Context (Execution)**: Hasil eksekusi fungsi/API yang dibutuhkan untuk langkah selanjutnya.

---

## 2. Strategi Minimalisasi Context Bloat

Untuk menjaga performa dan menekan biaya, terapkan teknik berikut:

- **Context Pruning**: Hapus informasi yang sudah tidak relevan atau duplikat dari session history.
- **Semantic Summarization**: Lakukan ringkasan otomatis pada percakapan panjang menggunakan model yang lebih kecil sebelum dimasukkan ke konteks utama.
- **Ranked Retrieval**: Hanya masukkan 3-5 chunk data paling relevan dari hasil pencarian vektor (RAG).

---

## 3. Penanganan Data Sensitif (PII)

- **Sanitization Layer**: Sebelum data dimasukkan ke konteks untuk dikirim ke LLM, lakukan pembersihan otomatis terhadap email, nomor telepon, dan alamat melalui modul `PII_MASKER`.
- **Anonymization**: Gunakan placeholder (misal: `[USER_NAME]`, `[CLIENT_ID]`) untuk data identitas di dalam instruksi agen.

---

## 4. Evaluasi Relevansi Konteks

- **Context Window Monitoring**: Pantau sisa token secara real-time. Jika mencapai 80% dari limit model, lakukan kompresi konteks secara otomatis.
- **Relevance Feedback**: Gunakan skor kesamaan kosinus (cosine similarity) untuk memvalidasi bahwa data yang ditarik dari memori jangka panjang benar-benar mendukung tugas saat ini.

---
*Implementasi oleh SOLOCoder untuk kecerdasan agen yang presisi.*
