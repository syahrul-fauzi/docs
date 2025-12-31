# Architecture Patterns: Greeter & Hybrid Context

Dokumen ini mendefinisikan pola arsitektur inti yang digunakan dalam SBA-Agentic untuk menangani interaksi pengguna dan manajemen konteks.

## 1. Greeter Pattern (Intent Resolution)

Greeter Agent berfungsi sebagai pintu masuk utama (Agentic Front Door) yang bertanggung jawab untuk menyapa pengguna, mengidentifikasi intent, dan merutekan permintaan ke agen spesialis yang tepat.

```mermaid
sequenceDiagram
    participant User as User
    participant AFD as Agentic Front Door (Greeter)
    participant IRS as Intent Resolution Service
    participant CP as Control Plane (Orchestrator)
    participant Agent as Specialized Agent (BPA/CX/DA)

    User->>AFD: Submit Prompt / Interaction
    AFD->>IRS: Resolve Intent (Context + Prompt)
    IRS-->>AFD: Intent (e.g., "PAYMENT_INQUIRY") + Confidence
    
    ALT Confidence > 0.8
        AFD->>CP: Dispatch Task to Specialized Agent
        CP->>Agent: Execute Business Logic
        Agent-->>CP: Result
        CP-->>AFD: Formatted Response
    ELSE Confidence <= 0.8
        AFD->>User: Clarification Request ("Dapatkah Anda memperjelas?")
    END
    
    AFD-->>User: Final Response / Feedback Loop
```

### Key Components:
- **Greeter Agent**: Menangani `interaction.greet` dan memelihara keramahan brand.
- **Intent Resolution Service**: Menggunakan Semantic Router untuk memetakan prompt ke kategori intent.
- **Specialized Agents**: Agen yang memiliki kapabilitas spesifik (misalnya, `BusinessPaymentAgent`).

---

## 2. Hybrid Context Repository

SBA-Agentic menggunakan strategi penyimpanan hibrida untuk mengoptimalkan integritas data relasional dan skalabilitas data dokumen.

```mermaid
graph TD
    subgraph "Persistent Storage (PostgreSQL)"
        UP[UserProfile]
        TENANT[Tenant Config]
        AUDIT[Audit Logs]
    end

    subgraph "Session Storage (MongoDB)"
        CONV[Conversations]
        INT[Interactions]
        STATE[Agent State]
    end

    subgraph "Logic Layer"
        HCR[HybridContextRepository]
    end

    User -->|Auth| UP
    HCR -->|Fetch Profile| UP
    HCR -->|Fetch Session| CONV
    HCR -->|Store History| INT
    
    UP ---|userId| CONV
    CONV ---|conversationId| INT
```

### Data Distribution:
- **PostgreSQL**: Digunakan untuk data yang memerlukan konsistensi ACID tinggi dan relasi kompleks (Profile, Tenant, Permissions).
- **MongoDB**: Digunakan untuk data bervolume tinggi, semi-terstruktur, dan berumur pendek (Chat History, Temporary Agent State, Telemetry).
- **HybridContextRepository**: Abstraksi yang menyatukan kedua sumber data ini, memberikan interface tunggal bagi agen untuk mengakses konteks lengkap pengguna.

---
Terakhir diperbarui: 2026-01-01
