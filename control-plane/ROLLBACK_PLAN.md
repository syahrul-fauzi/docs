---
title: Control Plane Rollback & Emergency Plan
created_at: 2025-12-29
author: Super Agent
status: active
---

# Control Plane Rollback & Emergency Plan

Versi: 1.0.0
Terakhir Diperbarui: 2025-12-29

Dokumen ini merinci prosedur pemulihan (rollback) dan penanganan darurat untuk komponen `@sba/control-plane`.

## 1. Skenario Darurat & Respon Cepat

### Skenario A: Kebijakan (Policy) Salah Memblokir Semua Aksi

* **Gejala**: Semua request ke `evaluateCommand` mengembalikan `allowed: false` dengan alasan yang sama.
* **Tindakan Cepat**:
  1. Gunakan `ExecutionControlService.activeKillSwitches` (via API internal jika tersedia) untuk mematikan evaluasi kebijakan sementara.
  2. Identifikasi rule ID yang bermasalah dari audit log.
  3. Hapus atau perbarui rule tersebut melalui `PolicyAuthorityService.publishRule` dengan versi perbaikan.

### Skenario B: Latensi Tinggi pada Evaluasi Kebijakan

* **Gejala**: Timeout pada API Gateway atau degradasi performa sistem secara keseluruhan.
* **Tindakan Cepat**:
  1. Aktifkan "Pass-through Mode" (Kill-switch global) untuk mengizinkan semua aksi tanpa validasi sementara.
  2. Periksa metrik `agent_execution_duration_seconds` untuk mengidentifikasi tenant atau agent tertentu yang menyebabkan beban.
  3. Lakukan scaling horizontal pada `apps/api` jika diperlukan.

## 2. Prosedur Rollback

### Rollback Versi Kode

Jika deployment versi baru `@sba/control-plane` menyebabkan ketidakstabilan:

1. **Identifikasi Versi Stabil Terakhir**: Cek registry package atau commit hash.
2. **Revert Deployment**: Jalankan `./rollback-staging.sh` atau prosedur CI/CD rollback yang sesuai.
3. **Verifikasi**: Jalankan `control-plane.smoke.spec.ts` segera setelah rollback selesai.

### Rollback Data (Prisma/DB)

Jika migrasi database menyebabkan masalah:

1. **Stop API Service**: Mencegah korupsi data lebih lanjut.
2. **Restore Backup**: Gunakan backup Supabase/PostgreSQL terbaru.
3. **Re-run Migrations**: Jika masalah hanya pada skema, jalankan `npx prisma migrate resolve` atau rollback migrasi manual.

## 3. Kontak Darurat

* **On-call Engineer**: (Sesuai jadwal rotasi)
* **DevOps Team**: [devops@sba.ai](mailto:devops@sba.ai)
* **Security Team**: [security@sba.ai](mailto:security@sba.ai)

## 4. Daftar Periksa (Checklist) Pasca-Insiden

* [ ] Analisis Root Cause (RCA).
* [ ] Tambahkan regression test ke `integration.test.ts`.
* [ ] Perbarui dokumentasi jika ada perubahan pola kegagalan.
