# Merge-Back Runbook (Main Branch)

## Tujuan

- Mengembalikan seluruh perubahan ke `main` secara aman, memastikan tidak ada kehilangan data, dan memverifikasi integritas kode.

## Langkah yang Dilakukan

1. Sanitasi git ignore
   - Update `.gitignore` untuk mengabaikan log API: `apps/api/logs/*.log`
   - Hentikan tracking file besar: `git rm --cached apps/api/logs/combined.log`
   - Commit: `chore(git): ignore API logs and stop tracking combined.log`

2. Backup snapshot
   - Arsip workspace (tanpa `node_modules`, `.next`, logs): `backups/snapshot-<timestamp>.tgz`
   - Salin artefak: `backups/artifacts-<timestamp>/`
   - Salin screenshot dokumen: `backups/assets-<timestamp>/`

3. Sinkronisasi main
   - `git checkout main && git pull --ff-only`
   - Coba merge branch fitur lokal bila ada: `feature/e2e-observability`, `feature/docs-reporting`, `feature/dev-config-stabilization`, `ci/docs-pdf-export`

4. Verifikasi perubahan
   - Diff terhadap remote: `git diff --name-status origin/main..HEAD`
   - Observasi file kunci (docs, workflows, e2e) tersedia secara lokal untuk integrasi PR berikutnya.

## Hasil Verifikasi

- `.gitignore` telah diperbarui; file log besar tidak lagi ter-tracking.
- Snapshot dan salinan artefak dibuat.
- Main tersinkronisasi; perubahan lokal siap untuk diajukan melalui PR.

## Testing di Main

- Lint: `pnpm lint` (hasil: terdapat error/warning pada sub-workspace `workspace/header-sidebar-app`; perlu penyesuaian parserOptions.project untuk file JS konfigurasi atau membatasi lint target).
- E2E Web (target observability): tes tidak ditemukan pada main saat eksekusi global; jalankan pada branch fitur atau setelah PR merge untuk validasi.

## Rekomendasi Tindak Lanjut

1. Lint
   - Perbaiki konfigurasi ESLint pada sub-workspace `workspace/header-sidebar-app` (hilangkan parserOptions.project pada file JS config, atau kunci lint path ke paket terkait).
   - Alternatif: `pnpm lint --fix` dan gunakan `--max-warnings` bila diperlukan.
2. E2E
   - Jalankan Playwright pada cabang fitur observability setelah PR dibuat/merged: `BASE_URL=http://localhost:3001 PLAYWRIGHT_SKIP_WEBSERVER=true pnpm -C apps/web exec playwright test apps/web/e2e/*.spec.ts --project=chromium`.
3. Branch cleanup
   - Hapus branch lokal yang tidak diperlukan setelah perubahan berada di `main`: `git branch -d <branch>`; remote: `git push origin --delete <branch>`.
4. Dokumentasi & CI
   - Ajukan PR dengan template yang telah disediakan dan aktifkan workflow `docs-export.yml` untuk PDF.

## Log Ringkas

- `.gitignore` diperbarui, tracking log dihentikan.
- Snapshot dibuat: `backups/snapshot-<timestamp>.tgz`.
- `git checkout main` dan `pull --ff-only` selesai.
- Diff lokal terhadap `origin/main` ditinjau.
- Lint global masih memiliki error pada sub-workspace; E2E perlu dijalankan di branch fitur atau setelah PR merge.
