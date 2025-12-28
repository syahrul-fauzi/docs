---
title: Use Case — AI Copilot A11y
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [a11y, ai-copilot]
---

# Deskripsi

- Memastikan komponen AI Copilot memenuhi WCAG (kontras, ARIA required children) dan diuji dengan axe + Playwright.

# Aktor

- User
- Web App (Next.js)
- A11y test runner (axe/Playwright)

# Prasyarat

- Komponen `AICopilot.tsx` mengikuti ARIA roles; test E2E tersedia.

# Alur Normal

1. Render halaman `(authenticated)/ai-copilot`.
2. Jalankan analisis axe, tangkap screenshot sebelum/sesudah.
3. Validasi root visible, cek pelanggaran nol.

# Edge Cases

- Flaky root visibility saat skip webserver → jalankan dengan dev server aktif.
- Header/banner dinamis mengganggu a11y → gunakan selector stabil.

# Acceptance Criteria

- Tidak ada pelanggaran axe pada tag `wcag2a`/`wcag2aa`.
- Artefak screenshot tersimpan di `artifacts/a11y/*` dengan metadata.
