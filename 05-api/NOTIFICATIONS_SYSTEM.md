---
title: Notifications System - API, Email, and Worker
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: medium
tags: [api, notifications, email, worker, supabase, edge-functions]
---

# Notifications System Architecture & API

Sistem notifikasi SBA-Agentic dirancang untuk pengiriman pesan multi-channel (Email, Webhook, SMS, Push) dengan dukungan penjadwalan, preferensi pengguna, dan eskalasi otomatis.

## 1. Notifications API Endpoints

### Channels
- `GET /api/notifications/channels`: Mengambil daftar channel (email/webhook) per tenant.
- `POST /api/notifications/channels`: Mendaftarkan channel baru.
- `PUT /api/notifications/channels`: Memperbarui konfigurasi channel.
- `DELETE /api/notifications/channels`: Menghapus channel.

### Templates
- `GET /api/notifications/templates`: Mengambil template pesan.
- `POST /api/notifications/templates`: Membuat template baru dengan variabel dinamis.
- `POST /api/notifications/preview`: Melakukan preview render template dengan variabel.

### Preferences & Scheduling
- `POST /api/notifications/preferences`: Mengatur preferensi kanal, jam kerja, dan urgensi per pengguna.
- `POST /api/notifications/schedule`: Menjadwalkan notifikasi masuk ke antrean `pending_notifications`.

## 2. Email Integration
Mendukung berbagai provider melalui environment variables:
- **Providers**: SendGrid (`EMAIL_API_KEY`), Postmark (`POSTMARK_SERVER_TOKEN`), AWS SES.
- **Konfigurasi**: `EMAIL_PROVIDER`, `EMAIL_FROM`, `WARNING_THRESHOLD`.
- **Templates**: Terpusat di `tools/email/templates.js` dengan dukungan versioning.

## 3. Notifications Worker (Edge Function)
Dijalankan sebagai Supabase Edge Function (`apps/api/supabase/functions/notifier/index.ts`).
- **Mekanisme**: Mengambil notifikasi `pending` yang sudah jatuh tempo (`due`).
- **Retry Policy**: Backoff eksponensial dengan jitter, maksimal percobaan didefinisikan di `NOTIF_MAX_ATTEMPTS`.
- **Delivery Logs**: Setiap percobaan pengiriman dicatat di tabel `delivery_logs` untuk audit.
- **Scheduling**: Dipicu secara periodik menggunakan `pg_cron` atau Supabase Scheduler.

## 4. Keamanan & Monitoring
- **RBAC**: Proteksi endpoint menggunakan resource `notifications`.
- **Audit**: Perubahan konfigurasi channel dicatat di `notification_channel_changes`.
- **Monitoring**: Status cron dapat dipantau melalui endpoint `GET /api/audit/cron-status`.
