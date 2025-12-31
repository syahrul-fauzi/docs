---
title: Agentic Front Door (AFD)
created_at: 2025-12-31
author: SBASuperAgent
status: active
---

# Agentic Front Door (AFD)

## Executive Summary

Agentic Front Door (AFD) adalah subsistem strategis dalam SBA-Agentic yang berfungsi sebagai **titik masuk utama (entry surface)** bagi seluruh interaksi eksternal—manusia, sistem, maupun sinyal digital—ke dalam ekosistem agentik SBA. Berbeda dengan aplikasi marketing konvensional, AFD dirancang sebagai **Intent & Signal Producer** yang deterministik, observable, dan compliance-ready.

AFD bukan sekadar antarmuka pengguna, melainkan **lapisan kepercayaan (trust surface)** yang menjembatani dunia eksternal dengan Control Plane dan Agent Runtime secara terstruktur dan terkontrol.

---

## Latar Belakang & Evolusi

### Evolusi Peran Marketing dalam SBA

| Tahap                  | Karakteristik                          |
| ---------------------- | -------------------------------------- |
| Landing Page           | Static, content-only                   |
| Marketing App          | Conversion & analytics                 |
| Signal Layer           | Event & telemetry                      |
| **Agentic Front Door** | Intent-aware, policy-bound, observable |

AFD muncul dari kebutuhan SBA untuk:

* Menangkap *niat (intent)* pengguna secara eksplisit
* Menghindari *hidden decision logic* di layer UI
* Menyediakan jejak audit yang jelas untuk AI-driven actions

---

## Definisi Agentic Front Door

**Agentic Front Door** adalah:

> Subsistem SBA-Agentic yang bertugas menangkap, menormalisasi, dan mengirimkan *intent* serta *contextual signals* dari interaksi eksternal ke Control Plane, tanpa melakukan pengambilan keputusan agentik secara langsung.

### Bukan AFD Jika:

* Melakukan reasoning AI
* Memanggil agent runtime langsung
* Menyimpan state agent

### AFD Selalu:

* Stateless (secara agentik)
* Deterministik
* Observable end-to-end

---

## Tujuan Strategis

### Tujuan Bisnis

* Meningkatkan kualitas lead & intent
* Membangun kepercayaan pengguna terhadap AI
* Menyediakan transparansi pengambilan keputusan

### Tujuan Teknis

* Single entry point untuk intent eksternal
* Mengurangi coupling UI ↔ agent
* Memudahkan audit, replay, dan debugging

---

## Nilai Strategis bagi SBA-Agentic

### 1. Trust & Transparency

AFD memungkinkan pengguna dan auditor melihat:

* Apa yang dikirim ke AI
* Kapan dan mengapa dikirim

### 2. Compliance-Ready

* Consent-aware telemetry
* PDP / GDPR friendly
* Event-based audit trail

### 3. Scalability

* Mendukung multi-tenant SaaS
* Channel-agnostic (web, mobile, API)

---

## Posisi AFD dalam Arsitektur SBA

AFD berada di antara:

```
External World (User / System)
        ↓
Agentic Front Door
        ↓
Control Plane
        ↓
Agent Runtime
```

AFD **tidak mengetahui**:

* Agent mana yang akan dipilih
* Capability mana yang dieksekusi

Semua keputusan berada di **Control Plane**.

---

## Ruang Lingkup AFD

### Termasuk

* Intent capture
* Context enrichment
* Telemetry emission
* Trust UI (opsional)

### Tidak Termasuk

* Policy evaluation
* Capability selection
* Agent execution

---

## Relasi dengan Subsistem Lain

| Subsistem      | Relasi                 |
| -------------- | ---------------------- |
| apps/marketing | Implementasi utama AFD |
| apps/app       | Post-auth interaction  |
| apps/web       | End-user workspace     |
| Control Plane  | Routing & policy       |
| apps/docs      | Single source of truth |

---

## Prinsip Desain Utama

1. **No Hidden Logic**
2. **Event First**
3. **Policy over Code**
4. **Docs as Source of Truth**

---

## Outcome yang Diharapkan

Dengan AFD:

* Marketing menjadi bagian sistem agentik
* Semua interaksi eksternal dapat direplay
* SBA siap untuk enterprise & regulasi

---

## Referensi Lanjutan

* `02-architecture/agentic-front-door/overview.md`
* `03-agentic/intent-taxonomy.md`
* `control-plane/afd-integration.md`

---

**Agentic Front Door bukan fitur.**
**Ia adalah fondasi interaksi AI yang dapat dipercaya.**
