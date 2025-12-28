# CI Tooling Setup — Spectral, openapi-diff, Prism

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft setup CI tooling.

## Tujuan

- Validasi spesifikasi OpenAPI, mendeteksi breaking changes, dan uji kontrak otomatis.

## Tooling

- Spectral (lint OpenAPI)
- openapi-diff (cek perbedaan vs baseline)
- Prism (mock server untuk contract tests)

## Integrasi Pipeline

- Tambahkan job pada workflow CI:
  - Lint: `npx spectral lint apps/api/docs/openapi.yaml`
  - Diff: `openapi-diff baseline.yaml apps/api/docs/openapi.yaml` (gunakan artefak baseline)
  - Contract tests: jalankan Prism mock lalu uji helpers `@sba/api-client` terhadap endpoints `/runs`, `/tools/*`, `/solo/builder/advance`.

## lint_fix stage

- Tujuan: menjalankan analisis statis awal, menerapkan autofix non-breaking, dan memverifikasi type-check lintas workspace.
- Dependensi: `eslint`, konfigurasi `eslint.config.cjs`, script `pnpm -w run type-check` untuk monorepo.
- Contoh konfigurasi:

  ```yaml
  stages:
    - lint_fix
    - test
    - deploy

  lint_fix:
    stage: lint_fix
    image: node:20
    script:
      - npm i -g pnpm@8
      - pnpm install --no-frozen-lockfile
      - pnpm run lint || echo "Lint warnings or errors detected"
      - pnpm run lint:fix || echo "Autofix applied with warnings"
      - pnpm -w run type-check || (echo "Type-check failed" && exit 1)
      - pnpm run lint || (echo "Lint failed with blocking errors" && exit 1)
    rules:
      - if: $CI_PIPELINE_SOURCE == "push"
      - if: $CI_PIPELINE_SOURCE == "merge_request_event"
  ```

## lint_fix deploy safeguard

- Mekanisme: menjalankan lint pada file yang berubah saat pipeline tag, menerapkan autofix aman, memaksa lint tanpa peringatan (`--max-warnings=0`), dan memblokir deploy bila lint/type-check gagal.
- Kriteria kelulusan: semua lint tanpa error/peringatan, type-check monorepo lulus.
- Guard clause: gunakan `|| (echo "[deploy] Lint failed with blocking errors" && exit 1)` untuk menghentikan job.
- Contoh implementasi:

  ```yaml
  lint_fix_deploy:
    stage: deploy
    image: node:20
    script:
      - npm i -g pnpm@8
      - pnpm install --no-frozen-lockfile
      - echo "[deploy] Running static code analysis"
      - pnpm run lint || echo "[deploy] Lint warnings or errors detected"
      - pnpm run lint:fix || echo "[deploy] Autofix applied with warnings"
      - pnpm -w run type-check || (echo "[deploy] Type-check failed" && exit 1)
      - pnpm exec eslint --config ./eslint.config.cjs --max-warnings=0 "apps/**/src/**/*.{ts,tsx,js,jsx}" "packages/**/src/**/*.{ts,tsx,js,jsx}" || (echo "[deploy] Lint failed with blocking errors" && exit 1)
    rules:
      - if: $CI_PIPELINE_SOURCE == "pipeline"
        when: on_success
      - if: $CI_COMMIT_BRANCH == "main"
        when: on_success
      - if: $CI_COMMIT_BRANCH == "master"
        when: on_success
      - if: $CI_PIPELINE_SOURCE == "tag"
        when: on_success
  ```

## Acceptance Criteria

- Pipeline gagal bila ada pelanggaran lint (severity error) atau breaking diffs.
- Contract tests lulus untuk happy path dan edge cases.

## Rollback Plan

- Jika lint/diff gagal: revert ke spesifikasi terakhir yang valid; update changelog.
- Jika contract tests gagal: pin client ke versi stabil (SemVer + specHash) dan buka ticket per endpoint.

## Metrik Keberhasilan

- 100% PR menjalankan lint/diff/contract tests.
- Waktu eksekusi pipeline stabil (< 10 menit p95).
