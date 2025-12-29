---
title: Self-Correction Flow
id: FLOW-015
created_at: 2025-12-28
last_modified: 2025-12-28
author: Super Agent
status: Draft
---

# Self-Correction Flow

Dokumen ini mendefinisikan alur teknis proses koreksi diri (self-correction) ketika terjadi kegagalan pada eksekusi rule di SBA-Agentic.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant RM as RuleManager (Rube)
    participant RS as RubeService (API)
    participant RE as AgenticReasoningEngine
    participant TR as EnhancedToolRegistry
    participant OB as ObserverService
    participant DB as MetaEvents DB

    RM->>RM: Execute Rule (BPA-DOC-01)
    Note over RM: Rule Fails (e.g. OCR Error)
    RM->>RS: handleFailure(context, error)
    RS->>OB: observeAgentExecution(type: 'error', status: 'failed')
    RS->>RE: reason(context, error)
    RE-->>RS: decision: 'notification.send_email'
    
    RS->>TR: execute('notification.send_email', params)
    TR-->>RS: success
    
    RS->>OB: observeAgentExecution(type: 'self-corrector', isCorrection: true)
    OB->>DB: Upsert MetaEvent (type: 'self_correction')
    
    Note over RS: Workflow Resumes or Ends Gracefully
```

## Logic Breakdown

1.  **Detection**: `RuleExecutor` menangkap exception dan memanggil callback `handleFailure` yang dikonfigurasi saat inisialisasi `RuleManager`.
2.  **Analysis**: `AgenticReasoningEngine` menggunakan template prompt khusus kegagalan untuk menganalisis payload asli dan pesan error.
3.  **Action**: Jika perbaikan dimungkinkan via tool (misal: kirim email alert ke tim operasional), tool tersebut dijalankan dengan flag idempotency.
4.  **Logging**: Event dicatat dengan tipe khusus `self_correction` agar dashboard dapat membedakannya dari flow normal.

## Error Handling

- Jika `AgenticReasoningEngine` gagal memberikan keputusan, sistem akan mencatat kegagalan permanen.
- Jika corrective tool gagal, sistem tidak akan mencoba rekursi lebih lanjut untuk menghindari infinite loop.

## References

- [PRD-015: Self-Correction & Autonomous Recovery](file:///home/inbox/smart-ai/sba-agentic/docs/01-product/prd/20251228-self-correction-autonomous-recovery.md)
- [ADR-015: Autonomous Self-Correction & Recovery Mechanism](file:///home/inbox/smart-ai/sba-agentic/docs/02-architecture/adr/ADR-015-autonomous-self-correction-recovery.md)
