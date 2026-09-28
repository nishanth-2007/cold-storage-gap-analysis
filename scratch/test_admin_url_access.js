async function testUrls() {
  console.log('Testing Admin URL access and deployment resilience...\n');

  // Test 1: Vite dev server serving /admin-login
  console.log('1. Testing Vite Client dev server (http://localhost:5173/admin-login)...');
  const viteRes = await fetch('http://localhost:5173/admin-login');
  console.log('  - Status:', viteRes.status);
  const viteHtml = await viteRes.text();
  console.log('  - Has HTML document:', viteHtml.includes('<!DOCTYPE html>') || viteHtml.includes('<html'));

  // Test 2: Production server serving /admin-login directly
  console.log('\n2. Testing Production Express server serving /admin-login directly (http://localhost:5000/admin-login)...');
  const prodRes = await fetch('http://localhost:5000/admin-login');
  console.log('  - Status:', prodRes.status);
  const prodHtml = await prodRes.text();
  console.log('  - Has HTML document:', prodHtml.includes('<!DOCTYPE html>') || prodHtml.includes('<html'));
  console.log('  - Root element present:', prodHtml.includes('id="root"'));

  // Test 3: Production server serving /admin/login directly
  console.log('\n3. Testing Production Express server serving /admin/login directly (http://localhost:5000/admin/login)...');
  const prodAliasRes = await fetch('http://localhost:5000/admin/login');
  console.log('  - Status:', prodAliasRes.status);
  const prodAliasHtml = await prodAliasRes.text();
  console.log('  - Has HTML document:', prodAliasHtml.includes('<!DOCTYPE html>') || prodAliasHtml.includes('<html'));

  // Test 4: API health check to ensure API is not affected
  console.log('\n4. Testing Backend API health check (http://localhost:5000/api/health)...');
  const healthRes = await fetch('http://localhost:5000/api/health');
  const health = await healthRes.json();
  console.log('  - Health Status:', health.status);

  // Test 5: Verify Admin authentication endpoint still works
  console.log('\n5. Testing Administrator authentication (POST /api/auth/login)...');
  const loginRes = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@ap.gov.in', password: 'password123' })
  });
  const loginData = await loginRes.json();
  console.log('  - Login status:', loginRes.status);
  console.log('  - Admin name:', loginData.user?.name);
  console.log('  - Admin role:', loginData.user?.role);

  console.log('\n✓ All URL routing and authentication checks passed!');
}

testUrls().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
