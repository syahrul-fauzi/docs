# Panduan Migrasi ke Prisma — SBA-Agentic

## Persiapan Lingkungan

- Pastikan `DATABASE_URL` mengarah ke Supabase Postgres.
- Instal CLI Prisma: `npm i -D prisma` dan `npx prisma init` bila belum.
- Backup database (snapshot) sebelum migrasi.

## Konversi Skema

- Terjemahkan skema SQL internal ke model Prisma (tipe `String(uuid)`, `Json`, `DateTime`).
- Tambahkan relasi `AgentRun`→`AgentStep` dan `AgentRun`→`ToolCall`, indeks pada `tenantId`, `createdAt`.
- Review `apps/api/prisma/schema.prisma` dan sesuaikan bila ada kebutuhan agregasi.

## Menjalankan Migrasi

- Generate: `npx prisma migrate dev --name init_service_tables`.
- Review diff: cek tipe kolom, nullability, dan FK.
- Jalankan di staging: `npx prisma migrate deploy`; verifikasi;
- Siapkan rollback plan (`prisma migrate resolve --rolled-back` bila perlu).

## Penanganan Data yang Ada

- Migrasikan data runs/steps/tool_calls dari tabel lama (jika berbeda) dengan skrip ETL.
- Pertahankan ID dan `tenantId` untuk konsistensi.
- Verifikasi jumlah baris dan relasi sesuai harapan.

## Wiring Repository

- Implementasi repository Prisma: `apps/api/src/infrastructure/database/*PrismaRepository.ts`.
- Gunakan transaksi untuk operasi atomik: `prisma.$transaction([run, steps, calls])`.

## Testing & Validasi

- Unit: buat test untuk create/list/update/delete pada setiap repository.
- Integrasi: jalankan alur end-to-end run → steps → toolcalls → audit/metrics.
- Performa: ukur latensi query dan tambahkan indeks tambahan bila diperlukan.

## Troubleshooting Umum

- Konflik migrasi: re-run generate dengan nama berbeda; periksa skema existing.
- Nullability: sesuaikan default dan optional di model Prisma.
- Index lambat: tambahkan indeks komposit (mis. `(tenantId, createdAt)`).

## Checklist Migrasi

- [ ] `schema.prisma` lengkap dan tervalidasi.
- [ ] Migrasi sukses di staging; rollback plan tersedia.
- [ ] Repository Prisma aktif dan dipakai oleh service.
- [ ] Test lulus (unit/integrasi/e2e); coverage sesuai threshold.
- [ ] Dokumentasi diperbarui (kebijakan rate-limit & panduan migrasi).
