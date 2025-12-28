# Interface Control Documents — API

## Runtime Runs

- Method: POST /api/runtime/runs
- Contracts: request schema, idempotency token, retry semantics

## Tools Flow

- Method: POST /api/tools/execute
- Contracts: tool name, args, response envelope

## Test Login/Logout

- Methods: POST /api/test-login, POST /api/test-logout

## Attachments/Upload

- Methods: POST /api/attachments, POST /api/storage/upload
- Contracts: chunked uploads, validation, content-type and size limits
