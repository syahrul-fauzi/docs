# Stabilization & Agentic Ops — 2025-12-01

## Highlights

- SSE endpoints corrected with `text/event-stream` headers and security directives.
- AGUIEventStream focus and keyboard handling stabilized via `preventDefault`, `stopPropagation`, and `flushSync`.
- Vitest configs aligned across apps: jsdom, coverage thresholds, alias arrays with regex for Next internals.
- Marketing app test environment shims for `NextResponse`, router utils, and layout rendering.
- Agentic Orchestrator implemented with fail-safe, self-healing, auto-stop, auto-adjust concurrency, and audit logs.
- UI a11y improvements: Dialog Close button labeled and accessible landmarks across dashboard/sidebar.

## Operational Guidelines

- Audit logs: call `orchestrator.getLogs()` to inspect operations; logs capped by `auditLogsMax`.
- Fail-safe: configured by `failSafe.errorThreshold` and `windowMs`; triggers pause and schedules self-heal.
- Self-healing: exponential backoff (`initialBackoffMs`, `maxBackoffMs`); clears error window and resumes.
- Auto-stop: pauses and stops timer when `persistentErrorRate` exceeded with `minStopSamples`.
- Auto-adjust: increases/decreases concurrency based on queue length and error rate heuristics.

## DecisionEngine Rules

- Write conditions using safe tokens only; invalid tokens are rejected early.
- Prefer simple comparisons and boolean logic; avoid dynamic code injection patterns.

## Testing Practices

- WebSocket/Notifications: use local subscriber registry mocks; verify `publish` side-effects.
- Next.js routes: test SSE with proper headers; mock `next/server` where needed.
- React UI: wrap state updates in `act`; use `userEvent` for interaction; assert a11y roles/labels.

## Suites Status

- SDK orchestrator: all tests green (fail-safe, self-heal, auto-stop, auto-adjust, audit).
- UI package: notifications, dialog, monitoring, and layout tests pass; a11y verified.
- App and Web apps: runtime API and health/metrics tests pass; layout nesting warnings documented.

## Notes

- Do not commit secrets.
- Keep concurrency within safe bounds.
- Monitor audit logs for anomalies and adjust thresholds if operational context changes.
