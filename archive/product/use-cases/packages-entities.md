# Paket: @sba/entities (Domain Entities)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen awal.

## Peran & Tanggung Jawab

- Mendefinisikan model domain (Conversation, Message, Document, Tenant) dan skema zod.

## Fitur Utama

- Tipe/validator; mapping DTO; helper transform.

## Integrasi

- Dipakai oleh `apps/web` (FSD) dan `apps/api` untuk DTO.

## Persyaratan Teknis

- TypeScript, zod.

## Tujuan Implementasi

- Konsistensi tipe lintas-modul.

## Batasan

- Tidak melakukan I/O.

## Error Handling

- Validasi ketat; error berisi detail.

## Logging & Monitoring

- Tidak ada.

## Kontribusi ke SBA

- Mengurangi mismatch data antara UI dan API.

## Skenario Utama

- Validasi input sebelum insert/update.

## Acceptance Criteria

- Skema zod sesuai kontrak.

## Test Plan

- Unit: validasi batasan & required fields.

## Flowchart

```mermaid
flowchart TD
  Apps --> Entities[@sba/entities]
```
