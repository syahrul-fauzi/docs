---
title: Test Plan - Control Plane Utama (apps/app)
created_at: 2025-12-31
author: SBA-Agentic QA Team
status: Draft
priority: High
---

# Test Plan: Control Plane Utama (apps/app)

Dokumen ini merinci rencana pengujian manual dan otomatis untuk aplikasi Control Plane Utama (`apps/app`). Fokus utama adalah validasi fungsionalitas Runs, Manajemen Agen, dan Stabilitas Dashboard.

## 1. Lingkup Pengujian

### 1.1 Fitur Utama

1. **Dashboard Utama**
   - Widget loading & error handling (Granular Error Boundary).
   - Responsivitas layout (Desktop, Tablet, Mobile).
   - Visualisasi data (Charts).
2. **Manajemen Runs (Features/Runs)**
   - Listing runs (Pagination/Infinite Scroll).
   - Filtering runs (by Agent ID, Status, Date).
   - Triggering new run (Modal input validation & submission).
   - Viewing run details (Logs/Events stream).
3. **Manajemen Agen (Features/Agents)**
   - Listing agents.
   - Creating new agent (Form validation).
   - Editing existing agent.
   - Deleting/Archiving agent.

### 1.2 Lingkungan Pengujian

- **Browser**: Chromium (Primary), Firefox, WebKit (via Playwright).
- **Viewports**:
  - **Desktop**: 1280x720
  - **Tablet**: 768x1024
  - **Mobile**: 375x667

## 2. Skenario Pengujian (Test Cases)

### 2.1 Dashboard

| ID | Skenario | Langkah Pengujian | Ekspektasi |
| :--- | :--- | :--- | :--- |
| **DSH-01** | Render Dashboard | Buka halaman `/`. | Halaman dimuat tanpa error fatal. Widget tampil. |
| **DSH-02** | Widget Error Handling | Simulasikan error pada API widget. | Widget menampilkan UI fallback (Error Boundary), bukan crash halaman penuh. |
| **DSH-03** | Hydration | Refresh halaman. | Tidak ada error hydration mismatch di console. |

### 2.2 Runs

| ID | Skenario | Langkah Pengujian | Ekspektasi |
| :--- | :--- | :--- | :--- |
| **RUN-01** | List Runs | Buka `/runs`. | Daftar runs tampil. Status (Running, Completed, Failed) terlihat jelas. |
| **RUN-02** | Filter Runs | Masukkan `agent-1` di filter Agent ID. | Daftar hanya menampilkan run dari `agent-1`. |
| **RUN-03** | Trigger Run (Success) | Klik "Trigger Run", isi form valid, submit. | Modal tertutup, toast sukses muncul, run baru muncul di list. |
| **RUN-04** | Trigger Run (Validation) | Klik "Trigger Run", kosongkan field wajib, submit. | Pesan error validasi muncul di field terkait. |

### 2.3 Agents

| ID | Skenario | Langkah Pengujian | Ekspektasi |
| :--- | :--- | :--- | :--- |
| **AGT-01** | List Agents | Buka `/agents`. | Daftar agen tampil dengan status aktif/non-aktif. |
| **AGT-02** | Create Agent | Klik "Create Agent", isi form, submit. | Agen baru berhasil dibuat dan muncul di daftar. |

## 3. Strategi Otomasi

Pengujian akan diotomasi menggunakan **Playwright** untuk memastikan regresi tidak terjadi di masa depan.

- **Suite Validasi**: `apps/app/e2e/validation-suite.spec.ts` telah dibuat untuk mencakup skenario Runs, Agents, dan Responsivitas.
- **Multi-Browser & Mobile**: Konfigurasi Playwright (`playwright.config.ts`) telah diperbarui untuk mencakup:
  - Desktop: Chromium, Firefox, WebKit.
  - Mobile: Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12).
- **Mocking**: API dimock menggunakan `page.route` untuk isolasi frontend testing dan kecepatan eksekusi.

### Cara Menjalankan Test

```bash
# Pindah ke direktori aplikasi
cd apps/app

# Menjalankan seluruh suite validasi
pnpm exec playwright test e2e/validation-suite.spec.ts

# Menjalankan hanya mode mobile
pnpm exec playwright test e2e/validation-suite.spec.ts --project=mobile-chrome
```

## 4. Pelaporan Isu

Setiap isu yang ditemukan akan dicatat dengan format:

- **Severity**: Critical / High / Medium / Low.
- **Description**: Langkah reproduksi.
- **Evidence**: Screenshot / Logs.
