## I. Diagnosis Singkat Kondisi Saat Ini (PENTING)

### Masalah Utama

1. **Dokumentasi terlalu datar & bercampur**

   * PRD, ADR, Runbook, Ops, Agent spec, QA → satu level
2. **Duplikasi konsep**

   * Banyak `TECHNICAL_*`, `ARCHITECTURE*`, `SPEC*`
3. **Audience tidak jelas**

   * Developer, AI agent, Product, Ops membaca folder yang sama
4. **Tidak agent-navigable**

   * Agent sulit tahu: *“mana sumber kebenaran?”*
5. **Sulit dijadikan public / versioned docs**

➡️ Solusi: **Re-Organize berbasis ROLE + PURPOSE**, bukan berdasarkan “jenis file”.

---

## II. STRUKTUR TARGET (FINAL) — Docs SBA-Agentic

Ini **struktur yang saya rekomendasikan sebagai TARGET**, bukan tambahan.

```
docs/
├── 00-index/                 # Entry point (human & agent)
├── 01-product/               # Product & Business
├── 02-architecture/          # System & Agent Architecture
├── 03-agentic/               # Agent design & behavior
├── 04-rules/                 # .trae / rule system
├── 05-api/                   # API & integration
├── 06-development/           # Developer guide
├── 07-testing-quality/       # QA, validation, metrics
├── 08-operations/            # Ops, runbook, monitoring
├── 09-security-compliance/   # Security, audit, RBAC
├── 10-release-go-live/       # Release, go/no-go
├── 11-post-launch/           # Metrics, improvement, report
├── adr/                      # Architecture Decision Records
├── schemas/                  # JSON/OpenAPI schemas
└── archive/                  # Deprecated / historical
```

---

## III. MAPPING DARI KONDISI SAAT INI → STRUKTUR BARU

### 1️⃣ ENTRY POINT (WAJIB)

```
docs/00-index/
├── README.md                 # “Start here”
├── SBA-Agentic_Overview.md
├── Audience-Map.md
```

**Isi dari:**

* `INDEX.md`
* `README.md`
* `SBA-Agentic_Master_Specification.md`
* `SBA-Agentic-Comprehensive-Spec.md`

---

### 2️⃣ PRODUCT & BUSINESS

```
docs/01-product/
├── vision-scope.md
├── prd/
├── use-cases/
├── roadmap.md
```

**Pindahkan dari:**

* `business/**`
* `product/prd/**`
* `use-cases/**`
* `SBA-Feature-Matrix.md`
* `GTM_*`

---

### 3️⃣ ARCHITECTURE (SYSTEM LEVEL)

```
docs/02-architecture/
├── system-overview.md
├── clean-architecture.md
├── diagrams/
├── dependencies.md
```

**Pindahkan dari:**

* `ARCHITECTURE.md`
* `architecture/**`
* `technical-architecture.md`
* `TECHNICAL_ARCHITECTURE.md`

➡️ **ADR tetap terpisah** (best practice).

---

### 4️⃣ AGENTIC CORE (KRITIKAL)

```
docs/03-agentic/
├── agent-model.md
├── agent-roles/
├── decision-making.md
├── failure-handling.md
├── continuous-learning.md
```

**Pindahkan dari:**

* `agents/**`
* `agentic/**`
* `AGENTIC-OPERATIONS.md`
* `reasoning-policy.md`
* `failure-modes.md`

➡️ Ini **harus jadi bahan utama AI agent membaca dirinya sendiri**

---

### 5️⃣ RULE SYSTEM (.trae)

```
docs/04-rules/
├── rules-overview.md
├── rule-lifecycle.md
├── rule-specification.md
├── examples.md
```

**Pindahkan dari:**

* `rube/**`
* `.trae` related specs
* `meta-events-system.md`
* `tool-manifest.md`

---

### 6️⃣ API & INTEGRATION

```
docs/05-api/
├── overview.md
├── openapi.md
├── adapters.md
```

**Pindahkan dari:**

* `api/**`
* `API_DOCUMENTATION.md`
* `notifications-*`
* `interface_controls/**`

---

### 7️⃣ DEVELOPMENT (DEV EXPERIENCE)

```
docs/06-development/
├── setup.md
├── coding-standards.md
├── contribution.md
├── monorepo.md
```

**Pindahkan dari:**

* `development/**`
* `code/**`
* `engineering/**`

---

### 8️⃣ TESTING & QUALITY

```
docs/07-testing-quality/
├── strategy.md
├── metrics.md
├── reports.md
```

**Pindahkan dari:**

* `testing/**`
* `QA_*`
* `TEST_*`
* `e2e-*`

---

### 9️⃣ OPERATIONS

```
docs/08-operations/
├── runbook.md
├── monitoring.md
├── incident-response.md
```

**Pindahkan dari:**

* `operations/**`
* `operational/**`
* `ops/**`
* `MONITORING_*`

---

### 🔐 SECURITY & COMPLIANCE

```
docs/09-security-compliance/
├── security-model.md
├── rbac.md
├── audit.md
```

**Pindahkan dari:**

* `security/**`
* `AUTH_RBAC_*`
* `CSP-*`

---

### 🚀 RELEASE & GO LIVE

```
docs/10-release-go-live/
├── release-process.md
├── go-live-checklist.md
├── rollback.md
```

**Pindahkan dari:**

* `deployment/**`
* `RELEASE_*`
* `GO_LIVE_*`
* `ROLLBACK.md`

---

### 📈 POST-LAUNCH

```
docs/11-post-launch/
├── metrics.md
├── improvements.md
├── reports.md
```

**Pindahkan dari:**

* `final_report/**`
* `PROJECT_COMPLETION_REPORT.md`
* `SBA-Agentic_PostLaunch_*`

---

## IV. ROLES PROJECT DOCS (INI PENTING)

| Role              | Baca           | Tulis              |
| ----------------- | -------------- | ------------------ |
| **AI Agent**      | 00, 02, 03, 04 | agentic/, rules/   |
| **Backend Dev**   | 02, 04, 05, 06 | api/, development/ |
| **Product Owner** | 00, 01, 10     | product/, roadmap  |
| **QA**            | 07, 10         | testing-quality    |
| **Ops / SRE**     | 08, 09, 10     | operations         |
| **Security**      | 09             | security           |
| **Stakeholder**   | 00, 01, 11     | —                  |

➡️ **Setiap folder punya audience jelas**
➡️ Agent tidak “tersesat”

---

## V. STRATEGI REFACTOR (AMAN & BERTAHAP)

### Phase 1 — Non-Destructive

* Buat folder baru
* Copy file (bukan move)
* Tambahkan `README.md` per folder

### Phase 2 — Canonicalization

* Tentukan **1 dokumen = 1 sumber kebenaran**
* Sisanya → `archive/`

### Phase 3 — Docusaurus Ready

* Convert folder `docs/0x-*` → `apps/docs/docs/`
* Enable versioning

---

## VI. REKOMENDASI LANGKAH SELANJUTNYA (PILIH SATU)

1️⃣ Saya buatkan **folder skeleton + README per folder**
2️⃣ Saya buatkan **Audience Map + Doc Ownership Matrix**
3️⃣ Saya buatkan **migration plan (script + checklist)**
4️⃣ Saya mapping **docs → Docusaurus sidebar**

👉 Tinggal bilang: **1 / 2 / 3 / 4**
