---
title: "SBA-Agentic Autoscaling Playbook"
created_at: 2025-12-28
author: SOLOBuilder
status: active
---

# SBA-Agentic Autoscaling Playbook

Playbook ini berisi panduan konfigurasi dan operasional untuk sistem penskalaan otomatis (autoscaling) pada infrastruktur SBA-Agentic.

---

## 1. Pemicu Penskalaan (Scaling Triggers)

Sistem menggunakan Horizontal Pod Autoscaler (HPA) berdasarkan metrik berikut:

### 1.1 Metrik Resource

- **CPU Utilization**: Target > 70% rata-rata di seluruh instance.
- **Memory Usage**: Target > 80% rata-rata.

### 1.2 Metrik Agentic (Custom)

- **Event Queue Depth**: Jika jumlah pesan di antrean Redis `agent-tasks` > 1000 pesan.
- **Task Latency**: Jika waktu tunggu rata-rata task di antrean > 5 detik.

---

## 2. Konfigurasi Threshold

| Komponen | Min Replicas | Max Replicas | Scaling Up (Cooldown) | Scaling Down (Cooldown) |
| :--- | :--- | :--- | :--- | :--- |
| Orchestrator | 3 | 50 | 1 menit | 5 menit |
| Analysis Agent | 2 | 20 | 2 menit | 10 menit |
| Tool Executor | 5 | 100 | 30 detik | 3 menit |

---

## 3. Prosedur Penskalaan Manual (Emergency)

Jika autoscaling otomatis gagal atau terlalu lambat:

1. **Identify**: Periksa beban melalui `kubectl top pods` atau Grafana Dashboard.
2. **Execute**: Jalankan perintah manual untuk meningkatkan kapasitas:

   ```bash
   kubectl scale deployment orchestrator --replicas=20
   ```

3. **Validate**: Pastikan pod baru mencapai status `Running` dan `Ready`.

---

## 4. Optimasi Biaya vs Performa

- **Downscaling Policy**: Selama jam non-sibuk (00:00 - 05:00 UTC), turunkan `Min Replicas` menjadi 1 untuk menghemat biaya.
- **Buffer Capacity**: Pertahankan kapasitas cadangan 20% untuk menangani lonjakan trafik mendadak (*flash crowds*).

---

## 5. Troubleshooting Autoscaling

- **Failing to Scale Up**: Cek kuota resource cloud provider (AWS/GCP) atau ketersediaan node di cluster.
- **Failing to Scale Down**: Periksa apakah ada task yang menggantung (*stuck*) atau tidak menyelesaikan session.

---
*Ditetapkan oleh SOLOBuilder untuk efisiensi resource yang cerdas.*
