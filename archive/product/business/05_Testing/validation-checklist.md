# 📋 Validation Checklist

**Lokasi:** `docs/Business/05_Testing-Validation/validation-checklist.md`

## 1. Checklist Umum

✅ Business logic teruji (unit)  
✅ API contract sesuai OpenAPI spec  
✅ Integrasi antar module berjalan (integration test)  
✅ Agentic flow tereksekusi dengan benar  
✅ Observability pipeline menerima event meta

## 2. Kriteria Keberhasilan

| Area                  | Target  | Tool                |
| --------------------- | ------- | ------------------- |
| Coverage              | ≥ 85%   | Vitest              |
| API Latency           | ≤ 300ms | Supertest Benchmark |
| Agentic Flow Accuracy | ≥ 95%   | Agent Simulation    |
| Uptime Simulation     | ≥ 99.5% | Synthetic Test      |

## 3. Contoh CI Workflow

```yaml
name: sba-business-test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm test:ci
      - run: pnpm test:integration
      - run: pnpm test:e2e
```
