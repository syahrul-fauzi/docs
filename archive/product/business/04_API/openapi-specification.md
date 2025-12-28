# 📘 OpenAPI Specification

**Lokasi:** `docs/Business/04_API-Contracts/openapi-specification.md`

## 1. Tujuan

Memberikan spesifikasi OpenAPI 3.1 untuk seluruh layanan bisnis SBA-Agentic.

## 2. Struktur Folder

```

/openapi/
├── business-chat.yaml
├── business-knowledge.yaml
├── business-payment.yaml
└── business-analytics.yaml

```

## 3. Contoh `business-chat.yaml`

```yaml
openapi: 3.1.0
info:
  title: SBA Business Chat API
  version: 1.0.0
paths:
  /api/business/chat/send:
    post:
      summary: Kirim pesan ke agentic chat
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChatRequest'
      responses:
        '200':
          description: Pesan berhasil dikirim
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChatResponse'
components:
  schemas:
    ChatRequest:
      type: object
      properties:
        message:
          type: string
        userId:
          type: string
    ChatResponse:
      type: object
      properties:
        reply:
          type: string
        contextId:
          type: string
```

## 4. Tooling

- **Swagger UI** untuk preview
- **Prism Mock Server** untuk pengujian kontrak
- **Spectral Linter** untuk validasi sintaks

## 5. Integrasi CI

GitHub Actions:

- `validate-openapi.yml` menjalankan linter & mock test otomatis.
