# Spesifikasi Query Dasar

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft query awal.
  Penanggung Jawab: SBA Data Team — contact: data@sba.local

## Conversations

- List per-tenant (paginate):

```
SELECT id, title, status, created_at
FROM conversations
WHERE tenant_id = $1
ORDER BY created_at DESC
LIMIT $2 OFFSET $3;
```

- Create:

```
INSERT INTO conversations(id, tenant_id, created_by, title, status, created_at)
VALUES ($1, $2, $3, $4, 'active', now());
```

## Messages

- Insert dan broadcast realtime:

```
INSERT INTO messages(id, tenant_id, conversation_id, sender_id, type, content, created_at)
VALUES ($1, $2, $3, $4, $5, $6::jsonb, now());
```

- List by conversation:

```
SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC;
```

## Documents

- Search by title:

```
SELECT id, title, updated_at FROM documents
WHERE tenant_id = $1 AND title ILIKE '%' || $2 || '%'
ORDER BY updated_at DESC;
```

## Runs & Events

- List runs per-tenant:

```
SELECT id, status, started_at, completed_at
FROM runs WHERE tenant_id = $1
ORDER BY started_at DESC LIMIT $2 OFFSET $3;
```

- Get run events (by run):

```
SELECT seq, type, payload, created_at
FROM run_events WHERE run_id = $1
ORDER BY seq ASC;
```

## Workflows

- Steps untuk workflow:

```
SELECT position, step_type, step_config
FROM workflow_steps WHERE workflow_id = $1
ORDER BY position ASC;
```

## Audit Logs

- List by entity:

```
SELECT action, actor_id, metadata, created_at
FROM audit_logs
WHERE tenant_id = $1 AND entity_type = $2 AND entity_id = $3
ORDER BY created_at DESC;
```
