## Capability Matrix — Spec Detail

### Tujuan

Mendefinisikan izin yang diperlukan untuk setiap tool dan bagaimana izin tersebut diberlakukan.

### Struktur

```ts
PermissionMatrix {
  toolId: string
  requiredRoles: UserRole[]
  requiredCapabilities: Capability[]
  tenantScoped: boolean
}
```

### Batasan

- Setiap tool harus memiliki entri dalam matriks izin.
- Izin diberlakukan pada saat runtime oleh Rube Tool Layer.

### Failure Mode

| Kasus              | Respons                                       |
| ------------------ | --------------------------------------------- |
| Izin tidak memadai | Tolak eksekusi tool, emit `permission.denied` |
