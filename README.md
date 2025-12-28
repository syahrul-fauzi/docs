# Developer & Operator Handbook

Selamat datang di panduan teknis SBA-Agentic. Dokumen ini ditujukan untuk insinyur perangkat lunak, DevOps, dan operator sistem yang bekerja dengan platform ini.

---

## 🏗️ Arsitektur Mendalam

SBA-Agentic menggunakan arsitektur monorepo berbasis Turborepo untuk mengelola dependensi dan build pipeline secara efisien. Untuk peta dokumen lengkap, lihat [Master Index](./INDEX.md).

### Komponen Utama:

1.  **`apps/app` (Control Plane)**: Dashboard utama berbasis Next.js untuk mengelola tenant, workflow, dan monitoring.
2.  **`apps/orchestrator` (Orchestrator Engine)**: Inti dari sistem yang mengelola penjadwalan tool, retry logic, dan rate limiting.
3.  **`apps/api` (Tools Gateway)**: Gateway terpadu untuk mengeksekusi tools pihak ketiga dengan validasi schema dan tenant enforcement.
4.  **`packages/`**: Kumpulan paket bersama termasuk UI components (`@sba/ui`), database client (`@sba/supabase`), dan logic bersama.

---

## 🛠️ Alur Kerja Pengembangan

### 1. Standar Coding & AI

Sangat penting untuk memahami dan mematuhi [SBA-Agentic Operational Standard](./SBA-Agentic%20Operational%20Standard.md) sebelum melakukan perubahan kode. Standar ini mengatur bagaimana agen AI berinteraksi dengan sistem.

- **Linting**: Wajib menjalankan `pnpm lint` sebelum commit.
- **Testing**: Target coverage minimal 80% untuk logika bisnis di `packages/`.
- **Reasoning**: Setiap fitur agen baru wajib mengikuti pola **ReasoningStep** (Analysis -> Planning -> Execution -> Reflection).
- **Agent Rules**: Lihat juga [Rules Center](../.trae/rules/README.md) untuk kebijakan penalaran mendalam.

### 2. Manajemen Dependensi

Gunakan `pnpm` untuk manajemen paket. Jangan gunakan `npm` atau `yarn`.

```bash
pnpm install
```

### Parameter Konfigurasi Penting

| Parameter                   | Komponen                        | Tujuan                                                  |
| :-------------------------- | :------------------------------ | :------------------------------------------------------ |
| `x-tenant-id`               | API boundary                    | Kunci isolasi tenant untuk request, metrik, dan caching |
| `NEXT_PUBLIC_SUPABASE_*`    | `apps/app`, `apps/web`          | Konfigurasi Supabase di client                          |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only                     | Akses server (jangan pernah di client bundle)           |
| `UPSTASH_REDIS_*`           | `apps/orchestrator`, `apps/api` | Cache, rate limit, queue                                |
| `ORCHESTRATOR_TICK_MS`      | `apps/orchestrator`             | Interval polling orchestrator untuk job baru.           |
| `MAX_TOOL_TIMEOUT`          | `apps/api`                      | Timeout maksimal eksekusi tool (ms).                    |
| `ENABLE_SWAGGER`            | `apps/api`                      | Mengaktifkan dokumentasi OpenAPI di `apps/api`.         |

---

## 🚢 QA & Rilis

Setiap perubahan yang masuk ke `main` wajib melewati:

1.  **Code Review**: Minimal 1 approval dari maintainer.
2.  **CI Pipeline**: Lulus Lint, Type-check, dan Unit Tests.
3.  **Staging Validation**: Verifikasi fitur di lingkungan staging.

Untuk detail lebih lanjut, lihat [QA & Release Checklist](./QA_AND_RELEASE.md).

---

## 📊 Monitoring & Observability

Kami menggunakan stack Prometheus dan Grafana untuk memantau kesehatan sistem.

- **Metrics**: Tersedia di endpoint `/metrics` pada setiap layanan.
- **Dashboards**: Lihat [Monitoring Setup](./MONITORING_SETUP.md).

---

## 🆘 Dukungan & Troubleshooting

Jika Anda menemui masalah:

1.  Cek [Troubleshooting Guide](./development/troubleshooting.md).
2.  Lihat [Operations Runbook](./deployment/OPERATIONS_RUNBOOK.md) untuk isu produksi.
3.  Buka Issue di repository dengan label yang sesuai.

---

---

_Terakhir diperbarui: 2025-12-28_
