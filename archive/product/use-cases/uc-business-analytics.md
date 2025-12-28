# Use Case: Analisis Data Bisnis

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen pendalaman awal.
  Penanggung Jawab: SBA Docs Team — contact: docs@sba.local

## Deskripsi

Menjawab pertanyaan analitik bisnis melalui pipeline agentik yang mengakses dataset internal/eksternal, mengeksekusi agregasi, dan menyajikan insight secara streaming dengan opsi penyimpanan hasil ke dokumen.

Referensi: docs/README.md:80-89

## Aktor

- Pengguna (analyst)
- Admin (kebijakan data, akses)
- apps/app (memulai run & konsumsi stream)
- apps/api (orchestrator pipeline)
- Supabase (penyimpanan insight/dokumen)
- SistemEksternal (LLM, BI, data sources)

## Preconditions

- Sumber data tersedia dan kredensial aman
- Pengguna memiliki izin sesuai data governance

## Postconditions

- Insight tersimpan dengan metadata, rekomendasi tindakan tersedia
- Audit trail untuk akses/kueri tercatat

## Alur Utama

1. Pengguna mengirim pertanyaan analitik
2. apps/app memulai run; apps/api membangun pipeline
3. Streaming hasil parsial (delta, status)
4. Pengguna menandai insight dan menyimpan ringkasan ke dokumen

## Alur Alternatif & Pengecualian

- Rate limit kueri tercapai → tunda/queue
- Sumber data tidak tersedia → fallback dataset lain atau cache
- Validasi skema gagal → BAD_REQUEST, saran perbaikan input

## Aturan Bisnis

- Data governance ketat; akses berbasis peran
- Audit dan retensi kueri; redaksi data sensitif
- Batas biaya/latensi untuk sumber eksternal

## Persyaratan Non-Fungsional

- p95 respon < 2s untuk insight ringan; batch untuk berat
- Keandalan streaming; retry backoff untuk koneksi
- Keamanan kredensial; tidak diekspos ke klien

## Diagram Use Case

```mermaid
usecaseDiagram
actor User as Analyst
actor Admin

Analyst -- (Ajukan Pertanyaan)
(Admin) -- (Kelola Akses Data)
(Ajukan Pertanyaan) ..> (Orkestrasi Pipeline) : <<include>>
(Orkestrasi Pipeline) ..> (Streaming Insight) : <<include>>
(Streaming Insight) ..> (Simpan ke Dokumen) : <<extend>>
```

## Acceptance Criteria

- Insight ditampilkan real-time dan dapat disimpan
- Kebijakan data dipatuhi; kueri diaudit

## Referensi Teknis

- docs/architecture/README.md:67-70
- docs/architecture/RELATIONS.md:14-24
