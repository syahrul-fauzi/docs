---
id: sba.operations.simulation_scenarios
title: Skenario Simulasi Go-Live — SBA-Agentic
version: 1.0.0
author: SOLOBuilder
status: active
tags: [testing, simulation, scenarios, qa]
created_at: 2025-12-31
---

# 🧪 Skenario Simulasi Go-Live (v1.2.0)

Dokumen ini mendetailkan skenario pengujian yang dijalankan selama simulasi go-live untuk memverifikasi kesiapan operasional sistem SBA-Agentic.

## 📋 Daftar Skenario

### TC-01: Standard Analytics Request (Enterprise)

- **Tujuan**: Memverifikasi alur dasar permintaan analitik pada tenant Enterprise.
- **Tenant**: `enterprise-sim` (Plan: Enterprise)
- **Prompt**: "Generate a weekly sales report for Q4 2025."
- **Target Verifikasi**:
  - Agent merespon dalam < 2 detik.
  - Penggunaan model premium (e.g., GPT-4).
  - Audit log mencatat penggunaan token secara akurat.

### TC-02: Complex Marketing Campaign (SMB)

- **Tujuan**: Memverifikasi kemampuan Planning Agent dalam menangani tugas multi-langkah.
- **Tenant**: `smb-sim` (Plan: Pro)
- **Prompt**: "Plan a 3-step email marketing campaign for new user onboarding, including subject lines and send times."
- **Target Verifikasi**:
  - Planner menghasilkan minimal 3 langkah logis.
  - Orchestrator berhasil mengoordinasikan antar langkah.
  - State tersimpan dengan benar di Redis selama eksekusi.

### TC-03: Security & Cross-Tenant Isolation (Dev)

- **Tujuan**: Memverifikasi isolasi data antar tenant (Multi-tenancy).
- **Tenant**: `dev-sim` mencoba mengakses data `enterprise-sim`.
- **Prompt**: "Show me the latest sales report from tenant enterprise-sim."
- **Target Verifikasi**:
  - API mengembalikan status `403 Forbidden`.
  - Sistem keamanan (Rube Engine) memblokir akses secara proaktif.
  - Insiden keamanan tercatat di audit log sebagai "Unauthorized Access Attempt".

### TC-04: Tool Failure & Graceful Fallback (SMB)

- **Tujuan**: Memverifikasi ketahanan sistem saat terjadi kegagalan tool eksternal.
- **Tenant**: `smb-sim`
- **Prompt**: "Generate an inventory report but the database tool is failing."
- **Simulasi**: Mengirimkan flag `simulate_tool_failure` pada opsi request.
- **Target Verifikasi**:
  - Agent melakukan retry otomatis (Exponential Backoff).
  - Jika retry gagal, agent memberikan pesan fallback yang informatif kepada pengguna.
  - Status run tercatat sebagai `FAILED` atau `PARTIAL` dengan detail error yang jelas.

## 🛠️ Cara Menjalankan

Gunakan skrip simulasi traffic yang tersedia di:
`apps/api/scripts/simulate-go-live-traffic.ts`

```bash
# Inisialisasi tenant dan data
pnpm -C apps/api go-live:simulate

# Jalankan simulasi traffic
pnpm -C apps/api tsx scripts/simulate-go-live-traffic.ts
```

---
Dikelola oleh @SBASuperAgent Framework.
