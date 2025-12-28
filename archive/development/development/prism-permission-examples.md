# Prism RBAC/ABAC/Dynamic Permission Examples

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Contoh konfigurasi permission.

## RBAC

- Endpoint `/permission/rbac/allow` → 200
- Endpoint `/permission/rbac/deny` → 403

## ABAC

- Endpoint `/permission/abac/allow` → 200
- Endpoint `/permission/abac/deny` → 403

## Dynamic

- Endpoint `/simulate-403-permission` → 403 berdasarkan evaluasi runtime (claims)
- Gunakan header `Authorization` untuk memodulasi hasil pada mock server.

## Catatan

- Untuk implementasi plugin, gunakan Prism hooks untuk memeriksa headers dan memutuskan respons 200/403.
