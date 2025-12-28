## 4. Wireframes & User Flow

Bagian ini menjelaskan struktur layout dan alur interaksi utama.

### 4.1 Layout Utama (Shell)

Layout menggunakan pola **Sidebar Navigation + Main Content Area + Contextual Panel**.

- **Sidebar (Kiri)**:
  - **Top**: Logo, Workspace/Tenant Switcher.
  - **Menu**: Dashboard, Inbox (Chats), Workflows, Knowledge, Settings.
  - **Bottom**: User Profile, Help/Docs.
- **Main Content (Tengah)**:
  - Area dinamis sesuai menu aktif (misal: Chat Stream, Kanban Board Workflow).
- **Contextual Panel (Kanan - Collapsible)**:
  - Menampilkan detail item yang dipilih (misal: detail PDF sumber RAG, Log Steps Workflow, Metadata Tool).

### 4.2 Layar: Agent Chat (Inbox)

Fokus pada percakapan yang bersih dengan indikator proses yang jelas.

- **Header**: Nama Agent, Status (Online/Thinking), Tombol "New Chat".
- **Chat Area**:
  - **User Bubble**: Aligned right, style minimalis.
  - **Agent Bubble**: Aligned left.
    - _Thinking Block_: Accordion tertutup default "Thinking..." (bisa dibuka untuk lihat reasoning).
    - _Tool Block_: Card terpisah visualisasi input/output tool (misal: "Searching BaseHub... Found 3 docs").
    - _Final Answer_: Markdown text.
- **Input Area**: Textarea auto-expand, tombol Attachment, tombol Voice (future).

### 4.3 Layar: Workflow Monitor

Dashboard visual untuk memantau proses background.

- **View Modes**: List View (Tabel) dan Kanban View (Status).
- **Card Item**: Menampilkan ID, Nama Workflow, Progress Bar, Status Badge, dan Owner.
- **Detail Modal/Page**:
  - Visualisasi Flowchart (Mermaid-style) status saat ini.
  - Timeline log eksekusi.
  - Tombol aksi manual (Approve/Reject/Retry).

### 4.4 Flow: Human-in-the-Loop Approval

Interaksi kritis di mana sistem membutuhkan keputusan manusia.

1.  **Notifikasi**: Muncul di Bell Icon & Email.
2.  **Action**: Klik notifikasi -> Buka Detail Workflow.
3.  **Review**: User melihat data yang perlu diapprove (misal: Ringkasan Invoice).
    - _Diff View_: Jika ada perubahan data, tampilkan before/after.
4.  **Decision**:
    - Tombol "Approve" (Hijau) -> Lanjut ke step berikutnya.
    - Tombol "Reject" (Merah) -> Muncul modal alasan penolakan.
5.  **Feedback**: Toast message "Task Approved", status workflow berubah realtime.

## 5. Prototype & Design System Specs

### 5.1 Color Palette Usage

- **Backgrounds**: `slate-950` (App Bg), `slate-900` (Panel Bg).
- **Borders**: `slate-800` (Subtle separation).
- **Interactive**: `blue-600` (Primary Button), `slate-800` (Secondary Button/Hover).

### 5.2 Typography Scale

- **H1 (Page Title)**: Inter Bold 24px.
- **H2 (Section)**: Inter Semibold 20px.
- **Body**: Inter Regular 14px (relaxed line-height 1.5).
- **Code/Mono**: JetBrains Mono 13px.

### 5.3 Components State

- **Buttons**: Default, Hover (Lighten 5%), Active (Darken 5%), Disabled (Opacity 50%).
- **Inputs**: Default (Border slate-700), Focus (Ring blue-500), Error (Border rose-500).

## 6. Rencana Implementasi UI

1.  **Fase 1**: Implementasi komponen dasar di `packages/ui` (Button, Input, Card, Badge).
2.  **Fase 2**: Implementasi layout shell dan navigasi di `apps/app`.
3.  **Fase 3**: Integrasi `AgentStream` component dengan real backend events.
4.  **Fase 4**: Polishing animasi (Framer Motion) dan loading states.
