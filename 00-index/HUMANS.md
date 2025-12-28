---
title: Human Usage Guide
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [human, team, onboarding, documentation]
---

# SBA-Agentic: Human Usage Guide (HUMANS.md)

Dokumen ini ditujukan untuk tim manusia (Developer, PO, QA, Ops) untuk memahami cara berkolaborasi dengan sistem SBA-Agentic dan menavigasi dokumentasi.

## 1. Peran dan Tanggung Jawab
- **Product Owner (PO)**: Fokus pada folder `01-product` dan `11-post-launch`.
- **Developer**: Fokus pada `02-architecture`, `04-rules`, `05-api`, dan `06-development`.
- **QA/Tester**: Fokus pada `07-testing-quality`.
- **DevOps/Ops**: Fokus pada `08-operations` dan `10-release-go-live`.

## 2. Kolaborasi dengan Agent AI
SBA-Agentic menggunakan Agent AI untuk membantu pengembangan. Saat berinteraksi dengan Agent:
- Berikan instruksi yang spesifik dan berikan konteks file yang relevan.
- Gunakan perintah "Continue" jika Agent berhenti sebelum tugas selesai.
- Tinjau setiap perubahan (Diff) yang diajukan oleh Agent sebelum melakukan commit.

## 3. Pemeliharaan Dokumentasi
- **Single Source of Truth**: Hindari duplikasi dokumen. Jika Anda menemukan duplikasi, konsolidasikan ke dalam file standar di folder utama.
- **Standardisasi**: Gunakan format Markdown dengan YAML frontmatter untuk kompatibilitas Docusaurus.
- **Update**: Selalu perbarui `README.md` di folder terkait jika ada penambahan file atau perubahan struktur besar.

## 4. Alur Kerja Git
- Gunakan **Conventional Commits** (contoh: `feat(auth): add login flow`).
- Pastikan CI pipeline lulus (Lint, Type-check, Unit Test) sebelum menggabungkan PR.
