# Security Considerations

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft keamanan.

## Kebijakan

- CSP nonce, headers keamanan global
- Rate limiting Upstash: bucket public vs auth
- RBAC pada API; peran Owner/Admin/Operator/Viewer
- RLS di database per `tenant_id`

## Secrets & Integrasi

- Jangan menyimpan secrets di klien; rotasi kunci
- Idempotensi untuk operasi side-effect

## Observability & Audit

- Audit trail append-only
- Tag tenant/session/request di tracing dan metrics
