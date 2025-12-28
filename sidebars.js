/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        '00-index/README',
        '00-index/AGENTS',
        '00-index/HUMANS',
        '00-index/SBA_AGENTIC_MASTER_SPECIFICATION',
        '00-index/SBA_AGENTIC_COMPREHENSIVE_SPEC',
      ],
    },
    {
      type: 'category',
      label: 'Product & Strategy',
      items: [
        '01-product/README',
        '01-product/GTM_STRATEGY',
        '01-product/USE_CASE_SPECIFICATIONS',
        '01-product/PRODUCT_REQUIREMENTS_MATRIX',
        '01-product/APPS_COMPARISON',
        '01-product/PLATFORM_ALIGNMENT_ROADMAP',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        '02-architecture/README',
        '02-architecture/ARCHITECTURE_OVERVIEW',
        '02-architecture/SYSTEM_CONSTITUTION',
        '02-architecture/TECHNICAL_SPEC',
        '02-architecture/SBA_CONTROL_PLANE',
        '02-architecture/SBA_CONTROL_PLANE_EXECUTIVE_DECK',
        '02-architecture/SBA_AGENTIC_TOOLING_PLATFORM',
        '02-architecture/ATOMIC_DESIGN',
        '02-architecture/INTEGRATIONS_ARCHITECTURE',
        '02-architecture/MONOREPO_UPDATE',
        {
          type: 'category',
          label: 'Architecture Decision Records (ADR)',
          items: [
            '02-architecture/adr/DEVELOPMENT_ARCHITECTURE',
            '02-architecture/adr/AGENT_SEPARATION',
            '02-architecture/adr/DATA_LAYER_CONSOLIDATION',
          ],
        },
        {
          type: 'category',
          label: 'RFC & Components',
          items: ['02-architecture/rfc/components/BUTTON'],
        },
        {
          type: 'category',
          label: 'References & Plans',
          items: [
            '02-architecture/references/REALTIME_HTTP_FACADE_PLAN',
            '02-architecture/references/TESTS_LOAD_CHAOS_PLAN',
            '02-architecture/references/RACI',
            '02-architecture/references/OPENAPI_PLAN',
            '02-architecture/references/BENCHMARK_AND_BEST_PRACTICES',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Agentic System',
      items: [
        '03-agentic/README',
        '03-agentic/AGENT_OPERATIONS_LEARNING',
        '03-agentic/WORKFLOW_STANDARD',
      ],
    },
    {
      type: 'category',
      label: 'Governance & Rules',
      items: [
        '04-rules/README',
        '04-rules/PROJECT_RULES',
        '04-rules/STYLE_GUIDE',
        '04-rules/DEPENDENCIES',
        '04-rules/META_EVENTS_SYSTEM',
      ],
    },
    {
      type: 'category',
      label: 'API Documentation',
      items: [
        '05-api/README',
        '05-api/API_DOCUMENTATION',
        '05-api/NOTIFICATIONS_SYSTEM',
        '05-api/WEB_SOCKET_GATEWAY_CHANGELOG',
        {
          type: 'category',
          label: 'API Endpoints',
          items: [
            '05-api/api/ATTACHMENTS',
            '05-api/api/STORAGE_UPLOAD',
            '05-api/api/web/adapters/CONVERSATION',
          ],
        },
        {
          type: 'category',
          label: 'Interface Controls',
          items: ['05-api/interface_controls/API_INTERFACES'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Development Guide',
      items: [
        '06-development/README',
        '06-development/EXECUTION_PLAN',
        '06-development/TECHNICAL_GUIDELINES',
        '06-development/UI_UX_STANDARD',
        '06-development/TYPE_CHECK_STRATEGY',
        '06-development/PR_TEMPLATE_SBA_AGENTIC',
      ],
    },
    {
      type: 'category',
      label: 'Testing & Quality',
      items: [
        '07-testing-quality/README',
        '07-testing-quality/TESTING_STRATEGY',
        '07-testing-quality/QUALITY_METRICS',
        '07-testing-quality/TRACEABILITY_MATRIX',
        '07-testing-quality/A11Y_GUIDE',
        {
          type: 'category',
          label: 'Testing Artifacts',
          items: [
            '07-testing-quality/testing/ARTIFACTS',
            '07-testing-quality/testing/E2E_UPDATES',
            '07-testing-quality/testing/E2E_UPDATES_20251208',
          ],
        },
        {
          type: 'category',
          label: 'Test Specifications',
          items: ['07-testing-quality/tests/SLA_NFR_ACCEPTANCE'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      items: [
        '08-operations/README',
        '08-operations/OPERATIONAL_STANDARD',
        '08-operations/MONITORING_OBSERVABILITY',
        '08-operations/CI_CD_DEPLOYMENT',
        '08-operations/INCIDENT_RESPONSE',
        '08-operations/INFRASTRUCTURE_RESOURCES',
      ],
    },
    {
      type: 'category',
      label: 'Security & Compliance',
      items: [
        '09-security-compliance/README',
        '09-security-compliance/AUTH_RBAC_STANDARD',
        '09-security-compliance/SECURITY_COMPLIANCE_GUIDE',
        '09-security-compliance/SECURITY_ENDPOINTS',
        {
          type: 'category',
          label: 'Security Specs',
          items: [
            '09-security-compliance/security/RBAC',
            '09-security-compliance/security/THREAT_MODEL',
          ],
        },
        {
          type: 'category',
          label: 'Governance',
          items: ['09-security-compliance/governance/REVIEW_CHECKLIST'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Release & Go-Live',
      items: [
        '10-release-go-live/README',
        '10-release-go-live/ROADMAP_GO_LIVE',
        '10-release-go-live/PRODUCTION_READINESS_CHECKLIST',
        '10-release-go-live/PRODUCTION_READINESS_REPORT',
        '10-release-go-live/GO_NOGO_DECISION',
        '10-release-go-live/MIGRATION',
      ],
    },
    {
      type: 'category',
      label: 'Post-Launch',
      items: [
        '11-post-launch/README',
        '11-post-launch/CHANGELOG',
        '11-post-launch/PROJECT_COMPLETION_REPORT',
        '11-post-launch/POST_LAUNCH_ROADMAP',
      ],
    },
  ],
};

module.exports = sidebars;
