---
title: "Changelog"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# Changelog

## [Unreleased] - 2025-12-24

### UI Component Standardization

#### Added

- **Visual Regression Testing**: Established baseline visual snapshots using Chromatic and Playwright.
- **Heading Component Enhancements**:
  - Improved handling of boolean children.
  - Fixed responsive class application logic.
  - Enhanced gradient text support with proper browser prefixes.
  - Optimized rendering performance for large text content.
  - Standardized font weight and size application order.

#### Changed

- **Heading Component**: Refactored `Heading.tsx` to ensure `className` merging logic (via `cn` utility) correctly prioritizes explicit props over default variant styles.
- **Testing**: Updated `Heading.test.tsx` to cover new edge cases (responsive props, boolean children, gradient styles).
- **Dependencies**: Added `jest-axe` for accessibility testing in UI package.

#### Fixed

- **Responsive Styles**: Resolved issues where responsive utility classes were not being applied correctly due to CSS class precedence.
- **Font Weight Conflicts**: Fixed conflict between variant-based font weights and explicit `weight` prop.
- **Visual Regression**: Fixed CI workflow for Chromatic to properly handle baseline acceptance flow.
- **E2E Smoke Tests**: Fixed Playwright smoke specs to run under ESM and improved `/api-docs` readiness checks.
- **Orchestrator Tests**: Fixed Vite resolution of `@sba/agentic-reasoning` by correcting its package entrypoints.
- **Marketing Tests**: Ensured button variant assertions use `@sba/ui/button` (not the lightweight `@sba/ui` mock).
- **Agent List A11y**: Added `aria-selected` and prevented Space default scroll on selection.
- **Route-to-Screen**: Added screen registry, route telemetry, and missing authenticated pages for navigation consistency.
- **Route-to-Screen Contract**: Added required screen list and snapshot contract test to prevent drift.
- **Route-to-Screen Hardening**: Added authenticated 404, focus management, and CSP headers.

### Single Control Plane Implementation

#### Added

- **Optimization Insights Widget**: New AI-driven widget (`OptimizationInsightsWidget`) that analyzes agent runs and provides actionable suggestions (LLM-based).
- **System Health Widget**: Real-time infrastructure monitoring widget (`SystemHealthWidget`) displaying CPU, Memory, Database, and Redis status.
- **Error Boundaries**: Implemented `DashboardWidgetErrorBoundary` to isolate widget failures and prevent dashboard crashes.
- **Health Checks**: Enhanced `health.ts` with real connectivity checks for Supabase (DB) and Redis.
- **Architecture**: Added "Single Control Plane" architecture diagram to `README.md`.

#### Changed

- **Dashboard**: Updated `DashboardClient.tsx` to integrate new widgets and error boundaries.
- **API**: Updated `/api/health` to return detailed dependency status.
- **Documentation**: Updated `USER_GUIDE.md` and `README.md` to reflect the Single Control Plane concept.

#### Testing

- **Unit**: Added tests for `SystemHealthWidget` and `OptimizationInsightsWidget`.
- **Integration**: Added integration tests for `/api/health` response structure.
- **Resilience**: Verified Error Boundary behavior.

## [Unreleased] - 2025-12-21

### Added

- **Performance Monitoring**: Integrated `trackPerformance` in `useAuth` hook to log duration of auth operations (signIn, signUp, signOut, etc.) in development environments.
- **Integration Testing**: Added comprehensive Playwright E2E test (`apps/app/e2e/integration-flow.spec.ts`) covering Login -> Dashboard -> Agent Creation flow.
- **E2E Enhancements**: Added `cleanup-test-db.js` utility for idempotent test data cleanup.
- **Test Helpers**: Added `instrumentation.ts` checks to prevent agentic process startup during tests.

### Changed

- **Refactoring**: Replaced `require` with `import` in `cleanup-test-db.js` to fix ES module compatibility issues.
- **Configuration**: Updated `apps/app/playwright.config.ts` to use port 3004 and proper web server command.
- **Testing**: Updated `runs-sse-rbac.spec.ts` and `tenants-api.spec.ts` to fix RBAC and user check logic failures.
- **Testing**: Updated `eslint-cli.warn-gate.spec.ts` to use a robust temporary directory path (`node_modules/.cache/test-results`) avoiding ENOSPC errors.

### Fixed

- **Next.js Routes**: Resolved duplicate route conflicts by deleting redundant pages in `(dashboard)` group.
- **Unit Tests**:
  - Fixed `search-cached.route.spec.ts` (mocking issue).
  - Fixed `cache.ttl.expiry.test.ts` (millisecond timing).
  - Fixed `pageheader.props.spec.tsx` (mock alignment).
  - Fixed `responsive.ts` (Zustand deprecation).
- **Playwright**: Fixed Chromium and dependency installation issues.
- **Dev Server**: Fixed Next.js dev server startup issues (port conflicts, stuck processes).

### Documentation

- **New**: Created `DEPLOYMENT.md`, `TEST_REPORT.md`, `ARCHITECTURE.md`.
- **Updated**: `CHANGELOG.md` with comprehensive change tracking.

## Stabilization – 2025-12-01

- SSE endpoint fixed with `text/event-stream` headers, rate limiting, and secure CORS.
- AGUIEventStream keyboard handling stabilized with `preventDefault`, `stopPropagation`, and `flushSync`.
- Vitest configs aligned across apps: jsdom, coverage thresholds, alias arrays, and Next shims.
- Web RootLayout tests rewritten using SSR `renderToString` to avoid DOM nesting warnings.
- Orchestrator implemented with fail-safe, self-heal (backoff), auto-stop, auto-adjust concurrency, and capped audit logs.
- Tests added and timing tuned; all suites green via `pnpm test:ci`.

### Operations

- Use `docs/AGENTIC-OPERATIONS.md` for runtime operations and testing guidance.
- Monitor `status().errorRate` and `getLogs()` for failsafe and recovery events.
