---
title: SBA-Agentic Documentation Index
created_at: 2025-12-30
author: Super Agent
status: active
---

# SBA-Agentic Documentation Index

Indeks utama untuk seluruh dokumentasi strategis dan teknis **SBA-Agentic**.

## 📁 Struktur Dokumentasi

### 1. Strategy & Capability Framework

Dokumen yang mendefinisikan arsitektur inti dan kapabilitas agen.

- [Agent Runtime Interface Spec](./Strategy%20%26%20Capability%20Framework/specs/Agent%20Runtime%20Interface%20Spec.md): Kontrak keras antara Control Plane dan Agent Runtime.
- [SBA Feature Design](./Strategy%20%26%20Capability%20Framework/concepts/SBA%20Feature%20Design.md): Rancangan fitur khusus SBA dan Capability Framework.

### 2. Panduan Utama

- [README](./README.md): Gambaran umum sistem dan temuan riset arsitektur.
- [Progress Tracker](./PROGRESS.md): Status pengembangan dan roadmap.
- [SBA Agents User Guide](./SBA-Agents-User-Guide.md): Panduan pengguna untuk Built-In Agents.
- [SBA Agents Developer Guide](./SBA-Agents-Developer-Guide.md): Panduan teknis pengembangan dan ekstensi agen.

### 3. Indeks Modular (00–11)

- [00-index](./00-index/README.md): Entry point, panduan agen, dan onboarding.
- [01-product](./01-product/README.md): Visi produk, use case, dan matriks requirement.
- [02-architecture](./02-architecture/README.md): Arsitektur sistem, integrasi, dan scaling.
- [03-agentic](./03-agentic/README.md): Reasoning engine, routing, dan koordinasi multi-agen.
- [04-rules](./04-rules/README.md): Aturan, governance, dan kebijakan proyek.
- [05-api](./05-api/README.md): Referensi API dan gateway policies.
- [06-development](./06-development/README.md): Panduan development & workflow.
- [07-testing-quality](./07-testing-quality/README.md): Strategi testing, quality gates, dan traceability.
- [08-operations](./08-operations/README.md): Observability, alerting, dan runbook produksi.
- [09-security-compliance](./09-security-compliance/README.md): Auth/RBAC, compliance, dan security endpoints.
- [10-release-go-live](./10-release-go-live/README.md): Checklist rilis, deployment, dan rollback.

## 🛠️ Arsitektur Overview

SBA-Agentic memisahkan logika strategis (**Control Plane**) dari eksekusi teknis (**Agent Runtime**) untuk memastikan skalabilitas, keamanan, dan tata kelola yang ketat.

### Alur Eksekusi

1. **Control Plane** menerima intent dan membuat `ExecutionPlan`.
2. **Agent Runtime** memverifikasi plan dan mengeksekusi nodes.
3. **Tools Gateway** menyediakan akses ke API eksternal dengan isolasi tenant.

---
Terakhir diperbarui: 2025-12-30.
