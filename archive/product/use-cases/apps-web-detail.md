# Use Case Pendalaman: apps/web (Chat, Dokumen, Workflow)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft pendalaman awal.
  Penanggung Jawab: SBA Docs Team — contact: docs@sba.local

## Deskripsi

apps/web adalah aplikasi end-user yang menyediakan CRUD percakapan, pesan, dokumen, serta integrasi chat dengan AG-UI. Persistence dan realtime berbasis Supabase, dengan FSD layering untuk modularitas.

Referensi: docs/use-cases/apps-web.md:14-21,73-88

## Aktor

- User (membuat percakapan, mengirim pesan, mengelola dokumen)
- Supabase (data & realtime channel)
- apps/api (endpoint internal AG-UI)

## Preconditions

- User terotentikasi; tenant valid
- Koneksi Supabase aktif

## Postconditions

- Data percakapan/pesan/dokumen persisten
- Subscription realtime aktif untuk conversation

## Alur Utama

1. Create Conversation → INSERT `conversations`
2. Send Message → INSERT `messages` → realtime update UI
3. Open Document → SELECT `documents`
4. Use AG-UI Chat → POST `/api/agui/chat` → tampilkan hasil

## Alur Alternatif & Pengecualian

- Supabase down → fallback mock untuk CI, tampilkan error
- Konflik dokumen → status conflict, sarankan retry

## Aturan Bisnis

- Multi-tenant routing; filter per-tenant
- Validasi input (zod); sanitize

## Persyaratan Non-Fungsional

- p50 CRUD < 300ms; p95 realtime < 2s
- Keandalan subscription; error logging

## Diagram Use Case

```mermaid
usecaseDiagram
actor User

User -- (Manage Conversations)
User -- (Send/Receive Messages)
User -- (Manage Documents)
User -- (Use AG-UI Chat)
```

## Referensi Teknis

- apps/web/src/shared/api/client.ts:1-156,160-337,340-353
