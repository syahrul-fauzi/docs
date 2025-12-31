# SBA-Agentic Maintenance Checklist
version: 1.0.0
last_updated: 2025-12-31

Dokumen ini memberikan panduan pemeliharaan rutin untuk memastikan stabilitas, keamanan, dan performa ekosistem SBA-Agentic.

## 1. Daily Checks (Automated & Manual)
- [ ] **Agent Heartbeats**: Pastikan tidak ada agen kritis yang berstatus `stale` di Control Plane.
- [ ] **Error Rate Monitoring**: Cek dashboard Grafana untuk lonjakan `ERR_INTENT_NOT_FOUND` atau `ERR_NO_CAPABLE_AGENT`.
- [ ] **Resource Usage**: Monitor penggunaan CPU/RAM pada pod `sba-api` dan `agent-runtime`.
- [ ] **Log Audit**: Review log untuk mendeteksi upaya akses tidak sah (IBAC violations).

## 2. Weekly Maintenance
- [ ] **LLM Cost Review**: Analisis penggunaan token per tenant. Identifikasi pola pemborosan atau kebutuhan untuk semantic caching yang lebih agresif.
- [ ] **Registry Sync**: Pastikan semua agen yang terdaftar di registry masih aktif dan memiliki versi kapabilitas terbaru.
- [ ] **Knowledge Base Update**: Lakukan sinkronisasi ulang jika ada perubahan pada Federated Context Graph.
- [ ] **Database Vacuum/Cleanup**: Bersihkan log audit lama yang sudah melewati retensi policy (misal: > 30 hari).

## 3. Monthly Review
- [ ] **Capability Performance Analysis**: Review metrik SLA per kapabilitas. Apakah ada kapabilitas yang sering mengalami timeout?
- [ ] **Intent Taxonomy Tuning**: Update `Capability Coverage Map` berdasarkan query pengguna yang gagal dipetakan (Unresolved Intents).
- [ ] **Security Patching**: Update dependensi npm dan base image Docker untuk meminimalisir kerentanan.
- [ ] **Policy Audit**: Review `Policy Enforcement Spec` untuk memastikan aturan bisnis masih relevan.

## 4. Quarterly Strategic Review
- [ ] **Scalability Planning**: Proyeksi pertumbuhan tenant dan kebutuhan infrastruktur (Elastic Provisioning thresholds).
- [ ] **Agent Quality Assessment**: Review akurasi reasoning engine melalui sampling audit trail.
- [ ] **Compliance Check**: Pastikan implementasi PII masking dan data residency masih mematuhi regulasi terbaru.

## 5. Incident Response Quick-Steps
1. **Detect**: Anomali terdeteksi via alert Prometheus/Sentry.
2. **Isolate**: Aktifkan **Kill-Switch** untuk tenant atau agen yang terdampak via API.
3. **Analyze**: Gunakan `trace_id` dan `reasoning_trace_id` untuk melacak akar masalah.
4. **Resolve**: Rollback ke versi agen/config stabil sebelumnya.
5. **Verify**: Jalankan integration tests di staging sebelum deploy ulang.

---
*Gunakan dokumen ini bersama dengan [Operations and Monitoring.md](./Operations%20and%20Monitoring.md).*
