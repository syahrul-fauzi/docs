**Finalize Intent Taxonomy (Global SBA)** yang **definitif, production-grade, dan siap dijadikan source of truth** untuk seluruh sistem **SBA-Agentic**.

Dokumen ini **bukan sekadar list intent**, tetapi:

* fondasi **Agentic Front Door**
* kontrak **AFD → Control Plane**
* basis **Capability Registry, Policy, Monetization, Observability**

---

# Finalize Intent Taxonomy — Global SBA

**Smart Business Assistant (SBA-Agentic)**

---

## 1. Tujuan Intent Taxonomy Global

Intent Taxonomy Global bertujuan untuk:

1. Menstandarkan **bahasa tujuan bisnis** lintas channel (web, app, API, WA, dsb)
2. Memisahkan **apa yang user mau** dari **bagaimana agent bekerja**
3. Menjadi:

   * input utama Control Plane
   * dasar routing capability
   * dasar pricing & policy
4. Menghindari:

   * UI-driven logic
   * agent-coupling
   * ad-hoc orchestration

---

## 2. Prinsip Desain (WAJIB)

1. **Business-semantic**, bukan teknis
2. **Channel-agnostic**
3. **Composable & hierarchical**
4. **Stable naming (backward compatible)**
5. **Extensible lintas industri**

---

## 3. Struktur Hirarki Intent

Intent SBA menggunakan **3 level hirarki**:

```txt
<domain>.<category>.<action>
```

Contoh:

```
marketing.lead.capture
finance.invoice.generate
ops.workflow.optimize
```

---

## 4. Level Klasifikasi Intent

### 4.1 Level 1 — Domain (WHY)

Mewakili **area bisnis utama**.

| Domain     | Deskripsi                 |
| ---------- | ------------------------- |
| marketing  | Akuisisi & growth         |
| sales      | Pipeline & closing        |
| finance    | Keuangan & billing        |
| ops        | Operasional               |
| hr         | SDM                       |
| compliance | Regulasi & audit          |
| analytics  | Insight & reporting       |
| system     | Reasoning & orchestration |

---

### 4.2 Level 2 — Category (WHAT)

Kelompok aktivitas bisnis.

Contoh:

* marketing → lead, campaign, content
* finance → invoice, payment, report

---

### 4.3 Level 3 — Action (DO)

Aksi spesifik yang diinginkan user.

Contoh:

* capture
* generate
* analyze
* optimize

---

## 5. Global Intent Taxonomy (FINAL)

### 5.1 Marketing Domain

```txt
marketing.lead.capture
marketing.lead.qualify
marketing.lead.enrich
marketing.campaign.create
marketing.campaign.launch
marketing.campaign.optimize
marketing.content.generate
marketing.content.personalize
```

---

### 5.2 Sales Domain

```txt
sales.pipeline.create
sales.pipeline.update
sales.deal.score
sales.deal.close
sales.customer.onboard
```

---

### 5.3 Finance Domain

```txt
finance.invoice.generate
finance.invoice.send
finance.payment.collect
finance.payment.reconcile
finance.report.generate
```

---

### 5.4 Operations Domain

```txt
ops.workflow.create
ops.workflow.optimize
ops.task.assign
ops.task.monitor
ops.resource.allocate
```

---

### 5.5 HR Domain

```txt
hr.employee.onboard
hr.employee.evaluate
hr.payroll.calculate
```

---

### 5.6 Compliance Domain

```txt
compliance.audit.prepare
compliance.document.verify
compliance.policy.check
compliance.risk.assess
```

---

### 5.7 Analytics Domain

```txt
analytics.report.generate
analytics.report.explain
analytics.metric.monitor
analytics.anomaly.detect
```

---

### 5.8 System / Intelligence Domain (KRITIS)

Intent **non-UI**, **non-business-surface**, khusus agent.

```txt
system.decision.reason
system.context.enrich
system.intent.clarify
system.notification.dispatch
system.agent.orchestrate
system.memory.update
```

⚠️ **Tidak boleh langsung di-trigger UI tanpa policy**

---

## 6. Intent Meta Model (TypeScript)

```ts
export interface SBAIntent {
  id: string                     // marketing.lead.capture
  domain: DomainType
  category: string
  action: string

  description: string

  riskLevel: 'low' | 'medium' | 'high'

  requiresConfirmation?: boolean

  monetizable?: boolean

  allowedChannels: Channel[]

  defaultCapabilities?: CapabilityRef[]
}
```

---

## 7. Intent Confidence & Ambiguity Handling

Setiap intent **WAJIB** memiliki confidence score.

```ts
IntentDetectionResult {
  intent: SBAIntent
  confidence: number
  alternatives?: SBAIntent[]
}
```

Jika:

* confidence < threshold → `system.intent.clarify`
* ambiguous → multi-intent resolution

---

## 8. Mapping ke AFD (Agentic Front Door)

AFD **tidak tahu agent**, hanya emit intent:

```ts
emitIntent({
  intent: 'marketing.lead.capture',
  confidence: 0.82,
  source: 'pricing_page',
  context
})
```

---

## 9. Hubungan Intent ↔ Capability ↔ Agent

```txt
Intent (WHY)
   ↓
Capability (WHAT CAN BE DONE)
   ↓
Agent (WHO EXECUTES)
```

Intent **tidak berubah** walau:

* agent diganti
* model diganti
* workflow berubah

---

## 10. Observability & Audit (WAJIB)

Setiap intent menghasilkan event:

```ts
IntentEmitted
IntentResolved
IntentRejected
IntentCompleted
```

Dipakai untuk:

* audit
* SLA
* analytics
* replay

---

## 11. Anti-Pattern yang DILARANG

❌ intent berbasis UI (`click_pricing_cta`)
❌ intent terlalu teknis (`call_llm`)
❌ agent-specific intent
❌ hardcoded domain logic

---

## 12. Dampak Strategis ke SBA-Agentic

Dengan taxonomy ini:

* Semua app → **berbicara bahasa yang sama**
* Control Plane jadi **benar-benar intelligent**
* Monetization bisa berbasis:

  * intent
  * risk
  * volume
* SBA siap:

  * vertical SaaS
  * enterprise governance
  * cross-agent orchestration

---

## 13. Checklist Finalisasi (CONFIRM)

* [x] Domain lengkap
* [x] Stable naming
* [x] System intent dipisah
* [x] Channel-agnostic
* [x] Policy-ready
* [x] Observability-ready

---

## 14. Langkah Berikutnya (Natural Flow)

Setelah Intent Taxonomy FINAL, **urutan paling sehat**:

1. ✅ Intent Taxonomy (ini)
2. **Capability Coverage Map** 'docs/00-index/Strategy & Capability Framework/Capability Coverage Map.md'(intent mana → capability apa)
3. **Policy Enforcement Spec**
4. **Internal Console: Intent Explorer UI**
5. **Pricing by Intent Tier**

Jika Anda setuju, langkah berikut **paling tepat** adalah:

👉 **Capability Coverage Map (Global SBA)**'docs/00-index/Strategy & Capability Framework/Capability Coverage Map.md'
