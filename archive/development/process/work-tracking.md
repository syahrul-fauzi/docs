# Sistem Pelacakan Pekerjaan

Tujuan: memantau status, prioritas, progres, hambatan, dan target waktu penyelesaian untuk setiap pekerjaan yang sedang berjalan.

Struktur status:

- pending: belum mulai
- in_progress: sedang dikerjakan
- blocked: terhambat
- completed: selesai

Atribut tugas yang dilacak:

- id, judul singkat
- status, prioritas (high/medium/low)
- deadline (ISO8601)
- urgensi (1–5), dampak (1–5), kompleksitas (1–5)
- owner, dependensi
- progres (%), langkah_tersisa (ringkas), sumber_daya
- target_selesai (ISO8601), selesai_pada (ISO8601)
- hambatan, solusi

Penempatan berkas:

- `docs/process/current-tasks.json` — sumber kebenaran daftar tugas saat ini
- `docs/reports/final-report.md` — laporan akhir ketika semua tugas telah selesai

Prosedur pembaruan:

- Tambah/edit entri di `current-tasks.json` setiap perubahan status atau progres
- Saat tugas selesai: set `status=completed`, isi `selesai_pada`, pindahkan ringkasan ke laporan akhir

Quality control:

- Gunakan checklist di `docs/process/qc-checklist.md` sebelum menandai tugas completed
