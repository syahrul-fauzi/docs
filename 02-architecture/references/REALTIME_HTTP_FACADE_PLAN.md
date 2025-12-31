---
title: "Realtime HTTP Facade Plan"
created_at: 2025-12-28
author: Architecture Team
status: active
---

# Realtime HTTP Facade Plan

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft rencana ekstraksi.

## Target Paket

- `packages/realtime`: SSEClient, WebSocketClient, RealtimeClientManager, hooks, event typing
- `packages/api-client`: HTTP wrapper (retry, timeout, error mapping)

## Adapter Pattern

- Interface: `RealtimeAdapter` (connect, disconnect, onMessage, status)
- Implementasi: `SSEAdapter`, `WSAdapter`
- Facade memilih adapter via feature flag

## Migrasi

- Gantikan `apps/app/src/shared/api/sse.ts` dengan import dari `packages/realtime`
- Konsolidasikan client HTTP dari `apps/app` & `apps/web` ke `packages/api-client`

## Dokumentasi

- README penggunaan, contoh di apps/\*, pedoman error & metrics
