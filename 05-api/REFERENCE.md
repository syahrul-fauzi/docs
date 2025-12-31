---
title: "SBA API Reference"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# SBA API Reference

## 0. Autentikasi (Authentication)

Semua permintaan ke API SBA-Agentic harus menyertakan token Bearer dalam header `Authorization`.

```http
Authorization: Bearer <your_jwt_token>
```

Token dapat diperoleh melalui Clerk (frontend) atau dari dashboard Supabase untuk keperluan testing.

## 1. Runs (`/api/runs`)

### 1.1 Mulai Run Baru (`POST /api/runs`)

Memulai eksekusi orchestrator untuk serangkaian pesan atau tugas.

**Request Body:**

```json
{
  "messages": [
    { "role": "user", "content": "Analisis laporan penjualan bulan ini." }
  ],
  "context": {
    "tenant_id": "org_123",
    "mode": "autonomous"
  }
}
```

**Response (201 Created):**

```json
{
  "run_id": "run_abc123",
  "status": "queued",
  "created_at": "2025-12-28T10:00:00Z"
}
```

### 1.2 Detail Run (`GET /api/runs/:runId`)

Mengambil status terbaru dan metadata dari run tertentu.

**Response (200 OK):**

```json
{
  "run_id": "run_abc123",
  "status": "in_progress",
  "steps_completed": 2,
  "total_steps": 5,
  "current_step": {
    "id": "step_1",
    "type": "analysis",
    "description": "Menganalisis data penjualan CSV"
  },
  "last_updated": "2025-12-28T10:05:00Z"
}
```

### 1.3 Stream Update (`GET /api/runs/:runId/stream`)

Membuka koneksi Server-Sent Events (SSE) untuk mendapatkan update real-time.

**Events:**

- `status`: Update status run (`queued`, `in_progress`, `completed`, `failed`).
- `step`: Update langkah yang sedang dikerjakan agent.
- `log`: Log audit/pemikiran agent (Reasoning Trace).
- `result`: Hasil akhir run.

**Contoh Payload Event `log`:**

```json
{
  "type": "log",
  "payload": {
    "level": "info",
    "message": "Mencari data pelanggan di CRM...",
    "timestamp": "2025-12-28T10:05:02Z"
  }
}
```

## 2. Penanganan Error (Error Handling)

SBA-Agentic menggunakan format error JSON standar untuk semua kegagalan API.

### 2.1 Format Error Standar

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Pesan deskriptif mengenai error.",
    "details": {
      "field": "messages",
      "reason": "must not be empty"
    },
    "request_id": "req_xyz789"
  }
}
```

### 2.2 Kode Status & Error Umum

- **400 Bad Request (`INVALID_PAYLOAD`)**: Request body tidak valid atau tidak lengkap.
- **401 Unauthorized (`UNAUTHORIZED`)**: Token autentikasi hilang atau tidak valid.
- **403 Forbidden (`INSUFFICIENT_PERMISSIONS`)**: User tidak memiliki izin (RBAC) atau akses tenant ditolak.
- **404 Not Found (`RESOURCE_NOT_FOUND`)**: Run ID atau resource tidak ditemukan.
- **429 Too Many Requests (`RATE_LIMIT_EXCEEDED`)**: Kuota permintaan terlampaui.
- **500 Internal Server Error (`INTERNAL_ERROR`)**: Terjadi kesalahan pada server.

## 3. Webhooks

Anda dapat mendaftarkan webhook untuk menerima notifikasi saat run selesai atau terjadi error.

### 3.1 Payload Webhook (`POST`)

```json
{
  "event": "run.completed",
  "run_id": "run_abc123",
  "status": "completed",
  "result": {
    "summary": "Analisis selesai. Total penjualan naik 15%.",
    "artifacts": ["https://storage.sba.ai/reports/report_123.pdf"]
  },
  "timestamp": "2025-12-28T10:10:00Z"
}
```

## 4. Observability & Metrics

- `GET /api/metrics` → Prometheus metrics text
- `GET /api/health` → Ringkasan status runtime dan konektivitas database/redis.
- `GET /api/analytics/summary` → Statistik agregat per tenant (hanya Admin).
