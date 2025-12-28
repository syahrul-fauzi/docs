# Technical Architecture — SBA Monorepo

- Architecture: Hybrid FSD (frontend) + DDD (domain) + Atomic Design (UI)
- Monorepo: Turborepo with workspaces `apps/*` and `packages/*`
- Frontend: `apps/app` (Next.js) and `apps/web` (Next.js/Vite React)
- Domain: `packages/entities` aggregates, `packages/sdk` contracts, `packages/tools` adapters
- Shared: `packages/ui` design system, `packages/utils` helpers, `packages/telemetry` observability

## Module Boundaries

- FSD: `shared`, `entities`, `features`, `widgets`, `pages`, `app`
- DDD: tenants, users, teams, conversations, documents, workflows, analytics
- Contracts: Zod-first DTOs (`packages/sdk/contracts`), OpenAPI (API docs)

## Streaming & Integrations

- SSE/WebSocket for agent events and chat
- BaseHub CMS for content; Supabase for auth/storage/RLS

## Quality & CI/CD

- Unit/a11y tests with Vitest + RTL, e2e with Playwright
- CI runs format, lint, type-check, test, build across Node 18/20
