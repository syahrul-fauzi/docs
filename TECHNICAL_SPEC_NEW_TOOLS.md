# 🛠️ Technical Specification: New Agent Tools (2025.12.31)

Dokumen ini merinci spesifikasi teknis, skema input/output, dan kebijakan keamanan untuk tools baru yang ditambahkan ke dalam ekosistem SBA-Agentic.

## 1. Document Extraction Tool (`document.extract_data`)

### Deskripsi
Mengekstraksi data terstruktur dari URL dokumen (PDF, Gambar) menggunakan pemrosesan OCR dan NLP. Ideal untuk pemrosesan invoice, kuitansi, atau dokumen identitas.

### Skema Input
```json
{
  "document_url": "string (valid URL)",
  "extract_fields": ["string"], // Opsional, default: ['invoice_number', 'total_amount', 'date', 'vendor_name']
  "options": {
    "ocr": "boolean", // Default: true
    "nlp": "boolean"  // Default: true
  }
}
```

### Skema Output
```json
{
  "success": "boolean",
  "data": {
    "document_id": "string",
    "status": "completed",
    "confidence": "number",
    "entities": {
      "field_name": "extracted_value"
    }
  },
  "metadata": {
    "durationMs": "number",
    "document_url": "string",
    "processing_mode": "string"
  }
}
```

### Kebijakan Keamanan (Rube)
- **Roles**: `admin`, `manager`, `user`
- **Guards**: `enforce_tenant`, `audit_log`
- **Rate Limit**: Per tenant (configurable).

---

## 2. Analytics Report Tool (`analytics.generate_report`)

### Deskripsi
Menghasilkan laporan analitik berdasarkan performa, penggunaan, atau error dalam rentang waktu tertentu.

### Skema Input
```json
{
  "report_type": "performance" | "usage" | "error" | "custom",
  "time_range": {
    "start": "string (ISO datetime)",
    "end": "string (ISO datetime)"
  },
  "filters": "object" // Opsional
}
```

### Skema Output
```json
{
  "success": "boolean",
  "data": {
    "type": "string",
    "summary": {
      "total_events": "number",
      "success_rate": "number"
    },
    "details": "array"
  },
  "metadata": {
    "durationMs": "number",
    "report_type": "string"
  }
}
```

### Kebijakan Keamanan (Rube)
- **Roles**: `admin`, `manager` (Restricted access)
- **Guards**: `enforce_tenant`, `audit_log`
- **Rate Limit**: 10 requests/hour/tenant.

---

## 3. Support Routing Tool (`support.route_to_department`)

### Deskripsi
Mengarahkan tiket dukungan ke departemen yang tepat berdasarkan konten pesan dan metadata menggunakan logika klasifikasi (simulated NLP).

### Skema Input
```json
{
  "ticket_id": "string",
  "content": "string",
  "metadata": {
    "urgency": "low" | "medium" | "high"
  }
}
```

### Skema Output
```json
{
  "success": "boolean",
  "data": {
    "ticket_id": "string",
    "routed_to": "string (Finance | Technical Support | Sales | General Support)",
    "priority": "string",
    "assigned_at": "string (ISO datetime)"
  },
  "metadata": {
    "durationMs": "number",
    "ticket_id": "string",
    "detected_intent": "string"
  }
}
```

### Kebijakan Keamanan (Rube)
- **Roles**: `admin`, `manager`, `user`
- **Guards**: `enforce_tenant`
- **Rate Limit**: None (Utility class).

---

## 🧪 Verifikasi (Testing)
Semua tools di atas telah divalidasi dengan unit tests di `apps/api/src/tools/tests/` dengan coverage > 90%.
- `DocumentExtractTool.test.ts`
- `AnalyticsReportTool.test.ts`
- `SupportRouteTool.test.ts`

---
*Terakhir diperbarui: 2025-12-31 oleh @SuperAgent*
