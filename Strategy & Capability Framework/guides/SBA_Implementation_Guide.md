# SBA-Agentic Implementation Guide
**Version**: 1.0.0
**Target**: Enterprise Developers & Architects

---

## 1. Pendahuluan

Panduan ini menjelaskan langkah-langkah untuk mengimplementasikan **Smart Business Assistant (SBA-Agentic)** dari awal hingga siap produksi. Fokus utama adalah integrasi antara **Agentic Front Door (AFD)**, **Control Plane (CP)**, dan **Agent Runtime (AR)** menggunakan **Agent Runtime SDK**.

## 2. Tahap 1: Setup Infrastructure & Monorepo

SBA-Agentic menggunakan struktur monorepo berbasis Turborepo.

1.  **Initialize Monorepo**:
    ```bash
    npx create-turbo@latest sba-agentic
    ```
2.  **Install Core Dependencies**:
    Pastikan `@sba/sdk`, `@sba/ui`, dan `@sba/supabase` tersedia di folder `packages/`.
3.  **Environment Variables**:
    Konfigurasi `.env` untuk masing-masing app (`apps/front-door`, `apps/app`, `apps/api`).

## 3. Tahap 2: Implementasi Agentic Front Door (AFD)

AFD adalah gerbang pertama yang menangani intent user.

1.  **Intent Classification**:
    Gunakan LLM (misal: Claude 3.5 Sonnet) untuk memetakan input user ke `intentId` yang didefinisikan di `registry/Intent Registry YAML`.
2.  **Context Aggregation**:
    Kumpulkan data user (auth), tenant, dan state percakapan saat ini.
3.  **Handoff to Control Plane**:
    Kirim payload terstruktur ke endpoint `/api/v1/plan` di Control Plane.

## 4. Tahap 3: Konfigurasi Control Plane (CP)

Control Plane adalah otoritas keputusan.

1.  **Capability Registry**:
    Daftarkan semua Capability Adapter yang tersedia di `registry/Capability Registry YAML`.
2.  **Policy Definition (Rube Engine)**:
    Buat aturan di `.trae/rules/` (BPA, CX, DA, SI) untuk mengontrol akses capability berdasarkan tier tenant.
3.  **Execution Planner**:
    Implementasikan logika untuk menghasilkan **Execution Plan** yang ditandatangani (signed) jika validasi kebijakan berhasil.

## 5. Tahap 4: Pengembangan Capability Adapter

Gunakan SDK untuk membuat unit eksekusi yang aman.

1.  **Create Capability Folder**:
    `packages/capabilities/[domain]/[capability-name]/`
2.  **Define Schema**:
53→    Gunakan Zod di `schema.ts` untuk input dan output.
54→3.  **Implement Adapter**:
55→    Wajib mewarisi `BaseAdapter` dari SDK dan menyertakan `getManifest()` untuk dukungan MCP. Lihat [Agent Implementation Guide](./Agent%20Implementation%20Guide.md) untuk detail teknis.
56→4.  **Resilience**:
57→    Gunakan wrapper `withResilience` atau `recoveryPolicy` di SDK untuk menangani retry dan circuit breaking.

## 6. Tahap 5: Runtime Execution & Observability

1.  **Agent Runtime SDK**:
    Pastikan runtime memverifikasi signature Execution Plan sebelum memanggil adapter.
2.  **Tracing**:
    Aktifkan OpenTelemetry untuk melihat alur `AFD -> CP -> AR -> Adapter`.
3.  **Audit Logs**:
    Setiap eksekusi harus dicatat ke database audit via `@sba/supabase`.

---

## 7. Enterprise Hardening & Security

Untuk mencapai standar produksi enterprise, terapkan langkah-langkah pengerasan berikut:

### 7.1 Security & Authentication
- **mTLS**: Gunakan Mutual TLS untuk komunikasi antar-layanan (AFD <-> CP <-> AR).
- **Execution Permit Signing**: Gunakan asymmetric encryption (RSA/ECDSA) untuk menandatangani `ExecutionPlan`. Agent Runtime harus memiliki public key untuk memverifikasi.
- **Data Encryption**: Selalu enkripsi data sensitif (PII) di database audit menggunakan AES-256.

### 7.2 Scalability & Availability
- **Horizontal Scaling**: Jalankan AFD dan Agent Runtime sebagai stateless services di Kubernetes (K8s).
- **Global Load Balancing**: Gunakan Cloudflare atau AWS Global Accelerator untuk AFD guna meminimalkan latensi.
- **Circuit Breaker Persistence**: Simpan status circuit breaker di Redis agar tersinkronisasi antar-instance Agent Runtime.

### 7.3 Multi-tenancy Isolation
- **Logical Isolation**: Pastikan setiap query database menggunakan `tenant_id` di klausa `WHERE`.
- **Resource Quotas**: Batasi jumlah eksekusi simultan per tenant untuk mencegah *Noisy Neighbor effect*.

## 8. CI/CD & Deployment Strategy

SBA-Agentic mengikuti pola **GitOps** untuk rilis capability.

1.  **Capability Testing**: Setiap PR untuk capability baru harus melewati unit test (min. 80% coverage) dan integration test.
2.  **Schema Registry Sync**: Saat merge, sinkronisasikan Zod schema ke **Central Schema Registry** agar AFD dan CP memiliki definisi terbaru.
3.  **Canary Deployment**: Rilis capability baru ke subset kecil tenant sebelum peluncuran penuh.
4.  **Automated Rollback**: Jika metrik error rate meningkat setelah rilis, sistem harus melakukan rollback otomatis ke versi capability sebelumnya.

---

## 9. Checklist Kesiapan Produksi

- [ ] **Security**: Signature verification aktif di Agent Runtime.
- [ ] **Isolation**: Tenant context diinjeksi secara read-only.
- [ ] **Resilience**: Timeout dan retry terkonfigurasi untuk setiap API eksternal.
- [ ] **Monitoring**: Dashboard Grafana/Jaeger terhubung untuk memantau latensi.
- [ ] **Compliance**: PII masking aktif pada log audit.
- [ ] **DRP**: Disaster Recovery Plan teruji (Database backup & service failover).

---

## 10. Referensi Lanjutan

- [Comprehensive Architecture](../02-architecture/COMPREHENSIVE_ARCHITECTURE.md)
- [Capability Adapter Example](./Capability%20Adapter%20Example.md)
- [Execution Plan Contract](../specs/Execution%20Plan%20Contract%20—%20Control%20Plane%20↔%20Agent%20Runtime.md)
- [Policy Enforcement Spec](../specs/Policy%20Enforcement%20Spec%20—%20Capability%20×%20Tenant%20×%20Risk.md)
