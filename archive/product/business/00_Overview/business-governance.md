# 🏛 Business Governance & Compliance

**Lokasi:** `docs/Business/00_Overview/business-governance.md`

## 1. Tujuan

Menetapkan tata kelola dan kebijakan dalam pengembangan domain bisnis SBA-Agentic.

## 2. Prinsip Tata Kelola

- **Traceability** → Semua keputusan bisnis harus tertaut ke PRD.
- **Transparency** → Akses terbuka untuk audit log domain.
- **Consistency** → Standar lintas modul menggunakan shared-core.
- **Compliance** → Patuh pada kebijakan data & keamanan (GDPR, SOC2).

## 3. Struktur Pengelolaan

| Role                 | Tanggung Jawab                              |
| -------------------- | ------------------------------------------- |
| **Business Owner**   | Menetapkan strategi dan arah domain         |
| **Domain Architect** | Mendesain model bisnis dan agregasi data    |
| **AI Agent Builder** | Mengotomatisasi skenario bisnis             |
| **QA Lead**          | Menguji akurasi & konsistensi logika bisnis |

## 4. Change Management

Setiap perubahan bisnis harus melalui:

1. **Proposal** → via `Change-Request-template.md`
2. **Review** → oleh tim Architecture & Business
3. **Approval** → melalui ADR & Commit tag `business:approved`
4. **Implementation** → update `@sba/business-*`
5. **Validation** → end-to-end testing via Agent Flow

## 5. Security & Audit

- Penggunaan tenant header wajib untuk semua event bisnis.
- Tokenization dan redaksi data sensitif melalui `ci_guard_secret_shield`.
- Audit trail otomatis di `meta_events_feedback`.

## 6. Quality Metrics

| Metrik                   | Target  | Tool                    |
| ------------------------ | ------- | ----------------------- |
| Code Coverage            | ≥ 85%   | Jest                    |
| Build Time               | ≤ 90s   | Turborepo               |
| Latency (Domain Command) | ≤ 100ms | Supabase Telemetry      |
| Agent Reliability        | ≥ 99%   | Observability Dashboard |

## 7. Roadmap Governance

- ✅ Implementasi awal CI/CD guard
- 🔜 Automasi feedback meta-events
- 🔜 Integrasi domain governance AI
