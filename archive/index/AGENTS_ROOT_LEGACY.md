---
title: "🤖 AGENTS.md - Guide for AI Coding Agents"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# 🤖 AGENTS.md - Guide for AI Coding Agents

Welcome to the **SBA-Agentic** project. This file provides the essential context, rules, and instructions for AI agents working on this codebase.

## 🧭 Project Overview

SBA-Agentic is an agent-centric orchestration system built with a multi-tenant architecture. It uses the **Rube Engine** to execute business logic defined in YAML rules.

## 🔗 Core Documentation Hub

Before performing any task, you must synchronize your context with these primary resources:

- [Operational Standard](./docs/SBA-Agentic%20Operational%20Standard.md) — The system's "Constitution" and SOP.
- [Master Index](./docs/INDEX.md) — Central hub for all documentation.
- [Developer Handbook](./docs/README.md) — Deep technical architecture and dev workflow.
- [Rules Center](./.trae/rules/README.md) — Main index for all agent reasoning and operational rules.

## 📁 Rule Repository (.trae/rules)

The core intelligence and operational guidelines reside in the `.trae/rules/` directory. You **MUST** read and adhere to these rules:

- **Reasoning Policy**: [agent-context.md](file:///.trae/rules/agent-context.md) & [agent-reasoning.md](file:///.trae/rules/agent-reasoning.md)
- **Self-Evolution**: [documentation-lifecycle.md](file:///.trae/rules/documentation-lifecycle.md) (How to update these docs)
- **Technical Specs**: [rules-specification.md](file:///.trae/rules/rules-specification.md) & [naming-convention.md](file:///.trae/rules/naming-convention.md)
- **Security**: [security-and-multitenancy.md](file:///.trae/rules/security-and-multitenancy.md)
- **Templates**: Use [rule-templates/](file:///.trae/rules/rule-templates/) for creating new rules.

## 🛠️ Development Workflow

Every task must follow the **ReasoningStep** pattern:

1.  **Analysis**: Understand the tenant context, business requirements, and documentation alignment.
2.  **Planning**: Decompose tasks into deterministic steps.
3.  **Implementation**: Write code/rules using defined standards.
4.  **Validation**: Verify changes (tests, schema validation, cross-reference check).
5.  **Reflection & Evolution**: Document what you learned and update relevant documentation per the [Documentation Lifecycle](file:///.trae/rules/documentation-lifecycle.md).

## 🧪 Testing & Quality

- All code changes must pass linting (`biome check`).
- Maintain a minimum coverage of **80% Lines** and **75% Functions**.
- Use `pnpm test` to run the test suite.

## 🚀 Deployment & Ops

- Follow the [release-checklist.md](file:///.trae/rules/release-checklist.md).
- Adhere to the [rollback-policy.md](file:///.trae/rules/rollback-policy.md) in case of failure.

---

_This file is optimized for AI consumption. For human-readable instructions, see [README.md](file:///README.md)._
