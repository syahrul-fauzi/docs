---
title: SBA-Agentic: Rollback & Monitoring Plan (v1.1.0)
created_at: 2025-12-31
author: SBASuperAgent
status: active
---

# SBA-Agentic: Rollback & Monitoring Plan (v1.1.0)

## 1. Monitoring Strategy

To ensure the stability of the new features (Multi-agent coordination, Rule Failure Heatmap, and Dynamic Knowledge Extraction), the following metrics and logs must be monitored:

### 1.1 Key Performance Indicators (KPIs)

- **Agent Run Success Rate**: Percentage of `Orchestrator` runs that complete with `status: completed`. Target: >95%.
- **Review Latency**: Time spent in `paused` state awaiting human approval.
- **Heatmap Data Integrity**: Verify that Redis keys for heatmap aggregation are being updated correctly and have a 7-day TTL.
- **Rate Limit Hits**: Monitor `429 Too Many Requests` responses to ensure the `RateLimitGuard` is not overly aggressive.

### 1.2 Alerting Rules

- **High Failure Rate**: Alert if >10% of agent runs fail within a 15-minute window.
- **Redis Connection Issues**: Immediate alert if the `RubeService` or `AdminService` cannot reach Redis.
- **Critical System Events**: Monitor the `agentic-meta-events` source in logs for `severity: critical`.

## 2. Rollback Procedures

### 2.1 Code Rollback

In case of critical failures in production:

1. **Immediate Revert**: Use `git revert` to roll back to the previous stable tag (`v1.0.0`).
2. **CI/CD Trigger**: The rollback will automatically trigger the deployment pipeline to redeploy the previous version.
3. **Validation**: Run smoke tests on staging before rolling back production.

### 2.2 Data & Cache Rollback

- **Redis Heatmap Data**: If the new Redis key format (`tenantId:ruleId:hour`) causes issues, the `AdminService` already supports backward compatibility for the old format. No data migration is strictly necessary for rollback.
- **Knowledge Extraction**: If the improved `knowledge.extract` handler fails, the implementation is backwards compatible with existing schemas.

## 3. Post-Deployment Smoke Tests

1. **Heatmap Verification**: Trigger a rule failure and verify it appears in the Admin heatmap API.
2. **Multi-agent E2E**: Execute a test run involving the Reviewer agent and approve it via `continueRun`.
3. **Rate Limiting**: Perform a burst of requests to verify the `RateLimitGuard` correctly enforces limits and resets counters.
4. **Knowledge Extraction**: Run a complex data extraction task to verify the new normalization logic.
