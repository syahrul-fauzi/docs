---
title: SBA Integrations - AG-UI Adapter Architecture
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: medium
tags: [integrations, adapter, ag-ui, events, sse]
---

# SBA Integrations — AG‑UI Adapter Architecture

## Overview

- Provides `@sba/integrations` to bridge agent frameworks/middleware/server into AG‑UI events.
- FSD/DDD hybrid boundaries; Zod‑first contracts; SSE/JSON transport compatible with existing client.

## Package Structure

- `core`: AbstractAgentAdapter, EventEncoder
- `middleware`: OpenAIAdapter (stub streaming)
- `server/http`: HttpAgent (SSE/JSON handler)
- `index`: public exports

## Event Flow

1. Adapter emits lifecycle/content events (`REASONING_*` and `RUN_FINISHED`).
2. HttpAgent responds with SSE when `accept: text/event-stream`, or JSON otherwise.
3. UI consumes events via hooks/components in `@sba/ui`.

## Testing

- Type-check passes across monorepo.
- Add unit tests (Vitest) for encoder and adapters in future iterations.

## Roadmap

- Mastra/LangGraph/Vercel AI SDK adapters
- ToolCallBridge and observability integration
