# Standar Operasional Prosedur (SOP): Deployment Produksi

## 1. Persiapan Infrastruktur & Environment

### Manajemen Environment

File konfigurasi environment disiapkan untuk tiga tahap:

- **Development**: `.env.development` (Localhost)
- **Staging**: `.env.staging` (staging.services-id.com)
- **Production**: `.env.production` (services-id.com)

**Penting**: Pastikan file `.env.production` diisi dengan kredensial asli (Database, JWT Secret, API Keys) di server produksi sebelum deployment.

### Persyaratan Server

- **OS**: Linux (Ubuntu 20.04/22.04 LTS direkomendasikan)
- **CPU**: Minimal 2 vCPU
- **RAM**: Minimal 4GB (8GB direkomendasikan)
- **Software**: Docker & Docker Compose terinstal

### Konfigurasi DNS

Tambahkan record DNS berikut pada provider domain Anda:

- **A Record**: `services-id.com` -> [IP Address Server]
- **CNAME/A Record**: `www.services-id.com` -> [IP Address Server]
- **A Record**: `api.services-id.com` -> [IP Address Server]

### Konfigurasi SSL (HTTPS)

Gunakan Certbot (Let's Encrypt) untuk mendapatkan sertifikat valid:

1.  **Install Certbot**: `sudo apt install certbot`
2.  **Generate Sertifikat**: `sudo certbot certonly --standalone -d services-id.com -d www.services-id.com -d api.services-id.com`
3.  **Update Nginx**: Perbarui path sertifikat di `nginx/nginx.conf`.

## 2. Checklist Pra-Deployment (Wajib)

### 2.1 Quality Gates

Jalankan perintah berikut dari root repositori untuk memastikan kualitas kode:

```bash
pnpm install
pnpm -s ci:lint      # Memastikan tidak ada warning baru
pnpm type-check      # Validasi tipe TypeScript
pnpm test            # Menjalankan unit tests
pnpm build           # Simulasi build produksi
```

### 2.2 Verifikasi Environment

Gunakan perintah verifikasi khusus untuk memastikan variabel environment sudah sesuai:

```bash
pnpm -C apps/app verify:staging-env
pnpm -C apps/app verify:production-env
```

### 2.3 Smoke Tests (E2E + Performance)

```bash
pnpm -C apps/app test:integration
pnpm -C apps/app test:e2e:smoke
pnpm -C apps/app test:performance
pnpm -C apps/api test
```

## 3. Prosedur Deployment

### 3.1 Deployment via Docker Compose (Metode Mandiri)

Repositori menyediakan `docker-compose.prod.yml` untuk deployment yang mencakup Redis, API, Web, Nginx, Prometheus, dan Grafana.

```bash
# Jalankan dengan file environment produksi
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

### 3.2 Deployment via GitOps (Otomatis)

SBA-Agentic menggunakan alur kerja GitOps yang dipicu dengan menandai (tagging) rilis.

### Langkah 1: Buat Tag Rilis

```bash
# Semantic Versioning: v1.0.0, v1.0.1, dst.
git tag -a v1.0.0 -m "Release v1.0.0: Initial Production Launch"
git push origin v1.0.0
```

### Langkah 2: Eksekusi Pipeline CI

Workflow `deploy-prod.yml` akan secara otomatis:

1.  **Build** Docker image untuk `apps/api`, `apps/app`, `apps/web`.
2.  **Push** image ke Container Registry (ECR/GCR/Docker Hub).
3.  **Run** pengujian integrasi terhadap lingkungan staging.
4.  **Canary Deployment**: Aktifkan canary untuk sebagian kecil tenant/pengguna untuk memantau error rate dan latensi sebelum roll forward ke seluruh produksi.
5.  **Deploy** ke Klaster Kubernetes Produksi (atau Vercel untuk frontend).

## 4. Verifikasi Pasca-Deployment

Setelah pipeline selesai:

1.  **Health Check**:
    ```bash
    curl https://api.sba-agentic.com/health
    # Diharapkan: {"status":"ok", "version":"v1.0.0"}
    ```
2.  **Smoke Test**:
    - Login ke Control Plane (`apps/app`).
    - Jalankan tugas agen "Hello World" sederhana.
    - Verifikasi koneksi WebSocket Real-time.
3.  **Pantau Metrik**:
    - Periksa Dashboard Grafana untuk lonjakan tingkat kesalahan (error rate).
    - Pantau Latensi (p95 harus < 500ms).

## 5. Rencana Rollback

Jika terjadi masalah kritis (Tingkat Kesalahan > 1% atau Downtime):

### Opsi A: Rollback Otomatis (Disarankan)

Kembalikan deployment melalui GitHub Actions atau Dashboard Vercel ke tag stabil sebelumnya.

### Opsi B: Rollback Manual

```bash
# Kembalikan deployment k8s
kubectl rollout undo deployment/sba-api -n production
kubectl rollout undo deployment/sba-app -n production
```

## 6. Pemulihan Bencana (Disaster Recovery)

Jika terjadi kegagalan katastrofik:

1.  **Database**: Pulihkan Supabase PITR (Point-in-Time Recovery) ke 5 menit sebelum insiden.
2.  **Infrastruktur**: Picu skrip Terraform/Pulumi untuk menyediakan lingkungan baru di wilayah sekunder.
3.  **Komunikasi**: Perbarui halaman status dan beri tahu pemangku kepentingan melalui saluran `@SuperAgent`.
