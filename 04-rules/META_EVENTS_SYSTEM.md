---
title: Meta Events System
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: medium
tags: [agentic, events, monitoring, observability]
---

# SBA-Agentic: Meta Events System

Sistem Meta Events adalah mekanisme untuk menangkap, memproses, dan memantau aktivitas agent secara real-time untuk tujuan observabilitas dan audit.

## 1. Definisi Event

Setiap event meta wajib memiliki struktur berikut:

```json
{
  "event_id": "uuid",
  "timestamp": "iso-8601",
  "agent_id": "string",
  "tenant_id": "string",
  "event_type": "analysis | planning | execution | review",
  "payload": {
    "action": "string",
    "status": "success | failure",
    "metadata": {}
  },
  "confidence_score": 0.0-1.0
}
```

## 2. Alur Pemrosesan

1. **Emission**: Agent mengirim event ke `MetaEventsProcessor`.
2. **Ingestion**: Processor memvalidasi skema event.
3. **Storage**: Event disimpan di Supabase untuk audit log jangka panjang.
4. **Metrics**: Metrik agregat dikirim ke Prometheus (e.g., `agent_task_success_rate`).

## 3. Integrasi Observability

Meta events dihubungkan dengan OpenTelemetry trace ID untuk memberikan gambaran lengkap dari permintaan user hingga eksekusi agent.
