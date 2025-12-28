const http = require('http');

function request({ method = 'GET', path, headers, body }) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: 'localhost', port: 4010, path, method, headers },
      res => {
        let data = '';
        res.on('data', chunk => (data += chunk.toString()));
        res.on('end', () => {
          let json;
          try {
            json = JSON.parse(data);
          } catch {}
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: json ?? data,
          });
        });
      }
    );
    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

async function main() {
  const tenantHeader = {
    'X-Tenant-ID': '00000000-0000-0000-0000-000000000000',
  };
  const token = process.env.TEST_JWT || '';
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  const checks = [
    { path: '/health', expectStatus: 200, headers: {} },
    {
      path: '/api/v1/tools',
      expectStatus: 200,
      headers: { ...tenantHeader, ...authHeader },
    },
    {
      path: '/api/v1/tools/health',
      expectStatus: 200,
      headers: { ...tenantHeader, ...authHeader },
    },
    {
      path: '/api/v1/tools/knowledge',
      expectStatus: 200,
      headers: { ...tenantHeader, ...authHeader },
    },
  ];
  let failed = 0;
  for (const c of checks) {
    try {
      const res = await request({
        path: c.path,
        method: 'GET',
        headers: c.headers,
      });
      if (res.status !== c.expectStatus) {
        console.error(
          `FAIL ${c.path}: expected ${c.expectStatus}, got ${res.status}`
        );
        failed++;
      } else {
        console.log(`OK   ${c.path}: ${res.status}`);
      }
    } catch (e) {
      console.error(`ERROR ${c.path}: ${e.message}`);
      failed++;
    }
  }
  try {
    const res = await request({
      path: '/api/v1/tools/knowledge/execute',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...tenantHeader,
        ...authHeader,
      },
      body: { params: { query: 'q', topK: 1 } },
    });
    if (res.status !== 200) {
      console.error(
        `FAIL POST /api/v1/tools/knowledge/execute: expected 200, got ${res.status}`
      );
      failed++;
    } else {
      console.log(`OK   POST /api/v1/tools/knowledge/execute: ${res.status}`);
    }
  } catch (e) {
    console.error(`ERROR POST /api/v1/tools/knowledge/execute: ${e.message}`);
    failed++;
  }
  if (failed > 0) {
    console.error(`Contract tests failed: ${failed}`);
    process.exit(1);
  }
  console.log('All contract tests passed');
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
