## 05_non-functional-requirements.md — Quality & Governance

Dokumen ini menguraikan persyaratan non-fungsional utama untuk SBA-Agentic, berfokus pada aspek Kualitas dan Tata Kelola seperti Keamanan, Keandalan, dan Kepatuhan.

**Security**

- Tenant isolation
- Tool permission matrix
- Secret never visible to agent

**Reliability**

- Idempotent tools
- Retry via event replay

**Compliance**

- PDP: data minimization
- SOC‑like: audit trail
- ISO‑like: change traceability
