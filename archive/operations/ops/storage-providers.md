# Storage Providers — SDK Integration Plan

- AWS S3: use `@aws-sdk/client-s3` for `CreateMultipartUpload`, `UploadPart`, `CompleteMultipartUpload`; presign with `@aws-sdk/s3-request-presigner`. TTL ~15 minutes; retries exponential on 5xx/timeouts.
- GCS: use `@google-cloud/storage` for `createResumableUpload`; client uses `Content-Range` and resumes on 308. Validate final object and return canonical URL.
- Azure: use `@azure/storage-blob` for `stageBlock` and `commitBlockList`; manage SAS and block IDs. TTL ~15 minutes; renew SAS if needed.
- Credentials must be injected via environment and never logged; TTL limited; per-tenant isolation enforced.
