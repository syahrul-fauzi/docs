---
title: Atomic Design Architecture for SBA-Agentic
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [ui, frontend, atomic-design, design-system, monorepo]
---

# Atomic Design — Arsitektur SBA-Agentic

Berdasarkan struktur `packages/ui` yang sudah ada dan konteks tujuan SaaS / dashboard SBA, berikut _refinement strategy_ yang sangat mendetail untuk meningkatkan `packages/ui` agar lebih modular, maintainable, dan scalable. Ide-ide ini menggabungkan best practices dari **atomic design**, **arsitektur monorepo**, clean code, serta kebutuhan **multi-tenant SaaS**.

## 1. Arsitektur & Struktur Komponen

### 1. Pertegas Layer Atomic Design
- Gunakan hierarki _Atoms → Molecules → Organisms → Templates → Pages_: ini adalah inti atomic design dan membantu modularitas UI.
- Untuk library UI: atoms (seperti `Button`, `Input`, `Badge`), molecules (mis `FormField`, `SearchBar`, `StatusCard`), dan organisms (mis `Sidebar`, `Header`, panel KPI) harus sangat bersih dan tidak mencampur logika domain.
- Templates: buat layout template dashboard (mis. `DashboardLayout`) yang menggabungkan organisme seperti sidebar, header, content-area.

### 2. Pisahkan Domain-UI (ag-ui) vs Design System Generik
- Komponen di `ag-ui` yang khusus untuk fitur agen / WebSocket / dialog AI dibiarkan di `ag-ui`.
- Komponen generic / design-system ditempatkan di `atoms/`, `molecules/`, `organisms/`, `templates/`. Ini menjaga UI package tetap reusable dan terpisah dari logika domain.
- Pastikan tidak ada duplikasi “atom” antara `ag-ui` and `atoms/` — jika tombol di `ag-ui` hanya styling custom, wrap atom `Button` dari `atoms/` alih-alih membuat ulang komponen penuh.

### 3. Gunakan Pola Presentational vs Container Components
- Container (atau “smart”) components: berada di layer aplikasi (`apps/…`) atau `ag-ui`, mengurus state, fetching, business logic.
- Presentational components: berada di `packages/ui`, hanya menerima prop dan berfokus pada rendering UI. Ini sejalan dengan prinsip _Single Responsibility_.
- Ini memisahkan logika domain dari UI, membuat testing lebih mudah dan komponen lebih reusable.

### 4. Modular Directory Structure di Monorepo
- Organisir kembali struktur paket UI agar jelas: misalnya `packages/ui/tokens`, `packages/ui/primitives` (atau atoms), `packages/ui/components` (molecules & organisms), `packages/ui/templates`, dan `packages/ui/docs` (Storybook).
- Struktur ini mirip dengan praktik enterprise design system menggunakan Turborepo atau monorepo lain.
- Pastikan CI/CD pipeline monorepo tahu dependensi antar paket (mis. `ui` di-build terpisah) agar perubahan UI tidak merusak bagian lain tanpa disadari.

---

## 2. Theming & Design Token

### 1. Design Tokens
- Definisikan design tokens untuk warna, tipografi, spacing, radius, shadow, dsb. Gunakan struktur token yang bisa di-_scale_ dan di-_override_ sesuai tenant.
- Gunakan library style-dictionary atau custom abstraction agar token bisa dibagi dan dikelola di monorepo. Ini memudahkan perubahan tema (mis. branding tenant) secara konsisten.

### 2. Theming Dinamis untuk Multi-Tenant
- Implementasikan _ThemeProvider_ di UI library, misalnya lewat React Context + CSS-in-JS (Emotion, Styled Components) atau CSS variables, agar tema bisa diubah per tenant.
- Komponen atomic harus mendukung varian tema (light/dark, brand color, dsb) melalui props atau tema.
- Pastikan override tema aman dan efisien: ketika tenant customizes tema (warna, radius, dsb), hal itu tidak menyebabkan pemisahan besar dalam bundle — idealnya gunakan tema dinamis atau runtime theming.

---

## 3. State Management & Logika

### 1. Manajemen State yang Tepat
- Gunakan state lokal untuk atom/molekul UI sederhana (mis. toggle switch, input value).
- Gunakan Context atau custom hook untuk state global seperti tema, notifikasi. Hindari state global di atomic components yang sering berubah karena bisa menyebabkan re-render berlebihan.
- Untuk data bisnis (mis. status agen, WebSocket, metrik KPI): letakkan di layer domain (container, hook di `ag-ui`), bukan di dalam UI atoms.

### 2. Separation of Concerns / Clean Architecture
- Terapkan prinsip Clean Architecture: business logic (use-cases, servis domain) terpisah dari presentasi.
- Gunakan dependency inversion: UI (layer atas) tidak punya knowledge konkret tentang detail implementasi domain — bisa pakai hook, services, interface.
- Untuk testing: mock hook domain dalam komponen atom/molecule agar bisa diuji secara isolasi, serta test logika domain di layer terpisah.

---

## 4. Reusabilitas & Komposabilitas

### 1. Gunakan Compound Component Pattern
- Untuk komponen yang lebih kompleks dan fleksibel (mis. modal, tabs, accordion), pertimbangkan pola compound component agar logic dan markup bisa dikomposisi secara fleksibel.
- Pastikan API komponen fleksibel: misal `Modal` punya sub-komponen `Modal.Header`, `Modal.Body`, `Modal.Footer`.

### 2. Audit dan Konsolidasi Komponen
- Jangan buat versi komponen baru setiap kali diperlukan: audit library UI secara berkala untuk mengidentifikasi duplikasi (mis. banyak varian `Button` hampir sama).
- Terapkan konvensi penamaan dan folder agar konsisten (mis. `atoms/Button`, `molecules/FormField`, dsb).
- Buat panduan kontribusi (governance) agar developer dan desainer paham kapan harus menambah atom baru, kapan membuat molecule, dan kapan refactor komponen.

---

## 5. Performa & Optimisasi

### 1. Code Splitting / Lazy Loading
- Untuk komponen UI besar (mis. `AGAgentDialog`, dialog monitoring), gunakan `React.lazy` and `Suspense` agar tidak membebani bundle awal.
- Gunakan skeleton loader di atom `Skeleton` untuk placeholder saat data belum dimuat agar UX tetap halus.

### 2. Memoization dan Rekalkulasi Minim
- Gunakan `React.memo`, `useMemo` untuk komponen atom / molekul yang menerima props kompleks agar tidak re-render tanpa perlu.
- Filter dan kalkulasi data (mis. agregasi KPI) harus dilakukan di hook domain atau container, bukan di dalam atom UI.

---

## 6. Testing & Dokumentasi

### 1. Storybook & Dokumentasi Komponen
- Integrasikan Storybook atau alat serupa agar semua atom, molecule, organism bisa dieksplorasi, diuji, dan didokumentasikan.
- Sertakan varian tema (tema default, tema tenant) di Storybook agar reviewer (desainer, PO) bisa melihat bagaimana UI berubah per tema.
- Dokumentasikan API komponen (props, event, varian) dan guideline penggunaan (kapan pakai atom vs molecule vs organism).

### 2. Testing Unit & Aksesibilitas
- Komponen atom dan molecule diuji dengan Jest + React Testing Library. Pastikan edge-case, varian props, and accessibility (a11y) diuji.
- Pastikan komponen UI mendukung keyboard navigation, aria-label, dan kontras warna tinggi agar aksesibilitas terjaga.

---

## 7. Governance & Kolaborasi Tim

### 1. Standar Kontribusi
- Buat RFC (request-for-change) workflow untuk perubahan besar di design system UI (mis. menambah atomic baru, mengubah token).
- Buat aturan versi semantik (SemVer) untuk paket `ui` agar perubahan breaking UI bisa ditangani dengan hati-hati.
- Gunakan CI/CD (mis. Turborepo) untuk otomatis lint, test, dan build `ui` paket saat ada PR. Praktik ini memperkuat governance.

### 2. Kolaborasi antara Designer dan Developer
- Pastikan desainer memahami struktur atomic design dan mampu men-design di Figma dengan hierarchy Atoms → Molecules → Organisms.
- Pertahankan komunikasi terus-menerus: desainer memberi masukan komponen baru, developer membangun atom/molecule baru, dan ada audit rutin agar tidak ada duplikasi yang tidak perlu.

---

## Risiko & Mitigasi

| Risiko | Mitigasi |
| :--- | :--- |
| Over-abstraksi → Komponen terlalu granular | Lakukan audit komponen reguler, konsolidasi versi komponen yang mirip. |
| Tema per-tenant menjadi kompleks | Batasi override tema hanya pada design token, jangan override logika komponen; gunakan runtime theming dengan Context atau CSS variable. |
| Bundle size meningkat | Gunakan code-splitting, lazy-loading, dan optimasi memoization. |
| Konsistensi UI menurun saat banyak kontributor | Terapkan governance melalui RFC, review PR, dokumentasi di Storybook. |

---

## Kesimpulan

- Dengan memperkuat arsitektur atomic design di `packages/ui` dan memisahkan domain-specific UI (`ag-ui`) dari design-system generik, kamu akan mendapat UI yang lebih modular, reuseable, dan maintainable.
- Theming dinamis dan design token sangat penting untuk SaaS multi-tenant seperti SBA.
- Manajemen state dan logika positif harus dipisahkan dari presentasi UI menurut prinsip clean architecture.
- Testing, dokumentasi, dan governance sangat krusial agar system UI tumbuh sehat dan terjaga seiring skala tim dan produk.
