---
title: API & Integration
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [api, integration, schema, endpoint]
---

# 🔌 05 - API & Integrasi

Dokumentasi ini merinci spesifikasi API, skema data, dan protokol integrasi yang digunakan dalam ekosistem **SBA-Agentic**.

## 1. Spesifikasi API Utama

Sistem SBA-Agentic mengekspos API yang terdokumentasi dengan baik untuk memfasilitasi interaksi antar layanan. API utama mencakup eksekusi orkestrator, pencarian pengetahuan, manajemen tugas, dan render dokumen.

### 1.1 Endpoint Utama
*   `POST /runs`: Menjalankan orchestrator dengan serangkaian pesan.
*   `POST /tools/knowledge`: Melakukan pencarian informasi/pengetahuan (web search).
*   `POST /tools/render`: Mengantrekan pekerjaan rendering dokumen.
*   `POST /tools/task`: Membuat tugas (task) baru.
*   `POST /solo/builder/advance`: Memajukan progress pada builder step.
*   `GET/PUT /api/preferences`: Mengelola preferensi pengguna.

## 2. Struktur Request & Response

Semua request dan response mematuhi skema yang telah ditentukan, divalidasi menggunakan Zod di sisi server.

### 2.1 Contoh Skema Chat (OpenAPI 3.1.0)
```yaml
paths:
  /api/business/chat/send:
    post:
      summary: Kirim pesan ke agentic chat
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChatRequest'
      responses:
        '200':
          description: Pesan berhasil dikirim
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChatResponse'
```

## 3. Keamanan & Autentikasi

Akses API diamankan menggunakan kombinasi mekanisme autentikasi (JWT/Clerk) dan otorisasi (RBAC). Setiap permintaan wajib menyertakan `tenant_id` untuk isolasi data multi-tenant.

## 📖 Konten Utama
- **[REFERENCE.md](./REFERENCE.md)**: Referensi lengkap endpoint API.
- **[NOTIFICATIONS_SYSTEM.md](./NOTIFICATIONS_SYSTEM.md)**: Arsitektur dan API sistem notifikasi.
- **[schemas/](./schemas/)**: Skema JSON untuk audit, event, dan tools (Digunakan oleh Agen AI).

## 👥 Audience
- **Backend/Frontend Developers**: Untuk implementasi integrasi.
- **Integration Engineers**: Untuk menghubungkan layanan pihak ketiga.
- **AI Agents**: Untuk pemanggilan tool secara dinamis berdasarkan skema.
