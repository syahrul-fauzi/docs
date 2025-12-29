---
title: Master Index Dokumentasi SBA-Agentic
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: critical
tags: [index, entry-point, navigation, roadmap]
---

# 🗺️ Master Index Dokumentasi SBA-Agentic

Selamat datang di pusat navigasi dokumentasi **SBA-Agentic**. Gunakan indeks ini untuk menemukan panduan, spesifikasi, dan dokumen operasional berdasarkan fase proyek atau peran Anda.

## 🧭 Panduan Navigasi Cepat
- **[🤖 Untuk Agen AI](./AGENTS.md)** — Instruksi khusus navigasi dan pengambilan konteks untuk AI.
- **[👥 Untuk Tim Manusia](./HUMANS.md)** — Onboarding dan panduan kontribusi bagi developer & stakeholder.
- **[📊 Progress & Readiness](../PROGRESS.md)** — Dashboard status fitur dan dokumentasi real-time.

---

## 📂 Struktur Dokumentasi Modular

### 00. [Index & Entry Point](./README.md)
Titik awal navigasi, panduan agen, dan panduan tim manusia.
- **[Control Plane Utama (apps/app)](./Control%20Plane%20Utama%20—%20Sba-agentic.md)** — Landing page & Kontrak teknis Dashboard Utama.
- **[Internal Console (apps/internal-console)](./Control%20&%20Intelligence%20Console%20—%20Sba-agentic.md)** — Landing page & Kontrak teknis Admin Console.

### 01. [Product & Business](../01-product/README.md)
Visi produk, strategi bisnis, PRD (Product Requirements Document), dan Use Case Specification.
- **[Use Case: Control Plane Utama](../01-product/Use%20Case%20Specifications%20—%20Control%20Plane%20(sba-agentic).md)** — 15 use case operasional kritis.
- **[Use Case: Internal Console](../01-product/Use%20Case%20Specifications%20—%20Internal%20Console%20(sba-agentic).md)** — Spesifikasi use case teknis internal.

### 02. [System & Agent Architecture](../02-architecture/README.md)
Diagram sistem, arsitektur agentic, ADR (Architecture Decision Records), dan integrasi teknis.
- **[Arsitektur: Control Plane Utama](../02-architecture/Arsitektur%20apps-app.md)** — C4 Diagrams & Runtime Blueprint.
- **[Arsitektur: Internal Console](../02-architecture/Arsitektur%20internal-console.md)** — Technical specs for desktop console.

### 03. [Agentic Core](../03-agentic/README.md)
Desain perilaku agen, kebijakan penalaran (reasoning), dan mekanisme pembelajaran berkelanjutan.
- *Audience: Agent Architect, AI Agent.*

### 04. [Rules & Governance](../04-rules/README.md)
Pusat aturan (.trae/rules), kebijakan keamanan, dan standar operasional sistem.
- *Audience: Security, Lead Dev, AI Agent.*

### 05. [API & Integration](../05-api/README.md)
Dokumentasi endpoint API, skema JSON, dan panduan integrasi pihak ketiga.
- *Audience: Frontend/Backend Dev, Integration Engineer.*

### 06. [Development Guide](../06-development/README.md)
Setup lingkungan kerja, standar coding, UI components guide, dan workflow pengembangan.
- *Audience: Developers.*

### 07. [Testing & Quality](../07-testing-quality/README.md)
Strategi pengujian (Unit, E2E), metrik kualitas, laporan validasi, dan audit aksesibilitas.
- *Audience: QA, Dev Team.*

### 08. [Operations & Monitoring](../08-operations/README.md)
Runbook penanganan masalah, setup monitoring (Grafana/Prometheus), dan standar operasional produksi.
- *Audience: DevOps, SRE, Ops.*

### 09. [Security & Compliance](../09-security-compliance/README.md)
Kebijakan RBAC, audit keamanan, konfigurasi header CSP, dan kepatuhan data.
- *Audience: Security Engineer, Compliance Officer.*

### 10. [Release & Go-Live](../10-release-go-live/README.md)
Checklist persiapan produksi, strategi deployment, dan kriteria keputusan Go/No-Go.
- *Audience: Release Manager, PM.*

### 11. [Post-Launch & Improvement](../11-post-launch/README.md)
Laporan pasca-rilis, metrik performa bisnis, feedback user, dan roadmap iterasi berikutnya.
- *Audience: Product Owner, Management.*

---

## 🛠️ Pemeliharaan Dokumentasi
- **Single Source of Truth**: Selalu perbarui dokumen di folder yang relevan jika ada perubahan sistem.
- **Metadata**: Pastikan setiap file baru memiliki YAML frontmatter yang lengkap.
- **Versioning**: Gunakan tag versi pada dokumen arsitektur utama.

---
*Dikelola oleh SBA-Agentic Documentation Architect.*
