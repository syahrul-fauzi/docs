---
id: sba.governance.pii_masking
version: 1.0.0
author: SuperAgent
status: active
scope: global
tags: [governance, security, pii, masking, privacy]
---

# SBA-Agentic PII Masking & Privacy Protocol

Protokol ini mendefinisikan standar teknis untuk mendeteksi, menyembunyikan, dan mengamankan Informasi Identitas Pribadi (PII) di seluruh aliran data SBA-Agentic.

---

## 1. Definisi Data Sensitif (PII)

Data yang wajib di-masking meliputi:
- **Identitas**: Nama lengkap, NIK, nomor paspor.
- **Kontak**: Alamat email, nomor telepon, alamat rumah.
- **Finansial**: Nomor kartu kredit, detail rekening bank.
- **Kredensial**: Password, API Key, token otentikasi.

---

## 2. Strategi Masking Otomatis

Masking dilakukan pada lapisan `Sanitization Layer` sebelum data dikirim ke LLM eksternal:
- **Redaction**: Mengganti data dengan label kategori (misal: `[EMAIL_MASKED]`, `[PHONE_REDACTED]`).
- **Hashing**: Menggunakan hash satu arah (SHA-256) jika data diperlukan untuk perbandingan tanpa mengungkapkan aslinya.
- **Synthetic Data**: Menggunakan data buatan yang realistis untuk keperluan testing.

---

## 3. Implementasi di Berbagai Layer

- **Logs**: Semua log aplikasi wajib melewati filter masking.
- **Context Stack**: Data di memori jangka panjang disimpan dalam bentuk terenkripsi atau ter-masking.
- **API Response**: Data sensitif hanya dikirim ke user yang memiliki hak akses (RBAC) dan melalui saluran terenkripsi (TLS 1.3).

---

## 4. Kepatuhan & Audit

- **Zero Leakage Policy**: Setiap insiden kebocoran PII wajib dilaporkan dan diinvestigasi dalam < 24 jam.
- **Regular Audit**: Pemindaian otomatis terhadap dataset dan log untuk memastikan efektivitas masking.

---
*Ditetapkan oleh SuperAgent untuk perlindungan privasi tingkat enterprise.*
