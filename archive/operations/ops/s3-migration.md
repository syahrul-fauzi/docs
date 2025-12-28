# Migrasi Publishing Report ke S3

## Prasyarat

- **AWS S3 Bucket** untuk menyimpan HTML report (publik atau via CloudFront)
- **Kredensial**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (disimpan sebagai GitHub Secrets)
- **Region**: `AWS_REGION` (contoh: `ap-southeast-1`)
- **Domain Publik (opsional)**: `AWS_PUBLIC_DOMAIN` jika menggunakan CloudFront/Custom Domain

## Variabel Environment CI

- `AWS_S3_BUCKET`: nama bucket S3
- `AWS_REGION`: region bucket
- `AWS_PUBLIC_DOMAIN`: domain publik untuk report (opsional)
- `SIGNED_URL_ENABLE`: `true` untuk menggunakan signed URL (provider lain)
- `SIGNED_URL_DURATION`: durasi token (detik), contoh: `3600`

## Langkah CI

1. Konfigurasi kredensial dengan `aws-actions/configure-aws-credentials`
2. Sinkronisasi HTML report:
   ```bash
   aws s3 sync reports/html s3://$AWS_S3_BUCKET/reports/html --delete --acl public-read
   ```
3. Set `TEST_REPORT_URL` ke `https://$AWS_PUBLIC_DOMAIN/reports/html/` atau `https://$AWS_S3_BUCKET.s3.amazonaws.com/reports/html/`
4. Posting PR comment berisi URL publik report

## Verifikasi

- Buka URL: `https://$AWS_PUBLIC_DOMAIN/reports/html/test-summary_<timestamp>.html`
- Pastikan konten dapat diakses publik (HTTP 200)
- Jika menggunakan signed URL: pastikan query string token valid hingga durasi yang ditentukan

## Keamanan

- Simpan kredensial di Secrets, bukan env biasa
- Gunakan IAM role scoped minimal (write pada prefix `reports/html`)

## Rollback

- Nonaktifkan env `AWS_S3_BUCKET` untuk kembali ke GitHub Pages
- Artefak lokal tetap di `/reports/html`
