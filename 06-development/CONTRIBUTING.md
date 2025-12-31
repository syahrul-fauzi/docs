---
title: Panduan Kontribusi & Standar Pengembangan
created_at: 2025-12-28
author: SBA-Agent
status: active
priority: high
tags: [contributing, coding-standards, pull-request, testing]
---

# 🤝 Panduan Kontribusi & Standar Pengembangan

Terima kasih telah berkontribusi pada SBA-Agentic! Dokumen ini menguraikan standar koding, proses peninjauan kode, dan panduan pengujian kami.

## 🛠️ Standar Koding (Coding Standards)

Kami menggunakan kombinasi Biome dan ESLint untuk memastikan kualitas dan konsistensi kode.

### Umum

- **Bahasa**: Semua kode, komentar, dan nama variabel harus menggunakan bahasa Inggris.
- **TypeScript**: Wajib menggunakan TypeScript untuk semua file baru. Hindari penggunaan `any`.
- **Naming Convention**:

  - Variabel & Fungsi: `camelCase`
  - Komponen React: `PascalCase`
  - File: `kebab-case`
  - Konstanta: `UPPER_SNAKE_CASE`

### React & Frontend

- Gunakan **Functional Components** dengan Hooks.
- Patuhi arsitektur **Feature-Sliced Design (FSD)**.
- Gunakan utility classes Tailwind CSS untuk styling.
- Gunakan komponen dari `@sba/ui` jika tersedia.

### Backend (NestJS)

- Ikuti prinsip **Dependency Injection**.
- Gunakan DTO (Data Transfer Objects) untuk validasi input.
- Pastikan setiap service memiliki interface yang jelas.

## 🌿 Proses Pengajuan Pull Request (PR)

1. **Buat Branch Baru**: Gunakan format `feat/nama-fitur`, `fix/nama-bug`, atau `docs/nama-dokumen`.
2. **Commit Pesan**: Ikuti standar [Conventional Commits](https://www.conventionalcommits.org/).
3. **Jalankan Validasi Lokal**:

   ```bash
   pnpm run lint
   pnpm run type-check
   pnpm test
   ```

4. **Buka PR**: Gunakan [Template PR](./PR_TEMPLATE_SBA_AGENTIC.md).
5. **Review**: Tunggu setidaknya satu approval dari maintainer sebelum merge.

### Agentic & AI Logic

- **Reasoning Policy**: Setiap perubahan pada logika agent harus mematuhi `ReasoningStep` (Analysis, Planning, Execution, Reflection).
- **Prompt Management**: Gunakan file `.prompt.md` untuk instruksi agent agar versi terkendali.
- **Structured Output**: Pastikan agent selalu mengembalikan JSON yang valid sesuai skema yang didefinisikan di `packages/types`.

## 🧪 Panduan Pengujian (Testing Guide)

Kami mengutamakan kualitas melalui pengujian otomatis yang ketat.

### Tingkatan Testing

- **Unit Test (Vitest)**: Wajib untuk setiap fungsi utilitas dan logika bisnis di service.
- **Integration Test**: Untuk memastikan interaksi antar modul (misalnya: API -> Database).
- **E2E Test (Playwright)**: Untuk alur kerja kritis pengguna (misalnya: Login, Checkout).
- **Agentic Simulation**: Pengujian khusus untuk mengevaluasi akurasi dan "reasoning" agent menggunakan input yang variatif.

### Menjalankan Test

```bash
# Jalankan semua test
pnpm test

# Jalankan test dengan mode watch
pnpm test:watch

# Lihat laporan coverage
pnpm run test:coverage
```

## 📝 Pembaruan Dokumentasi (Documentation Updates)

Dokumentasi adalah bagian integral dari kode. Setiap PR yang menambah fitur atau mengubah API wajib:

1. **Update README/Docs**: Perbarui file `.md` yang relevan di folder `docs/`.
2. **YAML Frontmatter**: Pastikan file markdown baru memiliki frontmatter yang valid (title, author, status, dll.).
3. **Mermaid Diagrams**: Perbarui diagram jika ada perubahan alur sistem atau arsitektur.
4. **Alt-text**: Pastikan semua diagram memiliki deskripsi tekstual untuk aksesibilitas.

## 🔍 Proses Review Kode

Maintainer akan meninjau PR Anda berdasarkan kriteria berikut:

- **Kebenaran Fungsional**: Apakah fitur bekerja sesuai spesifikasi?
- **Kualitas Kode**: Apakah kode bersih, modular, dan mudah dibaca?
- **Keamanan**: Apakah ada celah keamanan (XSS, SQL Injection, Tenant Leakage)?
- **Performa**: Apakah perubahan ini berdampak signifikan pada latensi atau penggunaan memori?
- **Testing**: Apakah ada test yang mencakup perubahan tersebut?
- **Documentation**: Apakah dokumentasi sudah diperbarui dan sinkron dengan kode?

---
_Pertanyaan? Silakan buka issue atau diskusikan di kanal Slack tim._
