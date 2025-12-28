---
title: Matriks Kompatibilitas Sistem
created_at: 2025-12-28
author: SBA-Agent
status: active
priority: medium
tags: [compatibility, dependencies, system-requirements]
---

# 📊 Matriks Kompatibilitas Sistem

Dokumen ini merinci versi perangkat lunak, pustaka, dan layanan eksternal yang didukung oleh SBA-Agentic.

## 1. Runtime & Bahasa Pemrograman

| Komponen | Versi Minimum | Versi Direkomendasikan | Catatan |
| :--- | :--- | :--- | :--- |
| **Node.js** | 18.x | 20.x (LTS) | Diperlukan untuk stabilitas ESM. |
| **TypeScript** | 5.x | 5.4+ | Digunakan di seluruh monorepo. |
| **pnpm** | 8.x | 9.x | Package manager wajib. |
| **Python** | 3.10 | 3.11+ | Digunakan untuk script pengujian & data science. |

## 2. Infrastruktur & Layanan Database

| Layanan | Versi Minimum | Provider | Catatan |
| :--- | :--- | :--- | :--- |
| **PostgreSQL** | 14.x | Supabase / Self-hosted | Memerlukan dukungan RLS. |
| **Redis** | 6.2 | Upstash / Self-hosted | Digunakan untuk Queue (BullMQ) & Caching. |
| **S3 Storage** | N/A | AWS S3 / Cloudflare R2 | Untuk penyimpanan lampiran & dokumen. |

## 3. Kompatibilitas Browser (Frontend)

| Browser | Versi Minimum | Status |
| :--- | :--- | :--- |
| **Google Chrome** | 100+ | Didukung Penuh |
| **Mozilla Firefox** | 100+ | Didukung Penuh |
| **Safari** | 15.4+ | Didukung Penuh |
| **Microsoft Edge** | 100+ | Didukung Penuh |
| **Internet Explorer** | N/A | Tidak Didukung |

## 4. Dependensi Eksternal Utama

| Library | Versi | Fungsi |
| :--- | :--- | :--- |
| **Next.js** | 14.x / 15.x | Web Framework |
| **NestJS** | 10.x | API Framework |
| **Prisma** | 5.x | ORM |
| **Tailwind CSS** | 3.x | Styling |
| **Clerk** | Latest | Authentication |
| **Turborepo** | 2.x | Monorepo Management |

## 5. Matriks OS (Development)

- **Linux**: Ubuntu 22.04 LTS atau lebih baru.
- **macOS**: Ventura 13.0 atau lebih baru (Intel & Apple Silicon).
- **Windows**: Windows 10/11 melalui **WSL2 (Ubuntu)**. Pengembangan native Windows tidak didukung secara resmi.

---
_Terakhir diperbarui: 2025-12-28_
