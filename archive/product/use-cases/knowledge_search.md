---
title: Use Case — Knowledge Search
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [knowledge, search]
---

# Deskripsi

- Pencarian pengetahuan (text/vector) melalui API dan tools, dengan pengayaan label tenant untuk observability.

# Aktor

- User
- Web/API
- Knowledge tools

# Alur Normal

1. UI membuat query pengetahuan.
2. API/tools memproses, melakukan pencarian dan mengembalikan hasil.
3. Observability mencatat metrik per tenant.

# Edge Cases

- Index belum siap → fallback cache atau saran re-ingest.
- Query terlalu umum → rekomendasi filter.

# Acceptance Criteria

- Latensi pencarian p95 ≤ 500ms.
- Hasil relevan dan terurut konsisten.
