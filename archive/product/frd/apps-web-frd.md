# FRD — apps/web (Chat, Dokumen, Workflow)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft FRD awal.
  Penanggung Jawab: SBA Docs Team — contact: docs@sba.local

## Latar Belakang & Tujuan

apps/web adalah frontend end-user untuk chat, dokumen, dan workflow dengan persistence Supabase dan integrasi endpoint AG-UI.

## Fitur Utama

- CRUD Conversations/Messages/Documents
- Realtime subscription per conversation
- AG-UI chat endpoint internal
- Multi-tenant routing

## Spesifikasi Fungsional

- Conversations: list/get/create/update/delete via Supabase
- Messages: insert + realtime channel `messages:{conversationId}`
- Documents: CRUD dengan validasi
- Chat: `POST /api/agui/chat` dan render hasil
- Error Handling: cek `{data,error}`, validasi zod

## Diagram Use Case

```mermaid
usecaseDiagram
actor User
User -- (Manage Conversations)
User -- (Send/Receive Messages)
User -- (Manage Documents)
User -- (Use AG-UI Chat)
```

## Batasan Sistem

- Tidak mengelola antrean agentic
- Bergantung Supabase untuk realtime CRUD

## Acceptance Criteria

- CRUD dan realtime bekerja sesuai filter conversation
- Chat endpoint berfungsi dan aman

## Referensi

- docs/use-cases/apps-web-detail.md
- docs/architecture/RELATIONS.md:9-18
