# Cross-Team Coordination & Sync Schedule
**Version**: 1.0.0
**Last Updated**: 2025-12-31

Dokumen ini mendefinisikan protokol komunikasi dan jadwal sinkronisasi antar tim untuk memastikan kelancaran operasional SBA-Agentic.

## 1. Core Teams & Stakeholders
| Team | Lead | Responsibility |
| --- | --- | --- |
| **Agentic Platform (AP)** | SBA Super Agent | Core architecture, Control Plane, Rube Engine |
| **Frontend/UX (FE)** | UX Architect | Marketing App, Internal Console, AGUI Components |
| **SRE & Ops (OPS)** | Ops Lead | Infrastructure, Monitoring, CI/CD, Production Readiness |
| **Security & Compliance (SEC)** | Security Lead | RBAC, PII Masking, Audit Policy, SOC 2 Compliance |
| **Business Domain (BD)** | Domain Expert | BPA, CX, DA, SI Rules and Logic |

## 2. Sync Schedule
| Meeting | Frequency | Participants | Objective |
| --- | --- | --- | --- |
| **Daily Stand-up** | Daily (09:00 UTC) | All Dev Teams | Blockers, daily progress, immediate risks |
| **Architecture Review** | Weekly (Tue, 14:00) | Leads (AP, FE, SEC) | ADR reviews, technical debt, roadmap alignment |
| **Operational Readiness** | Weekly (Thu, 15:00) | AP, OPS, SEC | Production readiness, incident post-mortems |
| **Business Alignment** | Bi-weekly (Wed, 10:00) | AP, BD, Product | Rule accuracy, domain feedback, new capabilities |

## 3. Communication Channels

- **Slack/Discord**:

    - `#sba-alerts`: Critical production incidents (automated).
    - `#sba-dev`: General development discussion.
    - `#sba-ops`: Infrastructure and deployment coordination.
- **Incident Response**: PagerDuty for automated escalation based on `afd_circuit_breaker_open` or high error rates.

## 4. Decision Making (ADR Flow)

1. **Proposal**: Drafted in `docs/02-architecture/ADR-XXX.md`.
2. **Review**: Shared in `#sba-dev` for 48-hour feedback window.
3. **Approval**: Engineering Lead (SBA Super Agent) sign-off.
4. **Execution**: Implementation via Feature Branches.

## 5. Escalation Matrix

- **Level 1 (Team)**: Immediate resolution by the on-call engineer.
- **Level 2 (Lead)**: Escalated if resolution > 30 mins or requires cross-team coordination.
- **Level 3 (Management)**: Escalated if incident affects > 10% of tenants or poses security risk.
