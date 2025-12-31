---
title: SBA Built-In Agents Documentation
created_at: 2025-12-31
author: SBASuperAgent
status: active
---

# SBA Built-In Agents Documentation

SBA-Agentic menyediakan set agen bawaan (Built-In Agents) yang dirancang untuk menangani tugas-tugas inti platform secara efisien dan otonom.

## 🤖 Daftar Agen

### 1. SBA Workspace Agent
- **ID**: `SBA-WORKSPACE-AGENT`
- **Tujuan**: Mengelola dokumen dan sinkronisasi workspace.
- **Kemampuan**:
  - Ekstraksi data dokumen (OCR/NLP).
  - Penyimpanan memori kontekstual.
  - Sinkronisasi database workspace.

### 2. SBA Search Agent
- **ID**: `SBA-SEARCH-AGENT`
- **Tujuan**: Pencarian informasi real-time dari internet.
- **Kemampuan**:
  - Web search multi-bahasa.
  - Ringkasan konteks otomatis.
  - Manajemen riwayat pencarian.

### 3. SBA Orchestrator Agent
- **ID**: `SBA-ORCHESTRATOR-AGENT`
- **Tujuan**: Prioritisasi tugas dan koordinasi agen.
- **Kemampuan**:
  - Analisis prioritas tugas berbasis AI.
  - Eksekusi workflow multi-agent.

## 🛠 Arsitektur Modular
Agen-agen ini dibangun di atas **Rube Engine** menggunakan standar YAML yang mendukung:
- **Extensibility**: Tambahkan kapabilitas baru dengan memperbarui field `action.steps`.
- **Multi-tenancy**: Isolasi data ketat menggunakan `tenantId`.
- **Security**: Enkripsi AES-256 dan PII Masking bawaan.

## 🚀 Penggunaan API
Gunakan endpoint Control Plane untuk berinteraksi dengan agen ini:
- `POST /api/control-plane/agents`: Registrasi/Update.
- `POST /api/orchestrator/execute`: Memicu eksekusi agen berbasis event.

## 🧪 Pengujian
Unit testing tersedia di `packages/control-plane/tests/unit/builtin-agents.test.ts`.

### Laporan Pengujian & Benchmark
**Tanggal Pengujian**: 2025-12-31
**Status**: ✅ LULUS

| Metric | Target | Hasil Aktual | Status |
|--------|--------|--------------|--------|
| **Validasi Rule** | 100% Valid | 100% Valid (Unit Test Passed) | ✅ |
| **Compilation Time** | < 5 ms | ~0.06 ms (rata-rata) | ✅ |
| **Deployability** | Success | Seeding Success | ✅ |

**Benchmark Results**:
- `SBA-ORCHESTRATOR-AGENT`: 0.0663 ms
- `SBA-SEARCH-AGENT`: 0.0612 ms
- `SBA-WORKSPACE-AGENT`: 0.0511 ms

*Benchmark dilakukan pada lingkungan dev (Node.js v20) menggunakan script `benchmark-agents.ts`.*
