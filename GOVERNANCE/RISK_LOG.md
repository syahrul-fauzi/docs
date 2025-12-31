# SBA-Agentic Risk Log

**Version**: 1.0.0
**Last Updated**: 2025-12-31

Log ini mencatat risiko teknis dan operasional yang teridentifikasi, beserta strategi mitigasinya.

## 1. Active Risks

| ID | Risk Description | Impact | Probability | Mitigation Strategy | Owner |
| --- | --- | --- | --- | --- | --- |
| **RSK-01** | LLM Latency Variance | High | High | Implement Caching (1h TTL) and Async Request-Reply pattern for complex tasks. | AP |
| **RSK-02** | Token Quota Exhaustion | High | Medium | Implement Tiered Rate Limiting and fallback to lightweight models (e.g., Llama-3-8B). | OPS |
| **RSK-03** | Multi-tenant Leakage | Critical | Low | Strict Tenant ID validation in SDK and mandatory PII masking in all audit logs. | SEC |
| **RSK-04** | Capability Drift | Medium | Medium | Automated daily regression tests for all Capability Adapters (MCP verification). | AP |
| **RSK-05** | Search Hallucination | Medium | Medium | Implementation of "6-Step Search Strategy" with mandatory ROBOT verification. | AP |

## 2. Risk Matrix

| Impact \ Prob | Low | Medium | High |
| --- | --- | --- | --- |
| **Critical** | RSK-03 | - | - |
| **High** | - | RSK-02 | RSK-01 |
| **Medium** | - | RSK-04, RSK-05 | - |

## 3. Mitigation Status

- **RSK-01 (Latency)**: ✅ AFD Integration Benchmark completed. Redis caching implemented in `@sba/kv`.
- **RSK-03 (Security)**: ✅ PII Masking Protocol active. Multi-tenant isolation verified in PRR.
- **RSK-05 (Search)**: ✅ 6-Step Strategy documented and integrated into Reasoning Policy.

## 4. Closed Risks

*None at this stage.

