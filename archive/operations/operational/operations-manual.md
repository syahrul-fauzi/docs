# Manual Operasional

- Diagram arsitektur sistem
- Runbook start/stop, scaling, backup/restore
- SOP maintenance rutin

## Start/Stop

- API `pnpm -C apps/api start`
- Web `pnpm -C apps/app start`

## Backup/Restore

- Jalankan `scripts/db/backup.sh` dengan `DATABASE_URL` terisi.
- Restore via `psql` ke instance target.
