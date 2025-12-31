# SBA-Agentic Documentation Index

Indeks utama untuk seluruh dokumentasi strategis dan teknis **SBA-Agentic**.

## 📁 Struktur Dokumentasi

### 1. Strategy & Capability Framework
Dokumen yang mendefinisikan arsitektur inti dan kapabilitas agen.
- [Agent Runtime Interface Spec](./Strategy%20&%20Capability%20Framework/Agent%20Runtime%20Interface%20Spec.md): Kontrak keras antara Control Plane dan Agent Runtime.
- [SBA Feature Design](./Strategy%20&%20Capability%20Framework/SBA%20Feature%20Design.md): Rancangan fitur khusus SBA dan Capability Framework.

### 2. Panduan Utama
- [README](./README.md): Gambaran umum sistem dan temuan riset arsitektur.
- [Progress Tracker](./PROGRESS.md): Status pengembangan dan roadmap.

## 🛠️ Arsitektur Overview
SBA-Agentic memisahkan logika strategis (**Control Plane**) dari eksekusi teknis (**Agent Runtime**) untuk memastikan skalabilitas, keamanan, dan tata kelola yang ketat.

### Alur Eksekusi
1. **Control Plane** menerima intent dan membuat `ExecutionPlan`.
2. **Agent Runtime** memverifikasi plan dan mengeksekusi nodes.
3. **Tools Gateway** menyediakan akses ke API eksternal dengan isolasi tenant.

---
*Terakhir diperbarui: 2025-12-30*
