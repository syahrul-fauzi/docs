---
title: 'Spesifikasi API — Admin Analytics'
slug: 'admin-analytics-api'
version: 'v1'
owners: ['admin', 'backend', 'observability']
tenancy: 'multitenant'
auth: ['JWT', 'SupabaseSession']
created_at: '2025-12-30'
last_modified: '2025-12-30'
status: Active
priority: P1
---

# Spesifikasi API — Admin Analytics

## Ringkasan

API ini menyediakan fungsionalitas analitik tingkat tinggi untuk administrator Control Plane, termasuk pemantauan kegagalan rule, kesehatan sistem, dan audit log.

## Endpoints (v1)

### Rule Failure Heatmap
- `GET /api/admin/rules/:ruleId/heatmap`
  - **Fungsi**: Mengambil data heatmap kegagalan untuk rule spesifik dalam 7 hari terakhir.
  - **Header**: 
    - `Authorization: Bearer <JWT>`
    - `x-tenant-id: <tenant_id>` (wajib)
  - **Response**: `200 OK`
    ```json
    {
      "ruleId": "string",
      "data": [
        {
          "date": "2025-12-30",
          "hours": [
            { "hour": 0, "count": 5 },
            { "hour": 1, "count": 2 },
            ...
          ]
        },
        ...
      ]
    }
    ```

## Implementasi Teknis

### Agregasi Redis
Heatmap menggunakan Redis Hash untuk penyimpanan efisien.
- **Format Key**: `heatmap:rule_failures:{YYYY-MM-DD}`
- **Format Field**: `{tenantId}:{ruleId}:{hour}`
- **Penyimpanan**: Atomic increment via `HINCRBY`.

### Isolasi Tenant
Meskipun ini adalah API Admin, isolasi tenant tetap ditegakkan:
1. Header `x-tenant-id` divalidasi oleh `TenantGuard`.
2. `AdminService` memfilter data Redis berdasarkan `tenantId` yang ada di context pengguna.
3. Mendukung kompatibilitas ke belakang untuk data lama tanpa prefix `tenantId`.

## Keamanan
- Dilindungi oleh `JwtAuthGuard` dan `TenantGuard`.
- Memerlukan peran administratif (diverifikasi di `AdminService`).
