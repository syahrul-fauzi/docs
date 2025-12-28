---
title: Semantic Routing in SBA-Agentic
description: Technical documentation for the Semantic Router and its integration into the Agentic Reasoning Engine.
version: 1.0.0
last_updated: 2025-12-28
---

# 🧠 Semantic Routing & Agentic Decision-Making

Dokumen ini menjelaskan implementasi **Semantic Router** di SBA-Agentic dan bagaimana fitur ini meningkatkan kemampuan pengambilan keputusan mandiri bagi agen AI.

## 1. Pendahuluan

Dalam sistem multi-agent yang kompleks, memilih tool atau workflow yang tepat berdasarkan input bahasa alami merupakan tantangan besar. Pendekatan tradisional yang hanya mengandalkan LLM untuk memilih tool seringkali tidak akurat atau memerlukan prompt yang sangat panjang (context stuffing).

**Semantic Router** mengatasi masalah ini dengan memisahkan fase pencarian kapabilitas dari fase pengambilan keputusan.

## 2. Arsitektur

### 2.1 Komponen Utama

- **Knowledge Base (Vector DB)**: Menyimpan embeddings dari deskripsi tool, domain bisnis, dan pola tugas.
- **Semantic Router**: Layanan yang menghitung kesamaan kosinus antara query pengguna dan entitas di Knowledge Base.
- **Agentic Reasoning Engine**: Orkestrator yang menggunakan saran dari Semantic Router untuk memperkaya konteks penalaran.

### 2.2 Alur Data (Data Flow)

1. **User Input**: Pengguna memberikan perintah (misal: "Extract data dari invoice ini").
2. **Analysis Phase**: `AgenticReasoningEngine` memanggil `SemanticRouter.route()`.
3. **Semantic Search**: Router mencari tool yang paling relevan (misal: `document.extract_data`) berdasarkan embedding deskripsi.
4. **Context Enrichment**: Saran tool dimasukkan ke dalam prompt LLM sebagai "Suggested Tools".
5. **Decision Phase**: LLM membuat keputusan akhir dengan panduan tool yang sudah terverifikasi relevansinya secara semantik.

## 3. Implementasi Teknis

### 3.1 Semantic Router

Implementasi berada di [SemanticRouter.ts](file:///home/inbox/smart-ai/sba-agentic/packages/agentic-reasoning/src/services/SemanticRouter.ts).

```typescript
export class SemanticRouter {
  async route(query: string): Promise<RouteTarget[]> {
    const embedding = await this.knowledgeRepo.embed(query);
    const results = await this.knowledgeRepo.searchByVector(embedding, limit);
    // ... filtering and mapping
  }
}
```

### 3.2 Integrasi Engine

Integrasi berada di [AgenticReasoningEngine](file:///home/inbox/smart-ai/sba-agentic/packages/agentic-reasoning/src/index.ts).

```typescript
// Dalam analyzeTask()
const suggestedTargets = await this.semanticRouter.route(task);
const suggestedTools = suggestedTargets
  .filter(t => t.type === 'tool')
  .map(t => t.id);

// Menambahkan ke prompt
const prompt = `Task: ${task}\nSuggested Tools: ${suggestedTools.join(', ')}`;
```

## 4. Keuntungan Utama

1. **Akurasi Tinggi**: Tool yang disarankan didasarkan pada kesamaan vektor yang deterministik sebelum LLM memprosesnya.
2. **Efisiensi Token**: Tidak perlu mengirim seluruh daftar tool ke LLM di setiap request. Hanya tool yang relevan yang disertakan.
3. **Skalabilitas**: Menambahkan tool baru hanya memerlukan penambahan record di Knowledge Base tanpa mengubah prompt utama.
4. **Self-Correction**: Jika LLM memilih tool yang tidak ada dalam daftar saran, sistem dapat melakukan validasi tambahan atau meminta konfirmasi.

## 5. Konfigurasi & Seeding

Untuk mengaktifkan fitur ini, pastikan Knowledge Base telah diisi dengan data ontologi dan katalog tool menggunakan skrip:

```bash
npx tsx packages/business/business-knowledge/src/scripts/seed-ontology.ts
```

*Pastikan `DATABASE_URL` telah diatur di lingkungan Anda.*

---
*Referensi: [ONTOLOGY.md](file:///home/inbox/smart-ai/sba-agentic/docs/03-agentic/ONTOLOGY.md), [action-handlers-catalog.md](file:///home/inbox/smart-ai/sba-agentic/.trae/rules/action-handlers-catalog.md)*
