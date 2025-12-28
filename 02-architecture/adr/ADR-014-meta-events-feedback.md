---
id: ADR-014
title: Meta Events Feedback System
deciders: Technical Lead, Product Manager
date: 2025-12-06
created_at: 2025-12-06
last_modified: 2025-12-22
author: team@sba
reviewer: qa@sba
status: Accepted
priority: P1
related:
  - ADR-001
  - ADR-005
---

# ADR-014: Meta Events Feedback System

## Status

Accepted

## Context

Sistem saat ini tidak memiliki cara yang terstruktur untuk mengumpulkan feedback dari pengguna terhadap hasil kerja agen. Padahal feedback ini penting untuk:

1. **Quality Measurement**: Mengukur efektivitas agen secara kuantitatif
2. **Continuous Improvement**: Memberikan data untuk iterasi dan perbaikan agen
3. **User Engagement**: Memungkinkan pengguna berpartisipasi dalam meningkatkan kualitas
4. **Analytics**: Menyediakan data untuk analisis tren dan pola kualitas

Tanpa sistem ini, kita kehilangan insight berharga tentang performa agen di production.

## Decision

Kami akan mengimplementasikan Meta Events Feedback System dengan arsitektur berikut:

### 1. Event-Driven Architecture

- Menggunakan pola event sourcing untuk mencatat semua feedback
- Event tersimpan secara immutable dengan metadata lengkap
- Aggregation service terpisah untuk menghitung metrik

### 2. Bounded Contexts

- **Frontend Context**: UI components untuk feedback controls
- **API Context**: RESTful endpoints dengan proper authentication
- **Domain Context**: Business logic untuk meta events
- **Infrastructure Context**: Data persistence dan caching

### 3. Data Model

- **meta_events**: Tabel utama untuk menyimpan events
- **meta_event_aggregates**: Tabel untuk hasil agregasi
- Relasi ke users, agent_runs, dan tenants

### 4. Rate Limiting & Security

- Rate limit: 10 feedback per jam per user
- Authentication required untuk semua endpoints
- Validasi payload dan sanitasi input

### 5. Real-time Aggregation

- Aggregation service yang terpisah
- Redis cache untuk performance
- Background job untuk heavy computation

## Consequences

### Positive

- ✅ Data kualitas agen yang terstruktur
- ✅ User engagement meningkat
- ✅ Analytics yang actionable
- ✅ Scalable architecture
- ✅ Real-time metrics available

### Negative

- ❌ Kompleksitas tambahan di sistem
- ❌ Storage overhead untuk events
- ❌ Processing overhead untuk aggregation
- ❌ Maintenance cost untuk infrastructure tambahan

### Trade-offs

- **Eventual Consistency**: Aggregates mungkin sedikit tertunda
- **Storage vs Performance**: Trade-off antara detail events vs query performance
- **Real-time vs Batch**: Beberapa agregasi dilakukan secara batch untuk efficiency

## Implementation Details

### API Endpoints

```http
POST /api/meta-events
GET  /api/meta-events/aggregates
GET  /api/meta-events/trends
```

### Database Schema

- PostgreSQL untuk events (ACID compliance)
- Redis untuk caching aggregates
- Indexing strategy untuk performant queries

### Technology Stack

- Backend: Node.js/TypeScript dengan Express
- Database: PostgreSQL dengan JSON columns
- Cache: Redis dengan TTL strategy
- Queue: Background job untuk aggregation

## Validation Criteria

- [ ] Rate limiting berfungsi dengan baik
- [ ] Events tersimpan dengan benar
- [ ] Aggregates update secara real-time
- [ ] Dashboard menampilkan data yang akurat
- [ ] Performance metrics memenuhi SLA
- [ ] Security audit passed

## References

- [Event Sourcing Pattern](https://martinfowler.com/eaaDev/EventSourcing.html)
- [CQRS Pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)
