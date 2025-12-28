## Agent Taxonomy

| Agent                          | Tanggung Jawab                     | Boleh Ambil Keputusan? | Boleh Eksekusi? |
| ------------------------------ | ---------------------------------- | ---------------------- | --------------- |
| **PlannerAgent**               | Reasoning, decomposition, planning | ⚠️ Terbatas            | ❌              |
| **ExecutorAgent**              | Eksekusi tool & workflow           | ❌                     | ✅              |
| **ObserverAgent**              | Audit, evaluasi, guardrail         | ❌                     | ❌              |
| **ReviewerAgent** _(opsional)_ | Approval (human-like)              | ⚠️                     | ❌              |

> **Golden Rule:**
> **Agent TIDAK BOLEH langsung memanggil sistem bisnis.**
> Semua lewat **Rube Tool Layer**.
