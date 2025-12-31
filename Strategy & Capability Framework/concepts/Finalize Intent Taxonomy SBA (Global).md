---
title: Finalize Intent Taxonomy SBA (Global)
version: 1.2.0
status: approved
last_updated: 2025-12-31
approved_by: @SBASuperAgent
related_docs:
  - docs/00-index/Agentic Front Door (AFD).md
  - docs/Strategy & Capability Framework/concepts/Docs sebagai Single Source of Truth - AFD.md
---

# Finalize Intent Taxonomy — Global SBA

**Smart Business Assistant (SBA-Agentic)**

Dokumen ini adalah **Semantic Source of Truth** untuk seluruh sistem SBA-Agentic.
Setiap intent yang didefinisikan di sini adalah **kontrak keras** antara **Agentic Front Door (AFD)** dan **Control Plane**, serta menjadi dasar bagi **A2A (Agent-to-Agent) communication**.

---

## 1. Tujuan Intent Taxonomy Global

Intent Taxonomy Global bertujuan untuk:

1.  Menstandarkan **bahasa tujuan bisnis** lintas channel (web, app, API, WA, dsb)
2.  Memisahkan **apa yang user mau** dari **bagaimana agent bekerja**
3.  Menjadi:
    *   Input utama Control Plane
    *   Dasar routing capability (Greeter Pattern)
    *   Dasar pricing & policy
    *   **Capability Advertisement** dalam A2A Agent Cards

---

## 2. Prinsip Desain (WAJIB)

1.  **Business-semantic**, bukan teknis
2.  **Channel-agnostic**
3.  **Composable & hierarchical**
4.  **Stable naming (backward compatible)**
5.  **Multimodal-ready**: Mendukung input teks, suara, dan visual secara native

---

## 3. Struktur Hirarki Intent

Intent SBA menggunakan **3 level hirarki**:

```txt
<domain>.<category>.<action>
```

Contoh: `marketing.lead.capture`, `finance.invoice.generate`.

---

## 4. Global Intent Taxonomy (FINAL)

### 4.1 Marketing Domain (AFD Primary Source)
*Digunakan secara ekstensif oleh Agentic Front Door untuk menangkap sinyal user.*

```txt
marketing.visitor.track       # Tracking anonim (signal producer) [Risk: Low]
marketing.lead.capture        # User submit form / contact [Risk: Medium]
marketing.lead.qualify        # User berinteraksi dengan pricing/fitur [Risk: Medium]
marketing.lead.enrich         # System memperkaya data lead [Risk: Low]
marketing.content.view        # User melihat konten spesifik (context capture) [Risk: Low]
marketing.campaign.click      # User klik campaign link [Risk: Low]
marketing.content.generate    # User ingin generate konten [Risk: Medium]
marketing.signal.perception   # [AFD] Menangkap sinyal multimodal non-spesifik [Risk: Low]
marketing.ux.adaptation       # [AFD] User memberikan feedback terhadap adaptasi UI [Risk: Low]
```

### 4.2 Sales Domain
```txt
sales.pipeline.create         # [Risk: Medium]
sales.deal.score              # [Risk: Low]
sales.deal.close              # [Risk: High] - Memerlukan konfirmasi manusia
sales.customer.onboard        # [Risk: Medium]
```

### 4.3 Finance Domain
```txt
finance.invoice.generate      # [Risk: High] - Memerlukan konfirmasi manusia
finance.payment.collect       # [Risk: High] - Memerlukan konfirmasi manusia
finance.report.generate       # [Risk: Medium]
```

### 4.4 Operations Domain
```txt
ops.workflow.optimize         # [Risk: Medium]
ops.task.assign               # [Risk: Medium]
ops.resource.allocate         # [Risk: High]
```

### 4.5 System / Intelligence Domain (Internal & AFD)
*Intent khusus untuk orkestrasi, adaptasi UI, dan A2A protocol.*

```txt
system.decision.reason      # Agent menjelaskan alasan [Risk: Low]
system.context.enrich       # Memperkaya context user [Risk: Low]
system.intent.clarify       # Meminta klarifikasi (Ambiguity) [Risk: Low]
system.ui.adapt             # [AFD] Permintaan adaptasi layout [Risk: Low]
system.router.redirect      # [AFD] Hard redirect ke halaman lain [Risk: Medium]
system.a2a.delegate         # [A2A] Mendelegasikan tugas ke agent lain [Risk: Medium]
system.a2a.status_update    # [A2A] Update status task (working/completed/etc) [Risk: Low]
system.drift.detected       # [SSOT] Deteksi inkonsistensi antara docs dan kode [Risk: High]
```

### 4.6 Multimodal Interaction Domain (NEW)
*Intent khusus untuk menangani input non-tekstual.*

```txt
multimodal.voice.process    # Memproses stream audio/voice command
multimodal.visual.analyze   # Menganalisis screenshot/UI interaction visual
multimodal.gesture.detect   # Mendeteksi pola interaksi UI (long press, swipe)
```

---

## 5. Intent Meta Model & A2A Integration

### 5.1 TypeScript Contract

```ts
export interface SBAIntent {
  id: string                     // marketing.lead.capture
  domain: DomainType
  category: string
  action: string
  description: string
  riskLevel: 'low' | 'medium' | 'high'
  requiresConfirmation?: boolean
  allowedChannels: Channel[]     // ['web', 'mobile', 'api']
  modalities: ('text' | 'voice' | 'visual')[]
}
```

### 5.2 Mapping ke A2A Task States

Setiap intent yang diproses oleh Control Plane akan diubah menjadi **A2A Task** dengan lifecycle status berikut:

| Intent Phase | A2A Task State | Deskripsi |
| :--- | :--- | :--- |
| **Emission** | `submitted` | Intent ditangkap oleh AFD dan dikirim ke Control Plane. |
| **Routing** | `working` | Control Plane menunjuk ExecutorAgent (A2A Server). |
| **Clarification** | `input-required` | Agent butuh data tambahan (Trigger `system.intent.clarify`). |
| **Fulfillment** | `completed` | Task selesai, hasil dikirim balik ke user/AFD. |
| **Failure** | `failed` | Terjadi error, diproses oleh Shared Error Handling. |

---

## 6. Mapping ke Agentic Front Door (AFD)

AFD berfungsi sebagai **Intent Emitter** dan **A2A Client**.

### 6.1 Emission Contract (Multimodal)

AFD mengirimkan sinyal intent dengan metadata modalitas:

```ts
// AFD code snippet
emitIntent({
  intent: 'marketing.lead.capture',
  confidence: 0.95,
  modalities: ['text', 'voice'],
  source: 'landing_page_hero',
  context: {
    visitor_segment: 'enterprise',
    campaign_id: 'q1_promo',
    voice_token: 'audio_blob_id_001'
  }
})
```

### 6.2 Feedback Loop (Adaptive UI via A2A Artifacts)

Hasil dari task (`completed`) dapat dikirim dalam bentuk **A2A Artifacts** (misal: JSON layout baru) yang memicu intent `system.ui.adapt`:

```json
{
  "response_intent": "system.ui.adapt",
  "artifact": {
    "type": "ui_component",
    "payload": {
      "component": "HeroSection",
      "variant": "enterprise_focus",
      "message": "Solusi skala besar untuk kebutuhan Anda."
    }
  }
}
```

---

## 7. Capability Advertisement (Agent Cards)

Setiap agent dalam ekosistem SBA wajib menyediakan **Agent Card** yang mencantumkan intent yang didukungnya:

```json
{
  "agent_id": "@SOLOCoder",
  "capabilities": [
    "marketing.lead.capture",
    "marketing.lead.enrich",
    "multimodal.voice.process"
  ],
  "supported_modalities": ["text", "voice"],
  "endpoint": "https://api.sba.ai/v1/execute"
}
```

---

## 8. Observability & Audit

Setiap intent yang dipancarkan AFD akan dicatat dalam **Federated Context Graph**:

*   `IntentEmitted`: Saat user klik/interaksi.
*   `IntentRouted`: Saat Control Plane memilih agent.
*   `IntentFulfilled`: Saat agent selesai bekerja.

---

## 9. Referensi & Dokumen Terkait

*   [Glossary of Terms - SBA](file:///home/inbox/smart-ai/sba-agentic/docs/Strategy%20%26%20Capability%20Framework/concepts/Glossary%20of%20Terms%20-%20SBA.md)
*   [Agentic Front Door (AFD)](file:///home/inbox/smart-ai/sba-agentic/docs/00-index/Agentic%20Front%20Door%20(AFD).md)
*   [Docs sebagai Single Source of Truth - AFD](file:///home/inbox/smart-ai/sba-agentic/docs/Strategy%20%26%20Capability%20Framework/concepts/Docs%20sebagai%20Single%20Source%20of%20Truth%20-%20AFD.md)
*   [SBA Feature Design](file:///home/inbox/smart-ai/sba-agentic/docs/Strategy%20%26%20Capability%20Framework/concepts/SBA%20Feature%20Design.md)

---

## 10. Changelog

| Versi | Tanggal | Deskripsi Perubahan | Author |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 2025-12-28 | Inisialisasi taxonomy. | @SBASuperAgent |
| 1.1.0 | 2025-12-30 | Penambahan domain Marketing & System. | @SBASuperAgent |
| 1.2.0 | 2025-12-31 | Integrasi A2A Task States, Multimodal Domain, dan Agent Cards. | @SBASuperAgent |

---
*Dokumen ini valid dan siap digunakan sebagai landasan interoperabilitas agen.*
