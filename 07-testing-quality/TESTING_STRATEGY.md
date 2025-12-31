---
title: SBA-Agentic Testing Strategy
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [testing, strategy, qa, e2e, validation]
---

# SBA-Agentic Testing Strategy

Strategi komprehensif untuk pengujian dan penjaminan kualitas (QA) di seluruh monorepo SBA-Agentic.

## 1. Piramida Pengujian

SBA-Agentic mengikuti struktur pengujian berlapis:

- **Unit Tests (Vitest)**: Menguji fungsi, utilitas, dan komponen UI secara terisolasi. Fokus pada logika bisnis dan state management.
- **Integration Tests (Vitest/Supertest)**: Menguji interaksi antar modul, integrasi API, dan keterkaitan antara frontend dan backend.
- **E2E Tests (Playwright)**: Menguji alur pengguna lengkap (End-to-End) dari browser, termasuk interaksi dengan layanan eksternal (Supabase, Auth).

## 2. Strategi E2E (Playwright)

### Konfigurasi Launch

- Gunakan `E2E_USE_WEBSERVER=0` jika server sudah berjalan secara eksternal (mempercepat eksekusi di lokal).
- Gunakan `E2E_USE_WEBSERVER=1` di CI untuk membangun dan menjalankan server secara otomatis.

### Skenario Utama

- **Login Flow**: Validasi sukses, gagal, dan penanganan session.
- **Chat & Reasoning**: Verifikasi pengiriman pesan, streaming respon AI, dan log reasoning.
- **Workflow Execution**: Memastikan workflow agent berjalan dari awal hingga akhir.
- **Health & Observability**: Memastikan endpoint `/api/health` dan metrik tersedia.

## 3. QA & Validasi Teknis

### Checklist Pra-Rilis

- [ ] Semua unit test lulus (Coverage target ≥ 80%).
- [ ] Semua tes E2E lulus di browser target (Chromium, Firefox, WebKit).
- [ ] Validasi tipe TypeScript bersih (`pnpm run type-check`).
- [ ] Audit aksesibilitas (A11Y) lulus tanpa error kritikal.
- [ ] Verifikasi keamanan (RBAC, CSP, HMAC) aktif dan benar.

### Mekanisme Stabilitasi

- Gunakan "Repeat-run" (minimal 5 kali) untuk mendeteksi flakiness pada tes E2E.
- Implementasikan `webServer.timeout` yang memadai untuk build monorepo yang berat.

## 4. Rencana Validasi Sistem

Setiap rilis besar harus melalui fase validasi teknis:

1. **Analisis Niat**: Verifikasi bahwa fitur sesuai dengan persyaratan fungsional.
2. **Review Arsitektur**: Memastikan perubahan tidak merusak pola desain yang ada.
3. **Review Keamanan**: Audit terhadap endpoint baru dan penanganan data sensitif.
4. **Validasi Output**: Memastikan hasil eksekusi agent akurat dan bebas halusinasi (via Review Agent).
