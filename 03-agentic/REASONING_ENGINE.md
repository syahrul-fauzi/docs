# Agentic Reasoning Engine
version: 1.1.0
last_updated: 2025-12-28

The Agentic Reasoning Engine is the "brain" of SBA-Agentic. It orchestrates analysis, planning, and decision-making by combining LLM capabilities with semantic knowledge retrieval and structured business rules.

## 🧠 Core Capabilities

### 1. Semantic Router
The [SemanticRouter](file:///home/inbox/smart-ai/sba-agentic/packages/agentic-reasoning/src/services/SemanticRouter.ts) uses vector embeddings to map natural language tasks to the most relevant tools or business domains.
- **Precision**: Uses Cosine Similarity to find the closest matches in the Knowledge Base.
- **Tool Discovery**: Automatically suggests tools from the Action Handlers Catalog based on task intent.

### 2. Advanced RAG (Retrieval-Augmented Generation)
The [KnowledgeRetriever](file:///home/inbox/smart-ai/sba-agentic/packages/agentic-reasoning/src/services/KnowledgeRetriever.ts) provides the LLM with relevant business context, including:
- **Business Rules**: Policies and constraints defined in the Rube Engine.
- **Workflows**: Existing process templates.
- **Documentation**: Technical and operational guides.

### 3. SKOS Semantic Expansion
Unlike standard RAG, our engine uses **SKOS (Simple Knowledge Organization System)** to navigate the knowledge graph.
- **Broadening Context**: If a specific tool is found, the engine automatically pulls in context from its broader [Business Domain](file:///home/inbox/smart-ai/sba-agentic/docs/03-agentic/ONTOLOGY.md).
- **Related Items**: Discovers related workflows or tools through `skos:related` and `skos:narrower` relationships.
- **Implementation**: Handled by `expandWithSemanticRelations` in `KnowledgeRetriever`.

### 4. Dynamic Self-Correction
The engine features an autonomous recovery loop for failed tool executions.
- **Failure Analysis**: When a tool fails, the engine receives the full error context and previous execution state.
- **Recovery Prompting**: The LLM is tasked with analyzing the failure and selecting an alternative tool or parameter set.
- **Reliability**: Minimizes human intervention by attempting autonomous recovery first.

## 🛠 Technical Workflow

1.  **Analysis Phase**:
    - Input: Task + Constraints + Goals.
    - Router identifies candidate tools.
    - Retriever fetches SKOS-expanded context.
    - LLM generates a structured analysis.
2.  **Planning Phase**:
    - Project manager agent creates a step-by-step execution plan.
3.  **Alternative Generation**:
    - Strategic agent generates 3 distinct approaches with pros/cons.
4.  **Decision Phase**:
    - Lead orchestrator selects the best approach.
    - Outputs a specific `toolCall` if required.
5.  **Reflection Phase**:
    - Supervisor agent reflects on decision quality and identifies learning points.

## 📁 Key Components

| Component | Path |
|-----------|------|
| Reasoning Engine | [index.ts](file:///home/inbox/smart-ai/sba-agentic/packages/agentic-reasoning/src/index.ts) |
| Semantic Router | [SemanticRouter.ts](file:///home/inbox/smart-ai/sba-agentic/packages/agentic-reasoning/src/services/SemanticRouter.ts) |
| Knowledge Retriever | [KnowledgeRetriever.ts](file:///home/inbox/smart-ai/sba-agentic/packages/agentic-reasoning/src/services/KnowledgeRetriever.ts) |
| Ontology Map | [ONTOLOGY.md](file:///home/inbox/smart-ai/sba-agentic/docs/03-agentic/ONTOLOGY.md) |

---
*Part of the SBA-Agentic Autonomous System.*
