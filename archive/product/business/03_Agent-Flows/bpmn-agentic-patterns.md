# 🔄 BPMN Agentic Patterns

**Lokasi:** `docs/Business/03_Agent-Flows/bpmn-agentic-patterns.md`

## 1. Tujuan

Menstandarkan pola umum BPMN workflow untuk domain bisnis di SBA-Agentic.

## 2. Pola Dasar

| Pola                    | Deskripsi                                      | Contoh             |
| ----------------------- | ---------------------------------------------- | ------------------ |
| **Decision Split**      | Agent menentukan jalur alur berdasarkan intent | Chat Routing       |
| **Knowledge Retrieval** | Ambil informasi dari knowledge base            | FAQ, Summarization |
| **Feedback Loop**       | Input hasil kembali ke observability           | Meta-events        |
| **Escalation Path**     | Alihkan ke manusia bila error                  | Human-in-loop      |

## 3. Contoh YAML Flow

```yaml
id: agentic-chat-flow
steps:
  - name: receive_intent
    action: chat.receive
  - name: classify
    action: agentic.classify_intent
  - name: execute
    action: business.execute_case
  - name: feedback
    action: analytics.record_feedback
```
