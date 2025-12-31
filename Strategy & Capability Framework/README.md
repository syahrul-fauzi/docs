# Strategy & Capability Framework

Folder ini berisi dokumen strategis mengenai kerangka kerja kemampuan (capability framework) dan tata kelola agen dalam ekosistem SBA-Agentic.

## 📂 Struktur Direktori

### 1. [Technical Specifications (specs/)](./specs/)
Dokumen yang mendefinisikan kontrak teknis dan protokol sistem.
- **[Agent Capability Registry Spec](./specs/Agent%20Capability%20Registry%20Spec.md)**: Spesifikasi teknis untuk penemuan, routing, dan registrasi kemampuan agen. Ini adalah tulang punggung Control Plane.
- **[Execution Plan Contract](./specs/Execution%20Plan%20Contract%20—%20Control%20Plane%20↔%20Agent%20Runtime.md)**: Kontrak eksekusi keras antara CP dan AR.
- **[Policy Enforcement Spec](./specs/Policy%20Enforcement%20Spec%20—%20Capability%20×%20Tenant%20×%20Risk.md)**: Mekanisme keamanan, tata kelola, dan validasi aksi agen terhadap kebijakan tenant dan profil risiko.

### 2. [Implementation Guides (guides/)](./guides/)
Panduan praktis dan contoh untuk pengembangan.
- **[SBA Implementation Guide](./guides/SBA_Implementation_Guide.md)**: Panduan langkah-demi-langkah setup end-to-end SBA-Agentic.
- **[Capability Adapter Example](./guides/Capability%20Adapter%20Example.md)**: Pattern produksi untuk adapter capability dengan dukungan MCP.
- **[Agent Runtime SDK (TypeScript)](./guides/Agent%20Runtime%20SDK%20(TypeScript).md)**: Dokumentasi SDK standar.
- **[Agent Implementation Guide](./guides/Agent%20Implementation%20Guide.md)**: Panduan umum pembuatan agen.

### 3. [Visual Artifacts (diagrams/)](./diagrams/)
Representasi visual alur sistem.
- **[Event Flow Diagram](./diagrams/Diagram%20Event%20Flow%20(AFD%20→%20Control%20Plane%20→%20Agent).md)**: Alur event dari AFD ke Agent.
- **[UML Diagrams](./diagrams/Diagram%20Visual%20(Mermaid%20-%20UML).md)**: Struktur kelas dan komponen.

### 4. [Registries & Maps (registry/)](./registry/README.md)
Sumber kebenaran tunggal untuk intent dan capability. Lihat [Registry Hub](./registry/README.md) untuk detail lebih lanjut.
- **[Intent Registry](./registry/Intent%20Registry%20YAML%20(Global%20SBA).md)**: Katalog intent global (Semantik). Mendukung **Deterministic Routing** dan **7-Step Enforcement**.
- **[Capability Registry](./registry/Capability%20Registry%20YAML%20(Control%20Plane%20Source%20of%20Truth).md)**: Katalog kapabilitas teknis (Eksekusi).
- **[AFD → Capability Mapping Matrix](./registry/AFD%20→%20Capability%20Mapping%20Matrix.md)**: Jembatan deterministik antara intent dan eksekusi.
- **[Capability Coverage Map](./registry/Capability%20Coverage%20Map.md)**: Roadmap dan cakupan kapabilitas.
- **[Technical Schemas](./registry/schemas/)**: Koleksi JSON Schema untuk validasi.

### 5. [Core Concepts (concepts/)](./concepts/)
Dokumen filosofi dan desain dasar.
- **[SBA Feature Design](./concepts/SBA%20Feature%20Design.md)**: Rancangan fitur utama SBA.
- **[Finalize Intent Taxonomy](./concepts/Finalize%20Intent%20Taxonomy%20SBA%20(Global).md)**: Fondasi taksonomi semantik.
- **[Docs sebagai Single Source of Truth](./concepts/Docs%20sebagai%20Single%20Source%20of%20Truth%20-%20AFD.md)**: Filosofi dokumentasi sebagai pusat kendali.

---

## 🎯 Prinsip Utama
1. **Decoupling**: Memisahkan identitas agen dari kemampuannya.
2. **Determinism**: Memastikan routing tugas berdasarkan metadata dan kebijakan.
3. **Security**: Menerapkan Zero-Trust di level capability dan adapter.
4. **Interoperability**: Mendukung protokol standar seperti MCP, ACP, dan A2A.
