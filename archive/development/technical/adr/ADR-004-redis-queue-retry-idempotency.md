# ADR-004 — Redis Queue Retry & Idempotensi

Versi: 1.0.0
Tanggal: 2025-12-05
Status: Draft

## Konteks

Antrean BullMQ/ioredis memerlukan strategi retry dan idempotensi untuk operasi side-effect.

## Keputusan

- Retry exponential backoff dengan max attempts yang terukur.
- IdempotencyKey untuk operasi create/update di tools (task/render) dan enqueue.

## Implementasi

- Simpan hash IdempotencyKey di Redis; tolak duplikasi.
- Metrik `queue_retry_attempts_total`, `idempotent_hits_total`.

## Dampak

- Mengurangi duplikasi dan meningkatkan reliabilitas.
