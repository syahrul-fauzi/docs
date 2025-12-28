# Kebijakan Rate-Limit — SBA-Agentic

## Konfigurasi

- HTTP key: `tenant|method|path|ip`
- WS key: `ws:tenant:user:ip:event`
- Env:
  - `RATE_LIMIT_WINDOW_MS` (default 60000)
  - `RATE_LIMIT_MAX` (default 120)
  - `WS_BROADCAST_MAX` (default 200)
  - `WS_BROADCAST_WINDOW_MS` (default 1000)
  - `REDIS_URL` (aktifkan backend Redis)

## Threshold & Periode

- HTTP: window 60 detik, max 120 request per key.
- WS broadcast: window 1 detik, max 200 emit per key.

## Penanganan Saat Limit Tercapai

- HTTP: respons `429` dengan payload `{ code: 'RATE_LIMITED' }`; tambahkan `Retry-After` bila applicable.
- WS: kirim event error dengan `retryAfterMs`, tahan eksekusi.

## Menyesuaikan Parameter

- Sesuaikan variabel env per lingkungan (staging/production) dan per-tenant bila diperlukan.
- Gunakan canary untuk perubahan besar dan uji beban sebelum roll-out.

## Implementasi

- HTTP interceptor: `apps/api/src/common/rate-limit.interceptor.ts`
- WS gateway: limiter & throttling: `apps/api/src/api/gateway/AgentStreamGateway.ts`
- Backend limiter: Redis dengan fallback memori: `apps/api/src/infrastructure/kv/rateLimit.ts`

## Best Practices

- Pisahkan limit per tenant/user untuk keadilan multi-tenant.
- Catat metrik 429 dan throttle, buat dashboard & alert.
- Hindari log berlebihan saat spike; gunakan sampling.

## Contoh

```ts
// HTTP
const result = await ratelimit.limit(`${tenantId}|${method}|${path}|${ip}`)
if (!result.success) throw new HttpException({...}, 429)

// WS
const rl = await ratelimit.limit(`ws:${tenantId}:${userId}:${ip}:executeTool`)
if (!rl.success) client.emit('error', { code: 'RATE_LIMITED', retryAfterMs: 10000 })
```
