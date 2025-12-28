---
title: Use-Case Specifications (App & Web)
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [use-case, specification, apps-app, apps-web, ux]
---

# SBA-Agentic: Use-Case Specifications

Dokumen ini merinci spesifikasi penggunaan untuk platform SBA-Agentic, mencakup `apps/app` (Control Plane Utama) dan `apps/web` (Unified Interface).

## 1. apps/app: Single Control Plane
`apps/app` adalah orchestrator pengalaman bisnis berbasis AI yang mengelola tenant, workspace, agent, dan knowledge.

### Use-Cases Utama (High-Level):
- **UC-01: Authenticate & Enter Workspace**: User masuk via Supabase Auth dan memilih tenant.
- **UC-02: Navigate Product Domains**: Navigasi antar fitur (Agents, Runs, Analytics) tanpa kehilangan konteks.
- **UC-03: Manage Agents & Conversations**: Membuat dan berinteraksi dengan AI Agents.
- **UC-04: Execute & Observe Runs**: Mengontrol dan memantau workflow eksekusi agent secara real-time.

## 2. apps/web: Unified Web Interface
`apps/web` berfungsi sebagai entry point publik, portal dokumentasi, dan antarmuka operasional ringan.

### Domain UX Utama:
- **Public & Entry**: Landing page (`/`), Docs (`/docs`), Demo (`/demo`).
- **Authenticated Experience**: Dashboard, Chat, Knowledge management.
- **Agentic & Reasoning UX**: AI Copilot, Reasoning Viewer, Meta Events monitoring.

## 3. Prinsip UX & Aksesibilitas
- **Accessibility First**: Kepatuhan WCAG AA sebagai standar default.
- **Explainable AI**: Reasoning viewer wajib tersedia untuk setiap interaksi agent.
- **Progressive Disclosure**: Menampilkan informasi secara bertahap (Chat -> Reasoning -> Meta Events).
