# SBA-Agentic Documentation Center

Selamat datang di pusat dokumentasi resmi **SBA-Agentic (Smart Business Assistant)**. Repositori ini berisi seluruh spesifikasi, panduan, dan aturan operasional untuk pengembangan dan pengelolaan sistem berbasis agen AI.

---

## 🗺️ Peta Dokumentasi (Master Index)

Kami menggunakan struktur dokumentasi modular yang disusun berdasarkan siklus hidup proyek dan peran operasional. Silakan mulai dari:

👉 **[MASTER INDEX DOKUMENTASI](./00-index/README.md)**

### 🧭 Navigasi Cepat:
- **[🤖 Guide for AI Agents](./00-index/AGENTS.md)** — Instruksi navigasi untuk Agen AI.
- **[👥 Guide for Human Teams](./00-index/HUMANS.md)** — Panduan eksplorasi untuk tim manusia.
- **[🏗️ Arsitektur Sistem](./02-architecture/README.md)** — Diagram dan detail teknis arsitektur.
- **[🛠️ Panduan Pengembangan](./06-development/README.md)** — Setup, standar kode, dan workflow.
- **[🚢 Persiapan Rilis](./10-release-go-live/README.md)** — Checklist Go-Live dan kriteria produksi.

---

## 🏗️ Gambaran Umum Sistem

SBA-Agentic menggunakan arsitektur monorepo berbasis Turborepo untuk mengelola dependensi dan build pipeline secara efisien.

### Komponen Utama:
1.  **`apps/app` (Control Plane)**: Dashboard utama berbasis Next.js untuk mengelola tenant, workflow, dan monitoring.
2.  **`apps/orchestrator` (Orchestrator Engine)**: Inti dari sistem yang mengelola penjadwalan tool, retry logic, dan rate limiting.
3.  **`apps/api` (Tools Gateway)**: Gateway terpadu untuk mengeksekusi tools pihak ketiga dengan validasi schema dan tenant enforcement.
4.  **`packages/`**: Kumpulan paket bersama termasuk UI components (`@sba/ui`), database client (`@sba/supabase`), dan logic bersama.

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
