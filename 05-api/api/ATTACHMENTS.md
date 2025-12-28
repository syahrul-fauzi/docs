---
title: "Attachments Persistence & Storage URL"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# Attachments Persistence & Storage URL

- Repositories store attachments with `{ id, name, mimeType, size, url }` where `url` is canonical `storage_url`.
- URL validation performed on repository write using `new URL(url)`.
- Access controls: signed/private buckets require presigned access; public buckets use public domain.
- Metadata tracking: upload records persist size, mime, timestamps, and parts.
