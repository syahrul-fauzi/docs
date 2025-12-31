---
title: Agentic Front Door (AFD) - Rollout Plan & Operational Runbook
created_at: 2025-12-31
author: SBA Architect
status: draft
---

# Agentic Front Door (AFD) - Rollout Plan & Operational Runbook

> **Version:** 1.0.0  
> **Date:** 2025-12-31  
> **Status:** Draft  
> **Target Audience:** DevOps, SRE, Support Team

## 1. Deployment Overview

This document outlines the deployment strategy, validation steps, and operational procedures for the **Agentic Front Door (AFD)** service integration.

### 1.1 Architecture Context

AFD acts as the primary entry point for multimodal intent capture (Text, Voice, UI Events) from the Marketing App to the Agentic Backend. It leverages:

- **NestJS** for the backend API (`apps/api/src/afd`).
- **OrchestratorService** for task decomposition.
- **PlannerAgent** for intent analysis.

### 1.2 Deployment Strategy

- **Environment**: Staging -> Production
- **Strategy**: Blue-Green Deployment
- **Rollout Percentage**: 100% (after validation)

---

## 2. Pre-Deployment Checklist

- [x] **Code Frozen**: `apps/api/src/afd` and `apps/marketing` feature branches merged.
- [x] **Tests Passed**: Unit (`afd.workflow.spec.ts`) and Load (`afd.load.spec.ts`) tests passed.
- [x] **Performance Verified**: Validated 50 concurrent requests < 500ms response time.
- [x] **Resilience Implemented**: Circuit Breaker (5 failures/60s) and Caching (1h TTL) verified.
- [x] **Benchmark Results**: Avg 101ms sequential, 103ms concurrent (10 requests) with simulated latency.
- [x] **Security Scanned**: `TenantGuard` and `JwtAuthGuard` verified on all endpoints.
- [ ] **Database Migration**: No schema changes required for this release (uses existing KV/NoSQL).

---

## 3. Staging Deployment Steps

### 3.1 Deploy Backend (API)

1. Pull latest image: `docker pull sba-registry/api:latest`
2. Apply configuration:

   ```env
   AFD_ENABLED=true
   ORCHESTRATOR_MODE=standard
   ```

3. Restart service: `kubectl rollout restart deployment/sba-api`

### 3.2 Deploy Frontend (Marketing)

1. Build marketing app with new env var:

   ```env
   NEXT_PUBLIC_API_URL=https://api-staging.sba.com/api/v1/afd
   ```

2. Deploy to Vercel/Netlify staging.

### 3.3 Validation (Smoke Test)

Run the following curl command to verify health:

```bash
curl -X POST https://api-staging.sba.com/api/v1/afd/intent/capture \
  -H "Content-Type: application/json" \
  -d '{"type":"TEXT", "payload":"ping", "context":{...}}'
```

---

## 4. Production Rollout

1. **Canary Release (10%)**: Route 10% of traffic to new AFD endpoints.
2. **Monitor Metrics**:
   - `http_server_requests_seconds_bucket` (Latency)
   - `afd_intent_processing_errors_total` (Error Rate)
3. **Full Rollout**: If error rate < 1% for 15 mins, scale to 100%.

---

## 5. Operational Runbook

### 5.1 Common Issues & Resolutions

| Issue | Symptom | Resolution |
|-------|---------|------------|
| **High Latency (>1s)** | Users report slow response | Check `OrchestratorService` logs. If PlannerAgent is slow, scale up reasoning workers. |
| **401 Unauthorized** | Frontend errors | Verify `NEXT_PUBLIC_API_URL` and ensuring JWT tokens are being passed correctly in `IntentCaptureService`. |
| **Intent Misclassification** | Wrong action triggered | Check `ReasoningStep` logs in `AfdService`. If consistent, flag for model fine-tuning. |

### 5.2 Emergency Rollback

If P0 incidents occur (e.g., system crash, data leak):

1. **Frontend**: Revert to previous Vercel deployment.
2. **Backend**:

   ```bash
   kubectl rollout undo deployment/sba-api
   ```

3. **Notify**: Slack channel `#sba-ops-emergency`.

---

### 5.3 Support Team Procedures

1. **Escalation Path**:
   - Level 1: Support Desk (Basic triage)
   - Level 2: Platform Engineering (API/Infrastructure)
   - Level 3: AI/Reasoning Team (Intent accuracy/Logic issues)

2. **Log Inspection**:
   - Access ELK/Grafana dashboard: `SBA - Agentic Front Door Metrics`
   - Filter by `tenant_id` or `session_id` to trace specific user issues.

---

## 6. Final Regression Test Cycle

Before production rollout, the following scenarios must be manually verified in Staging:

| ID | Scenario | Expected Result |
|----|----------|-----------------|
| TC-01 | Multimodal Text (Demo request) | Action `lead_gen` triggered, form rendered. |
| TC-02 | Multimodal Voice (Pricing query) | Action `show_card` triggered, pricing table shown. |
| TC-03 | UI Event (Scroll to section) | Event logged, context updated for next intent. |
| TC-04 | Error Handling (Empty payload) | 400 Bad Request returned with descriptive error. |
| TC-05 | Tenant Isolation | Intent from Tenant A never leaks to Tenant B. |

---

## 7. Release Notes (Stakeholders)

**New Features:**

- **Multimodal Capture**: Users can now use voice and text to interact with SBA.
- **Smart Routing**: Intents are automatically routed to the best agent (Planner/Executor).
- **Enriched Context**: User profile data is now used to personalize responses.

**Performance:**

- Validated to support 50+ concurrent users with sub-second latency.
