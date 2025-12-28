---
title: UI/UX Enhancements Migration Guide (v1.1)
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: medium
tags: [migration, ui, ux, components]
---

# Migration Guide: UI/UX Enhancements (v1.1)

This document outlines the changes introduced in the UI/UX enhancement update and provides instructions for migrating existing components and features.

## 1. Unified Status System

We have introduced a centralized `UnifiedStatus` component to replace ad-hoc status badges and icons.

### Changes

- **New Component:** `apps/app/src/components/ui/unified-status.tsx`
- **Deprecated:** Usage of raw `Badge` or `Icon` combinations for status indication in `Sidebar`, `Headers`, and `Lists`.

### Migration Steps

Replace existing status indicators with `UnifiedStatus`:

```tsx
// Before
<div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-green-500" />
  <span>Active</span>
</div>;

// After
import { UnifiedStatus } from '@/components/ui/unified-status';

<UnifiedStatus status="success" label="Active" />;
```

## 2. Global Context Bar

The application header now includes a `GlobalContextBar` that persists workspace and user role information.

### Changes

- **New Component:** `apps/app/src/components/header/GlobalContextBar.tsx`
- **Modified:** `apps/app/src/components/header/Header.tsx` now consumes this component.

### Impact

- Ensure `useUserStore` and `useWorkspaces` hooks are available in the context where `Header` is used.

## 3. Advanced Reasoning Display

The `AdvancedReasoningDisplay` component has been enhanced with "Explainable AI" features.

### Changes

- **New Feature:** "Why?" affordance (Lightbulb icon) on reasoning steps.
- **Dependency:** Requires `aguiToast` for displaying explanations.

## 4. Domain-Aware Sidebar

The `AppLayout` now dynamically adjusts sidebar sections based on the current route domain (`/agents`, `/runs`, `/analytics`).

### Changes

- **Logic:** `getSidebarSections` function in `AppLayout.tsx`.
- **Behavior:** Users will see context-specific navigation items when deep in a feature module.

### Verification

Check that navigating to `/agents/*` shows the "Agent Management" sidebar section.

## 5. Toast Notification Standardization

We are standardizing on `aguiToast` for AI-related feedback and `@sba/ui` Toast for system notifications.

- **Action:** Ensure new features use the appropriate toast mechanism.
