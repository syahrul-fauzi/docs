# Paket Dokumentasi Release – SBA-Agentic v1.1.0 (2025-12-08)

- Laporan Akhir: ./Laporan-Akhir.md
- Changelog: ./Changelog.md
- Instruksi Operasional: ./Instruksi-Operasional.md

Ringkasan Perubahan Utama:

- Queue stubs: melengkapi metode metrik/health/scheduler untuk kompatibilitas WorkerHealth/Metrics/Scheduler.
- Storage provider tests: normalisasi resolver path dan alias stub (AWS/GCS/Azure) di konfigurasi test.
- Orchestrator fixtures: integrasi validator schema di setup tests untuk eksekusi Tools API.
- CI artefak: audit laporan coverage dan penegakan gates threshold (statements 90%, branches 85%, functions 95%, lines 90%).
- Auth routes: implementasi register/login/logout (demo Express) dengan validasi input.
- Web: aksi "Open agent settings" via CustomEvent dan implement update/delete message di Chat.
- Error-handling: broadcast CustomEvent untuk toast/notifier + pengiriman analytics di production.
- ErrorBoundary: broadcast event produksi untuk integrasi provider pelacakan kesalahan.
- Docs: metadata search server-side via util generateDocMetadata untuk query.
- Marketing: integrasi AG Events via CustomEvent pada ContactForm dan LeadForm.
