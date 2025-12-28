---
id: architecture.references.tests_load_chaos_plan
version: 1.0.0
author: QA Team
status: active
scope: global
tags: [reference, plan, testing, load, chaos]
---

# Tests Load & Chaos Plan

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft rencana load & chaos.

## k6 Load Profiles

- Streaming: open connections 100→500, event burst 50/s, durasi 10m
- CRUD: RPS 200→800, payload kecil, p50/p95 latency tracking
- Enqueue: RPS 300, verifikasi waktu enqueue dan drain queue

## Chaos (Toxiproxy)

- SSE disconnect intermiten; latency/jitter 100–800ms
- Redis slow/packet loss 1–5%; simulasi restart worker

## Integrasi CI

- Smoke load run pada PR besar
- Jadwal nightly untuk profil penuh

## Output

- Laporan p50/p95/p99; pelanggaran SLA memicu alert
