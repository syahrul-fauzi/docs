---
title: SBA-Agentic Workflow Standard Operating Procedure
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [workflow, sop, approval, escalation, hitl]
---

# SBA-Agentic Workflow Standard Operating Procedure (SOP)

## 1. Overview

Dokumen ini merinci standar operasional untuk sistem approval multi-level dan eskalasi otomatis dalam SBA-Agentic. Sistem ini dirancang untuk memastikan kepatuhan bisnis, transparansi, dan efisiensi dalam proses pengambilan keputusan.

## 2. Arsitektur Workflow

Workflow diimplementasikan menggunakan pola **Human-In-The-Loop (HITL)** yang terintegrasi dengan Rube Engine.

### Komponen Utama

- **WorkflowAuditService**: Mencatat setiap tindakan (approval, rejection, escalation, override, fallback).
- **WorkflowNotificationService**: Mengirim notifikasi multi-channel (Email, Slack, Push).
- **Tool Adapters**:
  - `workflow.approval_request`: Inisialisasi permintaan approval.
  - `workflow.process_pending_escalations`: Worker otomatis untuk memproses timeout.
  - `workflow.manual_override`: Mekanisme intervensi admin.

## 3. Kebijakan Eskalasi

Eskalasi terjadi secara otomatis jika approver tidak memberikan respon dalam waktu `timeout_hours` yang ditentukan.

1. **Level 1**: Approver pertama menerima notifikasi.
2. **Timeout**: Jika terlampaui, status approval menjadi `cancelled`.
3. **Eskalasi**: Sistem secara otomatis membuat permintaan baru untuk `manager_id` yang terdefinisi dalam `escalation_policy`.
4. **Audit**: Seluruh proses eskalasi dicatat dalam tabel audit logs.

## 4. Mekanisme Pengamanan (Safety Mechanisms)

### Business Validation

Setiap eksekusi tool melakukan validasi status objek (Task/Approval) sebelum melanjutkan. Jika objek sudah dalam terminal state (completed/failed), sistem akan memicu **Fallback**.

### Fallback System

- **Log**: Kejadian dicatat sebagai `fallback_triggered`.
- **Response**: Mengembalikan status `success: false` dengan pesan error yang jelas bagi Orchestrator.

### Manual Override

Admin dengan otorisasi yang tepat dapat melakukan override pada proses apa pun. Setiap override wajib menyertakan `reason` yang valid dan dicatat sebagai tindakan `overridden` dalam audit trail.

## 5. Panduan Operasional

### Monitoring

Gunakan Dashboard Monitoring Real-time untuk melacak status approval yang sedang berjalan.

- **Green**: Pending (within timeout).
- **Yellow**: Approaching timeout.
- **Red**: Escalated or Overdue.

### Troubleshooting

Jika terjadi kegagalan eskalasi:

1. Periksa log di `WorkflowAuditService`.
2. Pastikan `manager_id` valid dan aktif.
3. Gunakan `ManualOverrideTool` jika intervensi mendesak diperlukan.
