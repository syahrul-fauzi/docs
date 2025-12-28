# Panduan Kontribusi (Contribution Guidelines)

Versi: 1.1.0
Terakhir Diperbarui: 2025-12-28

## Prinsip Dasar

- **FSD/DDD**: Ikuti batasan lint (Feature-Sliced Design / Domain-Driven Design).
- **TypeScript Strict**: Wajib menggunakan TypeScript strict mode.
- **Zod-first**: Gunakan Zod untuk validasi input dan skema data.
- **Reasoning Patterns**: Ikuti pola `ReasoningStep` untuk pengembangan fitur agen baru.

## Alur Kerja Git & PR

- **Branching**: Gunakan pola branch:
  - `feature/<nama>` - Fitur baru
  - `fix/<id>` - Perbaikan bug
  - `chore/<nama>` - Pemeliharaan rutin
  - `docs/<nama>` - Pembaruan dokumentasi
  - `ci/<nama>` - Perubahan pipeline CI
- **Commits**: Gunakan Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `ci:`).
- **Pull Request**:
  - Ajukan PR ke cabang `develop`.
  - Gunakan template PR di `.github/PULL_REQUEST_TEMPLATE/`.
  - Sertakan bukti pengujian (unit/integration/e2e) yang berhasil.

## Standar Koding & Pengujian

- **Linting**: Jalankan `pnpm lint` sebelum melakukan commit.
- **Testing**:
  - Target coverage minimal 80% untuk logika bisnis di `packages/`.
  - Pastikan semua pengujian lulus: `pnpm test`.
- **Aksesibilitas**:
  - Gunakan Playwright Axe untuk pengujian E2E: `pnpm -C apps/web run test:e2e -- --project=chromium --workers=1 e2e/ai-copilot-a11y.spec.ts`.
  - Jalankan Pa11y scan untuk kepatuhan WCAG 2.1 AA.

## Artifacts & Laporan

- **Manajemen File**:
  - Direktori `artifacts/` diabaikan oleh git, kecuali `artifacts/reports/**` untuk laporan final.
  - Sinkronkan laporan ke `reports/**` menggunakan `node scripts/reports/sync_from_artifacts.mjs`.
- **Large Files**: Gunakan Git LFS untuk file >100MB hanya jika diperlukan.
- **Logs**: Jangan commit file log (`**/logs/*`).

## Review Code

- Fokus pada kebenaran (correctness), keamanan, performa, dan maintainability.
- Pastikan dokumentasi API (OpenAPI) tetap sinkron dengan perubahan kode.
