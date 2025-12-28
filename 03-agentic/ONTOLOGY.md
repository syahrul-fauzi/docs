# SBA-Agentic Ontology & Knowledge Map
version: 1.0.0
last_updated: 2025-12-28

This document defines the semantic relationships between business domains, task patterns, and technical capabilities in the SBA-Agentic ecosystem.

## 1. Business Domains (Classes)

### 1.1 Business Process Automation (BPA)
- **Description**: Automation of internal operations and repetitive tasks.
- **Sub-domains**: Document Processing, Workflow Orchestration, Resource Planning.
- **Related Tools**: `document.extract_data`, `workflow.approval_request`, `erp.sync_inventory`.

### 1.2 Customer Experience (CX)
- **Description**: Enhancing customer interactions and support.
- **Sub-domains**: Personalization, Support Routing, Sentiment Analysis.
- **Related Tools**: `cx.customer_profile`, `agent.personalize_response`, `support.route_to_department`.

### 1.3 System Integration (SI)
- **Description**: Connecting disparate systems and data synchronization.
- **Sub-domains**: CRM Integration, ERP Sync, Analytics Reporting.
- **Related Tools**: `crm.create_lead`, `erp.sync_inventory`, `analytics.generate_report`.

## 2. Task Patterns (Properties)

| Pattern | Intent | Required Capability |
|---------|--------|---------------------|
| **Inquiry** | Seek information from KB | `knowledge.search` |
| **Escalation** | Hand off to human manager | `workflow.escalate_request` |
| **Verification** | Check data against rules | `document.extract_data` + Rube |
| **Notification** | Inform user of event | `notification.send_email`, `notification.send_push` |

## 3. Tool Capabilities (Instances)

| Tool ID | Domain | Input Type | Output Type |
|---------|--------|------------|-------------|
| `document.extract_data` | BPA | File/Buffer | Structured JSON |
| `knowledge.search` | Global | Query String | Relevant Snippets |
| `cx.customer_profile` | CX | Customer ID | Profile JSON |

## 4. Semantic Relationships (Triples)

- `BPA` -- `uses` --> `document.extract_data`
- `CX` -- `improves` --> `Customer Satisfaction`
- `SI` -- `connects` --> `CRM` & `ERP`
- `Inquiry` -- `resolved_by` --> `knowledge.search`

---
*Reference: [business-domains.md](file:///home/inbox/smart-ai/sba-agentic/.trae/rules/business-domains.md)*
