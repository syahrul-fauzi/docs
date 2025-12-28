# Panduan Pengujian Keamanan dan Kompatibilitas

Dokumen ini memberikan panduan untuk memastikan keamanan dan kompatibilitas aplikasi SBA-Agentic sebelum deployment ke production.

## 1. Pengujian Keamanan (Security Testing)

### Pemindaian Kerentanan (Vulnerability Scanning)

- **ZAP Baseline Scan**: Dijalankan secara otomatis melalui GitHub Actions (`security-owasp.yml`).
  - Target: URL environment staging atau production.
  - Frekuensi: Setiap rilis mayor atau mingguan.
- **npm audit**: Periksa dependensi untuk kerentanan yang diketahui.
  ```bash
  npm audit --audit-level=high
  ```

### Audit Kredensial

- Pastikan tidak ada kunci API, secret, atau password yang di-hardcode di dalam kode.
- Gunakan skrip audit:
  ```bash
  grep -rE "(password|secret|key|token)" apps/api/src
  ```
- Verifikasi bahwa `.env` tidak pernah masuk ke version control.

### Proteksi Endpoint

- Pastikan `RateLimitGuard` aktif pada semua endpoint publik.
- Verifikasi `TenantGuard` memvalidasi header `X-Tenant-ID` untuk isolasi data.
- Pastikan `JwtAuthGuard` melindungi rute yang memerlukan autentikasi.

## 2. Pengujian Kompatibilitas (Compatibility Testing)

### Kompatibilitas Sistem Operasi (Server-side)

Aplikasi API berjalan di dalam Docker (Node.js 20-alpine), memastikan konsistensi di berbagai lingkungan:

- **Linux (Production)**: Ubuntu/Debian (Target utama).
- **macOS/Windows (Development)**: Melalui Docker atau Node.js 20.

### Kompatibilitas Browser (Client-side)

Untuk `apps/web` dan `apps/app`, pengujian dilakukan pada:

- **Desktop**: Chrome (Latest), Firefox (Latest), Safari (Latest), Edge (Latest).
- **Mobile**: Safari (iOS), Chrome (Android).

### Pengujian Otomatis

Gunakan Playwright untuk pengujian lintas browser:

```bash
npx playwright test --project="chromium" --project="firefox" --project="webkit"
```

## 3. Pengujian Beban (Load Testing)

Gunakan skrip load test yang tersedia di `apps/api/scripts/loadtest.ts`:

```bash
API_URL=https://api.yourdomain.com/health DURATION_MS=60000 CONCURRENCY=50 npx tsx scripts/loadtest.ts
```

Target performa:

- Latensi rata-rata < 100ms untuk endpoint Health.
- Error rate < 0.1% di bawah beban normal.
