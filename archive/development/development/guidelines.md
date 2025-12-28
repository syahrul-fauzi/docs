# Development Guidelines

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft pedoman pengembangan.

## Coding Standards

- TypeScript strict; Zod-first schemas di boundary
- FSD untuk frontend, DDD untuk backend
- Pelarangan impor lintas `apps/*` (gunakan `@sba/*`)

### Next.js App Router — Page File Rules

- File `page.tsx` hanya mengekspor komponen dan `generateMetadata`.
- Ekstrak helper non-rendering (formatting, TOC, resolvers) ke file pendamping yang terkolokasi (mis. `docs-utils.ts`).
- ESLint di-override untuk `app/**/page.tsx` agar tidak memicu `react-refresh/only-export-components` ketika `generateMetadata` ada di file yang sama.
- Pola impor: gunakan util dari berkas pendamping, hindari deklarasi helper langsung di `page.tsx`.

## Testing Strategy

- Unit ≥ 80% coverage; branches ≥ 70%
- Contract tests untuk OpenAPI + Zod
- Integration dengan test containers (Redis/Postgres)
- E2E Playwright untuk alur utama

## Branching & Release

- Gitflow singkat: `main`, `develop`, feature branches
- SemVer dengan changelog
- Release notes otomatis (CI)

## CI/CD

- Lint: code + markdown + OpenAPI (`spectral`)
- Diff: `openapi-diff` (fail on breaking)
- Build/test/type-check dengan Turborepo cache
