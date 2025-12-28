---
title: 'Knowledge API Specification'
created_at: 2025-12-08T00:00:00Z
last_modified: 2025-12-08T00:00:00Z
author: 'Agentic Assistant'
reviewer: 'TBD'
status: 'Draft'
priority: 'High'
related:
  - 'README.md'
  - 'docs/README.md'
  - 'apps/app/src/app/api/knowledge/route.ts'
  - 'apps/app/src/app/api/openapi/route.ts'
changelog:
  - 2025-12-08: Initial draft with endpoints, schemas, auth, rate limit, webhook, examples.
---

# Knowledge API

## Ringkasan

- Sumber daya: KnowledgeItem milik tenant yang dapat di-upsert, di-ingest, di-verifikasi, dan dicari.
- Prinsip: REST stateless, deterministik, tipe tegas, RBAC dan tenant scoping, observability metrics.
- Implementasi terkait: `apps/app/src/app/api/knowledge/route.ts:19-29,32-44` dan guard/metrics di `README.md:74-82`.

## Endpoint

- GET `/api/knowledge`
  - Deskripsi: Mengambil daftar KnowledgeItem terbaru milik tenant (opsi paginasi/filter).
  - Query:
    - `page` (number, opsional, default 1)
    - `pageSize` (number, opsional, default 20, max 100)
    - `tag` (string, opsional)
  - Header: `x-tenant-id` (wajib), `Authorization: Bearer <JWT>` (wajib jika bukan test mode)
  - Response: 200 JSON `KnowledgeListResponse`

- POST `/api/knowledge`
  - Deskripsi: Upsert satu KnowledgeItem. Idempoten via `externalId`.
  - Body: JSON `KnowledgeUpsertRequest`
  - Header: `x-tenant-id` (wajib), `Authorization` (wajib)
  - Response: 200 JSON `KnowledgeUpsertResponse`

- GET `/api/knowledge/search`
  - Deskripsi: Pencarian teks penuh per tenant.
  - Query: `q` (string, wajib), `page` (opsional), `pageSize` (opsional)
  - Header: `x-tenant-id` (wajib), `Authorization` (wajib)
  - Response: 200 JSON `KnowledgeSearchResponse`

- POST `/api/knowledge/vector-search`
  - Deskripsi: Pencarian semantik berbasis embedding.
  - Body: JSON `VectorSearchRequest`
  - Header: `x-tenant-id` (wajib), `Authorization` (wajib)
  - Response: 200 JSON `VectorSearchResponse`

- POST `/api/knowledge/upsert`
  - Deskripsi: Upsert batch KnowledgeItem (maks 100 item per request).
  - Body: JSON `KnowledgeUpsertBatchRequest`
  - Header: `x-tenant-id` (wajib), `Authorization` (wajib)
  - Response: 200 JSON `KnowledgeUpsertBatchResponse`

- POST `/api/knowledge/ingest`
  - Deskripsi: Ingest dokumen mentah dari `fileUrl`/`rawText` untuk diekstrak dan diindeks.
  - Body: JSON `KnowledgeIngestRequest`
  - Header: `x-tenant-id` (wajib), `Authorization` (wajib)
  - Response: 202 JSON `KnowledgeIngestResponse`

- POST `/api/knowledge/verify`
  - Deskripsi: Verifikasi konten (checksum, anti-dup, PII lint) dan set `verified=true`.
  - Body: JSON `KnowledgeVerifyRequest`
  - Header: `x-tenant-id` (wajib), `Authorization` (wajib)
  - Response: 200 JSON `KnowledgeVerifyResponse`

## Skema Request & Response (JSON Schema)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "KnowledgeItem",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "id": { "type": "string", "description": "UUID internal" },
    "externalId": {
      "type": "string",
      "description": "Id eksternal untuk idempoten"
    },
    "tenantId": { "type": "string" },
    "title": { "type": "string", "minLength": 1 },
    "content": { "type": "string" },
    "tags": { "type": "array", "items": { "type": "string" }, "default": [] },
    "verified": { "type": "boolean", "default": false },
    "source": { "type": "string", "enum": ["manual", "ingest", "import"] },
    "createdAt": { "type": "string", "format": "date-time" },
    "updatedAt": { "type": "string", "format": "date-time" }
  },
  "required": ["tenantId", "title", "content"]
}
```

```json
{
  "$id": "KnowledgeUpsertRequest",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "externalId": { "type": "string" },
    "title": { "type": "string" },
    "content": { "type": "string" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "source": { "type": "string", "enum": ["manual", "ingest", "import"] }
  },
  "required": ["title", "content"]
}
```

```json
{
  "$id": "KnowledgeListResponse",
  "type": "object",
  "properties": {
    "items": { "type": "array", "items": { "$ref": "KnowledgeItem" } },
    "page": { "type": "integer", "minimum": 1 },
    "pageSize": { "type": "integer", "minimum": 1, "maximum": 100 },
    "total": { "type": "integer", "minimum": 0 }
  },
  "required": ["items", "page", "pageSize", "total"]
}
```

```json
{
  "$id": "SearchRequest",
  "type": "object",
  "properties": {
    "q": { "type": "string", "minLength": 1 },
    "page": { "type": "integer", "minimum": 1 },
    "pageSize": { "type": "integer", "minimum": 1, "maximum": 100 }
  },
  "required": ["q"]
}
```

```json
{
  "$id": "VectorSearchRequest",
  "type": "object",
  "properties": {
    "embedding": {
      "type": "array",
      "items": { "type": "number" },
      "minItems": 16
    },
    "topK": { "type": "integer", "minimum": 1, "maximum": 100 }
  },
  "required": ["embedding"]
}
```

```json
{
  "$id": "ErrorResponse",
  "type": "object",
  "properties": {
    "code": { "type": "string" },
    "message": { "type": "string" },
    "details": { "type": "object" },
    "requestId": { "type": "string" }
  },
  "required": ["code", "message", "requestId"]
}
```

## Validasi Runtime (Zod)

```ts
import { z } from 'zod';

export const KnowledgeItemZ = z.object({
  id: z.string().uuid().optional(),
  externalId: z.string().optional(),
  tenantId: z.string(),
  title: z.string().min(1),
  content: z.string(),
  tags: z.array(z.string()).default([]),
  verified: z.boolean().default(false),
  source: z.enum(['manual', 'ingest', 'import']).default('manual'),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const KnowledgeUpsertRequestZ = z.object({
  externalId: z.string().optional(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
  source: z.enum(['manual', 'ingest', 'import']).optional(),
});

export const KnowledgeListResponseZ = z.object({
  items: z.array(KnowledgeItemZ),
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1).max(100),
  total: z.number().int().min(0),
});

export const SearchRequestZ = z.object({
  q: z.string().min(1),
  page: z.number().int().min(1).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
});

export const VectorSearchRequestZ = z.object({
  embedding: z.array(z.number()).min(16),
  topK: z.number().int().min(1).max(100).optional(),
});

export const ErrorResponseZ = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.any()).optional(),
  requestId: z.string(),
});
```

## Autentikasi & Otorisasi

- Autentikasi: `Authorization: Bearer <JWT>` (Supabase session) atau cookie sesi. Test/dev: cookie `__test_auth` diperbolehkan (`README.md:76-77`).
- Tenant scoping: header `x-tenant-id` wajib, dipropagasi ke metrics (`docs/README.md:37-43`).
- RBAC per peran:
  - `analytics:read`: GET `/api/knowledge`, GET `/api/knowledge/search`, POST `/api/knowledge/vector-search`.
  - `analytics:manage`: POST `/api/knowledge`, POST `/api/knowledge/upsert`, POST `/api/knowledge/ingest`, POST `/api/knowledge/verify`.
- Guard & metrics: gunakan `withRBAC` dan `withMetrics` seperti pada `apps/app/src/app/api/knowledge/route.ts:16-18,39-44`.

## Rate Limiting

- Skema batasan per IP+Tenant:
  - Read: 60 request/menit, burst 120.
  - Write/manage: 10 request/menit, burst 20.
- Respons ketika terlampaui: `429 Too Many Requests` dengan payload:

  ```json
  {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded",
    "retryAfter": 30,
    "requestId": "..."
  }
  ```

## Struktur Error

- Format baku: `{ code, message, details?, requestId }`.
- Kode standar: `invalid_request`, `unauthorized`, `forbidden`, `not_found`, `conflict`, `rate_limit_exceeded`, `internal_error`.
- Deterministik, tidak mengekspos rincian internal.

## Event & Webhook

- Event yang tersedia:
  - `knowledge.upserted`
  - `knowledge.ingested`
  - `knowledge.verified`
- Payload webhook:

  ```json
  {
    "id": "uuid",
    "externalId": "optional",
    "tenantId": "string",
    "type": "knowledge.upserted|knowledge.ingested|knowledge.verified",
    "item": { "$ref": "KnowledgeItem" },
    "occurredAt": "2025-12-08T00:00:00Z"
  }
  ```

- Keamanan: `x-webhook-signature: sha256=<hmac>` (secret per-tenant).
- Retry: exponential backoff (0s, 10s, 60s, 300s), maksimum 5 percobaan; dead-letter dicatat untuk analisis.

## Contoh curl

```bash
curl -sS -H "Authorization: Bearer $TOKEN" -H "x-tenant-id: t1" \
  "$APP_URL/api/knowledge?page=1&pageSize=20"
```

```bash
curl -sS -X POST -H "Authorization: Bearer $TOKEN" -H "x-tenant-id: t1" \
  -H "Content-Type: application/json" \
  -d '{"externalId":"doc-001","title":"Guide","content":"...","tags":["howto"],"source":"manual"}' \
  "$APP_URL/api/knowledge"
```

```bash
curl -sS -H "Authorization: Bearer $TOKEN" -H "x-tenant-id: t1" \
  "$APP_URL/api/knowledge/search?q=agentic&page=1&pageSize=10"
```

```bash
curl -sS -X POST -H "Authorization: Bearer $TOKEN" -H "x-tenant-id: t1" \
  -H "Content-Type: application/json" \
  -d '{"embedding":[0.12,0.03,0.44,0.19,0.55,0.02,0.11,0.91,0.05,0.21,0.33,0.47,0.66,0.77,0.88,0.99],"topK":5}' \
  "$APP_URL/api/knowledge/vector-search"
```

```bash
curl -sS -X POST -H "Authorization: Bearer $TOKEN" -H "x-tenant-id: t1" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"externalId":"doc-002","title":"FAQ","content":"..."}]}' \
  "$APP_URL/api/knowledge/upsert"
```

```bash
curl -sS -X POST -H "Authorization: Bearer $TOKEN" -H "x-tenant-id: t1" \
  -H "Content-Type: application/json" \
  -d '{"fileUrl":"https://example.com/file.pdf","tags":["finance"]}' \
  "$APP_URL/api/knowledge/ingest"
```

```bash
curl -sS -X POST -H "Authorization: Bearer $TOKEN" -H "x-tenant-id: t1" \
  -H "Content-Type: application/json" \
  -d '{"id":"b1d6f7dd-...","checks":["checksum","pii"]}' \
  "$APP_URL/api/knowledge/verify"
```

## Mapping UI → API

- Halaman Knowledge: konsumsi `GET /api/knowledge/search` dan aksi untuk `POST /api/knowledge/*` pada formulir manajemen.
- AGUI Dashboard memakai pencarian cepat: `apps/app/src/features/agui/ui/AGUIDashboard.tsx`.
- Runtime Ops Dashboard menggabungkan ringkasan lewat pencarian: `apps/app/src/features/agentic/ui/RuntimeOpsDashboard.tsx`.

## Mapping PRD → Perilaku API

- Kebutuhan bisnis: menyimpan, mencari, memverifikasi pengetahuan secara tenant-secure dengan audit pada operasi tulis.
- Alur: upsert/ingest → verify → tersedia untuk search dan vector-search; webhook men-trigger proses downstream.

## Observability

- Setiap handler dibungkus metrics: contoh pembungkus di `apps/app/src/app/api/knowledge/route.ts:39-40`.
- Latensi dinormalisasi ke detik; label tenant otomatis (`README.md:80-82`).

## Error & Status Codes

- 200, 201, 202 untuk operasi sukses.
- 400 `invalid_request`, 401 `unauthorized`, 403 `forbidden`, 404 `not_found`, 409 `conflict`, 429 `rate_limit_exceeded`, 500 `internal_error`.

## Keamanan

- Security headers dan CSP: rujuk `docs/README.md:33-36`.
- Jangan hardcode kunci; gunakan factories Supabase (`docs/README.md:31-32`).

## Konsistensi & Penamaan

- Ikuti konvensi workspace dan frontmatter (`README.md:47-49`, `docs/README.md:95-101`).
- Cross-reference ke `workspace/_xref.md` saat dokumen ini di-Approve.

## Referensi Kode

- `apps/app/src/app/api/knowledge/route.ts:19-29` — handler POST upsert mock-storage dengan RBAC.
- `apps/app/src/app/api/knowledge/route.ts:32-44` — handler GET list dengan `ensureTenantHeader`, metrics, dan RBAC.
