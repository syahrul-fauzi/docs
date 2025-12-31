# SBA-Agentic Operations: CI/CD & Monitoring Setup
version: 1.0.0
last_updated: 2025-12-31

## 1. CI/CD Pipeline Configuration

SBA-Agentic menggunakan Turborepo untuk manajemen monorepo. Pipeline CI/CD dirancang untuk memastikan kualitas kode dan keamanan multi-tenant.

### 1.1 Validation Gates
Setiap Pull Request wajib melewati tahapan berikut:
1.  **Linting**: `npm run lint` (ESLint & Prettier).
2.  **Type Checking**: `npm run type-check` (TypeScript).
3.  **Unit Testing**: `npm run test` (Vitest) dengan coverage minimal 90% pada modul core.
4.  **Schema Validation**: Memastikan semua rule YAML dan Agent Cards valid terhadap JSON Schema.

### 1.2 Deployment Strategy
- **Staging**: Otomatis dideploy ke cluster staging setelah merge ke branch `main`.
- **Production**: Memerlukan persetujuan manual (approval) dan lolos integrasi testing.
- **Canary Rollout**: Menggunakan **Agentic Service Mesh (ASM)** untuk mengalihkan 5-10% traffic ke versi agen baru.

## 2. Monitoring & Observability

### 2.1 Metrics (Prometheus/Grafana)
KPI utama yang dipantau:
- **Intent Resolution Rate**: Persentase query yang berhasil dipetakan ke intent.
- **Agent Latency (P99)**: Waktu eksekusi rata-rata per kapabilitas.
- **Self-Healing Success Rate**: Frekuensi pemulihan otomatis graf yang gagal.
- **Token Usage & Cost**: Monitoring biaya LLM per tenant.

#### Konfigurasi Prometheus (prometheus.yml)
```yaml
scrape_configs:
  - job_name: 'sba-api'
    scrape_interval: 15s
    static_configs:
      - targets: ['sba-api:3000']
    metrics_path: '/metrics'
```

#### Dashboard Grafana
Gunakan Dashboard ID `12345` (Custom SBA Dashboard) untuk visualisasi:
1. **Agent Performance**: Latency vs Success Rate.
2. **Tenant Quota**: Consumption per tenant.
3. **Reasoning Audit**: Traceability of AI decisions.

### 2.2 Logging (Structured ELK/Loki)
Semua log harus menyertakan:
- `trace_id`: Untuk distributed tracing antar agen.
- `tenant_id`: Untuk isolasi data.
- `reasoning_trace_id`: Untuk audit transparansi keputusan AI.

### 2.3 Distributed Tracing (OpenTelemetry)
Menggunakan Jaeger/Tempo untuk memvisualisasikan alur eksekusi dari **Front Door** -> **Control Plane** -> **Agent A** -> **Agent B**.

## 3. Incident Response & Maintenance

### 3.1 Kill-Switch
Admin dapat mengaktifkan kill-switch global atau per-tenant jika terdeteksi anomali perilaku agen melalui API:
`POST /api/v1/control/admin/kill-switch`

### 3.2 Backup & Recovery
- **State Checkpoints**: Setiap langkah dalam `ExecutionGraph` disimpan di Redis.
- **Rollback**: Jika versi agen baru bermasalah, ASM secara otomatis mengalihkan traffic kembali ke versi `stable`.
