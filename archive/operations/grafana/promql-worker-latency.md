# PromQL — Worker Latency p95/p99 & Histogram

## Percentiles over time window

```
# p95 over last 15m per queue
histogram_quantile(0.95, sum by (le, queue_name) (rate(sba_worker_processing_duration_seconds_bucket[15m])))

# p99 over last 15m per queue
histogram_quantile(0.99, sum by (le, queue_name) (rate(sba_worker_processing_duration_seconds_bucket[15m])))
```

## Histogram visualization

```
sum by (le, queue_name) (rate(sba_worker_processing_duration_seconds_bucket[5m]))
```

## Notes

- Gunakan resolusi scrape 10s di Prometheus untuk capture granularitas bucket baru.
- Retention lebih panjang bisa diatur per metric via recording rule + downsampling (mis. 5m rate -> simpan 30d).
