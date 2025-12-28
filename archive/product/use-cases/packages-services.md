# Paket: @sba/services (Domain Services)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen awal.

## Peran & Tanggung Jawab

- Menyediakan layanan domain (conversations/messages/documents) di atas repos/clients.

## Fitur Utama

- Orkestrasi operasi CRUD, caching ringan, policy.

## Integrasi

- Dipakai oleh `apps/web`; bisa dipakai `apps/app` bila perlu.

## Persyaratan Teknis

- TypeScript, TanStack Query adapter (opsional).

## Tujuan Implementasi

- Memisahkan logic dari UI; memudahkan reuse.

## Batasan

- Tidak menyentuh antrean backend.

## Error Handling

- Normalisasi error dari repos; retry kebijakan.

## Logging & Monitoring

- Hooks untuk analitik.

## Kontribusi ke SBA

- Mempercepat feature delivery dengan layer terstruktur.

## Skenario Utama

- Create conversation + first message.

## Acceptance Criteria

- Operasi atomik dan konsisten.

## Test Plan

- Unit layanan; integrasi dengan repos mock.

## Flowchart

```mermaid
flowchart TD
  UI --> Services[@sba/services]
  Services --> Repos
```
