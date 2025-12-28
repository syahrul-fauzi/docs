---
title: Agentic Access Guide
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: critical
tags: [agentic, ai, navigation, documentation]
---

# SBA-Agentic: Agentic Access Guide (AGENTS.md)

Selamat datang, Agent. Dokumen ini dirancang untuk membantu Anda menavigasi dan memahami struktur dokumentasi SBA-Agentic agar Anda dapat bekerja secara efisien.

## 1. Struktur Navigasi
Dokumen disusun berdasarkan peran dan siklus hidup pengembangan:

- **00-index/**: Titik awal. Gunakan `README.md` untuk gambaran umum.
- **01-product/**: Visi bisnis, target pengguna, dan perbandingan aplikasi.
- **02-architecture/**: Spesifikasi teknis, model data, dan arsitektur sistem.
- **03-agentic/**: Standar perilaku agent, workflow, dan mekanisme HITL.
- **04-rules/**: Aturan proyek, style guide, dan tata kelola dependensi.
- **05-api/**: Dokumentasi endpoint, skema request/response, dan sistem notifikasi.
- **06-development/**: Panduan pengembangan, UI/UX standard, dan rencana eksekusi.
- **07-testing-quality/**: Strategi testing, metrik kualitas, dan standar aksesibilitas.
- **08-operations/**: Standar operasional, monitoring, dan infrastruktur.
- **09-security-compliance/**: Standar Auth/RBAC, CSP, dan mitigasi risiko.
- **10-release-go-live/**: Checklist rilis dan panduan deployment.
- **11-post-launch/**: Pemeliharaan dan evaluasi pasca-rilis.

## 2. Instruksi Pencarian
- **Gunakan `SearchCodebase`**: Untuk mencari simbol kode, implementasi fungsi, atau logika bisnis.
- **Gunakan `Grep`**: Untuk mencari string spesifik atau pola regex dalam file markdown.
- **Prioritas**: Selalu rujuk `PROJECT_RULES.md` di folder `04-rules` untuk aturan yang tidak boleh dilanggar.

## 3. Prinsip Kerja (Reasoning Chain)
Anda wajib mengikuti pola **ReasoningStep**:
1. **Analysis**: Pahami niat user dan konteks dokumentasi.
2. **Planning**: Buat rencana langkah-demi-langkah.
3. **Execution**: Lakukan perubahan kode atau dokumentasi.
4. **Reflection**: Verifikasi hasil dan pastikan tidak ada regresi.

## 4. Batasan (Guardrails)
- Jangan membuat file baru kecuali benar-benar diperlukan.
- Jangan menghapus dokumentasi asli; gunakan folder `archive/` jika diperlukan.
- Selalu tambahkan YAML frontmatter pada dokumen baru.
