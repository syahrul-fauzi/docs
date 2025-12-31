---
title: SBA Control Plane Integration Guide
created_at: 2025-12-31
author: Super Agent
status: active
---

# SBA Control Plane Integration Guide

This guide describes how to integrate and use the `@sba/control-plane` package within the SBA-Agentic ecosystem.

## Overview

The Control Plane is the central management layer for AI agents. It handles:

- **Agent Lifecycle**: Registration, status management (draft, active, paused, retired).
- **Policy Management**: Publishing and compiling Rube YAML policies.
- **Execution Control**: Validating agent commands against active policies and kill-switches.
- **Audit Logging**: Immutable logging of all management and execution events.

## System Requirements

- **Node.js**: v20 or higher.
- **Database**: PostgreSQL (via Prisma).
- **Packages**:
  - `@sba/db`
  - `@sba/logger`
  - `@sba/security`
  - `@sba/observability`

## API Endpoints

The Control Plane functionality is exposed via the following API endpoints (base path: `/api/control-plane`):

### Agent Management

- `POST /agents`: Register a new agent.
- `PATCH /agents/:id/status`: Update an agent's status.
- `GET /agents/:id`: Get agent details.

### Policy Management

- `POST /policies`: Publish and compile a new Rube YAML policy.

## Implementation Details

### Domain-Driven Design (DDD)

The package follows DDD principles:

- **Domain**: Aggregates (`Agent`, `Rule`), Repository Interfaces, and Policy Evaluator.
- **Application**: Services (`AgentLifecycleService`, `PolicyAuthorityService`, `ExecutionControlService`, `AuditService`).
- **Infrastructure**: Persistent repositories using Prisma (`PrismaAgentRepository`, etc.) and the `RubeCompiler`.

### Security & Multi-tenancy

All operations are tenant-aware. The `tenantId` is extracted from the authentication context and used to scope all database queries and policy evaluations.

### Logging & Monitoring

- **Logging**: Uses `@sba/logger` with built-in PII masking.
- **Metrics**: Uses `@sba/observability` to track agent execution counts, durations, and status changes.

## Troubleshooting

### Agent Blocked

If an agent's command is blocked, check:

1. **Agent Status**: Ensure the agent is in `active` status.
2. **Kill-switches**: Check if any global or agent-specific kill-switches are active.
3. **Policies**: Review the active Rube policies for the tenant. The `PolicyTrace` in the audit logs will show which policies were evaluated and their outcomes.

### Policy Compilation Fails

If publishing a policy fails:

1. **YAML Syntax**: Ensure the YAML is valid.
2. **Rube Schema**: Check that the YAML follows the required Rube policy schema (id, name, target, rules, etc.).

### Database Errors

Ensure the database migrations have been applied to include the `Agent`, `Rule`, and `PolicyTrace` models.
