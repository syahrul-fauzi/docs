---
title: "SBA-Agentic Dependencies Governance"
created_at: 2025-12-28
author: sba-team
status: active
---

# SBA-Agentic Dependencies Governance

## 1. Manajemen Paket
- Utama: `pnpm`
- Versi Node.js: >= 18.x

## 2. Core Stack
- Frontend: Next.js 14+
- Backend: Node.js / Express
- Database: Supabase (PostgreSQL)
- Auth: Clerk
- Cache: Redis (Upstash)

## 3. Kebijakan Update
- Update dependensi dilakukan setiap bulan melalui Automated PR (Dependabot).
- Perubahan versi major wajib melalui review arsitektur.