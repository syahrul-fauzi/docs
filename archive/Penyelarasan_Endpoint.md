# Penyelarasan Endpoint Posts, Pengujian, dan Dokumentasi Lanjutan

## Ringkasan

Dokumen ini memandu migrasi konsumen dari `listPosts(limit, offset, opts?)` ke `getPosts({ limit, q, preview? })` pada paket `@sba/cms`, meliputi:

- Perbandingan API dan parameter
- Contoh impor/pemanggilan sebelum→sesudah
- Dampak pada route filter blog dan pengujian
- Kebijakan kompatibilitas dan langkah migrasi bertahap

## Tujuan

- Menyelaraskan pemanggilan data posts di aplikasi marketing untuk konsistensi dan kesiapan pencarian (`q`) dan pembatasan jumlah (`limit`).
- Menjaga kompatibilitas backward untuk konsumen lama melalui wrapper `listPosts`.

## Tabel Perbandingan API

| API                  | Signature                                                                                               | Parameter                                             | Perilaku Utama                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `getPosts` (baru)    | `getPosts(opts?: { preview?: boolean; limit?: number; q?: string }): Promise<Post[]>`                   | `preview` (bool), `limit` (number), `q` (string)      | Mengambil daftar posts, mendukung pencarian berdasarkan `title/slug/excerpt` dan pemotongan jumlah berdasarkan `limit`.            |
| `listPosts` (kompat) | `listPosts(limit?: number, offset?: number, opts?: { preview?: boolean; q?: string }): Promise<Post[]>` | `limit` (number), `offset` (number), `opts.preview/q` | Wrapper yang memanggil `getPosts` lalu `slice(offset, offset+limit)` bila `offset` disediakan. Tetap tersedia untuk konsumen lama. |

Catatan:

- Filtering tambahan (kategori/author) dilakukan di sisi aplikasi marketing (in‑memory) untuk kompatibilitas saat ini.
- Bila skema BaseHub mendukung, filtering server‑side dapat ditambahkan di kemudian hari.

## Sebelum → Sesudah (Impor & Pemanggilan)

### Sebelum (kompat API lama)

```ts
import { listPosts } from '@sba/cms';

// Mendapatkan seluruh posts untuk keperluan filtering/paginasi
const allPosts = await listPosts(1000, 0);
```

### Sesudah (rekomendasi API baru)

```ts
import { getPosts } from '@sba/cms';

// Mendapatkan posts dengan limit dan pencarian (opsional)
const allPosts = await getPosts({ limit: 1000, q: params.search });
```

## Dampak pada Route Filter Blog

File: `apps/marketing/src/app/api/blog/filter/route.ts`

- Impor: `import { getPosts } from '@sba/cms'`
- Pemanggilan awal:

```ts
const allPosts = await getPosts({ limit: 1000, q: params.search });
```

- Pipeline berikutnya (tetap):
  - Filter `category` dan `author`
  - Search tambahan (opsional) di konten
  - Sorting (`date`/`title`/`author`)
  - Paginasi (hitung total, totalPages, slice page)

## Contoh Kode Lengkap (Potongan Route)

```ts
import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@sba/cms';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    category = '',
    author = '',
    search = '',
    sortBy = 'date',
    sortOrder = 'desc',
    page = 1,
    limit = 12,
  } = body;

  // Ambil posts dengan limit dan search
  const allPosts = await getPosts({ limit: 1000, q: search });

  // Filter kombinasi category/author
  let filtered = allPosts.filter(
    p =>
      (!category || p.category === category) &&
      (!author || p.author?.id === author)
  );

  // Sorting
  filtered = filtered.sort((a, b) => {
    const dir = sortOrder === 'asc' ? 1 : -1;
    switch (sortBy) {
      case 'date':
        return (
          (new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()) *
          dir
        );
      case 'title':
        return (a.title?.localeCompare(b.title || '') || 0) * dir;
      case 'author':
        return (a.author?.name || '').localeCompare(b.author?.name || '') * dir;
      default:
        return 0;
    }
  });

  // Paginasi
  const totalPosts = filtered.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const start = (page - 1) * limit;
  const posts = filtered.slice(start, start + limit);

  // Opsi filter
  const categories = Array.from(
    new Set(allPosts.map(p => p.category).filter(Boolean))
  ).sort();
  const authors = Array.from(
    new Map(
      allPosts
        .filter(p => p.author?.id && p.author?.name)
        .map(p => [p.author!.id, p.author!.name])
    ).entries()
  ).map(([id, name]) => ({ id, name }));

  return NextResponse.json({
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
    filters: {
      categories,
      authors,
      applied: { category, author, search, sortBy, sortOrder },
    },
    metadata: { generatedAt: new Date().toISOString() },
  });
}
```

## Pengujian

### Unit (CMS)

- File: `packages/cms/src/__tests__/get-posts.spec.ts`
- Kasus:
  - Membatasi jumlah berdasarkan `limit`
  - Memfilter berdasarkan `q` (title/slug/excerpt)
- Teknik: Mock `graphql` agar deterministik; verifikasi panjang dan kecocokan substring.

Contoh:

```ts
import { describe, it, expect, vi } from 'vitest';
vi.mock('../basehub/client', () => ({
  graphql: async () => ({
    posts: [
      /* dataset */
    ],
  }),
}));
import { getPosts } from '../services/content';

it('limits number of posts returned', async () => {
  const posts = await getPosts({ limit: 2 });
  expect(posts.length).toBeLessThanOrEqual(2);
});
```

### Integrasi (Marketing API)

- File: `apps/marketing/src/__tests__/blog-filter.spec.ts`
- Kasus:
  - `POST /api/blog/filter` dengan variasi `search`, `page`, `limit`
  - Kombinasi author/category: hanya menampilkan post dengan `author.id='a1'` dan `category='Tech'`
  - `GET /api/blog/filter`: verifikasi `categories` dan `authors` dari dataset
- Teknik: Mock `@sba/cms.getPosts` agar dataset stabil; panggil handler `POST`/`GET` langsung.

Contoh:

```ts
vi.mock('@sba/cms', () => ({
  getPosts: async () => [
    /* dataset dengan category & author */
  ],
}));
const res = await POST(
  mockRequest({ author: 'a1', category: 'Tech', page: 1, limit: 10 })
);
const json = await res.json();
expect(json.posts[0].author.id).toBe('a1');
expect(json.posts[0].category).toBe('Tech');
```

## Kebijakan Kompatibilitas & Migrasi

- `listPosts(limit, offset, opts?)` tetap diekspor untuk konsumen lama; direkomendasikan migrasi ke `getPosts({ limit, q, preview? })` bertahap.
- Panduan migrasi:
  1. Ganti impor `listPosts` → `getPosts`.
  2. Ganti pemanggilan `listPosts(1000, 0)` → `getPosts({ limit: 1000, q })`.
  3. Pertahankan pipeline filter/sort/paginate di aplikasi.
  4. Tambahkan pengujian unit/integrasi untuk endpoint baru.

## Edge Cases & Error Handling

- Bila `BASEHUB_TOKEN` tidak tersedia, gunakan fallback atau mock pada test; hindari dependensi env di pengujian unit/integrasi dengan mocking.
- Tangani dataset kosong dengan aman pada paginasi (totalPages=0, posts=[]).

## Performa & Peningkatan Lanjutan

- Pertimbangkan server‑side filtering (GraphQL) bila skema mendukung: limit, search, category/author sebagai parameter.
- Tetap gunakan dynamic import untuk komponen berat di frontend guna menurunkan initial bundle.

## Checklist Migrasi

- [ ] Impor di konsumen diperbarui ke `getPosts`
- [ ] Pemanggilan awal posts menggunakan `limit` dan `q`
- [ ] Pengujian unit/integrasi ditambahkan dan lulus
- [ ] Dokumentasi tim diperbarui dengan contoh kode dan perbandingan API
- [ ] Rencana bertahap untuk migrasi konsumen lain disepakati

---

Dokumen ini menjadi referensi tim untuk penyelarasan pemanggilan posts, pengujian yang relevan, dan migrasi yang aman tanpa mematahkan konsumen lama.
