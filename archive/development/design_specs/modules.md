# Design Specifications — Modules

## apps/app

- Middleware security, RBAC-bound routes, metrics wrapper, observability UI

## apps/api

- Controllers for runtime runs, tools, attachments; guards for JWT/Roles; rate limiting guard

## packages/supabase

- Client factories SSR/browser; queries/mutations without hardcoded URLs/keys

## packages/ui

- Atomic components and analytics heatmap tracker
