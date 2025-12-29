# Rule Failure Heatmap Implementation Guide

## Overview
The Rule Failure Heatmap is a diagnostic tool designed for the SBA-Agentic admin dashboard. It provides a visual representation of rule failure frequencies across different tenants and rules, enabling administrators to quickly identify problematic patterns and system drifts.

## Features
- **Visual Heatmap:** Uses a color gradient (Green to Red) to represent failure intensity.
- **Filtering:** Supports filtering by Tenant, Time Period (24h, 7d, 30d), and Rule Category.
- **Interactivity:**
  - **Tooltips:** Hover over any cell to see exact failure counts.
  - **Drill-down:** Click a cell to view specific failure details for that rule and tenant.
- **Export:** Export heatmap data to CSV or download the visualization as a PNG image.
- **Accessibility:** Fully accessible with ARIA roles and labels for screen readers.

## Technical Architecture

### Backend (NestJS)
- **Controller:** `AdminController` provides the `/api/admin/heatmap` endpoint.
- **Service:** `AdminService` aggregates failure data from the database.
- **Optimization:** Uses Redis caching for performance and Prisma for efficient data retrieval.
- **Performance:** Verified to process 10,000+ logs in under 40ms.

### Frontend (Next.js & React)
- **Component:** `RuleFailuresPage` handles the UI logic and data fetching.
- **Visualization:** Custom grid-based heatmap using Tailwind CSS for responsive styling.
- **Export Utility:** Uses `html-to-image` for PNG exports and standard blob handling for CSV.

## Best Practices Followed
1. **Color Palette:** Follows standard UX patterns (Red = High Failure, Green = Low Failure).
2. **Data Binning:** Aggregates data by rule and tenant to maintain clarity even with high volume.
3. **Progressive Disclosure:** Uses drill-downs to prevent information overload.
4. **Responsive Design:** Optimized for both desktop and tablet views.

## Verification & Testing
- **Unit Tests:** 
  - Backend: `AdminService.heatmap.spec.ts`
  - Frontend: `page.spec.tsx`
- **Performance Tests:** `AdminService.heatmap.perf.spec.ts`
- **Accessibility:** Validated with keyboard navigation and screen reader attributes.

## Competitor Comparison
| Feature | SBA Heatmap | Industry Standard (Sprig/Sigma) |
|---------|-------------|---------------------------------|
| Real-time Aggregation | Yes | Yes |
| Drill-down | Yes | Yes |
| Export (PNG/CSV) | Yes | Variable |
| Multi-tenant Support | Built-in | Often via Custom Attributes |
| AI Anomaly Detection | Planned | Available in high-tier plans |

---
*Last Updated: 2025-12-29*
