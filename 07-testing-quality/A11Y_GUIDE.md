---
title: SBA-Agentic Accessibility (A11Y) Guide
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: medium
tags: [a11y, accessibility, wcag, remediation]
---

# SBA-Agentic Accessibility (A11Y) Guide

Panduan dan catatan perbaikan aksesibilitas (A11Y) untuk memenuhi standar WCAG 2.1 AA.

## 1. Ringkasan Perbaikan (Remediation)

Berdasarkan audit menggunakan Axe, beberapa area telah diperbaiki:

### Kontras Warna (`color-contrast`)

- **Masalah**: Teks `text-muted-foreground` pada latar `bg-muted` memiliki rasio kontras < 4.5:1.
- **Solusi**: Mengganti `text-muted-foreground` dengan `text-foreground/80` pada deskripsi dan metadata untuk meningkatkan kontras visual.

### Atribut ARIA (`aria-required-children`)

- **Masalah**: Kontrol seleksi tidak mendeklarasikan hubungan ARIA yang lengkap.
- **Solusi**:
  - Menambahkan `role="listbox"` dan `role="option"` pada komponen Select.
  - Menambahkan `aria-haspopup` dan `aria-controls` pada trigger.

### Label & Kontrol

- Menambahkan `htmlFor` pada label untuk asosiasi eksplisit dengan input/select.
- Memastikan checkbox memiliki label yang terkait untuk memperluas area klik.
- Menambahkan `type="button"` pada tombol non-submit untuk mencegah perilaku form default yang tidak diinginkan.

## 2. Praktik Terbaik Pengembangan

- **Semantik**: Selalu gunakan elemen HTML semantik sebelum beralih ke ARIA.
- **Focus Management**: Pastikan urutan tab logis dan fokus terlihat jelas (`ring-offset`).
- **Alt Text**: Berikan teks alternatif yang deskriptif untuk ikon dan gambar non-dekoratif.
- **Heading Hierarchy**: Gunakan urutan heading (`h1` s/d `h6`) secara logis tanpa melompati level.

## 3. Pengujian Aksesibilitas

### Pengujian Otomatis

Jalankan pengujian A11Y terintegrasi dengan Playwright:

```bash
pnpm -C apps/web test:e2e --grep "a11y"
```

### Pengujian Manual

- Navigasi penuh menggunakan keyboard (Tab, Enter, Space, Arrow keys).
- Penggunaan Screen Reader (VoiceOver pada macOS, NVDA pada Windows).
- Zoom halaman hingga 200% tanpa kehilangan fungsionalitas atau konten.

## 4. Referensi

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Axe-core Documentation](https://github.com/dequelabs/axe-core)
