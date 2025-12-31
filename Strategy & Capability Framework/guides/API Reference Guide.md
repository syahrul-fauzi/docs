# SBA-Agentic API Reference Guide
version: 1.0.0
last_updated: 2025-12-31

## 1. Introduction
Dokumen ini merinci API publik dan internal yang digunakan oleh **Control Plane**, **Agent Runtime**, dan **Experience Layer** dalam ekosistem SBA-Agentic.

## 2. Control Plane API

### 2.1 Intent Resolution
Mengubah input bahasa alami menjadi graf eksekusi yang dapat dijalankan oleh agen.

- **Endpoint**: `POST /api/v1/control/resolve`
- **Request Body**:
```json
{
  "query": "Buatkan invoice untuk customer X sebesar 5jt",
  "tenantId": "tenant-uuid-123",
  "context": {
    "userId": "user-uuid-456",
    "channel": "web-chat"
  }
}
```
- **Response**: `ExecutionGraph` (Lihat [execution.ts](file:///home/inbox/smart-ai/sba-agentic/packages/control-plane/src/contracts/execution.ts))

### 2.2 Agent Registration
Mendaftarkan agen baru ke sistem.

- **Endpoint**: `POST /api/v1/control/register`
- **Request Body**: `AgentDefinition` (Lihat [agent.ts](file:///home/inbox/smart-ai/sba-agentic/packages/control-plane/src/contracts/agent.ts))

### 2.3 Heartbeat & Status
Memperbarui status kesehatan agen.

- **Endpoint**: `POST /api/v1/control/heartbeat`
- **Request Body**:
```json
{
  "agentId": "agent-uuid-789",
  "status": "active",
  "metrics": {
    "cpuUsage": 0.45,
    "memoryUsage": 0.22,
    "activeTasks": 5
  }
}
```

### 2.4 Autonomous Task Execution
Menerima tugas mentah dan menggunakan Reasoning Engine untuk menentukan langkah eksekusi secara mandiri.

- **Endpoint**: `POST /api/v1/autonomous/execute`
- **Request Body**:
```json
{
  "tenantId": "tenant-uuid-123",
  "userId": "user-uuid-456",
  "type": "autonomous",
  "priority": "normal",
  "payload": {
    "task": "Create a new lead in CRM for contact John Doe",
    "context": {
      "constraints": ["respect capacity limits"],
      "goals": ["stable runs"]
    }
  }
}
```
- **Response**:
```json
{
  "ok": true,
  "taskId": "task-uuid-abc",
  "status": "queued",
  "reasoning": "Based on the task, I will use the crm.create_lead tool...",
  "suggestedTool": "crm.create_lead",
  "message": "Autonomous task queued with suggested tool: crm.create_lead"
}
```

## 3. Agent Runtime SDK API (Internal)

### 3.1 Execute Graph
Dipanggil oleh Orchestrator untuk menjalankan graf.

- **Interface**: `AgentRuntime.execute(graph: ExecutionGraph)`
- **Flow**: SDK akan memproses setiap node berdasarkan dependensinya.

### 3.2 Report Failure
Melaporkan kegagalan node untuk pemicuan self-healing.

- **Endpoint**: `POST /api/v1/control/execution/report-failure`
- **Request Body**:
```json
{
  "graphId": "graph-uuid-000",
  "nodeId": "node-uuid-111",
  "error": "API Timeout",
  "contextSnapshot": { ... }
}
```

## 4. Error Codes

| Code | Description | Action |
| :--- | :--- | :--- |
| `ERR_INTENT_NOT_FOUND` | Query tidak dapat dipetakan ke intent manapun. | Minta klarifikasi user. |
| `ERR_NO_CAPABLE_AGENT` | Tidak ada agen yang memiliki kapabilitas yang dibutuhkan. | Hubungi admin sistem. |
| `ERR_POLICY_VIOLATION` | Permintaan melanggar aturan keamanan/governance. | Cek audit log. |
| `ERR_SLA_BREACH` | Eksekusi memakan waktu lebih lama dari yang dijanjikan. | Re-routing atau peringatan. |
