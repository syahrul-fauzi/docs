---
title: Troubleshooting Guide: SBA Control Plane
created_at: 2025-12-31
author: Super Agent
status: active
---

# Troubleshooting Guide: SBA Control Plane

This document provides solutions for common issues encountered when working with the SBA Control Plane.

## 1. Agent Registration Issues

### Symptom: `agentRepo.save` fails with a unique constraint error

- **Cause**: An agent with the same ID already exists.
- **Solution**: Ensure you are not manually assigning IDs that might collide, or check if the agent was already registered.

### Symptom: Agent status stuck in `draft`

- **Cause**: Agents are initialized in `draft` by default and must be explicitly activated.
- **Solution**: Call `PATCH /api/control-plane/agents/:id/status` with `status: "active"`.

## 2. Policy & Execution Issues

### Symptom: All agent commands are being denied

Checklist:

1. **Kill-Switch**: Check if a kill-switch is active.
2. **Default Deny**: Ensure you have at least one "allow" rule. If only "deny" rules exist and none match, the default behavior might be deny (depending on configuration).
3. **Tenant Isolation**: Ensure the `tenantId` in the command matches the `tenantId` of the published policies.

### Symptom: `PolicyTrace` not showing in logs

- **Cause**: `AuditService` might not be properly injected or enabled in `config.ts`.
- **Solution**: Check `AppModule` injection and `AUDIT_ENABLED` environment variable.

## 3. Database & Connectivity

### Symptom: `PrismaClient` error: `Model Agent not found`

- **Cause**: Prisma client not regenerated after schema changes.
- **Solution**: Run `npx prisma generate` in the `@sba/db` package.

### Symptom: Connection timeout to database

- **Cause**: Database is down or network issues.
- **Solution**: Verify `DATABASE_URL` environment variable and database connectivity.

## 4. Performance & Scaling

### Symptom: High latency in `validateCommand`

Solution:

- Archive or retire old/unused policies.
- Check database indexes on `tenantId` and `status`.
- Monitor metrics: `agent_execution_duration_seconds`.

## 5. Security

### Symptom: `403 Forbidden` on Control Plane API

- **Cause**: Missing or invalid `X-Tenant-ID` header or JWT token.
- **Solution**: Ensure all requests include a valid Bearer token and the correct tenant header.
