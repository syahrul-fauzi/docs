# SBA Registry Hub

Pusat registri semantik dan kapabilitas untuk **SBA-Agentic**. Direktori ini menyimpan sumber kebenaran (Source of Truth) untuk bagaimana sistem memahami maksud pengguna (Intent) dan bagaimana sistem mengeksekusi tugas (Capability).

## 📂 Konten Registri

### 1. [Intent Registry (Global SBA)](./Intent%20Registry%20YAML%20(Global%20SBA).md)
**Fokus**: Semantik & Psikologi User.
Katalog intent global yang mendefinisikan *apa* yang diinginkan pengguna. Dilengkapi dengan contoh, metadata semantik, dan kebijakan risiko awal.

### 2. [Capability Registry YAML (Control Plane Source of Truth)](./Capability%20Registry%20YAML%20(Control%20Plane%20Source%20of%20Truth).md)
**Fokus**: Eksekusi & Teknis.
Daftar seluruh kapabilitas yang tersedia di sistem, lengkap dengan endpoint API, schema input/output, dan batasan teknis.

### 3. [Capability Coverage Map](./Capability%20Coverage%20Map.md)
**Fokus**: Strategi & Roadmap.
Visualisasi dan pemetaan antara domain bisnis dengan kapabilitas yang sudah ada, sedang dikembangkan, atau direncanakan.

### 4. [AFD → Capability Mapping Matrix](./AFD%20→%20Capability%20Mapping%20Matrix.md)
**Fokus**: Routing & Integrasi.
Matriks yang menghubungkan Agentic Front Door (AFD) dengan kapabilitas spesifik melalui resolusi intent.

### 5. [Control Plane Routing Algorithm](./Control%20Plane%20Routing%20Algorithm%20(Deterministic%20&%20Policy-Aware).md)
**Fokus**: Logika & Kecerdasan.
Spesifikasi algoritma yang digunakan Control Plane untuk memilih rute terbaik berdasarkan Intent, Capability, dan Policy.

## 🧠 Konsep & Filosofi
Dokumen pendukung mengenai desain fitur dan taksonomi dapat ditemukan di folder [concepts/](../concepts/).

- [SBA Feature Design](../concepts/SBA%20Feature%20Design.md)
- [Finalize Intent Taxonomy](../concepts/Finalize%20Intent%20Taxonomy%20SBA%20(Global).md)
- [Docs sebagai Single Source of Truth](../concepts/Docs%20sebagai%20Single%20Source%20of%20Truth%20-%20AFD.md)

---

## 🛠️ Technical Schemas
Registri ini didukung oleh validasi schema ketat yang dapat ditemukan di folder [schemas/](./schemas/).

---

## 🔄 Alur Kerja Semantik
1. **Klasifikasi (AFD)**: Menggunakan [Intent Registry](./Intent%20Registry%20YAML%20(Global%20SBA).md) untuk menentukan maksud user dengan **Deterministic Routing (v2.3)**.
2. **Pemetaan (CP)**: Menggunakan [Mapping Matrix](./AFD%20→%20Capability%20Mapping%20Matrix.md) untuk menghubungkan intent ke kapabilitas teknis dengan **7-Step Enforcement**.
3. **Eksekusi (CP/AR)**: Mengambil detail teknis dari [Capability Registry](./Capability%20Registry%20YAML%20(Control%20Plane%20Source%20of%20Truth).md) untuk menjalankan aksi yang aman.
