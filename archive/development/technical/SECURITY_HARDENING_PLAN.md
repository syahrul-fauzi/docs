# 🛡️ SBA-Agentic Security Hardening Plan

**Versi:** 1.0.0  
**Status:** Engineering Proposal  
**Last Updated:** 2025-12-28

## 1. Executive Summary

Dokumen ini merinci rencana penguatan keamanan (security hardening) untuk platform SBA-Agentic. Fokus utama adalah pada isolasi eksekusi tool, manajemen kredensial dinamis, dan transparansi operasional melalui audit logging yang komprehensif.

## 2. Tool Execution Sandboxing

Mengingat agen AI dapat memicu eksekusi kode atau interaksi API yang kompleks, isolasi lingkungan eksekusi adalah prioritas tertinggi.

### 2.1 V8 Isolation with `isolated-vm`
- **Implementasi:** Untuk tool yang memerlukan eksekusi JavaScript dinamis.
- **Mekanisme:** Menggunakan library `isolated-vm` untuk membuat isolate V8 terpisah dengan batasan memori (e.g., 128MB) dan waktu eksekusi (e.g., 5s).
- **Benefit:** Mencegah tool mengakses global scope Node.js atau melakukan operasi file system yang tidak sah.

### 2.2 Containerized Execution (Sidecar Pattern)
- **Implementasi:** Untuk tool yang memerlukan dependensi OS spesifik (e.g., Python scripts, CLI tools).
- **Mekanisme:** Menjalankan eksekusi di dalam container Docker *scratch* yang dibuang setelah eksekusi selesai (ephemeral containers).

## 3. Scoped & Short-lived Tool Tokens

Mencegah penyalahgunaan kredensial jangka panjang melalui tokenisasi dinamis.

### 3.1 Dynamic Scoped JWT
- **Alur:** Orchestrator meminta token dari `TokenService` sebelum memanggil `apps/api`.
- **Claims:** Token berisi `tenant_id`, `allowed_capabilities`, dan `exp` (maksimal 5 menit).
- **Enforcement:** `apps/api` memvalidasi token ini dan memastikan tool yang dipanggil ada dalam daftar `allowed_capabilities`.

### 3.2 Secret Redaction at Runtime
- Implementasi middleware di level API Gateway untuk memindai payload output tool dan secara otomatis menyamarkan (masking) pola sensitif (API Keys, Secrets) sebelum dikirim kembali ke Orchestrator.

## 4. Immutable Audit Logging & PII Masking

Memastikan setiap jejak reasoning agen dapat diaudit tanpa melanggar privasi data.

### 4.1 Recursive PII Masking
- **Worker:** `AuditLogWorker` (BullMQ) akan memproses setiap entri log.
- **Logika:** Menggunakan regex dan NLP untuk mendeteksi serta menyamarkan Email, Phone Number, dan Address di dalam field `reasoning` dan `metadata`.
- **Target:** Memastikan kepatuhan terhadap GDPR/CCPA.

### 4.2 Immutable Ledger
- **Storage:** Log audit disimpan di tabel Supabase dengan kebijakan RLS yang hanya mengizinkan `INSERT` (tidak ada `UPDATE` atau `DELETE`).
- **Integrity:** Penambahan hash chain pada setiap entri log untuk memastikan integritas data (jika satu entri diubah, hash selanjutnya akan tidak valid).

## 5. Zero Trust & Tenant Isolation

### 5.1 X-Tenant-ID Enforcement
- **Gateway:** Setiap request wajib menyertakan header `X-Tenant-ID`.
- **Validation:** Middleware memverifikasi hubungan antara `user_id` (dari JWT) dengan `tenant_id` yang diminta melalui tabel `tenant_members`.

### 5.2 Network Isolation
- Komunikasi antar service di dalam cluster (Orchestrator <-> API Gateway) wajib menggunakan mTLS (mutual TLS) untuk mencegah *man-in-the-middle attacks*.

## 6. Monitoring & Alerting Keamanan

- **Metrik:** Melacak jumlah kegagalan autentikasi, percobaan akses tool di luar scope, dan pelanggaran rate limit.
- **Alerts:** Pemicu notifikasi P0 (Critical) jika terdeteksi aktivitas anomali massal (e.g., > 100 kegagalan auth dalam 1 menit).

---

_Referensi: [SBA-Agentic-Comprehensive-Spec.md](../SBA-Agentic-Comprehensive-Spec.md), [agent-reasoning.md](../../.trae/rules/agent-reasoning.md)_
