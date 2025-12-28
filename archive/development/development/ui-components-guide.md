# Panduan Engineering Komponen UI (Atomic Design)

Tujuan: menyusun library komponen yang reusable, konsisten, aksesibel, dan teruji untuk SBA dashboard.

## Struktur Direktori

- `packages/ui/src/<level>/<ComponentName>/`
  - `index.ts` (ekspor komponen)
  - `<ComponentName>.tsx` (implementasi)
  - `<ComponentName>.stories.tsx` (Storybook)
  - `<ComponentName>.spec.ts` (unit/interaction tests)
- Level: `atoms/`, `molecules/`, `organisms/`, `patterns/` (AG‑UI), `templates/`/`layouts/`.

## Standar Props & TypeScript

- Interface `Props` eksplisit dengan tipe yang ketat.
- Default props untuk opsi, required untuk wajib.
- JSDoc pada komponen dan setiap prop untuk dokumentasi otomatis.

## Aksesibilitas (WCAG 2.1 AA)

- Navigasi keyboard: `Tab`/`Shift+Tab`, `Enter`/`Space`, `Escape` bila relevan.
- ARIA attributes sesuai peran komponen (mis. `aria-invalid`, `role`, `aria-live`).
- Fokus terlihat (focus-ring konsisten), kontras warna mengikuti tokens.

## Kontrak UI/a11y (Quality Bar)

Kontrak minimal yang wajib dipenuhi oleh layout/halaman utama:

- Ada skip link ke `#main-content` (link fokus-able dan terlihat saat fokus).
- Ada landmark: `header` (role `banner`) dan `main` (role `main`).
- Elemen `main` memiliki `id="main-content"` dan `tabIndex={-1}` untuk fokus programatik.
- Navigasi utama memakai `nav` dengan `aria-label` yang spesifik (hindari label generik).
- Semua tombol icon-only wajib punya `aria-label` yang konsisten (mis. buka/tutup sidebar, user menu).
- Perubahan route/halaman memindahkan fokus ke `#main-content` (untuk pembaca layar/keyboard).

Referensi implementasi standar:

- `packages/ui`: `templates/DashboardLayout`
- `apps/web`: `src/widgets/DashboardLayout`

## Storybook

- Tambahkan stories: dasar, advanced, states (active/disabled/loading/error), responsive.
- Aktifkan controls untuk seluruh props; lengkapi deskripsi dari JSDoc.
- Sertakan catatan a11y dan best practices penggunaan.

## Testing

- Interaction tests dengan `@testing-library/react` + `@testing-library/user-event`.
- A11y baseline dengan `jest-axe` bila relevan.
- Target cakupan minimal 80% untuk komponen baru.

## Penamaan

- Folder dan komponen: `PascalCase` (mis. `StatusCard`).
- File PRD/dokumen fitur: `snake_case` (mis. `user_authentication.md`).

## Patterns (AG‑UI)

- Dokumentasikan pola khusus (event stream, SSE/WebSocket, analytics) di `patterns/` dan Storybook examples.

## Checklist Submit

- Struktur berkas lengkap
- Lint & type‑check hijau
- Storybook terbarui
- Tests lulus; coverage ≥80%
