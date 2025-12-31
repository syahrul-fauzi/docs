---
title: SBA Built-In Agents Developer Guide
created_at: 2025-12-31
author: Super Agent
status: active
---

# SBA Built-In Agents Developer Guide

## Architecture

The Built-In Agents are implemented using the **Rube Engine** architecture, defined in declarative YAML and backed by TypeScript tool adapters.

### Modular Components

- **Rule Definitions**: Located in `packages/rube/src/rules/builtin/*.rule.yaml`.
  - Defines triggers, actions, and constraints.
  - Uses the Single Rule format (Trigger -> Action).
- **Tool Adapters**: Located in `apps/api/src/tools/`.
  - TypeScript classes implementing `IToolAdapter`.
  - Handles the actual execution logic (DB access, API calls).
- **Control Plane**:
  - Compiles YAML rules into executable artifacts.
  - Manages agent lifecycle and state.

## Implementation Details

### Workspace Agent (`SBA-WORKSPACE-AGENT`)

- **Trigger**: `document.uploaded`
- **Tools**:
  - `document.extract_data`: Uses OCR/NLP (Mock/Adapter).
  - `ai.memory_write`: Stores context.
  - `db.upsert_record`: Persists to SQL DB.

### Search Agent (`SBA-SEARCH-AGENT`)

- **Trigger**: `query.received` (Condition: type == 'search')
- **Tools**:
  - `knowledge.search`: Renamed from `SearchToolMock`. Returns title, snippet, URL.
  - `ai.context_summarize`: LLM-based summarization.

### Orchestrator Agent (`SBA-ORCHESTRATOR-AGENT`)

- **Trigger**: `batch.tasks.received`
- **Tools**:
  - `ai.task_prioritize`: Custom tool (`TaskPrioritizeTool.ts`) for sorting tasks.
  - `workflow.run`: Triggers sub-workflows.

## Benchmark Results

(Generated from `packages/control-plane/scripts/benchmark-agents.ts`)

| Agent | Compilation Time (ms) | Status |
|-------|----------------------|--------|
| Orchestrator | ~0.06 ms | ✅ PASS |
| Search | ~0.06 ms | ✅ PASS |
| Workspace | ~0.05 ms | ✅ PASS |

Criteria: < 5ms compilation overhead per agent.

## Extending Agents

To add a new capability:

1. Create a Tool Adapter in `apps/api/src/tools/MyNewTool.ts`.
1. Register it in `AgentRunService.ts`.
1. Update the Agent's YAML rule in `packages/rube/src/rules/builtin/`.
1. Run `npx tsx packages/control-plane/scripts/seed-builtin-agents.ts` to update the registry.

## Testing

Run the benchmark suite:

```bash
npx tsx packages/control-plane/scripts/benchmark-agents.ts
```
