# SBA-Agentic Approval Workflow Standard

## 1. Overview
The SBA-Agentic Approval Workflow is a robust, multi-level system designed to handle complex business processes requiring human-in-the-loop (HITL) verification. It includes features like time-based auto-escalation, multi-channel notifications, and comprehensive audit logging.

## 2. Core Components

### 2.1 Workflow Tools
- `workflow.approval_request`: Initiates a new approval process for a task.
- `workflow.approve_request`: Normal approval action by the assigned approver.
- `workflow.reject_request`: Normal rejection action by the assigned approver (requires reason).
- `workflow.escalate_request`: Manually escalates a request to the next level (manager).
- `workflow.process_pending_escalations`: Background worker tool to process expired approvals.
- `workflow.manual_override`: Admin action to bypass normal flow (requires strict authorization and reason).
- `workflow.get_approval_dashboard`: Data provider for real-time monitoring.

### 2.2 Safety Mechanisms
- **Business Validation**: Every step validates the state of the task and approval before execution.
- **Audit Logging**: All actions are recorded in the `audit_log` table with `tenant_id`, `user_id`, and detailed metadata.
- **Fallback System**: If a non-critical step fails (e.g., updating task status after approval), the system logs a `FALLBACK_TRIGGERED` event to ensure the process doesn't halt completely.

## 3. Escalation Logic
Each approval request can have an `expires_at` timestamp.
- If the timestamp is exceeded, the request is considered `overdue`.
- The `workflow.process_pending_escalations` tool scans for these and automatically escalates them to the assigned manager.
- Escalation involves:
  1. Creating a new `workflow_approvals` record for the manager.
  2. Marking the old record as `escalated`.
  3. Sending multi-channel notifications to the new approver.

## 4. Notifications
Supported channels:
- **Email**: Sent via Resend.
- **Slack**: Messages sent to configured channels.
- **Push**: Mobile notifications via Firebase/OneSignal.

## 5. Monitoring
The **Approval Monitoring Dashboard** provides:
- Real-time stats (Total, Pending, Approved, Rejected, Escalated, Overdue).
- Urgency tracking (Normal, Medium, High, Overdue).
- Direct actions for approvers and admins.

## 6. Operational Guidelines
- **Approvers**: Should check the dashboard daily or respond to multi-channel notifications.
- **Admins**: Use Manual Override only when absolutely necessary (e.g., approver is unavailable and deadline is critical).
- **Developers**: Use `WorkflowAuditService` and `WorkflowNotificationService` for any new workflow-related tools to ensure consistency.

---
*Version: 1.0.0*
*Last Updated: 2025-12-29*
