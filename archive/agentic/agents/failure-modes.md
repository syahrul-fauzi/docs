## 7️⃣ Failure Modes (Wajib Ditangani)

📄 `docs/agents/contracts/failure-modes.md`

| Failure           | Deteksi             | Aksi      |
| ----------------- | ------------------- | --------- |
| Hallucinated tool | Capability mismatch | Block     |
| Infinite planning | step count > limit  | Abort     |
| Cross-tenant      | tenantId mismatch   | Hard stop |
| Silent write      | missing event       | Reject    |
