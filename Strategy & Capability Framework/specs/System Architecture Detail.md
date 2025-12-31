# SBA-Agentic System Architecture Detail
version: 1.0.0
last_updated: 2025-12-31

## 1. Overview
Dokumen ini merinci desain teknis untuk integrasi antara **Control Plane**, **Agent Runtime SDK**, dan **Reasoning Engine** dalam ekosistem SBA-Agentic.

## 2. Core Components

### 2.1 Control Plane (The Brain)
Control Plane bertanggung jawab atas orkestrasi tingkat tinggi, tata kelola, dan penemuan layanan.

#### A. Intent Resolution Service
Layanan ini menjembatani permintaan pengguna dengan kapabilitas yang tersedia.
- **Input**: `query: string`, `tenantId: string`.
- **Flow**:
  1. Panggil `SemanticRouter` untuk mendapatkan `intentId`.
  2. Ambil metadata intent (Risk, SLA) dari `CapabilityCoverageMap`.
  3. Cari agen yang kompatibel di `AgentRegistry`.
  4. Validasi kebijakan akses melalui `PolicyAuthority`.
  5. Bangun `ExecutionGraph`.
- **Output**: `ExecutionGraph`.

#### B. Agent Registry Service
Source of truth untuk status dan kapabilitas agen.
- **Features**: Heartbeat monitoring, Dynamic capability discovery, Versioning.
- **Data Model**: Mengikuti `AgentRegistryEntry` interface.

#### C. Autonomous Executor Service
Menangani eksekusi tugas otonom menggunakan pola Reasoning-Execution.
- **Integration**: Terhubung langsung dengan `AgenticReasoningEngine`.
- **Workflow**: `Reasoning` -> `Plan Validation` -> `Task Submission to Runtime`.

### 2.2 Agent Runtime SDK (The Body)
SDK yang digunakan untuk membangun agen yang kompatibel dengan SBA-Agentic.

#### A. AgentRuntime
- **Registration**: Mengirim `AgentCard` ke Control Plane saat startup.
- **Execution**: Menerima dan menjalankan `ExecutionGraph`.
- **Communication**: mTLS via Agentic Service Mesh (ASM).

#### B. GraphExecutor
- **State Management**: Melacak status setiap node dalam graf.
- **Resilience**: Implementasi retry logic dan circuit breaker.
- **Self-Healing Hook**: Melaporkan kegagalan ke Control Plane untuk re-planning.

### 2.3 Reasoning Engine (The Cognition)
Menyediakan kemampuan analisis semantik.
- **SemanticRouter**: Menggunakan embeddings untuk pemetaan intent yang akurat.
- **KnowledgeRetriever**: Akses ke Federated Context Graph.

## 3. Interaction Patterns

### 3.1 Intent-to-Execution Flow
```mermaid
sequenceDiagram
    participant AFD as Front Door
    participant CP as Control Plane
    participant RR as Reasoning Engine
    participant AR as Agent Registry
    participant SDK as Agent Runtime
    
    AFD->>CP: resolve(query, tenantId)
    CP->>RR: mapIntent(query)
    RR-->>CP: intent: finance.invoice
    CP->>AR: findAgents(intent: finance.invoice)
    AR-->>CP: [Agent-A, Agent-B]
    CP->>CP: buildExecutionGraph()
    CP-->>AFD: ExecutionGraph
    AFD->>SDK: execute(ExecutionGraph)
    SDK->>SDK: runNodes()
    alt Failure Detected
        SDK->>CP: reportFailure(nodeId, context)
        CP->>CP: rePlan()
        CP-->>SDK: updatedExecutionGraph
    end
    SDK-->>AFD: Success Result
    ```

### 3.2 Autonomous Reasoning Flow
```mermaid
sequenceDiagram
    participant User
    participant AE as Agentic Executor
    participant RE as Reasoning Engine
    participant RT as Agent Runtime
    
    User->>AE: submitTask(raw_prompt)
    AE->>RE: reason(raw_prompt)
    RE-->>AE: ReasoningResult(tool, params, reasoning)
    AE->>RT: submit(TaskDescriptor)
    RT-->>AE: taskId
    AE-->>User: Ack(taskId, reasoning)
```

## 4. Technical Requirements for Implementation

### 4.1 Control Plane Updates
- Implementasi `IntentResolutionService`.
- Penambahan endpoint `/register` dan `/heartbeat` untuk agen.
- Integrasi dengan `agentic-reasoning` package.

### 4.2 SDK Updates
- Penambahan `AgentCard` generator.
- Logic pendaftaran otomatis ke Control Plane.
- Enhanced `GraphExecutor` dengan failure reporting.

## 5. Tool Integration Catalog

Berikut adalah pemetaan tool baru ke dalam Intent Resolution Service:

| Intent ID | Capability | Deskripsi | Risiko |
| --- | --- | --- | --- |
| `intent.document.extract` | `document.extract_data` | Ekstraksi data terstruktur dari dokumen (OCR/NLP). | Medium |
| `intent.analytics.report` | `analytics.generate_report` | Pembuatan laporan analitik performa/penggunaan. | Medium |
| `intent.support.routing` | `support.route_to_department` | Penjaluran tiket dukungan ke departemen yang tepat. | Low |

### 5.1 Flow Ekstraksi Dokumen
1. Pengguna mengunggah dokumen/URL.
2. `IntentResolutionService` memetakan ke `intent.document.extract`.
3. `ExecutionGraph` dibuat dengan node `document.extract_data`.
4. Agen yang memiliki kapabilitas tersebut (misal: `agent-ocr`) mengeksekusi tool.

### 5.2 Flow Laporan Analitik
1. Permintaan laporan (misal: "buat laporan penjualan bulan ini").
2. Pemetaan ke `intent.analytics.report`.
3. `PolicyAuthority` memvalidasi peran pengguna (Admin/Manager).
4. `AnalyticsReportTool` dipanggil untuk menghasilkan data laporan.

## 5. Security & Governance

### 5.1 Intent-based Access Control (IBAC)
Control Plane memvalidasi setiap intent terhadap kebijakan tenant sebelum membangun Execution Graph.
- **In-flight Masking**: PII dideteksi dan di-masking saat data mengalir antar agen.
- **mTLS**: Semua komunikasi antar agen dalam ASM dienkripsi.

### 5.2 Multi-Agent Consensus
Untuk intent dengan risiko `critical`, Control Plane mewajibkan persetujuan dari minimal 3 agen independen sebelum hasil final dikembalikan ke pengguna.

## 6. Scalability & Resilience

### 6.1 Elastic Agent Provisioning
Control Plane dapat memicu spin-up instans agen baru jika latensi eksekusi melebihi SLA.

### 6.2 Self-Healing Graph Recovery
Jika satu node dalam Execution Graph gagal, Agent Runtime melaporkan kegagalan tersebut, dan Control Plane melakukan re-planning secara real-time untuk mencari rute alternatif.

## 7. API Reference (High-Level)

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/v1/control/resolve` | POST | Mengubah query NL menjadi Execution Graph. |
| `/api/v1/control/register` | POST | Pendaftaran agen baru (Agent Card). |
| `/api/v1/control/heartbeat` | POST | Monitoring status kesehatan agen. |
| `/api/v1/control/policy/validate` | POST | Validasi manual untuk command eksekusi. |
