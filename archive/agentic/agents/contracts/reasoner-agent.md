## 4️⃣ Reasoner Agent Contract

📄 `docs/agents/contracts/reasoner-agent.md`

### 4.1 Fungsi

- Menilai **kelayakan plan**
- Melakukan **risk scoring**
- Mengikat plan ke **policy & compliance**

### 4.2 Decision Matrix

| Aspek      | Validasi                  |
| ---------- | ------------------------- |
| Tenant     | Apakah data cross-tenant? |
| Capability | Apakah role boleh?        |
| Tool Class | Read / Write / External   |
| Compliance | PDP / Audit               |

### 4.3 Output

```ts
interface ReasoningDecision {
  planId: string;
  decision: 'approve' | 'modify' | 'reject';
  riskScore: number; // 0–100
  requiredGuards?: string[];
  explanation: string;
}
```

📌 Jika `riskScore > threshold` → **human-in-the-loop**
