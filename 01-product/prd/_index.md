---
title: "01_PRD"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# 01_PRD

- Repository PRD per fitur/modul.
- Penamaan berkas: `YYYYMMDD-<DESCRIPTOR>.md`.
- Setiap PRD wajib memiliki frontmatter YAML.
- Tautkan artefak terkait (arsitektur, agent-flows, API) via path relatif.

## Frontmatter Wajib

```yaml
---
title: MODULE-FEATURE-V1
created_at: 2025-12-06
last_modified: 2025-12-06
changelog:
  - 2025-12-06: initial
author: team@sba
reviewer: lead@sba
status: Draft
priority: P1
related:
  - ../../02-architecture/_index.md
  - ../../03-agentic/flows/_index.md
  - ../../05-api/_index.md
---
```

## Struktur

- `_templates/PRD-template.md`
- `_templates/Change-Request-template.md`
