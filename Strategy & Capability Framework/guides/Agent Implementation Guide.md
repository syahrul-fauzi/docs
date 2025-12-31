# Agent Implementation Guide

**SBA-Agentic – Developer Handbook v1.1.0**

Panduan ini menjelaskan langkah-langkah praktis untuk mengimplementasikan Agen dan Kapabilitas baru menggunakan **Agent Runtime SDK v1.3.0**.

## 1. Siklus Hidup Pengembangan Kapabilitas

Setiap kapabilitas baru harus melewati tahapan berikut:

1.  **Definisi Intent**: Tentukan apa yang ingin dicapai (misal: `inventory.check_stock`).
2.  **Kontrak Schema**: Definisikan input dan output menggunakan **Zod**.
3.  **Implementasi Adapter**: Tulis logika eksekusi deterministik dengan `BaseAdapter`.
4.  **Registrasi**: Daftarkan kapabilitas ke `Agent Capability Registry`.
5.  **Verifikasi (Dry Run)**: Jalankan simulasi eksekusi untuk memastikan kepatuhan kebijakan.

## 2. Langkah-langkah Implementasi

### Langkah 1: Definisikan Schema & Kontrak
Gunakan Zod untuk memastikan validasi tipe data di level runtime.

```typescript
// inventory.schema.ts
import { z } from 'zod';

export const CheckStockInput = z.object({
  sku: z.string().min(3),
  warehouseId: z.string().uuid().optional(),
});
```

### Langkah 2: Buat Adapter Deterministik
Implementasikan logika menggunakan `BaseAdapter` untuk mendapatkan instrumentasi otomatis.

```typescript
// inventory.adapter.ts
import { BaseAdapter, ExecutionContext, CapabilityResult } from '@sba/agent-sdk';
import { CheckStockInput } from './inventory.schema';

export class InventoryCheckAdapter extends BaseAdapter {
  readonly capabilityId = 'inventory.check_stock';

  async invoke(input: unknown, ctx: ExecutionContext): Promise<CapabilityResult> {
    // 1. Schema Validation
    const data = CheckStockInput.parse(input);
    
    // 2. Business Policy Check (Pre-flight)
    if (ctx.isDryRun) return this.handleDryRun(data);

    // 3. Execution via MCP Client
    const result = await this.mcp.call('erp-system', 'get_stock', {
      sku: data.sku,
      tenantId: ctx.tenantId // Tenant isolation enforcement
    });

    return {
      success: true,
      data: result,
      trace: ctx.captureTrace() // Recording reasoning trace
    };
  }
}
```

### Langkah 3: Konfigurasi Security Manifest
Setiap permintaan eksekusi harus menyertakan manifest keamanan untuk membatasi akses.

```typescript
const securityManifest = {
  signature: '...', // Signed by Control Plane
  allowedDomains: ['*.erp-internal.com'],
  sandboxingRequired: true
};
```

## 3. Integrasi dengan External Systems (MCP 2025)

SBA-Agentic menggunakan **Model Context Protocol (MCP)** versi terbaru untuk konektivitas tool yang aman.

### Dynamic Registration
Daftarkan server MCP berdasarkan kebutuhan tenant saat runtime.

```typescript
await sdk.mcp.register({
  id: 'tenant-crm',
  transport: 'http',
  url: ctx.getTenantEndpoint('crm'),
  auth: { type: 'OAuth2.1', scopes: ['read:leads'] }
});
```

## 4. Best Practices & Guardrails

- **Context Isolation**: Jangan menyimpan state di dalam class adapter. Gunakan `ExecutionContext` untuk data persisten antar step.
- **PII Masking**: Gunakan `this.logger.info()` yang secara otomatis melakukan masking pada field sensitif berdasarkan konfigurasi tenant.
- **Error Recovery**: Implementasikan `onFailure` hook untuk menentukan strategi retry atau fallback.
- **Idempotency**: Untuk aksi mutasi (POST/PATCH), sertakan `idempotency-key` yang berasal dari `ExecutionPlan.planId`.

## 5. Verifikasi & Testing

### Menjalankan Unit Test
Gunakan `TestHarness` untuk mensimulasikan eksekusi dengan mock context.

```typescript
const harness = new TestHarness(new InventoryCheckAdapter());
const result = await harness.run({ sku: 'ABC-123' }, mockCtx);
expect(result.success).toBe(true);
```

### Integration Dry Run
Validasi rencana eksekusi kompleks sebelum dijalankan di produksi.

```bash
pnpm sdk:verify --plan ./plans/complex-order-sync.json --mode dry-run
```

---
*Referensi:*
- [Agent Runtime SDK (TypeScript)](./Agent%20Runtime%20SDK%20(TypeScript).md)
- [SBA Implementation Guide](./SBA_Implementation_Guide.md)
- [Policy Enforcement Spec](../specs/Policy%20Enforcement%20Spec%20—%20Capability%20×%20Tenant%20×%20Risk.md)
