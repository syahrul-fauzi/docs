# Multi-Agent Coordination & Roles
version: 1.0.0
last_updated: 2025-12-28

SBA-Agentic uses a multi-agent orchestration pattern to ensure high-quality task fulfillment, safety, and auditability. Each agent has a specific role and limited decision power.

## 👥 Agent Taxonomy

| Agent | Responsibility | Decision Power | Execution |
|-------|----------------|----------------|-----------|
| **PlannerAgent** | Task decomposition & planning | Limited | No |
| **ExecutorAgent** | Tool execution & workflow | No | Yes |
| **ObserverAgent** | Audit, guardrails, anomaly detection | No | No |
| **ReviewerAgent** | Human-in-the-loop approval | High | No |

## 🔄 Coordination Workflow

The typical task lifecycle involves multiple agents working in sequence:

1.  **PlannerAgent (Planning Phase)**:
    - Receives user intent.
    - Uses [SemanticRouter](./SEMANTIC_ROUTING.md) to identify required capabilities.
    - Uses [KnowledgeRetriever](./REASONING_ENGINE.md) to gather business rules.
    - Produces a `ReasoningStep` of type `planning`.
2.  **ObserverAgent (Validation Phase)**:
    - Analyzes the plan against security guardrails and tenant constraints.
    - Flags any potential risks (e.g., PII exposure, high cost).
3.  **ExecutorAgent (Execution Phase)**:
    - Receives the validated plan.
    - Calls tools via the [Tools Gateway](../05-api/README.md).
    - If a tool fails, triggers the **Self-Correction** loop in the Reasoning Engine.
4.  **ReviewerAgent (Optional Approval)**:
    - Triggered if confidence score < 0.7 or for high-risk actions.
    - Waits for human feedback before proceeding.

## 🤝 Handover Mechanism

Agents communicate through a shared **Reasoning Context**:
- **Context Snapshot**: A versioned state of the task, containing history, relevant context, and metadata.
- **Confidence Scores**: Each agent attaches a confidence score to its output.
- **Metadata**: Used to pass technical details like `tenant_id`, `request_id`, and `tool_parameters`.

## 🛡️ Security & Isolation

Multi-agent coordination is strictly governed by:
- **Tenant Context Contract**: Ensures no data leaks between different organizations.
- **RBAC Enforcement**: The `ExecutorAgent` can only call tools that the user/tenant is authorized for.

---
*Reference: [agent-context.md](../../.trae/rules/agent-context.md)*
