---
title: Use Case — Notifications
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [notifications]
---

# Deskripsi

- Sistem notifikasi (email/in-app/digest) dengan preferensi kanal dan penjadwalan.

# Aktor

- User
- Web/API
- Worker (scheduler)

# Alur Normal

1. UI/Service membuat event notifikasi.
2. API/Worker memproses dan mengirim via kanal yang dipilih.
3. Observability mencatat metrik deliverability.

# Edge Cases

- Kanal offline → retry dengan backoff.
- Preferensi tidak ditemukan → fallback default.

# Acceptance Criteria

- Deliverability ≥ 99% dengan retry wajar.
- Penerapan preferensi user konsisten.
