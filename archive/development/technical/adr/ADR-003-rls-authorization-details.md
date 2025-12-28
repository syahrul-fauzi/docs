# ADR-003 Details — RLS per Tabel

Versi: 1.0.0
Tanggal: 2025-12-05
Status: Draft

## Tabel & Kebijakan

- conversations/messages/documents/runs/run_events/workflows/workflow_steps/integrations/audit_logs
- Policy SELECT USING: `tenant_id = current_setting('app.current_tenant')::uuid`
- Policy INSERT/UPDATE WITH CHECK: sama dengan USING
- Peran `admin` memiliki policy tambahan untuk UPDATE status tertentu

## Implementasi

- Fungsi set tenant: `select set_config('app.current_tenant', :tenantId, true)` pada awal sesi
- Mapping `auth.uid()` → `users.id` → baca `tenant_id`

## Testing

- Verifikasi deny cross-tenant SELECT/INSERT/UPDATE/DELETE
- Audit ke `audit_logs`
