## 6️⃣ Observer Agent Contract

📄 `docs/agents/contracts/observer-agent.md`

### 6.1 Fungsi

- Mengamati **meta-events**
- Deteksi:
  - Loop reasoning
  - Tool abuse
  - Performance anomaly

### 6.2 Output

```ts
interface ObservationEvent {
  executionId: string;
  severity: 'info' | 'warn' | 'critical';
  signal: string;
  recommendation?: string;
}
```

📌 Observer **tidak boleh memicu aksi langsung**
