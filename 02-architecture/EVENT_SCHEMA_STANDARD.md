---
title: "SBA-Agentic Event Schema Standard"
created_at: 2025-12-28
author: SOLOBuilder
status: active
---

# SBA-Agentic Event Schema Standard

Dokumen ini mendefinisikan standar skema untuk komunikasi berbasis event (Event-Driven Architecture) di dalam ekosistem SBA-Agentic. Standarisasi ini penting untuk menjamin interoperabilitas antar agen dan integritas data di seluruh layer.

---

## 1. Struktur Pesan Event (Envelope)

Semua event wajib mengikuti struktur envelope berikut (format JSON):

```json
{
  "event_id": "uuid-v4",
  "event_type": "domain.entity.action",
  "timestamp": "ISO-8601",
  "source": "service-name",
  "version": "1.0.0",
  "correlation_id": "correlation-uuid",
  "payload": { ... },
  "metadata": {
    "tenant_id": "tenant-uuid",
    "user_id": "user-uuid",
    "priority": "low|medium|high"
  }
}
```

---

## 2. Naming Convention (Event Types)

Tipe event wajib menggunakan format `lower_snake_case` dengan struktur: `{domain}.{entity}.{action}`.

**Contoh:**

- `agent.task.created`
- `billing.invoice.paid`
- `memory.vector.updated`
- `system.health.alert`

---

## 3. Protokol Komunikasi

- **Broker**: Redis (Upstash) digunakan sebagai primary event broker untuk low-latency pub/sub.
- **Persistence**: Event kritikal (seperti billing atau task completion) wajib dipersistenkan ke database utama (Supabase) setelah diproses.
- **Idempotency**: Semua subscriber wajib mengimplementasikan logika idempotensi untuk menangani pengiriman pesan ganda (at-least-once delivery).

---

## 4. Evolusi Skema & Compatibility

- **Backward Compatibility**: Penambahan field baru pada payload diperbolehkan. Penghapusan atau perubahan tipe data pada field yang sudah ada dianggap sebagai *breaking change*.
- **Registry**: Semua skema event didokumentasikan dan divalidasi menggunakan JSON Schema yang tersimpan di `05-api/schemas/events/`.

---

## 5. Monitoring Event Health

- **Dead Letter Queue (DLQ)**: Event yang gagal diproses setelah 3 kali percobaan akan dipindahkan ke DLQ untuk audit manual.
- **Latency Tracking**: Waktu tempuh event dari *publisher* ke *subscriber* dipantau melalui metrik `event_delivery_latency`.

---
*Ditetapkan oleh SOLOBuilder sebagai standar arsitektur konektivitas.*
