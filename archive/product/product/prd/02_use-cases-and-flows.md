## 02_use-cases-and-flows.md — Agentic Flows

Dokumen ini menjelaskan bagaimana setiap use-case dalam SBA-Agentic akan diimplementasikan, dengan fokus pada alur agentic dan interaksi antar komponen sistem.

Setiap use‑case ditulis dalam format:

1.  Trigger (UI / Event / Schedule): Menjelaskan pemicu awal dari sebuah alur kerja, baik itu interaksi pengguna melalui UI, event sistem, atau jadwal tertentu.
2.  Agent reasoning step: Langkah-langkah penalaran yang dilakukan oleh agen untuk memahami tugas dan merencanakan eksekusi.
3.  Tool invocation (via Rube): Pemanggilan alat (tools) yang diperlukan oleh agen untuk melakukan tindakan spesifik, selalu melalui Rube sebagai perantara.
4.  Event emission: Emisi event setelah agen menyelesaikan suatu tindakan atau mencapai status tertentu, yang dapat memicu alur kerja lain atau dicatat untuk observabilitas.
5.  UI feedback (AG‑UI): Umpan balik yang diberikan kepada pengguna melalui antarmuka pengguna (AG-UI) setelah agen melakukan tindakan.
6.  Audit & replay: Kemampuan untuk mengaudit dan memutar ulang seluruh alur kerja agen untuk tujuan debugging, verifikasi, atau analisis.

**Contoh ringkas**

```
User → AG‑UI
 → Planner Agent
 → CMS (read SOP)
 → Rube Tool: create_task
 → Executor Agent
 → Event: task.created
 → Observer Agent
 → Dashboard update
```
