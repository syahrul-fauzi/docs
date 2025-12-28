## 8️⃣ Reasoning Policy (Global)

📄 `docs/agents/reasoning-policy.md`

**Hard Limits**

```yaml
max_plan_steps: 7
max_retry: 2
max_external_calls: 3
require_event_for:
  - decision
  - execution
  - failure
```
