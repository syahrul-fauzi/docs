---
title: WebSocket Gateway Change Log
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: medium
tags: [api, websocket, changelog, gateway]
---

# WebSocket Gateway Change

## Summary

- Legacy file `apps/api/src/api/websocket.gateway.ts` has been removed.
- Active gateway is `apps/api/src/api/gateway/AgentStreamGateway.ts`.

## Rationale

- The legacy gateway caused decorator/type conflicts and duplicated functionality.
- Consolidation improves maintainability and avoids regressions.

## Impact

- No runtime impact to API v1 or Solo Builder endpoints.
- WebSocket features continue via AgentStreamGateway.

## Migration

- Any references to `api/websocket.gateway.ts` should be updated to use `api/gateway/AgentStreamGateway.ts`.
- Tests should target the active gateway implementation.
