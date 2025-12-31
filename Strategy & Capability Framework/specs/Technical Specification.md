# SBA-Agentic Technical Specification
version: 1.0.0
last_updated: 2025-12-31

## 1. Executive Summary
SBA-Agentic adalah ekosistem multi-agent berbasis intent yang dirancang untuk otomasi proses bisnis (BPA), layanan pelanggan (CX), dan integrasi sistem (SI) tingkat enterprise. Arsitektur ini memisahkan layer pemahaman niat (**Control Plane**) dari layer eksekusi teknis (**Agent Runtime**).

## 2. Architectural Overview
Sistem ini dibangun di atas prinsip **Agentic AI Mesh**, di mana setiap agen adalah penyedia kapabilitas yang dapat ditemukan dan dikelola secara dinamis.

### 2.1 Core Layers
1.  **Experience Layer (AFD)**: Antarmuka pengguna (Web/Mobile/API) yang menangkap input bahasa alami.
2.  **Control Plane**: Otak sistem yang melakukan resolusi intent, penegakan kebijakan, dan orkestrasi graf eksekusi.
3.  **Agent Runtime SDK**: Framework untuk membangun agen yang kompatibel dengan protokol SBA.
4.  **Reasoning Engine**: Komponen kognitif untuk analisis semantik dan perencanaan tugas otonom.

### 2.2 Key Technologies
- **Backend**: Node.js, TypeScript, Turborepo.
- **Messaging**: BullMQ (Redis) untuk antrean tugas asinkron.
- **Observability**: Prometheus, Grafana, OpenTelemetry (Jaeger).
- **Security**: mTLS (Agentic Service Mesh), IBAC (Intent-based Access Control), PII Masking.

## 3. Core Specifications
Berikut adalah tautan ke spesifikasi teknis mendalam untuk setiap komponen:

- [System Architecture Detail](../specs/System%20Architecture%20Detail.md): Detail desain komponen dan alur interaksi.
- [Agent Capability Registry Spec](../specs/Agent%20Capability%20Registry%20Spec.md): Spesifikasi katalog kapabilitas dan penemuan agen.
- [Agent Runtime Interface Spec](../specs/Agent%20Runtime%20Interface%20Spec.md): Kontrak teknis untuk pengembangan agen baru.
- [Execution Plan Contract](../specs/Execution%20Plan%20Contract%20—%20Control%20Plane%20↔%20Agent%20Runtime.md): Format data graf eksekusi.
- [Policy Enforcement Spec](../specs/Policy%20Enforcement%20Spec%20—%20Capability%20×%20Tenant%20×%20Risk.md): Aturan keamanan dan tata kelola.

## 4. Key Workflows

### 4.1 Intent Resolution & Routing
Proses mengubah query "Buatkan invoice" menjadi aksi nyata:
1.  **Capture**: User input diterima oleh AFD.
2.  **Resolve**: Control Plane memetakan query ke `intent.finance.invoice`.
3.  **Match**: Registry menemukan agen dengan kapabilitas `invoice.create`.
4.  **Plan**: Control Plane membangun `ExecutionGraph`.
5.  **Execute**: Agent Runtime menjalankan tugas.

### 4.2 Autonomous Execution
Untuk tugas yang tidak memiliki alur kaku, Reasoning Engine menentukan langkah secara dinamis berdasarkan deskripsi tugas dan ketersediaan tool di registry.

## 5. Security & Multi-tenancy
- **Data Isolation**: Setiap permintaan wajib menyertakan `tenantId`.
- **Zero-Trust**: Agen tidak memiliki akses langsung ke database; semua interaksi melalui Tool Registry yang divalidasi.
- **Compliance**: PII dideteksi dan di-masking secara otomatis pada layer orkestrasi.

## 6. Operational Foundations
- [Operations and Monitoring](../guides/Operations%20and%20Monitoring.md): Panduan CI/CD dan monitoring.
- [Maintenance Checklist](../guides/Maintenance%20Checklist.md): Prosedur pemeliharaan rutin.
- [API Reference Guide](../guides/API%20Reference%20Guide.md): Dokumentasi endpoint API.

---
*Dokumen ini adalah Single Source of Truth untuk arsitektur teknis SBA-Agentic.*
