## Tool Manifest — Spec Detail

### Tujuan

Menyediakan deskripsi terstruktur dan dapat dibaca mesin dari setiap tool yang tersedia di Rube.

### Schema Minimum

```ts
ToolManifest {
  toolId: string
  name: string
  description: string
  version: string
  inputSchema: JSONSchema
  outputSchema: JSONSchema
  capabilitiesRequired: Capability[]
  safetyLevel: "safe" | "caution" | "dangerous"
  simulationMode: boolean
}
```

### Batasan

- Setiap tool harus memiliki manifest yang valid.
- `toolId` harus unik secara global.
- `inputSchema` dan `outputSchema` harus berupa JSON Schema Draft 7 yang valid.

### Failure Mode

| Kasus                | Respons                      |
| -------------------- | ---------------------------- |
| Manifest tidak valid | Gagal memuat tool, log error |
| `toolId` duplikat    | Gagal memuat tool, log error |
