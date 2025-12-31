**Intent Registry YAML (Global SBA)** sebagai **fondasi semantik global** untuk seluruh sistem **SBA-Agentic**, dengan standar **production-grade**, **policy-aware**, dan **deterministic routing–ready**.

Dokumen ini **lebih fundamental dari capability**.
Kalau Capability = *“apa yang bisa dieksekusi”*,
maka **Intent = “apa maksud user / sistem”**.

---

# Intent Registry YAML

**Global Semantic Source of Truth — SBA**

---

## 1. Tujuan Intent Registry

Intent Registry menjawab pertanyaan inti sistem agentik:

> ❓ *Apa maksud dari sebuah interaksi, dan bagaimana sistem harus mengklasifikasikannya secara konsisten?*

Digunakan oleh:

| Komponen           | Peran              |
| ------------------ | ------------------ |
| Agentic Front Door | classify intent    |
| Control Plane      | routing decision   |
| Agent Runtime      | context awareness  |
| Docs               | intent ↔ knowledge |
| Analytics          | funnel & behavior  |
| Policy Engine      | risk & consent     |

---

## 2. Prinsip Desain (Production-Grade)

1.  **Global & Stable**: Intent ID tidak boleh berubah setelah dirilis ke produksi.
2.  **Hierarchical**: Menggunakan notasi dot (`domain.category.action`) untuk pengelompokan logis.
3.  **Domain-aware**: Tersegmentasi berdasarkan unit bisnis (Marketing, Finance, Ops).
4.  **Non-overlapping**: Satu ekspresi user harus memetakan ke satu intent utama (Primary Intent).
5.  **Extensible**: Mendukung penambahan intent baru tanpa merusak skema yang ada.
6.  **Deterministic Routing**: Mendukung pemetaan langsung ke capability berdasarkan bobot dan kebijakan.
7.  **LLM-optimized**: Dilengkapi dengan contoh positif/negatif untuk zero-shot/few-shot classification.

---

## 3. Struktur Global Registry

```yaml
registryVersion: "2.1.0"
generatedAt: "2025-12-30T00:00:00Z"
globalNamespace: "sba.global"

intents:
  - id: marketing.lead.capture
  - id: docs.search.how_to
  - id: ops.system.health_check
  - id: finance.invoice.status
  - id: support.ticket.create
```

---

## 4. Spesifikasi Teknis Intent (Schema v2.4 - Production-Ready)

Setiap intent harus didefinisikan dengan atribut berikut untuk mendukung **Agentic Mesh Architecture**, **Policy-Based Routing**, dan **Security-First Execution**:

```yaml
id: <domain>.<category>.<action> # Primary Key (Stable)
name: <Human readable name>
domain: <marketing | docs | ops | finance | support | core | sales | hr | compliance | system | intelligence>
version: <semver>
status: active | deprecated | experimental | sunset

description: >
  Deskripsi mendalam tentang maksud pengguna atau sistem. Digunakan oleh LLM untuk pemahaman semantik, disambiguasi, dan perancangan task DAG.

classification:
  type: user | system | agent | autonomous
  priority: low | medium | high | critical
  confidenceThreshold: 0.0 - 1.0 # Minimum score untuk routing otomatis via LLM
  isTransactional: true | false # Apakah melibatkan mutasi data/keuangan?
  isIdempotent: true | false # Apakah aman untuk dijalankan ulang?
  complexityScore: 1 - 10 # Estimasi beban komputasi/reasoning

signals:
  sources: [web, api, agent, voice, iot, event_bus]
  triggers: [text_input, cta_click, event_bridge, webhook, scheduled_job]
  keyphrases: ["how to", "setup", "error", "invoice"] # Keyword hints untuk Fast-Path
  regexPatterns: ["^INV-\\d{4}-\\d{3}$"] # Pola spesifik untuk ekstraksi ID otomatis

semanticMetadata:
  embeddingModel: "text-embedding-3-small"
  vectorNamespace: "intents_v4"
  tags: ["conversion", "self-service", "critical-path", "agentic-mesh"]
  contextHints: ["session_id", "tenant_id", "user_role", "origin_country"]
  canonicalDefinitions:
    active_user: "User yang melakukan login dalam 30 hari terakhir"
  knowledgeGraphNodes: ["Invoice", "Payment", "Customer"] # Hubungan ke ontology bisnis

routingHints:
  preferredCapabilities:
    - ref: <capability_id>
      weight: 1.0
      region: "auto" # Routing berbasis lokasi data/user
  fallbackCapabilities:
    - ref: <capability_id>
  maxRedirects: 3
  loadBalancingPolicy: "round-robin" | "least-latency"
  parameterMapping:
    - from: "query_string"
      to: "search_term"
      required: true
      validation: "string_not_empty"
    - from: "user_id"
      to: "account_owner"
      secretHint: "SECURE_USER_ID" # Referensi ke vault
      masking: "partial" # Masking PII di logs

orchestrationHints: # NEW in v2.4 for Agentic Mesh
  canBeDelegated: true | false
  delegationScope: "internal" | "external" | "global"
  preferredAgents: ["PlannerAgent", "FinanceSpecialist"]
  maxDelegationDepth: 2
  reasoningEffort: "simple" | "chain-of-thought" | "reflexion"

securityPolicy: # NEW in v2.4 - Security Schemas
  riskLevel: low | medium | high | critical
  authScope: ["tenant.read", "finance.write"] # OAuth2/OIDC Scopes
  requiredAuth: ["tenant_member", "finance_admin"]
  encryptionRequired: true | false # Transit & At-Rest
  dataSovereignty: "EU" | "US" | "ID" | "Global"
  piiSensitivity: none | low | high | restricted
  pdpPolicyId: "policy-finance-v1" # Link ke Open Policy Agent (OPA)

performanceSLA: # NEW in v2.4
  p99Latency: 500ms
  availability: 99.9%
  retryPolicy: "exponential-backoff"
  maxRetries: 3

examples:
  positive:
    - text: "Cek status invoice INV-2023-001"
      entities: { "invoice_id": "INV-2023-001" }
    - text: "Apakah tagihan saya sudah lunas?"
  negative:
    - text: "Buat invoice baru" # Ambiguous with finance.invoice.create
    - text: "Hubungi tim support"

validationRules:
  - rule: "required_parameter_check"
    params: ["invoice_id"]
    errorMessage: "ID Invoice wajib disertakan untuk intent ini."
  - rule: "data_format_validation"
    field: "invoice_id"
    pattern: "^INV-\\d{4}-\\d{3}$"
```

---

## 5. Global Intent Taxonomy (Standardized v2.4)

Kami membagi intent ke dalam domain-domain utama untuk skalabilitas enterprise, mencakup domain **Intelligence** dan **Autonomous Operations**:

### 5.1 Marketing Domain (`marketing.*`)
- `marketing.lead.capture`: Mengumpulkan informasi prospek dari formulir atau chat.
- `marketing.lead.qualify`: Melakukan kualifikasi otomatis pada prospek.
- `marketing.lead.enrich`: Memperkaya data prospek dari sumber eksternal.
- `marketing.campaign.create`: Membuat draf kampanye pemasaran baru.
- `marketing.campaign.info`: Menanyakan detail tentang kampanye pemasaran yang sedang berjalan.
- `marketing.analytics.conversion`: Meminta laporan konversi untuk periode tertentu.

### 5.2 Sales Domain (`sales.*`)
- `sales.pipeline.create`: Membuat pipeline penjualan baru.
- `sales.deal.score`: Memberikan skor probabilitas pada kesepakatan (deal).
- `sales.deal.close`: Memproses penutupan transaksi (High Risk).
- `sales.customer.onboard`: Inisialisasi proses onboarding pelanggan baru.

### 5.3 Finance Domain (`finance.*`)
- `finance.invoice.status`: Mengecek status pembayaran invoice.
- `finance.invoice.generate`: Membuat invoice baru untuk pelanggan.
- `finance.payment.process`: Inisialisasi proses pembayaran (High Risk).
- `finance.budget.lookup`: Melihat sisa anggaran untuk departemen/proyek.

### 5.4 Operations Domain (`ops.*`)
- `ops.system.health_check`: Memeriksa status kesehatan sistem atau layanan.
- `ops.workflow.optimize`: Menganalisis dan mengusulkan optimasi alur kerja.
- `ops.audit.log_query`: Mencari jejak audit untuk aktivitas tertentu.
- `ops.incident.report`: Melaporkan gangguan atau kegagalan sistem.

### 5.5 Support Domain (`support.*`)
- `support.ticket.create`: Membuat tiket dukungan baru.
- `support.faq.search`: Mencari solusi dari basis pengetahuan mandiri.
- `support.agent.handoff`: Meminta bantuan manusia (Live Agent).

### 5.6 Documentation Domain (`docs.*`)
- `docs.search.how_to`: Mencari panduan penggunaan atau tutorial.
- `docs.search.sop`: Mencari Standar Operasional Prosedur (SOP) internal.

### 5.7 HR & People Domain (`hr.*`)
- `hr.employee.onboard`: Mengelola proses masuk karyawan baru.
- `hr.payroll.lookup`: Melihat rincian gaji atau slip gaji (High Privacy).
- `hr.policy.query`: Menanyakan tentang kebijakan perusahaan atau peraturan SDM.

### 5.8 Compliance & Legal Domain (`compliance.*`)
- `compliance.audit.prepare`: Menyiapkan dokumen untuk keperluan audit.
- `compliance.risk.assess`: Melakukan penilaian risiko terhadap entitas atau proses.
- `compliance.document.verify`: Memverifikasi keaslian atau kepatuhan dokumen.

### 5.9 System & Intelligence Domain (`system.*`)
- `system.intent.clarify`: Meminta klarifikasi ketika intent tidak jelas (Fallback).
- `system.decision.reason`: Memberikan penjelasan di balik keputusan agen (XAI).
- `system.memory.update`: Memperbarui memori jangka panjang atau preferensi user.
- `system.agent.orchestrate`: Mengkoordinasikan tugas antar sub-agen spesialis.

---

## 6. Arsitektur Deterministic Routing (3-Stage Logic)

SBA Control Plane menggunakan Intent Registry untuk menjamin keandalan routing hingga 99%+:

### Stage 1: Fast-Path (Exact Matching)
- **Mekanisme**: Pencocokan string literal atau regex terhadap `signals.keyphrases`.
- **Kelebihan**: Latensi rendah (<50ms), biaya nol (tanpa LLM).
- **Hasil**: Jika cocok, langsung tetapkan `intent_id`.

### Stage 2: Standard-Path (Semantic & Vector Search)
- **Mekanisme**: Menghitung *cosine similarity* antara input user dengan `examples.positive` menggunakan model embedding (`semanticMetadata.embeddingModel`).
- **Kelebihan**: Menangani variasi bahasa alami dan typo.
- **Hasil**: Jika `score > confidenceThreshold`, tetapkan `intent_id`.

### Stage 3: Policy & Context Validation (Guardrails)
- **Mekanisme**: Memvalidasi `intent_id` terhadap `policyHints` dan konteks tenant.
- **Validasi**:
    - **Auth Check**: Apakah user memiliki `requiredAuth`?
    - **Risk Check**: Jika `riskLevel: high`, apakah ada konfirmasi HITL?
    - **Context Check**: Apakah `contextHints` yang diperlukan tersedia?
- **Hasil**: Rencana eksekusi (Execution Plan) disetujui atau ditolak.

---

## 7. Lifecycle & Governance (Enterprise Standard)

Untuk menjaga stabilitas sistem, setiap perubahan pada Intent Registry harus mengikuti protokol berikut:

### 7.1 Versioning Policy
- **Major Change**: Perubahan pada `id` intent atau penghapusan intent yang sedang digunakan.
- **Minor Change**: Penambahan intent baru atau perubahan pada `routingHints`.
- **Patch Change**: Penambahan `examples` atau perbaikan typos pada `description`.

### 7.2 Deprecation Flow
1. Tandai intent dengan `status: deprecated`.
2. Tambahkan `migrationHint: "Gunakan intent <new_id> sebagai gantinya"`.
3. Intent akan tetap aktif selama 2 siklus rilis major sebelum dihapus secara permanen.

### 7.3 Quality Gates
Setiap intent baru wajib lulus uji:
- **Ambiguity Test**: Tidak boleh memiliki >20% kemiripan semantik dengan intent lain.
- **Example Coverage**: Minimal memiliki 5 contoh positif dan 3 contoh negatif (hard negatives).
- **Policy Compliance**: Wajib memiliki `riskLevel` dan `requiredAuth` yang valid.

---

## 8. Lampiran: Laporan Riset Pendukung (2025-12-30)

Pengembangan registry ini didasarkan pada analisis mendalam terhadap beberapa framework industri:

1.  **YAML for AI Agents (Best Practices)**:
    - Penggunaan YAML sebagai "Source of Truth" yang human-readable namun machine-parseable sangat ideal untuk konfigurasi agentik (Source: [Empathy First Media](https://empathyfirstmedia.com/yaml-files-ai-agents/)).
    - Pentingnya pemisahan antara definisi tugas (YAML) dan implementasi logika (Code).

2.  **Deterministic Routing Architecture**:
    - **IntentusNet**: Menekankan pentingnya runtime eksekusi yang deterministik untuk routing intent dengan fallback eksplisit (Source: [IntentusNet GitHub](https://github.com/Balchandar/intentusnet)).
    - **Microsoft Agent Orchestration Patterns**: Mengadvokasi penggunaan routing berbasis aturan yang deterministik untuk proses multi-tahap yang dapat diprediksi (Source: [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)).

3.  **Semantic Layers in Enterprise AI**:
    - Semantic layer berfungsi sebagai "jembatan" yang menerjemahkan bahasa bisnis menjadi instruksi teknis yang konsisten (Source: [Cloudata Insights](https://www.clouddatainsights.com/the-semantic-layer-the-hidden-accelerator-for-ai-ready-data-architectures/)).
    - Penggunaan taksonomi dan arsitektur informasi sangat krusial untuk skalabilitas AI di level perusahaan.

---
*Dokumen ini adalah aset hidup dan dikelola oleh SBA Architect Team.*

Setelah **Intent Registry**, fondasi lengkap bila dilanjutkan ke:

👉 **AFD → Capability Mapping Matrix**
(karena sekarang kita sudah punya: *Intent* + *Capability*)

Jika Anda setuju, saya akan buatkan **matrix formal (YAML + tabel konseptual)** sebagai pengunci sistem routing SBA.
