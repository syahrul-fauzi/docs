# Arsitektur Business Layer

Tujuan: lapisan domain-intelligence SBA-Agentic dengan monorepo berisi paket modular. Setiap paket mengikuti struktur standar domain/application/infrastructure dan berintegrasi melalui EventBus dan adapter AG-UI.

Dokumen ini merangkum arsitektur `packages/business` berbasis C4 Model, meliputi konteks sistem, container, komponen, dan struktur kode. Paket utama: `@sba/business-core`, `@sba/business-chat`, `@sba/business-knowledge`, `@sba/business-payment`, `@sba/business-analytics`.

Tujuan: modular, event-driven, CQRS, terintegrasi dengan AG-UI, dapat diskalakan.
