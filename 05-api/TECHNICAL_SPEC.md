---
title: API Technical Specification
created_at: 2025-12-31
author: SOLOCoder
status: active
priority: high
tags: [api, spec, security, auth]
---

# 🛠️ API Technical Specification

Dokumen ini mendefinisikan standar teknis, pola arsitektur, dan protokol komunikasi yang digunakan di seluruh API SBA-Agentic.

## 1. Prinsip Desain API

SBA-Agentic mengikuti prinsip **RESTful API** yang ketat untuk interaksi eksternal dan **gRPC** untuk komunikasi internal berlatensi rendah.

- **Format Data**: JSON (application/json) untuk semua request dan response.
- **Versi API**: Menggunakan prefix URL (mis. `/v1/resources`).
- **Idempotensi**: Method `PUT` dan `DELETE` harus idempotent. `POST` untuk pembuatan sumber daya baru.
- **Naming Convention**: `snake_case` untuk keys dalam JSON.

## 2. Autentikasi & Otorisasi

Keamanan adalah prioritas utama dalam arsitektur multi-tenant kami.

### Autentikasi (JWT)

Semua request wajib menyertakan token JWT dalam header `Authorization`.

```http
Authorization: Bearer <jwt_token>
```

- **Provider**: Supabase Auth / Clerk.
- **Claims Wajib**:
  - `sub`: User ID.
  - `tenant_id`: ID tenant untuk isolasi data.
  - `role`: Role pengguna (admin, member, agent).

### Otorisasi (RBAC & RLS)

- **RBAC**: Akses ke endpoint dikontrol melalui Role-Based Access Control.
- **RLS**: Row-Level Security di database memastikan pengguna hanya dapat mengakses data milik `tenant_id` mereka sendiri.

## 3. Penanganan Error

Kami menggunakan format error yang standar untuk mempermudah debugging oleh klien.

### Format Response Error

```json
{
  "error": {
    "code": "ERROR_CODE_STRING",
    "message": "Deskripsi error yang user-friendly.",
    "details": {
      "field": "Saran perbaikan atau detail teknis tambahan"
    },
    "trace_id": "req-123-abc"
  }
}
```

### Kode Status HTTP Umum

| Kode | Makna | Deskripsi |
| --- | --- | --- |
| 200 | OK | Request berhasil. |
| 201 | Created | Sumber daya baru berhasil dibuat. |
| 400 | Bad Request | Parameter tidak valid atau format salah. |
| 401 | Unauthorized | Token hilang atau tidak valid. |
| 403 | Forbidden | Tidak memiliki izin untuk akses data ini (Isolasi Tenant). |
| 404 | Not Found | Sumber daya tidak ditemukan. |
| 429 | Too Many Requests | Rate limit terlampaui. |
| 500 | Internal Server Error | Kesalahan pada sisi server. |

## 4. Rate Limiting

Rate limiting diterapkan per `tenant_id` untuk mencegah penyalahgunaan.

- **Tier Free**: 100 requests / menit.
- **Tier Pro**: 1,000 requests / menit.
- **Tier Enterprise**: Custom (Default 5,000 req/min).

Header response menyertakan informasi kuota:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

## 5. Pagination, Filtering, & Sorting

Untuk endpoint yang mengembalikan list data (Collection):

- **Pagination**: Menggunakan cursor-based pagination (direkomendasikan) atau offset-based.
  - `?limit=20&cursor=next_token`
- **Filtering**: Menggunakan query parameter.
  - `?status=active&type=agentic`
- **Sorting**: Menggunakan parameter `sort`.
  - `?sort=-created_at` (prefix `-` untuk descending).

## 6. Standar Keamanan

- **TLS/SSL**: Wajib menggunakan HTTPS (TLS 1.2+).
- **CORS**: Dibatasi hanya untuk domain yang terdaftar di whitelist tenant.
- **PII Masking**: Data sensitif (email, phone) otomatis dimask di log audit namun tersedia di response API sesuai izin.
- **Circuit Breaker**: API Gateway mengimplementasikan circuit breaker untuk dependensi pihak ketiga (mis. OpenAI, CRM).

---
*Dokumen ini merupakan standar hidup yang akan terus diperbarui seiring perkembangan platform.*
