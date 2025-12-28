# Skema Database — Tabel & Indeks

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft skema awal.
  Penanggung Jawab: SBA Data Team — contact: data@sba.local

## Tabel Inti

- tenants(id, name, slug UNIQUE, created_at)
- users(id, tenant_id FK, email UNIQUE, role, created_at)
- conversations(id, tenant_id FK, created_by FK, title, status, created_at, archived_at)
- messages(id, tenant_id FK, conversation_id FK, sender_id FK, type, content JSONB, created_at)
- documents(id, tenant_id FK, created_by FK, title, content JSONB, version, created_at, updated_at)
- runs(id, tenant_id FK, created_by FK, status, metadata JSONB, started_at, completed_at)
- run_events(id, run_id FK, tenant_id FK, seq, type, payload JSONB, created_at)
- workflows(id, tenant_id FK, created_by FK, name, status, config JSONB, created_at, updated_at)
- workflow_steps(id, workflow_id FK, position, step_type, step_config JSONB, created_at)
- integrations(id, tenant_id FK, provider, config JSONB, enabled, created_at)
- audit_logs(id, tenant_id FK, actor_id FK, action, entity_type, entity_id, metadata JSONB, created_at)

## Indeks yang Disarankan

- users(tenant_id), users(email)
- conversations(tenant_id, created_at DESC), conversations(created_by)
- messages(conversation_id, created_at ASC), messages(tenant_id)
- documents(tenant_id, updated_at DESC), documents(title)
- runs(tenant_id, started_at DESC), runs(status)
- run_events(run_id, seq ASC), run_events(tenant_id)
- workflows(tenant_id, updated_at DESC), workflows(status)
- workflow_steps(workflow_id, position ASC)
- integrations(tenant_id, provider)
- audit_logs(tenant_id, created_at DESC), audit_logs(entity_type, entity_id)

## Relasi & Integritas

- Semua FK ON DELETE RESTRICT (kecuali messages.conversation_id ON DELETE CASCADE)
- Validasi enum melalui CHECK constraint atau domain types
