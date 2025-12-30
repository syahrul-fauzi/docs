Berikut adalah **Capability Coverage Map (Global SBA)** yang **lengkap, production-grade, dan selaras langsung** dengan seluruh konteks SBA-Agentic yang sudah kita bangun (AFD → Control Plane → Agent → Observability).

Dokumen ini **bukan sekadar tabel mapping**, tetapi:

* kontrak **Intent → Capability**
* dasar **Agent Capability Registry**
* fondasi **policy, pricing, routing, dan scale**

---

# Capability Coverage Map — Global SBA

**Smart Business Assistant (SBA-Agentic)**

---

## 1. Tujuan Capability Coverage Map

Capability Coverage Map berfungsi untuk:

1. Menjawab pertanyaan:

   > “Jika intent X muncul, sistem **mampu melakukan apa saja**?”
2. Memisahkan dengan tegas:

   * **Intent (WHY)**
   * **Capability (WHAT CAN BE DONE)**
   * **Agent (WHO EXECUTES)**
3. Menjadi:

   * input utama Control Plane routing
   * basis Agent Capability Registry
   * dasar policy & monetisasi

---

## 2. Prinsip Desain Capability

### 2.1 Prinsip WAJIB

1. **Capability ≠ Agent**
2. Capability **atomic & reusable**
3. Capability **composable**
4. Capability **observable**
5. Capability **policy-governed**

---

## 3. Struktur Hirarki Capability

```txt
<domain>.<capability-group>.<capability-action>
```

Contoh:

```
marketing.lead.collect
finance.invoice.generate
system.reasoning.explain
```

---

## 4. Capability Meta Model (Source of Truth)

```ts
export interface SBACapability {
  id: string
  domain: DomainType

  description: string

  inputs: CapabilityInput[]
  outputs: CapabilityOutput[]

  riskLevel: 'low' | 'medium' | 'high'
  costTier: 'free' | 'standard' | 'premium'

  requiresHumanApproval?: boolean

  observability:
    | 'full'
    | 'partial'
    | 'audit-only'
}
```

---

## 5. Global Capability Coverage Map

### 5.1 Marketing Domain

| Intent                        | Required Capabilities                                                  |
| ----------------------------- | ---------------------------------------------------------------------- |
| marketing.lead.capture        | marketing.lead.collect<br>marketing.lead.validate<br>system.event.emit |
| marketing.lead.qualify        | marketing.lead.score<br>analytics.metric.evaluate                      |
| marketing.lead.enrich         | marketing.lead.enrich<br>system.context.enrich                         |
| marketing.campaign.create     | marketing.campaign.compose<br>marketing.content.generate               |
| marketing.campaign.launch     | marketing.campaign.deploy<br>system.notification.dispatch              |
| marketing.campaign.optimize   | analytics.performance.analyze<br>marketing.campaign.optimize           |
| marketing.content.generate    | marketing.content.generate                                             |
| marketing.content.personalize | marketing.content.personalize<br>system.reasoning.explain              |

---

### 5.2 Sales Domain

| Intent                 | Required Capabilities                               |
| ---------------------- | --------------------------------------------------- |
| sales.pipeline.create  | sales.pipeline.create                               |
| sales.pipeline.update  | sales.pipeline.update                               |
| sales.deal.score       | sales.deal.score<br>analytics.metric.evaluate       |
| sales.deal.close       | sales.deal.close<br>finance.invoice.generate        |
| sales.customer.onboard | ops.workflow.create<br>system.notification.dispatch |

---

### 5.3 Finance Domain

| Intent                    | Required Capabilities                                |
| ------------------------- | ---------------------------------------------------- |
| finance.invoice.generate  | finance.invoice.generate                             |
| finance.invoice.send      | finance.invoice.send<br>system.notification.dispatch |
| finance.payment.collect   | finance.payment.collect                              |
| finance.payment.reconcile | finance.payment.reconcile                            |
| finance.report.generate   | finance.report.generate<br>analytics.report.explain  |

---

### 5.4 Operations Domain

| Intent                | Required Capabilities                                  |
| --------------------- | ------------------------------------------------------ |
| ops.workflow.create   | ops.workflow.define                                    |
| ops.workflow.optimize | ops.workflow.optimize<br>analytics.performance.analyze |
| ops.task.assign       | ops.task.assign                                        |
| ops.task.monitor      | ops.task.monitor<br>analytics.anomaly.detect           |
| ops.resource.allocate | ops.resource.allocate                                  |

---

### 5.5 HR Domain

| Intent               | Required Capabilities |
| -------------------- | --------------------- |
| hr.employee.onboard  | hr.employee.onboard   |
| hr.employee.evaluate | hr.employee.evaluate  |
| hr.payroll.calculate | hr.payroll.calculate  |

---

### 5.6 Compliance Domain (High Risk)

| Intent                     | Required Capabilities                                 |
| -------------------------- | ----------------------------------------------------- |
| compliance.audit.prepare   | compliance.audit.compile<br>system.document.aggregate |
| compliance.document.verify | compliance.document.verify                            |
| compliance.policy.check    | compliance.policy.evaluate                            |
| compliance.risk.assess     | compliance.risk.analyze                               |

⚠️ Semua capability compliance:

* `riskLevel = high`
* `observability = full`
* `requiresHumanApproval = true`

---

### 5.7 Analytics Domain

| Intent                    | Required Capabilities     |
| ------------------------- | ------------------------- |
| analytics.report.generate | analytics.report.generate |
| analytics.report.explain  | system.reasoning.explain  |
| analytics.metric.monitor  | analytics.metric.monitor  |
| analytics.anomaly.detect  | analytics.anomaly.detect  |

---

### 5.8 System / Intelligence Domain (CORE)

| Intent                       | Required Capabilities                         |
| ---------------------------- | --------------------------------------------- |
| system.decision.reason       | system.reasoning.explain                      |
| system.context.enrich        | system.context.enrich                         |
| system.intent.clarify        | system.intent.disambiguate                    |
| system.notification.dispatch | system.notification.dispatch                  |
| system.agent.orchestrate     | system.agent.route<br>system.agent.coordinate |
| system.memory.update         | system.memory.write                           |

---

## 6. Capability Composition Rules

Control Plane **tidak mengeksekusi intent langsung**, tapi:

```txt
Intent
 → Resolve Required Capabilities
   → Check Policy
     → Bind Agent(s)
       → Execute Capability Chain
```

Contoh:

```
marketing.lead.capture
 → lead.collect
 → lead.validate
 → event.emit
```

---

## 7. Capability Coverage Gap Detection

Control Plane wajib mendeteksi:

```ts
CapabilityCoverageResult {
  intent: string
  covered: boolean
  missingCapabilities?: string[]
}
```

Jika `covered = false`:

* fallback
* manual intervention
* upsell capability

---

## 8. Monetization Hook (Strategic)

Capability adalah unit monetisasi:

| Cost Tier | Example Capability     |
| --------- | ---------------------- |
| free      | marketing.lead.collect |
| standard  | marketing.lead.score   |
| premium   | marketing.lead.enrich  |

➡️ **Intent sama, capability berbeda = paket berbeda**

---

## 9. Observability Contract

Setiap capability emit:

```txt
CapabilityInvoked
CapabilityCompleted
CapabilityFailed
```

Dikaitkan dengan:

* intent
* tenant
* agent
* SLA

---

## 10. Anti-Pattern (DILARANG)

❌ intent langsung ke agent
❌ agent menyembunyikan capability
❌ UI memanggil capability langsung
❌ capability tidak observable

---

## 11. Dampak ke AFD & Internal Console

### AFD

* hanya emit intent
* tidak tahu capability detail

### Internal Console

* Capability Coverage Dashboard
* Gap Detection UI
* Capability Cost Viewer

---

## 12. Checklist FINAL

* [x] Intent → Capability mapping lengkap
* [x] System capability dipisah
* [x] High-risk capability ditandai
* [x] Monetization-ready
* [x] Policy-ready
* [x] Agent-agnostic

---

## 13. Langkah Berikutnya (Natural & WAJIB)

Urutan sehat berikutnya:

1. ✅ Intent Taxonomy
2. ✅ Capability Coverage Map (ini)
3. **Agent Capability Registry Spec**'docs/00-index/Strategy & Capability Framework/Agent Capability Registry Spec.md'
4. **Policy Enforcement Spec**
5. **Control Plane Routing Algorithm**

👉 **Langkah berikut PALING KRITIS sekarang:**
**Agent Capability Registry Spec**'docs/00-index/Strategy & Capability Framework/Agent Capability Registry Spec.md'
