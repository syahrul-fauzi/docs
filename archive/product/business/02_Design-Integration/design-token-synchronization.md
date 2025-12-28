# 🎛 Design Token Synchronization

**Lokasi:** `docs/Business/02_Design-Integration/design-token-synchronization.md`

## 1. Tujuan

Menjamin sinkronisasi penuh antara design tokens di AG-UI dan kebutuhan domain bisnis.

## 2. Sumber Token

- `03_Design-System/tokens/`
- Figma Integration → `integrations/figma/map.json`
- AG-UI Foundation → `tokens-raw.json`

## 3. Mekanisme Sinkronisasi

1. Jalankan skrip `sync:tokens` setiap build.
2. Business layer dapat membaca `tokens.json` untuk kebutuhan styling adaptif.
3. Agent dapat mengubah preferensi (mode, warna) berdasarkan konteks user.

## 4. Contoh Penggunaan

```ts
import tokens from '@sba/design-tokens/color.json';

export const getBusinessColor = (level: 'info' | 'warning') => {
  return tokens.semantic[level];
};
```
