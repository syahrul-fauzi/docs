## 00_context.md — Product & System Context

**Tujuan**

- Menjadi shared mental model untuk semua role
- Menghindari perbedaan interpretasi produk & agent
- Sebagai panduan rinci yang menyajikan kebutuhan, tujuan, dan spesifikasi produk yang akan dikembangkan, serta menghindari miskomunikasi antar tim.

**Isi utama**

- Visi SBA‑Agentic sebagai _Business OS berbasis Agent_: SBA-Agentic bertujuan untuk menjadi sistem operasi bisnis yang cerdas dan adaptif, didukung oleh agen AI untuk mengotomatisasi dan mengoptimalkan proses bisnis.
- Masalah organisasi (knowledge fragmentation, rigid automation): Mengatasi tantangan fragmentasi pengetahuan di berbagai sistem dan departemen, serta keterbatasan sistem otomatisasi tradisional yang kaku dan sulit beradaptasi.
- Prinsip inti:
  - Agentic > Rule‑based: Mengutamakan agen yang mampu membuat keputusan adaptif dan belajar dari interaksi, dibandingkan dengan sistem berbasis aturan yang statis.
  - Event > Request: Sistem dirancang untuk bereaksi secara proaktif terhadap peristiwa, memungkinkan respons yang lebih cepat dan dinamis dalam alur kerja bisnis.
  - Observability by default: Memastikan kemampuan untuk memantau, melacak, dan memahami perilaku sistem secara menyeluruh sejak awal pengembangan.
  - Multi‑tenant first: Arsitektur dirancang untuk mendukung banyak penyewa (organisasi atau pengguna) secara terisolasi, aman, dan efisien.

**Output engineering**

- Boundary konteks agent: Mendefinisikan batasan dan tanggung jawab yang jelas untuk setiap agen dalam sistem, memastikan efisiensi dan menghindari konflik.
- Constraint awal desain sistem: Mempertimbangkan batasan teknis, bisnis, dan asumsi dasar yang akan memandu pengembangan sistem, seperti integrasi dengan sistem yang ada dan kepatuhan regulasi.
