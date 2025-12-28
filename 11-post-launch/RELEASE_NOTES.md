---
title: "SBA Monorepo — Release Notes"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# SBA Monorepo — Release Notes

## Highlights

- UI/UX refinements for Event Stream (apps/app) and Chat (apps/web)
- Accessibility improvements: ARIA roles/labels, live regions, keyboard shortcuts
- Added visual state for `tool:failed` events with clear color semantics
- Tests hardened for auto-scroll, go-to-latest, streaming status, and a11y
- Deliverables documentation expanded: architecture specs, CI/CD & staging, acceptance criteria

## Changed

- `apps/app/src/features/agui/ui/AGUIEventStream.tsx`: deduplicate reduced-motion effect, enhance labels, add `tool:failed` color, fix badge label formatting
- `apps/web/src/features/chat/components/ChatWindow.tsx`: add titles on menu actions, improve live status and controls
- Test adjustments in `apps/web` and `apps/app` to stabilize scroll assertions
- `.trae/documents/daftar deliverables artefak.md`: expanded sections for architecture, testing, staging, and docs

## Fixed

- Auto-scroll toggle consistency across components
- Keyboard navigation and accessible labels in Chat and Event Stream

## Verification

- Unit tests updated for critical UI flows and a11y
- CI config present under `.github/workflows/ci.yml` for format/lint/type-check/test/build

## Notes

- Further work: orchestrator alignment and RLS hardening per “Design Update — SBA Monorepo.md”.
