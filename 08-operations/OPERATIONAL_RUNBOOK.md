---
title: "SBA-Agentic Operational Runbook"
created_at: 2025-12-28
author: SOLOBuilder
status: active
---

# SBA-Agentic Operational Runbook

Dokumen ini berisi prosedur langkah-demi-langkah (Step-by-Step) untuk tugas-tugas operasional rutin dan pemeliharaan sistem SBA-Agentic.

---

## 1. Manajemen Deployment Agent

### 1.1 Update Agent Logic (Blue-Green)
1.  **Prepare**: Pastikan branch `feat/agent-logic` sudah melewati Quality Gates.
2.  **Deploy Staging**: Jalankan CI/CD ke lingkungan staging.
3.  **Verification**: Jalankan `smoke-test-agent` untuk memverifikasi reasoning accuracy.
4.  **Traffic Shift**: Alihkan 10% traffic user ke versi baru menggunakan API Gateway.
5.  **Monitor**: Pantau `error_rate` dan `latency` selama 15 menit.
6.  **Full Rollout**: Jika stabil, alihkan 100% traffic dan hapus instance lama.

---

## 2. Pemeliharaan Database & Memory

### 2.1 Re-indexing Vector Store (Supabase pgvector)
Dilakukan jika terdapat penurunan akurasi RAG atau penambahan data masif.
1.  **Backup**: Lakukan snapshot database.
2.  **Command**: Jalankan script `npm run db:reindex-vector`.
3.  **Validate**: Gunakan `check-vector-health` untuk memastikan index konsisten.

### 2.2 Redis Cache Clearance
Hanya dilakukan jika terjadi state corruption pada orchestrator.
1.  **Targeted Flush**: Gunakan `redis-cli DEL "tenant:[ID]:session:*"` untuk session spesifik.
2.  **Full Flush (Emergency)**: `redis-cli FLUSHDB` (Peringatan: Akan mereset semua session aktif).

---

## 3. Manajemen Kunci & Keamanan

### 3.1 Rotasi API Key (LLM Providers)
Wajib dilakukan setiap 90 hari.
1.  **Generate**: Buat key baru di dashboard provider (OpenAI/Anthropic).
2.  **Update Secret**: Simpan di AWS Secrets Manager atau Vault.
3.  **Verify**: Jalankan `test-llm-connectivity` tanpa restart service.
4.  **Revoke**: Hapus key lama setelah 24 jam.

---

## 4. Monitoring & Troubleshooting Cepat

| Isu | Langkah Pertama | Tool |
| :--- | :--- | :--- |
| Agent Hang | Periksa `orchestrator_concurrency` | Grafana |
| High Hallucination | Cek `RAG_relevance_score` | Log Analytics |
| Token Limit Exceeded | Cek `context_pruning_service` | Sentry |

---
*Disusun oleh SOLOBuilder untuk stabilitas operasional 24/7.*