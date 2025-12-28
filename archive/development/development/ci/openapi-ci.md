# OpenAPI CI/CD — Lint, Diff, Contract Tests

Versi: 1.0.0
Tanggal: 2025-12-08

## Tujuan

- Menjamin spesifikasi OpenAPI valid, konsisten dengan implementasi, dan bebas dari breaking changes.

## Tooling

- Spectral: lint OpenAPI/Swagger.
- openapi-diff: deteksi breaking changes vs baseline.
- Prism: mock server untuk uji kontrak.

## Skrip (npm scripts contoh)

Tambahkan pada `package.json` root atau app terkait:

```json
{
  "scripts": {
    "openapi:baseline:prepare": "node tools/ci/openapi-baseline.mjs prepare",
    "openapi:baseline:update": "node tools/ci/openapi-baseline.mjs update",
    "openapi:lint": "npx spectral lint apps/app/src/app/api/openapi.json --include src --fail-severity error",
    "openapi:diff": "npx openapi-diff --fail-on-breaking apps/api/docs/openapi.yaml apps/app/src/app/api/openapi.json",
    "openapi:mock": "npx prism mock apps/app/src/app/api/openapi.json -p 4010",
    "openapi:contract-test": "node docs/development/ci/prism-contract-tests.js"
  }
}
```

## Pipeline CI (contoh GitHub Actions)

```yaml
name: OpenAPI Quality
on:
  pull_request:
    paths:
      - 'apps/app/src/app/api/openapi.json/**'
      - 'apps/app/src/shared/lib/openapi.ts'
      - 'apps/api/docs/openapi.yaml'
jobs:
  check-openapi:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
      - run: npm ci
      - run: npm run openapi:baseline:prepare
      - run: npm run openapi:lint
      - run: npm run openapi:diff
      - run: npm run openapi:mock &
      - run: sleep 3
      - run: npm run openapi:contract-test
```

## Kontrak: Prism Tests

Berkas uji: `docs/development/ci/prism-contract-tests.js` menjalankan request ke mock server `http://localhost:4010` dan memverifikasi status/respons.

## Troubleshooting

- Spectral error: pastikan versi schema OpenAPI 3.0+ dan jalur `$ref` valid.
- Diff breaking: evaluasi perubahan endpoint/response dan perbarui baseline bila memang diinginkan.
- Prism tidak merespons: cek port `4010` dan pastikan spesifikasi valid JSON.
