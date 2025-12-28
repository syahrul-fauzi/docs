# Onboarding Workspace

- Direktori `workspace/` menyimpan PRD, arsitektur, design system, agent flows, dan API.
- Buat dokumen baru dari template di masing-masing `_templates/`.
- Gunakan penamaan `YYYYMMDD-<DESCRIPTOR>.md` dan lengkapi frontmatter.
- Tautkan artefak terkait di `related` dan tambahkan entri ke `workspace/_xref.md`.
- Jalankan `pnpm docs:validate` dan `pnpm check:workspace` sebelum submit.

## Penautan Artefak Non-Markdown

- Simpan artefak `.drawio`, `.bpmn`, `.yaml` di `workspace/related/` sesuai kategori (`architecture/`, `agent-flows/`, `api/`).
- Di tiap dokumen Markdown, tambahkan bagian `Related Artifacts` dengan path relatif, contoh:
  - `workspace/related/architecture/feature-x/diagram.drawio`
  - `workspace/related/agent-flows/feature-x/flow.bpmn`
  - `workspace/related/api/feature-x/openapi.yaml`
- Pastikan back-link ke PRD asal ada di artefak atau dokumen pendamping.

## Linting & Validasi

- Format: `pnpm docs:lint` (Prettier)
- Frontmatter: `pnpm docs:validate`
- Struktur: `pnpm check:workspace`
- Markdown lint: `pnpm docs:markdownlint` (CI/CD otomatis menjalankannya)

## Feature Flags (Dev)

- Format env toggle: `FF_<FLAG>=true|false|canary:<PERCENT>`
- Canary percent global: `CANARY_PERCENT=<0..100>`
- Canary percent per flag: `CANARY_PERCENT_<FLAG>=<0..100>`
- Endpoint evaluasi: `GET /api/v1/feature-flags` (butuh JWT + tenant context)
