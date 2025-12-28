## 08_tool-manifest-final.md — Tool Manifest Final (Rube)

Dokumen ini mendefinisikan manifest alat akhir untuk Rube, yang mencakup skema alat, matriks izin, serta aturan keselamatan dan simulasi.

**Kunci:**

- Tool schema
- Permission matrix
- Safety & simulation rule

**Generate:**

- Epics
- User stories
- Technical tasks (package-by-package)

---

## **1. Golden Rule: Tool Invocation**

> **Agent TIDAK BOLEH langsung memanggil sistem bisnis.**
> Semua lewat **Rube Tool Layer**.

---

## **2. Tool Manifest — Spec Detail**

### **Tujuan**

Menyediakan deskripsi terstruktur dan dapat dibaca mesin dari setiap tool yang tersedia di Rube.

### **Schema Minimum**

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

### **Batasan**

- Setiap tool harus memiliki manifest yang valid.
- `toolId` harus unik secara global.
- `inputSchema` dan `outputSchema` harus berupa JSON Schema Draft 7 yang valid.

### **Failure Mode**

| Kasus                | Respons                      |
| -------------------- | ---------------------------- |
| Manifest tidak valid | Gagal memuat tool, log error |
| `toolId` duplikat    | Gagal memuat tool, log error |

---

## **3. Permission Matrix — Spec Detail**

### **Tujuan**

Mendefinisikan izin yang diperlukan untuk setiap tool dan bagaimana izin tersebut diberlakukan.

### **Struktur**

```ts
PermissionMatrix {
  toolId: string
  requiredRoles: UserRole[]
  requiredCapabilities: Capability[]
  tenantScoped: boolean
}
```

### **Batasan**

- Setiap tool harus memiliki entri dalam matriks izin.
- Izin diberlakukan pada saat runtime oleh Rube Tool Layer.

### **Failure Mode**

| Kasus              | Respons                                       |
| ------------------ | --------------------------------------------- |
| Izin tidak memadai | Tolak eksekusi tool, emit `permission.denied` |

---

## **4. Safety & Simulation Rules — Spec Detail**

### **Tujuan**

Menyediakan mekanisme untuk mengontrol eksekusi tool yang berpotensi berbahaya dan memungkinkan simulasi.

### **Aturan Keselamatan**

- Tool dengan `safetyLevel: "dangerous"` memerlukan persetujuan `ReviewerAgent`.
- Tool dengan `safetyLevel: "caution"` memicu peringatan di AG-UI.

### **Aturan Simulasi**

- Jika `simulationMode: true`, tool tidak akan melakukan tindakan nyata, melainkan mengembalikan output simulasi.
- Output simulasi harus sesuai dengan `outputSchema` tool.

### **Failure Mode**

| Kasus                            | Respons                                 |
| -------------------------------- | --------------------------------------- |
| Tool berbahaya tanpa persetujuan | Tolak eksekusi, emit `safety.violation` |
| Output simulasi tidak valid      | Log error, kembalikan error generik     |

---

## **EPIC 1 — Tool Manifest Management**

**Stories**

- [ ] Implementasi Tool Manifest Schema Validation
- [ ] API untuk pendaftaran & pembaruan Tool Manifest
- [ ] UI untuk melihat & mengelola Tool Manifest

---

## **EPIC 2 — Tool Execution & Permissions**

**Stories**

- [ ] Middleware penegakan izin di Rube Tool Layer
- [ ] Integrasi RBAC dengan Permission Matrix
- [ ] Mekanisme Scoped Tool Token Generation

---

## **EPIC 3 — Safety & Simulation**

**Stories**

- [ ] Implementasi Safety Level Enforcement
- [ ] Mode Simulasi untuk setiap tool
- [ ] UI untuk konfigurasi Safety & Simulation

---

## **EPIC 4 — Tool Discovery & Governance**

**Stories**

- [ ] Tool Catalog API
- [ ] Audit trail untuk perubahan Tool Manifest & Permission Matrix
- [ ] Integrasi dengan ObserverAgent untuk pemantauan kepatuhan tool

---

# **Kesimpulan (PENTING)**

Dengan spesifikasi Tool Manifest ini:

- ✅ Semua tool terdefinisi dengan jelas & terstruktur.
- ✅ Keamanan & izin tool diberlakukan secara ketat.
- ✅ Eksekusi tool berbahaya dapat dikontrol & disimulasikan.
- ✅ Memastikan kepatuhan & auditabilitas di seluruh sistem.
