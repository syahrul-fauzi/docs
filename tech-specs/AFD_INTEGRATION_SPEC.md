---
title: Technical Specification: Agentic Front Door (AFD) Integration
created_at: 2025-12-31
author: SBASuperAgent
status: active
---

# Technical Specification: Agentic Front Door (AFD) Integration

## 1. Introduction

The Agentic Front Door (AFD) is the gateway for the SBA platform's multimodal interactions. This document specifies the technical details of the integration between the Marketing Frontend and the Agentic Backend.

## 2. API Contract

### 2.1 Intent Capture Endpoint

**URL**: `/api/v1/afd/intent/capture`

**Method**: `POST`

**Auth**: `TenantGuard` (requires `x-tenant-id` header or `context.tenantId` in payload)

#### Request Schema (CaptureIntentDto)

```json
{
  "type": "text | voice | ui_event | visual",
  "payload": "string | object",
  "context": {
    "pageUrl": "string",
    "timestamp": "number",
    "sessionId": "string",
    "tenantId": "string",
    "userAgent": "string",
    "visitorId": "string (optional)"
  },
  "userProfile": {
    "id": "string",
    "stage": "string",
    "interests": ["string"]
  }
}
```

#### Response Schema (IntentResponseDto)

```json
{
  "intentId": "uuid",
  "confidence": "number (0.0 - 1.0)",
  "action": "string (e.g., lead_gen, show_card, render_content)",
  "payload": "object (action-specific data)",
  "reasoningSteps": [
    {
      "agent": "string",
      "type": "string",
      "content": "string",
      "timestamp": "number"
    }
  ],
  "decomposition": {
    "taskId": "string",
    "originalIntent": "string",
    "steps": [
      {
        "id": "string",
        "description": "string",
        "status": "string",
        "assignedTo": "string"
      }
    ]
  },
  "suggestedNextSteps": ["string"]
}
```

## 3. Component Architecture

### 3.1 Backend Components (apps/api)

- **AfdController**: Exposes REST endpoints, validates DTOs, and extracts tenant/user context.
- **AfdService**: Core logic for intent processing. Orchestrates `PlannerAgent` via `OrchestratorService`.
- **AfdModule**: NestJS module bundling AFD components.

### 3.2 Frontend Components (apps/marketing)

- **IntentCaptureService**: Singleton service managing API calls to AFD.
- **AgenticWorkflowService**: Manages the state and execution of actions returned by AFD.

## 4. Processing Flow

1. **Capture**: Frontend detects intent (text input, voice, or UI event).
2. **Enrich**: `IntentCaptureService` adds context (session, tenant, user profile).
3. **Transmit**: Request sent to `/api/v1/afd/intent/capture`.
4. **Analyze**: `AfdService` calls `OrchestratorService.planTask()`.
5. **Plan**: `PlannerAgent` decomposes the task into steps.
6. **Map**: `AfdService` maps the plan/intent to a specific UI action (e.g., `lead_gen`).
7. **Respond**: Backend returns action, payload, and reasoning trace.
8. **Execute**: Frontend renders content or triggers workflow based on the action.

## 5. Resilience & Performance

### 5.1 Circuit Breaker

- **Implementation**: Uses `@sba/integrations` CircuitBreaker.
- **Threshold**: 5 failures within a 60-second window.
- **Behavior**: When open, subsequent requests throw a `503 Service Unavailable` error immediately without calling downstream services.

### 5.2 Caching

- **Implementation**: Uses `@sba/kv` for distributed JSON caching.
- **TTL**: 1 hour (3,600,000 ms).
- **Key Strategy**: `tenant:{tenantId}:afd:intent:{type}:{payloadHash}`.
- **Behavior**: Successful intent mappings are cached to reduce LLM costs and response latency for repetitive queries.

### 5.3 Benchmarks

- **Average Latency (Sequential)**: ~101ms (with simulated 100ms LLM delay).
- **Average Latency (Concurrent)**: ~103ms for 10 parallel requests.
- **Cache Hit Latency**: <5ms.

## 5. Security & Observability

- **Isolation**: Multi-tenancy enforced via `TenantGuard`.
- **Audit**: Every intent capture is logged with a `ReasoningTrace`.
- **Monitoring**: Latency and error rates tracked via `AfdController` loggers.
