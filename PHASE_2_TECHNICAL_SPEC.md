# SBA Internal Console - Phase 2 Technical Specification

## Overview
Phase 2 focuses on three main initiatives: Workflow & Policy Management, Desktop Hardening (Tauri Migration), and Live Telemetry (Real-time Monitoring).

## 1. Workflow & Policy Management
The policy management system allows administrators to define and visualize Rube Engine workflows using YAML.

### Components
- **YamlEditor**: A Monaco-based YAML editor with automatic schema validation (RUBE_SCHEMA).
- **WorkflowVisualizer**: A React Flow-based component that provides a graphical representation of the multi-step workflows defined in the YAML.
- **ActionCatalog**: A drag-and-drop interface for adding common actions to the YAML editor.

### Key Features
- **Auto-Schema Validation**: Ensures YAML follows the Rube Engine specification.
- **Real-time Visualization**: Synchronizes YAML changes with the graphical flow.
- **Auto-save & Versioning**: Persists changes and tracks version history (implemented in `Policies.tsx`).

## 2. Desktop Hardening (Tauri Migration)
Migration from a pure web-based console to a secure desktop application using the Tauri framework.

### Architecture
- **Backend (Rust)**: Handles system-level operations, security scans, and resource monitoring.
- **Frontend (React)**: Securely communicates with the Rust backend via Tauri's `invoke` API.

### Security Features
- **Sandboxing**: Restricts application access to the host system.
- **CSP Policy**: Implements strict Content Security Policies.
- **System Integrity Check**: Verifies the application binary and environment.
- **Resource Monitoring**: Real-time CPU and memory usage tracking using the `sysinfo` crate.

### Tauri Commands (`src-tauri/src/lib.rs`)
- `get_security_status`: Returns current hardening metrics.
- `get_resource_usage`: Provides live system resource data.
- `perform_security_scan`: Executes a simulated security audit.
- `check_system_integrity`: Performs binary and environment validation.

## 3. Live Telemetry
Real-time monitoring of AI agent activities and system health.

### Implementation
- **WebSocket Integration**: Uses `socket.io-client` for real-time bidirectional telemetry streaming.
- **gRPC-web Support**: Infrastructure for gRPC-web streaming using an async iterator pattern, compatible with `@connectrpc/connect`.
- **Telemetry Store**: Zustand-based state management for efficient telemetry data handling and alerting.

### Components
- **LiveTelemetryDashboard**: Visual interface with connection toggles (WebSocket vs gRPC) and live data charts.
- **useTelemetrySocket**: Hook for WebSocket connection management.
- **useTelemetryGrpc**: Hook for gRPC-web streaming simulation/integration.

## 4. Testing & Stability
- **Unit Tests**: Comprehensive testing for `telemetryStore`, `WorkflowVisualizer`, and `YamlEditor`.
- **Mocks**: Specialized mocks for `ReactFlow` and `Monaco Editor` to ensure test stability in headless environments.
- **Rollback Mechanism**: Configuration versioning in the Policy Management module allows for easy rollbacks of problematic workflow changes.

## 5. Deployment & Configuration
- **Tauri Config**: Located in `src-tauri/tauri.conf.json`.
- **Environment Variables**: Managed via `.env` files for API endpoints (WebSocket/gRPC).
