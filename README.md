---
title: "SBA-Agentic Documentation Center"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# SBA-Agentic Documentation Center

Selamat datang di pusat dokumentasi resmi **SBA-Agentic (Smart Business Assistant)**. Repositori ini berisi seluruh spesifikasi, panduan, dan aturan operasional untuk pengembangan dan pengelolaan sistem berbasis agen AI.

## 🌟 Filosofi & Prinsip

SBA-Agentic dibangun di atas lima prinsip inti:
1.  **Autonomous**: Agen mampu merencanakan dan mengeksekusi tugas dengan intervensi minimal.
2.  **Explainable**: Setiap langkah penalaran (reasoning) dicatat secara transparan untuk audit.
3.  **Multi-tenant**: Isolasi data yang ketat dan keamanan tingkat perusahaan sejak awal.
4.  **Modular**: Arsitektur monorepo yang memungkinkan penggunaan kembali kode secara maksimal.
5.  **Modern**: Menggunakan stack teknologi terbaru (Next.js 15, Turborepo, Supabase).

## ✨ Fitur Utama

- **Autonomous Planner**: Engine orkestrasi yang cerdas untuk memecah tujuan kompleks dengan dukungan **Semantic Routing** dan **Self-Correction**.
- **Tools Gateway**: Integrasi terpadu dengan API pihak ketiga (CRM, ERP, Analytics).
- **Real-time Reasoning Stream**: Pantau proses berpikir agen secara langsung melalui SSE.
- **Multi-tenant RBAC**: Manajemen akses berbasis peran yang aman untuk berbagai organisasi.
- **Knowledge RAG**: Pencarian informasi berbasis vektor dengan **SKOS Semantic Expansion**.

---

## 🗺️ Peta Dokumentasi (Master Index)

Kami menggunakan struktur dokumentasi modular yang disusun berdasarkan siklus hidup proyek dan peran operasional.

### 🧭 Navigasi Cepat berdasarkan Peran:

| Peran | Titik Awal Rekomendasi |
| :--- | :--- |
| **Developer** | [🏗️ Arsitektur](./02-architecture/README.md) & [🛠️ Dev Guide](./06-development/README.md) |
| **Product Manager** | [🚀 Product & Business](./01-product/README.md) & [📊 Roadmap](./01-product/PLATFORM_ALIGNMENT_ROADMAP.md) |
| **DevOps / SRE** | [📊 Operasi](./08-operations/README.md) & [🚢 Go-Live](./10-release-go-live/README.md) |
| **AI Agent** | [🤖 Agent Guide](./00-index/AGENTS.md) & [🧠 Agentic Core](./03-agentic/README.md) |
| Security Officer| [🛡️ Security](./09-security-compliance/README.md) & [📜 Rules](./04-rules/README.md) |
| **All Hands** | [📊 Progress Dashboard](./PROGRESS.md) |

---

## 🏗️ Gambaran Umum Sistem

SBA-Agentic menggunakan arsitektur monorepo berbasis Turborepo untuk mengelola dependensi dan build pipeline secara efisien.

### Komponen Utama:
1.  **`apps/app` (Control Plane)**: Dashboard utama berbasis Next.js untuk mengelola tenant, workflow, dan monitoring.
2.  **`apps/internal-console` (Internal Control Plane)**: Aplikasi desktop (Tauri) untuk kontrol operasional tingkat tinggi, kebijakan, dan observabilitas mendalam.
3.  **`apps/orchestrator` (Orchestrator Engine)**: Inti dari sistem yang mengelola penjadwalan tool, retry logic, dan rate limiting.
3.  **`apps/api` (Tools Gateway)**: Gateway terpadu untuk mengeksekusi tools pihak ketiga dengan validasi schema dan tenant enforcement.
4.  **`packages/`**: Kumpulan paket bersama termasuk UI components (`@sba/ui`), database client (`@sba/supabase`), dan logic bersama.

---

## 🚀 Cara Menggunakan Dokumentasi Ini

1.  **Cari Cepat**: Gunakan fitur pencarian IDE Anda (Cmd/Ctrl + P) dan ketik nama folder (misal: `05-api`) untuk menemukan dokumen terkait.
2.  **Single Source of Truth**: Jika Anda menemukan perbedaan antara kode dan dokumen, segera perbarui dokumen tersebut.
3.  **Kontribusi**: Lihat [Panduan Kontribusi](./06-development/CONTRIBUTING.md) untuk cara menambahkan atau memperbarui dokumen.

---

## 🛠️ Alur Kerja Pengembangan

Sangat penting untuk memahami dan mematuhi aturan di **[04-rules/](./04-rules/)** sebelum melakukan perubahan kode.

- **Manajemen Paket**: Gunakan `pnpm` (Node.js >= 18.x).
- **Linting**: Wajib menjalankan `pnpm lint` sebelum commit.
- **Reasoning**: Setiap fitur agen baru wajib mengikuti pola **ReasoningStep** (Analysis -> Planning -> Execution -> Reflection).

---

## 📊 Monitoring & Operasi

Kami menggunakan stack Prometheus dan Grafana untuk memantau kesehatan sistem. Detail operasional dapat ditemukan di **[08-operations/](./08-operations/)**.

---

_Terakhir diperbarui: 2025-12-28_
