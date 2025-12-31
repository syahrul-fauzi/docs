# Context & Memory Service Architecture
**Version**: 1.0.0
**Date**: 2025-12-31

## Overview
The **Context & Memory Service** is the backbone of personalization in the SBA-Agentic platform. It manages user profiles, session states, and conversation history with enterprise-grade security and performance.

## Core Components

### 1. User Profile Management
*   **Storage**: Encrypted Database (simulated via AES-256 compatible storage).
*   **Schema**:
    ```typescript
    interface UserProfile {
      userId: string;
      name: string;
      email?: string;
      preferences?: Record<string, any>;
      // ...
    }
    ```
*   **Security**: All PII (Personally Identifiable Information) is encrypted at rest. Access is controlled via internal service boundaries.

### 2. Conversation History (Memory)
*   **Structure**: Time-series ordered log of interactions.
*   **Retention**: Configurable TTL (default 30 days).
*   **Purging**: Automated background jobs to remove stale data (GDPR compliance).
*   **Recall**: Fast retrieval (<200ms) by Session ID or Browser Fingerprint.

### 3. Session Management
*   **Identification**: Uses `fingerprint` or `userId` to resolve context.
*   **Persistence**: Sessions persist across page reloads via durable storage.

## Integration with Greeter Agent

The **Greeter Pattern** leverages this service to provide personalized experiences:

1.  **Identification**: When a user connects, `ContextService.getOrCreateSession(fingerprint)` is called.
2.  **Resolution**: If the session is linked to a `userId`, the profile is loaded.
3.  **Personalization**: The Greeter Agent uses `profile.name` to format the welcome message ("Halo, Budi").
4.  **Recording**: The interaction is saved to history immediately.

## Security & Compliance
*   **GDPR**: Supports "Right to be Forgotten" via `deleteUserProfile` and `purgeHistory`.
*   **Encryption**: AES-256 used for sensitive data fields.
*   **Audit**: All access to profiles is logged (via Observability layer).

## API & Usage
```typescript
// Create Profile
const user = await contextService.createUserProfile('Budi', 'budi@example.com');

// Record Interaction
await contextService.recordInteraction(sessionId, 'user', 'Halo');

// Get History
const history = await contextService.getConversationHistory(sessionId);
```
