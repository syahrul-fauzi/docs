---
title: SBA-Agentic UI/UX Standard
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: medium
tags: [ui, ux, design-system, atomic-design, a11y]
---

# SBA-Agentic UI/UX Standard

Pedoman desain, implementasi, dan standar kualitas antarmuka pengguna (UI) dan pengalaman pengguna (UX).

## 1. Arsitektur Desain (Atomic Design)

SBA-Agentic mengikuti pola Atomic Design yang diimplementasikan dalam `packages/ui`:

- **Atoms**: Komponen dasar (Button, Input, Badge, Icons).
- **Molecules**: Gabungan atom (StatusIndicator, FormField).
- **Widgets/Organisms**: Komponen kompleks (SystemHealthWidget, NavigationHeader).
- **Templates/Pages**: Layout halaman dan komposisi fitur.

## 2. Sistem Status Terpadu

Gunakan `StatusIndicator` untuk menampilkan status sistem/tugas secara konsisten:

| Status    | Visual            | Variant       | Icon             |
| --------- | ----------------- | ------------- | ---------------- |
| `idle`    | Gray              | `secondary`   | None             |
| `loading` | Gray + Spinner    | `loading`     | `Loader` (Spin)  |
| `running` | Indigo + Pulse    | `running`     | `Loader` (Pulse) |
| `success` | Green + Check     | `success`     | `Check`          |
| `error`   | Red + X           | `destructive` | `XCircle`        |
| `warning` | Yellow + Triangle | `warning`     | `AlertTriangle`  |

## 3. Navigasi & Informasi Arsitektur

- **Global Context Bar**: Menampilkan nama Tenant/Workspace dan Widget Kesehatan Sistem secara real-time.
- **Route Consistency**: Setiap rute harus memiliki fallback 404/Unauthorized yang konsisten dan navigasi kembali yang jelas.
- **Breadcrumbs**: Gunakan `PageHeader` untuk navigasi hirarkis di halaman pengaturan/dalam.

## 4. Aksesibilitas (A11Y)

- **Landmarks**: Gunakan tag semantik (`<header>`, `<main>`, `<nav>`, `<footer>`).
- **Focus Management**: Kelola fokus saat membuka dialog/modal dan setelah navigasi.
- **ARIA**: Gunakan atribut ARIA yang tepat (misal: `role="status"` untuk indikator progres).
- **Keyboard Navigation**: Pastikan semua fitur utama dapat diakses tanpa mouse.

## 5. Metrik Sukses UX

- **Usability**: Target skor System Usability Scale (SUS) ≥ 68.
- **Performance**: p95 Time-to-First-Byte (TTFB) dan Largest Contentful Paint (LCP) dalam budget yang ditentukan.
- **Reliability**: Zero "dead-end navigation" (halaman tanpa tombol kembali/CTA).

## 6. Panduan Implementasi

- Hindari penggunaan `Badge` secara langsung untuk status; gunakan `StatusIndicator`.
- Pastikan setiap halaman utama memiliki **Empty State** dengan CTA (Call to Action) yang relevan.
- Gunakan helper HTTP yang menormalisasi URL untuk menghindari kesalahan "Invalid URL" pada SSR/Test.
