---
title: "Adapter Percakapan (Web)"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# Adapter Percakapan (Web)

- Sumber: `apps/web/src/shared/api/adapters/conversation.ts`
- Tujuan: Memetakan record persistensi ke domain `Conversation` dan sebaliknya.

## Bentuk Persistensi

```
{
  id: string,
  title: string,
  tenant_id: string,
  user_id: string,
  status: 'active'|'paused'|'completed'|'archived',
  metadata?: Record<string, unknown>,
  turns: Array<{
    id: string,
    role: 'user'|'assistant'|'system',
    content: string,
    timestamp: string|Date,
    metadata?: {
      model?: string,
      tokens?: number,
      duration?: number,
      error?: string,
    },
    toolCalls?: Array<{ type: string; id: string; name: string; args?: Record<string, unknown> }>
  }>,
  created_at: string,
  updated_at: string
}
```

## Bentuk Domain

```
{
  id: string,
  title: string,
  tenantId: string,
  userId: string,
  status: ConversationStatus,
  metadata: { tags?: string[]; priority?: 'low'|'medium'|'high'; category?: string; customFields?: Record<string, unknown>; starred?: boolean },
  turns: Array<{ id: string; role: 'user'|'assistant'|'system'; content: string; timestamp: Date; metadata?: any; toolCalls?: Array<{ id: string; name: string; parameters: Record<string, unknown>; status: 'completed' }>}>,
  messages: Array<{ id: string; role: 'user'|'assistant'|'system'; content: string; timestamp: Date; metadata?: any; toolCalls?: Array<{ id: string; name: string; parameters: Record<string, unknown>; status: 'completed' }>}>,
  createdAt: Date,
  updatedAt: Date
}
```

## Catatan Implementasi

- `messages` saat ini diisi dari `turns` untuk memastikan UI mendapatkan kronologi pesan.
- Integrasi ke `MessageRepository` dapat menimpa `messages` dengan data aktual dari storage saat tersedia.
- `toolCalls` dimap ke bentuk domain dengan properti `parameters` dan `status: 'completed'`.

## Contoh

Lihat uji: `apps/web/src/shared/api/adapters/__tests__/conversation.adapter.test.ts`
