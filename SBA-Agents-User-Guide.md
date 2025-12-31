---
title: SBA Built-In Agents User Guide
created_at: 2025-12-31
author: Super Agent
status: active
---

# SBA Built-In Agents User Guide

## Overview

SBA (Smart Business Assistant) Built-In Agents are a set of pre-configured, highly optimized AI agents designed to handle core business functions out of the box. These agents are integrated directly into the platform's Control Plane and Rube Engine.

## Available Agents

### 1. SBA Workspace Agent

**Role:** Document & Knowledge Manager

**Capabilities:**

- Automatically extracts data from uploaded documents (PDF, Images).
- Syncs documents to the secure workspace storage.
- Updates the knowledge base for instant retrieval.

**How to Use:**

- Upload a document via the SBA interface.
- The agent automatically triggers on `document.uploaded` event.
- Extracted data is available in the "Documents" tab.

### 2. SBA Search Agent

**Role:** Real-time Information Researcher

**Capabilities:**

- Performs live web searches for latest market data, news, or technical info.
- Summarizes search results into concise insights.
- Stores findings in short-term memory for conversation context.

**How to Use:**

- Ask the assistant questions requiring up-to-date info (e.g., "What is the latest stock price of X?", "Find recent news about AI regulation").
- The agent triggers on `query.received` with search intent.

### 3. SBA Orchestrator Agent

**Role:** Task Manager & Coordinator

**Capabilities:**

- Analyzes complex user requests and breaks them down into tasks.
- Prioritizes tasks based on urgency, deadlines, and business context.
- Delegates sub-tasks to other specialized agents.

**How to Use:**

- Give complex instructions (e.g., "Plan a marketing campaign for Q3 including budget and timeline").
- The agent triggers on `batch.tasks.received` or complex intent detection.

## Performance & Reliability

- **Response Time:** < 500ms for decision making.
- **Availability:** 99.99% uptime via redundant agent runners.
- **Security:** All data is processed within your tenant's isolated environment.

## Troubleshooting

If an agent fails to respond:

1. Check the **Activity Log** in your dashboard.
2. Verify that your workspace has sufficient credits/quota.
3. For "Search Agent", ensure your query is specific.
