# Pola Migrasi ke Facade Shared (HTTP & Realtime)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft pola migrasi.

## Langkah

- Ganti impor klien HTTP lokal dengan `@sba/api-client` typed helpers (`runsStart`, `tools/*`).
- Ganti manajer SSE/WS lokal dengan `@sba/realtime` (`RealtimeFacade` + adapter SSE/WS).
- Tambahkan feature flag untuk memilih adapter.

## Contoh apps/app

```ts
import { HttpClient } from '@sba/api-client';
import { RealtimeFacade, SSEAdapter } from '@sba/realtime';
const api = new HttpClient(process.env.NEXT_PUBLIC_API_URL!);
const realtime = new RealtimeFacade(new SSEAdapter('/api/proxy/agui/stream'));
realtime.start();
realtime.onMessage(ev => {
  /* render events */
});
```

## Contoh apps/web

```ts
import { HttpClient } from '@sba/api-client';
const api = new HttpClient('/api');
await api.runsStart({ tenantId, requestId, messages });
```

## Best Practices

- Validasi payload dengan `@sba/api-types` sebelum kirim.
- Tangani error standar dan telemetry.
