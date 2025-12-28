# 🧩 Business API Contracts

**Lokasi:** `docs/Business/04_API-Contracts/business-api-contracts.md`

## 1. Deskripsi

Dokumen ini menjabarkan kontrak API untuk setiap paket `@sba/business-*`.

| Package                   | Base Path                 | Tujuan                              |
| ------------------------- | ------------------------- | ----------------------------------- |
| `@sba/business-chat`      | `/api/business/chat`      | Komunikasi dan logika percakapan    |
| `@sba/business-knowledge` | `/api/business/knowledge` | Query & indexing konten pengetahuan |
| `@sba/business-payment`   | `/api/business/payment`   | Proses transaksi dan verifikasi     |
| `@sba/business-analytics` | `/api/business/analytics` | Pelaporan dan metrik performa       |

## 2. Contoh Kontrak (Chat)

```ts
POST /api/business/chat/send
{
  "message": "Tampilkan status pesanan saya"
}

Response:
{
  "reply": "Pesanan Anda sedang dikirim.",
  "metadata": { "context": "order_status" }
}
```

## 3. Schema Validation

Gunakan `zod` untuk validasi runtime:

```ts
import { z } from 'zod';

export const ChatRequestSchema = z.object({
  message: z.string(),
  userId: z.string().uuid().optional(),
});
```
