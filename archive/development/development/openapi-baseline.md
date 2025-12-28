# OpenAPI Baseline — Opsi Lokal & Artefak

Versi: 1.0.0
Tanggal: 2025-12-13

## Tujuan

- Menyediakan baseline spesifikasi OpenAPI untuk deteksi breaking changes via `openapi-diff`.

## Opsi Implementasi

- File Lokal
  - Lokasi: `ci-artifacts/openapi-baseline.yaml`
  - Cara update: `pnpm run openapi:baseline:update` (menyalin `apps/api/docs/openapi.yaml` dengan `x-baseline` metadata)
  - Validasi: lint via Spectral otomatis saat prepare/update

- Artefak Rilis
  - Sumber: `BASELINE_URL` (HTTPS) dengan `BASELINE_TOKEN`/`CI_JOB_TOKEN` bila perlu
  - Cara prepare: `OPENAPI_BASELINE_SOURCE=artifact BASELINE_URL=... BASELINE_TOKEN=... pnpm run openapi:baseline:prepare`
  - Fallback: bila fetch gagal, dibuat `ci-artifacts/openapi-baseline.missing` dan pipeline akan melewati diff

## Versioning & Metadata

- Metadata disisipkan via `x-baseline`:
  - `createdAt`, `commit`, `source`, `version`.
- Pastikan `info.version` mengikuti SemVer untuk tracking.

### Mapping Khusus

- File: `tools/ci/openapi-baseline.map.json` (opsional)
- Struktur:
  - `alias`: pemetaan tag ke baseline target (mis. `v1.2.3-rc.1` → `v1.2.3`)
  - `validate.semver`: jika `true`, validasi format tag sesuai SemVer
- Resolver memuat file ini bila ada dan menerapkan pemetaan sebelum membangun URL baseline.
- Mendukung komentar (JSONC) di file konfigurasi; parser akan menghapus komentar sebelum validasi.
- Validasi struktur dilakukan dengan skema sederhana: `alias` berisi string mapping, `validate.semver` boolean.
- Mendukung alias berantai: nilai alias dapat merujuk ke kunci alias lain hingga menuju tag final. Siklus akan dihentikan secara aman.
- Validasi SemVer mendukung pra-rilis (`-rc.1`, `-beta.2`) dan build metadata (`+build.5`).

## Integrasi CI/CD

- Jalankan pada job `openapi_quality`:
  - `pnpm run openapi:baseline:prepare`
  - `openapi-diff --fail-on-breaking ci-artifacts/openapi-baseline.yaml apps/api/docs/openapi.yaml`
- Artefak: `ci-artifacts/openapi-diff.txt`, `ci-artifacts/openapi-baseline.info.json`.

### Tabel Alias Komprehensif

| Nama Pola Alias | Deskripsi                         | Contoh Penggunaan Lengkap            | Skrip Environment Terkait                     | Contoh Kasus Nyata              |
| --------------- | --------------------------------- | ------------------------------------ | --------------------------------------------- | ------------------------------- |
| rc              | Release candidate ke rilis stabil | `"rc": "v2.0.0-rc.1"`                | `BASELINE_URL=gitlab:repo:tag:rc`             | QA pre-release menuju release   |
| beta            | Kanal beta menuju versi final     | `"beta": "v2.1.0-beta.2"`            | `BASELINE_URL=gitlab:repo:tag:beta`           | Uji fitur baru terbatas         |
| hotfix          | Patch cepat untuk produksi        | `"hotfix-2025-12": "v2.0.1"`         | `BASELINE_URL=gitlab:repo:tag:hotfix-2025-12` | Perbaikan bug kritis produksi   |
| legacy          | Versi lama yang masih dipakai     | `"legacy": "v1.5.0"`                 | `BASELINE_URL=gitlab:repo:tag:legacy`         | Dukungan backward compatibility |
| qa-approved     | Versi disetujui QA                | `"qa-approved": "v1.9.5"`            | `BASELINE_URL=gitlab:repo:tag:qa-approved`    | Gate QA sebelum rilis           |
| latest-stable   | Versi stabil terkini              | `"latest-stable": "v2.0.0"`          | `BASELINE_URL=gitlab:repo:tag:latest-stable`  | Patokan produksi                |
| legacy-compat   | Versi lama dengan metadata build  | `"legacy-compat": "v1.5.0+compat.7"` | `BASELINE_URL=gitlab:repo:tag:legacy-compat`  | Integrasi dengan sistem lama    |

Contoh file `tools/ci/openapi-baseline.map.json`:

```
{
  "alias": {
    "release-candidate": "v2.0.0-rc.1",
    "latest-stable": "v2.0.0",
    "hotfix-2025-12": "v2.0.1",
    "qa-approved": "v1.9.5",
    "beta-track": "v2.1.0-beta.2",
    "legacy": "v1.5.0",
    "legacy-compat": "v1.5.0+compat.7"
  },
  "validate": { "semver": true }
}
```

### Skenario Lingkungan

- Development:
  - `OPENAPI_BASELINE_SOURCE=artifact BASELINE_URL=gitlab:repo:latest pnpm run openapi:baseline:prepare`
  - Mengambil baseline dari tag terbaru untuk sinkronisasi cepat.
- Testing:
  - `OPENAPI_BASELINE_SOURCE=artifact BASELINE_URL=gitlab:repo:tag:qa-approved pnpm run openapi:baseline:prepare`
  - Mengunci baseline pada versi disetujui QA.
- Production:
  - `OPENAPI_BASELINE_SOURCE=artifact BASELINE_URL=gitlab:repo:tag:latest-stable pnpm run openapi:baseline:prepare`
  - Menjamin baseline konsisten dengan rilis produksi.

### Trigger

- Push: menjalankan seluruh validasi
- Merge Request: menjalankan validasi lint/diff/kontrak untuk gate kualitas sebelum merge
- Tag: menjalankan validasi untuk rilis/tag; gunakan `gitlab:repo:latest`/`gitlab:repo:tag:<name>` sebagai sumber baseline bila diinginkan

#### Mapping Tag → Baseline

- Saat `CI_PIPELINE_SOURCE == "tag"`, pipeline mencoba memetakan `CI_COMMIT_TAG` ke `gitlab:repo:tag:<CI_COMMIT_TAG>`.
- Validasi format tag: SemVer `vMAJOR.MINOR.PATCH` atau `MAJOR.MINOR.PATCH`.
- Bila tag tidak sesuai SemVer, fallback ke `gitlab:repo:latest`.
- Logging status konfigurasi baseline dicetak di job agar transparan.

## Keamanan

- Hanya menerima URL HTTPS untuk baseline.
- Gunakan token CI/job untuk akses artefak rilis; jangan hardcode.

## Ketika Baseline Tidak Tersedia

- Job mencetak “No baseline found, skipping diff” dan tetap menghasilkan `openapi-diff.txt` placeholder.
- Rekomendasi: jalankan `openapi:baseline:update` setelah rilis untuk menetapkan baseline baru.

### Fallback Validasi

- Bila lint Spectral gagal: job gagal (exit code 1)
- Bila kontrak Prism gagal: job gagal dengan ringkasan endpoint gagal
- Bila baseline fetch error: buat `openapi-baseline.missing` dan lewati diff
