---
title: Glossary of Terms - SBA-Agentic
version: 1.0.0
status: active
owner: @SBASuperAgent
last_updated: 2025-12-31
---

# Glossary of Terms — SBA-Agentic

Dokumen ini berisi definisi istilah teknis dan bisnis yang digunakan dalam ekosistem **Smart Business Assistant (SBA-Agentic)**.

---

## A
*   **A2A (Agent-to-Agent)**: Protokol komunikasi interoperabilitas yang memungkinkan agen AI dari berbagai framework atau vendor untuk berkolaborasi, bertukar task, dan berbagi hasil (artifacts).
*   **ABA (Autonomous Business Analyst)**: Fitur SBA yang mampu menganalisis data bisnis secara mandiri untuk memberikan insight strategis.
*   **AFD (Agentic Front Door)**: Lapisan persepsi multimodal (teks, suara, visual) yang berfungsi sebagai gerbang utama interaksi pengguna dengan sistem agentik.
*   **Agent Card**: Metadata berformat JSON yang mendeskripsikan kapabilitas, modalitas yang didukung, dan endpoint sebuah agen untuk tujuan discovery dalam protokol A2A.
*   **AG-UI (Agent-User Interaction)**: Protokol komunikasi khusus yang menghubungkan antarmuka pengguna (Frontend/AFD) dengan sistem agentic di backend, mendukung streaming response dan update UI parsial.
*   **ANP (Agent Network Protocol)**: Protokol untuk penemuan (discovery), identifikasi, dan koneksi aman antar agen AI di berbagai jaringan dan organisasi.
*   **Agent Ops UI**: Antarmuka transparan yang menampilkan aktivitas, status, dan jejak pemikiran (reasoning) agen AI kepada pengguna untuk membangun kepercayaan.
*   **Artifact**: Hasil nyata (dokumen, gambar, data) yang dihasilkan oleh agen sebagai output dari sebuah task.

## C
*   **CBAC (Capability-Based Access Control)**: Model keamanan yang mengelola izin eksekusi berdasarkan kapabilitas (tool) yang dimiliki atau diizinkan bagi sebuah agen.
*   **Capability**: Unit fungsionalitas terkecil (misal: `send_email`, `query_db`) yang dapat dieksekusi oleh agen melalui interface yang terstandarisasi.
*   **Content Runtime**: Lapisan abstraksi CMS-agnostic yang memungkinkan aplikasi mengambil konten dari berbagai sumber (Basehub, Filesystem, API) tanpa ketergantungan pada vendor tertentu.
*   **Control Plane**: Otak pusat orkestrasi yang bertanggung jawab atas routing intent, pemilihan agen, dan penegakan policy keamanan.

## D
*   **Decision Telemetry**: Pengumpulan metrik dan data real-time mengenai keputusan yang diambil oleh agen AI, termasuk reasoning trace dan hasil aksi.
*   **Drift Detection**: Mekanisme pemantauan otomatis untuk mendeteksi inkonsistensi antara spesifikasi yang tertulis di dokumentasi (SSOT) dengan implementasi kode atau perilaku sistem yang sebenarnya.

## I
*   **IBAC (Intent-Based Access Control)**: Model keamanan zero-trust di mana setiap intent divalidasi terhadap policy dan konteks sesi sebelum diizinkan untuk diproses.
*   **Intent**: Representasi semantik dari tujuan atau keinginan pengguna (misal: `marketing.lead.capture`).
*   **Intent Capture Layer**: Lapisan dalam AFD yang bertanggung jawab menangkap sinyal multimodal dan menerjemahkannya menjadi Agent Signals.
*   **Intent Taxonomy**: Struktur hirarkis yang mendefinisikan seluruh kemungkinan intent dalam sistem.

## M
*   **MCP (Model Context Protocol)**: Standar terbuka yang dikembangkan oleh Anthropic untuk menstandarisasi cara agen AI berinteraksi dengan tool, API, dan sumber data eksternal.
*   **Multimodal**: Kemampuan sistem untuk memproses dan merespons berbagai jenis input secara bersamaan, termasuk teks, suara, dan interaksi visual.

## R
*   **RAOL (Reason-Act-Observe-Loop)**: Pola pemrosesan agentic di mana agen melakukan penalaran (Reason), mengambil tindakan (Act), mengamati hasilnya (Observe), dan mengulang siklus (Loop) jika diperlukan.
*   **RAG (Retrieval-Augmented Generation)**: Teknik yang menggabungkan kemampuan generatif LLM dengan pencarian data eksternal (knowledge base) untuk memberikan jawaban yang akurat dan relevan secara konteks.
*   **Reasoning Trace**: Catatan langkah-langkah logika dan pemikiran yang diambil oleh agen AI dalam menyelesaikan sebuah tugas, digunakan untuk transparansi dan audit.

## S
*   **SSOT (Single Source of Truth)**: Prinsip di mana satu sumber data (dalam hal ini dokumentasi) dianggap sebagai satu-satunya referensi yang benar dan otoritatif bagi seluruh sistem dan agen.
*   **Secure Passport**: Ekstensi protokol A2A yang digunakan untuk mentransfer konteks keamanan, identitas tenant, dan flags kepatuhan secara aman antar agen.
*   **Semantic Router**: Komponen yang menggunakan embedding dan kecerdasan buatan untuk mencocokkan input bahasa alami pengguna ke intent yang paling relevan dalam taxonomy.

---

## Changelog

| Versi | Tanggal | Deskripsi Perubahan | Author |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 2025-12-31 | Inisialisasi Glossary Global. | @SBASuperAgent |
