# API Reference Guide: SBA-Agentic Orchestrator

## Overview
API ini menyediakan antarmuka untuk menjalankan alur kerja (workflow) multi-agent yang didukung oleh Rube Engine.

## Agent Orchestrator API

### 1. Start Agent Run
Memulai workflow baru berdasarkan prompt pengguna.

**Endpoint**: `POST /api/agent/run`
**Authentication**: Required (JWT)

**Request Body**:
```json
{
  "tenantId": "string",
  "userId": "string",
  "prompt": "string",
  "sessionId": "string (optional)",
  "options": {
    "model": "string (default: gpt-4o-mini)",
    "maxSteps": "number",
    "tools": ["string[]"]
  }
}
```

**Response**:
```json
{
  "runId": "uuid",
  "status": "created | running | paused | completed | failed",
  "steps": []
}
```

### 2. Continue Agent Run (HITL)
Melanjutkan workflow yang sedang tertunda (status `paused`) setelah review manual.

**Endpoint**: `POST /api/agent/run/:runId/continue`

**Request Body**:
```json
{
  "approved": "boolean",
  "modifiedContent": "any (optional)",
  "reason": "string (optional)"
}
```

### 3. Get Run Status
Mengambil status terbaru dari sebuah workflow.

**Endpoint**: `GET /api/agent/run/:runId`

## Core Utility Tools Reference

### `agent.personalize_response`
Menyesuaikan respon agen berdasarkan profil pelanggan.
- **Parameters**:
  - `customer_id`: ID pelanggan (string).
  - `base_response`: Respon dasar yang akan dipersonalisasi (string).
  - `context`: Objek konteks tambahan (optional).

### `knowledge.extract`
Mengekstrak informasi terstruktur dari teks atau hasil pencarian.
- **Parameters**:
  - `query`: Pertanyaan/topik ekstraksi (string).
  - `search_results`: Array objek hasil pencarian (any[]).
  - `schema`: Skema output yang diinginkan (optional).

### `notification.send_email`
Mengirim email melalui provider Resend.
- **Parameters**:
  - `to`: Alamat email penerima (string).
  - `subject`: Judul email (string).
  - `body`: Isi email (string).

## Error Codes
| Code | Description |
| :--- | :--- |
| `AWAITING_REVIEW` | Workflow tertunda menunggu persetujuan manual. |
| `POLICY_VIOLATION` | Aksi ditolak oleh Rube Security Guard. |
| `TOOL_NOT_FOUND` | Tool yang diminta tidak terdaftar di Registry. |
| `CONTEXT_MISMATCH` | Kesalahan isolasi tenant terdeteksi. |
