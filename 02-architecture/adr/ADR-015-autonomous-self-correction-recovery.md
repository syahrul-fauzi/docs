---
id: ADR-015
title: Autonomous Self-Correction & Recovery Mechanism
deciders: Super Agent, Technical Lead
date: 2025-12-28
status: Accepted
priority: P1
related:
  - ADR-001
  - ADR-014
---

# ADR-015: Autonomous Self-Correction & Recovery Mechanism

## Status

Accepted

## Context

Sistem SBA-Agentic berbasis rule (Rube Engine) memerlukan mekanisme yang lebih tangguh daripada sekadar retry statis. Ketika sebuah rule gagal, kita ingin memanfaatkan kemampuan meta-kognitif dari `AgenticReasoningEngine` untuk menganalisis kegagalan dan menentukan langkah perbaikan yang paling sesuai (misalnya: mengirim notifikasi ke admin, mencoba tool alternatif, atau melakukan kompensasi data).

## Decision

Kami mengimplementasikan mekanisme **Self-Correction** yang terintegrasi langsung ke dalam siklus hidup eksekusi rule:

1.  **Failure Hook**: `RuleManager` di `packages/rube` kini mendukung callback `handleFailure` yang dipicu saat eksekusi rule menghasilkan error.
2.  **Reasoning Integration**: `RubeService` (apps/api) mengimplementasikan `handleFailure` dengan memanggil `AgenticReasoningEngine.reason()`. Engine ini menganalisis konteks kegagalan dan mengembalikan `decision`.
3.  **Corrective Execution**: Jika engine merekomendasikan sebuah tool, `EnhancedToolRegistry` mengeksekusi tool tersebut dengan identitas `system-corrector` untuk membedakannya dari eksekusi user biasa.
4.  **Specialized Observation**: `ObserverService` mencatat aksi ini dengan flag `isCorrection: true` dan menyimpannya sebagai meta-event tipe `self_correction`.
5.  **Recursive PII Masking Compliance**: Memastikan metadata self-correction (yang mungkin berisi detail error teknis) tetap melewati filter masking PII, namun mengecualikan kunci metadata internal agar tidak kehilangan context debugging yang kritikal.

## Consequences

### Positive

-   ✅ **Resilience**: Sistem dapat pulih dari kegagalan transien tanpa intervensi manusia.
-   ✅ **Traceability**: Setiap upaya perbaikan tercatat secara eksplisit di audit log dan UI.
-   ✅ **Extensibility**: Strategi perbaikan dapat dikembangkan lebih lanjut di level `AgenticReasoningEngine` tanpa mengubah inti Rube Engine.

### Negative

-   ❌ **Complexity**: Menambah satu lapisan abstraksi dalam penanganan error.
-   ❌ **Potential Loops**: Jika langkah perbaikan juga gagal, ada risiko loop jika tidak dibatasi (saat ini dibatasi oleh flow satu tingkat).
-   ❌ **Token Usage**: Penggunaan LLM untuk reasoning saat failure menambah biaya operasional.

## Implementation Details

### Metadata Schema

```typescript
interface SelfCorrectionMetadata {
  isCorrection: true;
  originalRuleId: string;
  error: string;
  decision: string;
  confidence: number;
}
```

### UI Integration

`MetaEventsUI.tsx` menggunakan status `amber` untuk membedakan alur koreksi dari alur sukses (`green`) atau gagal total (`red`).

## References

- [RubeService](file:///home/inbox/smart-ai/sba-agentic/apps/api/src/rube/rube.service.ts)
- [RuleExecutor](file:///home/inbox/smart-ai/sba-agentic/packages/rube/src/executor/rule-executor.ts)
- [PRD-015: Self-Correction & Autonomous Recovery](file:///home/inbox/smart-ai/sba-agentic/docs/01-product/prd/20251228-self-correction-autonomous-recovery.md)
