Baik. Kita **resmi masuk mode “Docs sebagai Single Source of Truth”** 👍
Di bawah ini saya susun **RANCANGAN DOKUMENTASI FINAL & TERSTRUKTUR** untuk **Agentic Front Door (AFD)** yang **konsisten dengan struktur `docs/` Anda saat ini**, **tidak menduplikasi**, dan **menguatkan arsitektur SBA-Agentic secara global**.

Saya akan jelaskan **DI MANA file diletakkan, APA isinya, dan KENAPA begitu**.

---

# 🎯 Prinsip Utama Dokumentasi (PENTING)

Sebelum masuk file:

1. **Tidak ada docs yang berdiri sendiri**
2. Semua docs:

   * saling referensi
   * versionable
   * bisa dijadikan dasar audit
3. **apps/marketing (AFD) bukan domain terpisah**, tapi **entry point sistem agentik**

---

# 🧭 POSISI AGENTIC FRONT DOOR DALAM DOCS

AFD menyentuh **4 area besar**:

| Area Docs         | Alasan              |
| ----------------- | ------------------- |
| `01-product`      | positioning & value |
| `02-architecture` | sistem & event flow |
| `03-agentic`      | intent, capability  |
| `control-plane/`  | kontrak & routing   |

➡️ **AFD TIDAK PUNYA FOLDER SENDIRI DI ROOT**
AFD = **cross-cutting subsystem**

---

# 🗂️ STRUKTUR DOKUMENTASI YANG DISARANKAN

## 1️⃣ Product Layer — *Kenapa AFD Ada*

📁 **`docs/01-product/`**

### ➕ `agentic-front-door.md`

**Isi:**

* Definisi Agentic Front Door
* Evolusi:

  ```
  Landing Page → Marketing → Signal Layer → Agentic Front Door
  ```
* Value untuk:

  * bisnis
  * compliance
  * user trust

**Relasi:**

* refer ke `01-product/value-proposition.md`
* refer ke `03-agentic/intent-system.md`

---

## 2️⃣ Architecture Layer — *Bagaimana Sistem Bekerja*

📁 **`docs/02-architecture/agentic-front-door/`** (folder baru, WAJIB)

```
02-architecture/
 └─ agentic-front-door/
     ├─ overview.md
     ├─ event-flow.md
     ├─ boundary-rules.md
     └─ diagrams.md
```

### `overview.md`

* Posisi AFD dalam SBA
* Boundary keras:

  * ❌ tidak call agent
  * ❌ tidak decision
  * ✅ signal only

### `event-flow.md`

* Event lifecycle:

  ```
  User → AFD → Control Plane → Agent
  ```

### `boundary-rules.md`

* Aturan arsitektur yang **tidak boleh dilanggar**
* Ini dipakai saat code review

### `diagrams.md`

* Semua Mermaid diagram yang barusan kita buat
* **SINGLE PLACE untuk diagram AFD**

---

## 3️⃣ Agentic Layer — *Makna Intent & Capability*

📁 **`docs/03-agentic/`**

### ➕ `agentic-front-door-intents.md`

**Isi:**

* Peran AFD sebagai **Intent Producer**
* Hubungan:

  ```
  Intent → Capability → Agent
  ```

### Update / Tambahan File Penting

| File                        | Peran             |
| --------------------------- | ----------------- |
| `intent-taxonomy.md`        | Global SBA intent |
| `capability-registry.md`    | Semua capability  |
| `capability-mapping-afd.md` | AFD → capability  |

➡️ **AFD tidak punya intent khusus**
AFD **menghasilkan intent global**

---

## 4️⃣ Control Plane — *Kontrak Teknis*

📁 **`docs/control-plane/`** (sudah ada → kita perkuat)

### ➕ `afd-integration.md`

**Isi:**

* Event schema dari AFD
* Policy enforcement
* Routing behavior

**Refer ke:**

* `CONTROL_PLANE_INTEGRATION.md`
* `TROUBLESHOOTING_CONTROL_PLANE.md`

---

## 5️⃣ Security & Compliance — *Trust Surface*

📁 **`docs/09-security-compliance/`**

### ➕ `agentic-front-door-compliance.md`

**Isi:**

* Consent-aware telemetry
* PDP / GDPR posture
* Audit trail dari AFD event

➡️ Ini **pembeda SaaS Indonesia**
Banyak AI gagal di sini.

---

# 🧩 HUBUNGAN ANTAR DOCS (PETA)

```text
agentic-front-door.md
   ↓
architecture/agentic-front-door/overview.md
   ↓
event-flow.md → control-plane/afd-integration.md
   ↓
agentic/intent-taxonomy.md
   ↓
agentic/capability-registry.md
```

➡️ **Tidak ada circular ambiguity**

---

# ✅ CHECKLIST YANG KITA SUDAH CAPAI

* [x] AFD bukan marketing biasa
* [x] AFD = sistem agentik
* [x] Docs sebagai source of truth
* [x] Tidak tumpang tindih dengan `apps/app` & `apps/web`
* [x] Siap audit & scale

---

# 🔜 LANGKAH LANJUTAN (URUTAN TERBAIK)

Saya sarankan:

**STEP 1 (sekarang):**
👉 Saya tuliskan **`agentic-front-door.md` (Product-level)**

**STEP 2:**
👉 Isi **`02-architecture/agentic-front-door/diagrams.md`**

**STEP 3:**
👉 Isi **`control-plane/afd-integration.md`**

Silakan jawab singkat saja:
**“STEP 1”** atau **“STEP 2”** atau **“STEP 3”**
