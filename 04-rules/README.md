---
title: Project Rules README
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: critical
tags: [rules, governance, standards]
---

# 04 - Rules

Folder ini berisi seluruh aturan proyek, pedoman gaya penulisan kode, dan tata kelola dependensi yang wajib diikuti oleh seluruh kontributor dan agent AI.

## 👥 Audience

- All Developers
- AI Agents
- Tech Leads

## 📖 Konten Utama

- **[PROJECT_RULES.md](./PROJECT_RULES.md)**: Dokumen otoritas pusat untuk aturan proyek dan tata kelola.
- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)**: Panduan gaya penulisan kode (TypeScript, Python) dan dokumentasi.
- **[DEPENDENCIES.md](./DEPENDENCIES.md)**: Tata kelola dependensi dan core technology stack.
- **[META_EVENTS_SYSTEM.md](./META_EVENTS_SYSTEM.md)**: Definisi dan alur pemrosesan Meta Events untuk observabilitas.
- **[AUDIT_LOG_POLICY.md](./AUDIT_LOG_POLICY.md)**: Kebijakan penyimpanan dan audit log sistem.
- **[PII_MASKING_PROTOCOL.md](./PII_MASKING_PROTOCOL.md)**: Protokol perlindungan data sensitif.
- **[ROLE_MATRIX.yaml](./ROLE_MATRIX.yaml)**: Matriks peran formal Human-AI.

## 📂 Struktur Folder

- `core/`: Aturan sistem yang bersifat global (Auth, Logging, dll).
- `business_logic/`: Aturan spesifik domain bisnis dan isolasi tenant.
- `validation/`: Skema validasi input/output dan guardrail keamanan.
- `templates/`: Template standar untuk pembuatan aturan baru.
