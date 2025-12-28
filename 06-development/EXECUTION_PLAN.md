---
title: SBA-Agentic Execution Plan
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [development, execution, roadmap, milestones]
---

# SBA-Agentic Execution Plan

Rencana eksekusi pengembangan sistem SBA-Agentic dari fondasi hingga post-launch.

## 1. Roadmap Pengembangan (Fase)

### Fase 1: Fondasi & Logika Inti (In Progress)
- [x] **Struktur Project**: Setup Monorepo (Turborepo + pnpm).
- [x] **Database**: Definisi skema Supabase/Prisma.
- [x] **Basic API**: Setup NestJS dengan Health/Metrics.
- [x] **Observability**: Integrasi OpenTelemetry & Prometheus.
- [x] **Auth**: RBAC Guards & integrasi Supabase Auth.
- [ ] **Agent Logic**: Perbaikan `AgentRunService` dan `AgentSupervisor`.
- [ ] **Queue System**: Stabilisasi BullMQ workers.

### Fase 2: Implementasi Fitur (Langkah Selanjutnya)
- [ ] **Tool Registry**: Implementasi tool nyata (Search, Calculator, dsb).
- [ ] **Session UI**: Menghubungkan Chat Interface Frontend ke Backend.
- [ ] **Real-time Updates**: Implementasi Polling atau WebSocket untuk status run.
- [ ] **Error Handling**: Global exception filters dan logika recovery.

### Fase 3: Testing & Optimasi
- [ ] **Unit Tests**: Coverage > 80% untuk Services.
- [ ] **Integration Tests**: Supertest untuk semua Controller.
- [ ] **E2E Tests**: Flow Playwright untuk path kritikal.
- [ ] **Performa**: Load testing dengan k6.

### Fase 4: Polish & Delivery
- [ ] **Dokumentasi**: API Docs (Swagger), User Guide.
- [ ] **UI/UX**: Refine loading states, error messages.
- [ ] **Deployment**: Dockerfile optimization, CI/CD pipeline.

## 2. Milestone & Deliverables

| Milestone | Deskripsi | Deliverables |
|-----------|-----------|--------------|
| **M1** | Fondasi & isolasi modul | Kode dasar monorepo, config terstandar |
| **M2** | Auth ↔ Prisma | Model user/sesi, guard/middleware aktif |
| **M3** | Observability & baseline | Metrics endpoint aktif, baseline tersimpan |
| **M4** | E2E & CI | Pipeline CI/CD stabil, tes E2E lulus |
| **M5** | UI Polish & Performa | UX/a11y terpenuhi, metrik performa stabil |

## 3. Strategi Eksekusi End-to-End

1. **Agent Logic Refinement**: Memastikan `AgentRunService` menangani loop multi-step dan output tool dengan benar.
2. **Frontend Wiring**: Menghubungkan Chat UI untuk memicu `POST /runs` dan melakukan polling `GET /runs/:id`.
3. **Tool Implementation**: Menambahkan minimal 2 tool fungsional untuk mendemonstrasikan kapabilitas.
4. **Testing**: Memperluas suite pengujian untuk menjamin stabilitas di setiap rilis.

## 4. Kriteria Keberhasilan
- Build stabil dan lulus CI gates.
- Metrik tervalidasi terhadap baseline.
- UX/a11y dasar terpenuhi (skor Lighthouse > 90).
- Dokumentasi lengkap dan dapat dijalankan oleh agent/manusia.
