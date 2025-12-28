---
title: WORKSPACE-RELATED-V1
created_at: 2025-12-06
last_modified: 2025-12-06
changelog:
  - 2025-12-06: initial
author: team@sba
reviewer: lead@sba
status: Draft
priority: P2
related: []
---

# Direktori Related

- Menyimpan artefak non-Markdown yang ditaut dari dokumen: `.drawio`, `.bpmn`, `.yaml`, dsb.
- Setiap artefak harus memiliki pasangan dokumen Markdown yang menjelaskan konteks dan menautkan balik ke PRD.

## Konvensi Penautan

- Simpan file di subfolder sesuai kategori: `architecture/`, `agent-flows/`, `api/`.
- Di dokumen terkait, gunakan bagian `Related Artifacts` dengan path relatif:

```text
- related/architecture/feature-x/diagram.drawio
- related/agent-flows/feature-x/flow.bpmn
- related/api/feature-x/openapi.yaml
```

## Struktur Contoh

```text
workspace/related/
  architecture/feature-x/diagram.drawio
  agent-flows/feature-x/flow.bpmn
  api/feature-x/openapi.yaml
```
