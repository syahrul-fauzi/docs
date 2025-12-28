# 💬 Business Package: Chat

**Lokasi:** `docs/Business/01_Packages/business-chat.md`

# @sba/business-chat

Modul percakapan agentik. Mengelola Conversation, Message, handler SendMessage, repository, dan adapter AG-UI untuk update UI.

## 1. Deskripsi

Paket domain untuk menangani percakapan antara pengguna, sistem, dan AI Agent.

## 2. Fungsi Utama

- Manajemen sesi percakapan.
- Pengelolaan state interaksi dan intent.
- Sinkronisasi dengan multi-agent orchestrator.

## 3. Integrasi

| Komponen   | Koneksi                       |
| ---------- | ----------------------------- |
| Agent Flow | `agent_interrupt_resume.bpmn` |
| API        | `POST /api/chat/session`      |
| Knowledge  | `@sba/business-knowledge`     |

## 4. Struktur Teknis

```

src/
├── domain/
│   ├── entities/
│   ├── events/
│   └── value-objects/
├── application/
│   ├── use-cases/
│   └── handlers/
└── infra/
└── adapters/

```

## 5. Use Case Contoh

**Command:** `SendMessageCommand`

```ts
execute({ sessionId, message }) {
  const session = this.sessionRepo.find(sessionId)
  const intent = this.intentDetector.detect(message)
  return this.agentOrchestrator.dispatch(intent)
}
```

## 6. Keterhubungan dengan PRD

- PRD: `20251206-agentic-core-prd.md`
- Flow: `20251208-agent_interrupt_resume-flow.md`

## 7. KPI

| Metrik        | Target |
| ------------- | ------ |
| Response Time | <120ms |
| Accuracy      | >95%   |
| Uptime        | 99.9%  |
