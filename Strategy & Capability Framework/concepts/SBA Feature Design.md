# SBA-Agentic Feature Design & Capability Framework

Dokumen ini merinci fitur-fitur khusus **SBA-Agentic** dan bagaimana mereka diimplementasikan melalui Capability Framework.

## 1. Fitur Utama SBA-Agentic

### 1.1 Autonomous Business Analyst (ABA)
Fitur ini memungkinkan agen untuk menganalisis data bisnis, mengidentifikasi tren, dan memberikan rekomendasi strategis secara mandiri.
- **Capabilities**: `analytics.generate_report`, `knowledge.search`, `db.query_records`.
- **Workflow**: 
    1. User bertanya tentang performa penjualan.
    2. ABA mengambil data dari database.
    3. ABA mencari tren industri melalui web search.
    4. ABA menggabungkan data internal dan eksternal menjadi laporan komprehensif.

### 1.2 Proactive Customer Success (PCS)
Agen memantau interaksi pelanggan dan memberikan notifikasi proaktif atau eskalasi jika ditemukan sentimen negatif atau masalah yang belum terselesaikan.
- **Capabilities**: `cx.customer_profile`, `notification.send_email`, `workflow.escalate_request`.
- **Workflow**:
    1. Sistem mendeteksi sentimen negatif dalam tiket dukungan.
    2. PCS mengambil profil pelanggan untuk melihat nilai (LTV).
    3. PCS mengirimkan email personalisasi atau meneruskan ke manajer jika pelanggan bernilai tinggi.

### 1.3 Smart Integration Engine (SI)
Memungkinkan sinkronisasi data otomatis antara sistem internal (ERP/CRM) dan platform eksternal.
- **Capabilities**: `crm.create_lead`, `erp.sync_inventory`.
- **Workflow**:
    1. Event baru terdeteksi di CRM (lead baru).
    2. SI memvalidasi data dan menyinkronkannya ke database internal.

---

## 2. Capability Framework (CBAC)

SBA-Agentic menggunakan **Capability-Based Access Control (CBAC)** untuk mengelola izin eksekusi tool.

### 2.1 Definisi Capability
Capability adalah unit fungsionalitas terkecil yang dapat dipanggil oleh agen. Setiap capability harus memiliki:
- **Schema Input**: Validasi parameter menggunakan JSON Schema.
- **Schema Output**: Struktur data yang konsisten untuk diproses oleh agen berikutnya.
- **Policy Snapshot**: Batasan akses berdasarkan tenant, role, dan tingkat risiko (Risk Level).
- **Resource Constraints**: Limit penggunaan resource (CPU, Memory, API Rate Limit).

### 2.2 Hierarki & Klasifikasi Capability
1.  **System (L0)**: Operasi inti (file read/write, internal db query).
2.  **Domain (L1)**: Logika bisnis spesifik (BPA, CX, SI).
3.  **Integration (L2)**: Integrasi pihak ketiga via MCP (Salesforce, Zendesk, SAP).
4.  **Intelligence (L3)**: Operasi AI tingkat lanjut (Summary, Sentiment Analysis, RAG Search).

### 2.3 Capability Registry
Setiap Runtime mendaftarkan kapabilitasnya ke Control Plane saat startup. Control Plane hanya akan membuat `ExecutionPlan` yang menggunakan kapabilitas yang tersedia (discovered) pada Runtime target.

---

## 3. Spesifikasi Interaksi Komponen Utama

### 3.1 Control Plane ↔ Agent Runtime (Hard Contract)
- **Protocol**: REST untuk inisiasi, SSE untuk real-time reasoning trace.
- **Security**: RS256 Signature untuk setiap Execution Plan.
- **Context**: Tenant Context wajib diinjeksikan dalam setiap request.

### 3.2 Agent Runtime ↔ Tools Gateway (MCP)
- **Protocol**: JSON-RPC over HTTP/SSE (Standard MCP).
- **Isolation**: Tool execution berjalan di sandbox terpisah.
- **Audit**: Setiap pemanggilan tool wajib dicatat dalam Audit Service dengan `trace_id` yang sama.

### 3.3 Orchestrator ↔ Knowledge Engine (RAG)
- **Search Type**: Hybrid (Vector + Semantic Keyword Expansion).
- **Context Window Management**: Orchestrator memotong dan merangkum hasil RAG agar pas dengan context window LLM di Runtime.

---

## 4. Roadmap Implementasi Fitur
- [ ] Phase 1: Implementasi Core Capabilities (Knowledge, Notification).
- [ ] Phase 2: Integrasi CRM & ERP (SI Feature).
- [ ] Phase 3: Pengembangan Autonomous Business Analyst (ABA).
- [ ] Phase 4: Proactive Customer Success (PCS) dengan Sentiment Analysis.
