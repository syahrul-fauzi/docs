---
title: Webhook Integration Guide
created_at: 2025-12-31
author: SOLOCoder
status: active
priority: medium
tags: [api, webhook, integration, real-time]
---

# ⚓ Webhook Integration Guide

Webhook memungkinkan aplikasi Anda menerima notifikasi real-time dari SBA-Agentic ketika event tertentu terjadi. Alih-alih melakukan polling ke API, SBA akan mengirimkan request `POST` HTTP ke URL yang Anda tentukan.

## 1. Cara Kerja Webhook

1. **Event Terjadi**: Sebuah aksi selesai (mis. analisis dokumen selesai) atau status berubah.
2. **Payload Dibuat**: SBA menyusun data JSON yang relevan.
3. **Request Dikirim**: SBA mengirimkan request `POST` ke Payload URL Anda.
4. **Konfirmasi**: Server Anda harus merespon dengan status code `2xx`.

## 2. Konfigurasi Webhook

Anda dapat mengonfigurasi webhook melalui **Control Plane API** atau **Internal Console**.

- **Payload URL**: URL server Anda yang akan menerima request (harus HTTPS).
- **Secret**: String rahasia yang digunakan untuk memverifikasi bahwa request benar-benar berasal dari SBA.
- **Events**: Pilih event apa saja yang ingin Anda terima.

## 3. Daftar Event (Event Types)

| Event Type | Deskripsi |
| --- | --- |
| `agent.task.completed` | Dikirim saat agen berhasil menyelesaikan tugas. |
| `agent.task.failed` | Dikirim saat agen gagal menyelesaikan tugas setelah retry. |
| `document.processed` | Dikirim saat data berhasil diekstraksi dari dokumen. |
| `approval.requested` | Dikirim saat diperlukan persetujuan manual (HITL). |
| `tenant.limit.reached` | Dikirim saat tenant mendekati limit rate atau kuota. |

## 4. Keamanan: Verifikasi Signature

Setiap request webhook menyertakan header `X-SBA-Signature` untuk memastikan integritas dan autentisitas data.

### Contoh Header

```http
X-SBA-Signature: v1=7d3841977716a5144847e2282156f3f057597397
X-SBA-Timestamp: 1672531200
```

### Cara Verifikasi (Node.js)

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'v1=' + hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}
```

## 5. Praktik Terbaik

- **Respon Cepat**: Kembalikan status `200 OK` segera setelah menerima payload. Lakukan pemrosesan berat di background (Queue).
- **Idempotensi**: Pastikan sistem Anda dapat menangani pengiriman ulang payload yang sama (gunakan `event_id` sebagai kunci unik).
- **HTTPS**: Selalu gunakan endpoint HTTPS yang valid.
- **Retry Logic**: SBA akan mencoba mengirim ulang hingga 3 kali dengan exponential backoff jika server Anda mengembalikan error `5xx` atau `429`.

---
*Gunakan [TECHNICAL_SPEC.md](./TECHNICAL_SPEC.md) sebagai referensi standar data umum.*
