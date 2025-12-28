## Migrasi ke Design System @sba/ui

- Tujuan: Menyatukan komponen UI ke satu design system dengan Atomic Design tanpa mengubah arsitektur yang sudah berjalan.
- Ruang lingkup: Header, Sidebar, AppLayout, komponen UI umum (Button, Input, Card, Badge, Tabs, Alert, Progress, Textarea, Avatar), utilitas `cn`.

### Perubahan Utama

- Mengganti impor `cn` lokal menjadi `@sba/ui/cn` di seluruh komponen.
- Mengganti impor komponen UI lokal menjadi komponen dari `@sba/ui` ketika tersedia untuk menjaga konsistensi gaya dan aksesibilitas.
- Menghapus shim lokal untuk `ScrollArea` dan `Separator` di Sidebar; menggunakan `@sba/ui` langsung.

### Berkas yang Diubah

- `apps/app/src/components/header/Header.tsx`
- `apps/app/src/components/sidebar/Sidebar.tsx`
- `apps/app/src/components/layout/AppLayout.tsx`
- `apps/app/src/components/ui/*` (button, input, card, badge, alert, avatar, label, textarea, tabs, progress)
- Komponen chat: message-list, generative-ui-renderer, interrupt-controls, message-input, reasoning-display, meta-events-panel

### Konvensi dan Pola

- Tetap menggunakan store responsif dan tema yang ada (`useResponsiveStore`, `useThemeStore`).
- Mempertahankan props API komponen agar kompatibel dengan konsumsi saat ini.
- Memastikan kelas Tailwind konsisten dengan token desain yang sudah ada.

### Testing

- Tambahkan unit test untuk `Header` dan `AppLayout` memverifikasi:
  - Navigasi aktif diberi gaya yang benar.
  - Toggling tema dan sidebar berfungsi.
  - Layout responsif diubah sesuai breakpoint store.

### Catatan Integrasi

- Alias path `@sba/ui` sudah dikonfigurasi di `apps/app/tsconfig.json` untuk resolusi source selama pengembangan.
- Pastikan workflow CI mengecek kesesuaian aksesibilitas pada komponen dari `@sba/ui`.

### Pemeliharaan

- Dokumentasi ini menjadi referensi saat memigrasikan komponen lain agar menjaga kesesuaian dengan Atomic Design dan clean architecture yang sudah diterapkan.
