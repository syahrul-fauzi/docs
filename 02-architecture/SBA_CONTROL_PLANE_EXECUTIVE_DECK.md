% SBA-Agentic — Single Control Plane (Executive Deck)

---

# 1. Visi Produk

Single Control Plane for AI-Driven Business Operations.

- `apps/app` adalah core product surface SBA: tenant/workspace/agent/run/knowledge.
- Nilai utama: real-time reasoning, kontrol eksekusi, analytics, dan observability.

---

# 2. Masalah yang Diselesaikan

- Operasi bisnis berbasis AI butuh transparansi, kontrol, dan governance.
- Tanpa dokumentasi dan kontrol plane, perubahan fitur berisiko mengulang pemborosan investasi dan sulit dioperasikan.
- Adopsi AI meningkatkan inovasi layanan/produk, tetapi menambah tuntutan pada keamanan data, kualitas data, dan kesiapan SDM.

---

# 3. Control Plane = Kontrak Operasional

- UX yang konsisten lintas domain.
- Governance: RBAC + tenant isolation.
- Observability: metrics, health, alert readiness.
- Integrasi backend: Supabase + Upstash Redis.

---

# 4. Arsitektur Tingkat Tinggi

```mermaid
flowchart TD
  User((User)) -->|Auth| App[apps/app]
  subgraph ControlPlane
    App --> UX[UX Shell]
    App --> AG[Agents & Runs]
    App --> AN[Analytics]
    App --> OBS[Observability]
    App --> API[Next.js API Edge]
  end
  API --> SUP[(Supabase Auth & Data)]
  OBS --> PROM[(Prometheus/OTel)]
  AG --> ORCH[Orchestrator]
  ORCH --> RUBE[@sba/rube]
```

---

# 5. Persona dan Use-Case Utama

- Business Owner: automasi & insight.
- Ops Manager: monitoring & reliability.
- AI Operator: control agent & workflow.
- Admin: governance & security.

Use-case: UC-01 s/d UC-08 (login/workspace, navigasi domain, agents, runs, analytics, monitoring, onboarding, governance).

---

# 6. AI Transparency dan Real-time Control

- AG-UI protocol: message, reasoning steps, interrupts, meta-events.
- Reasoning streamed via SSE/WS untuk UI real-time.
- User dapat pause/stop untuk kontrol operasi.

Rujukan: `apps/app/src/lib/agui/protocol.ts`, `docs/Use-Case Specification apps-app.md`.

---

# 7. Keamanan dan Governance

- Auth: Supabase session/JWT.
- RBAC guard untuk endpoint sensitif.
- Tenant context via header `x-tenant-id` (dinormalisasi).
- Rate limiting berbasis Upstash Redis.

Rujukan: `apps/app/src/shared/utils/rbac-guard.ts`, `apps/app/src/shared/metrics-registry.ts`.

---

# 8. Observability dan SLO

- `GET /api/metrics/json` dan `GET /api/metrics/prometheus` (RBAC `analytics:read`).
- `GET /api/health` untuk readiness/liveness.
- Target operasional: error rate ≤0.5%, p95 latency ≤500ms.

Rujukan: `docs/README.md`, `docs/SBA-Control-Plane.md`.

---

# 9. Deliverables dan Traceability

- Dokumen kontrol plane: `docs/SBA-Control-Plane.md`.
- Matriks fitur: `docs/SBA-Feature-Matrix.md`.
- Traceability: `docs/TRACEABILITY_MATRIX.md` dan `docs/requirements_traceability.md`.
- Implementasi guide: `docs/SBA-Implementation-Guide.md`.

---

# 10. Roadmap dan Next Steps

- Now: reliability, UX clarity, adoption.
- Next: monetization hooks, pricing UX.
- Later: marketplace, extensibility.

Langkah eksekusi:

- Validasi SLO lewat metrics + perf baseline.
- Hardening RBAC dan audit trail untuk domain governance.
- Perluasan integrasi data bisnis untuk analytics/decision support.
