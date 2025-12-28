---
title: Prompt — Scaffold Component
created_at: 2025-12-06
last_modified: 2025-12-22
author: team@sba
reviewer: qa@sba
status: Draft
priority: P3
---

# Prompt — Scaffold Component

Goal: generate UI component scaffold based on design tokens and Figma component reference.

Inputs:

- component_name
- figma_component_id
- tokens_path: workspace/03_Design-System/tokens/\*.json
- target_package: packages/ui

Outputs:

- packages/ui/src/components/<component_name>/\* (tsx, styles, tests, stories)
- update workspace/\_xref.md links_count and add entry under Items.api if needed
