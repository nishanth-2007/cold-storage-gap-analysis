const BASE_URL = 'http://localhost:5000/api';

async function runTest() {
  console.log('=== STARTING OWNER REGISTRATION & ADMIN APPROVAL FLOW TEST ===\n');

  // Step 1: Owner login
  console.log('1. Logging in as Cold Storage Owner (owner@ap.gov.in)...');
  const ownerLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'owner@ap.gov.in', password: 'password123' })
  });
  const ownerLogin = await ownerLoginRes.json();
  if (!ownerLogin.token) throw new Error('Owner login failed');
  const ownerToken = ownerLogin.token;
  console.log('✓ Owner login successful. User:', ownerLogin.user.name, `(${ownerLogin.user.role})`);

  // Step 2: Owner registers a new cold storage with exact GPS coordinates
  console.log('\n2. Owner submitting new facility registration with exact GPS coordinates...');
  const testFacilityData = {
    facilityName: 'Sri Padmavathi Multi-Commodity Cold Storage',
    registrationNumber: `AP-CS-${Date.now().toString().slice(-6)}`,
    district: 'Guntur',
    mandal: 'Prathipadu',
    address: 'Survey No. 248/A, NH-16 Highway, Prathipadu Village',
    coordinates: {
      lat: 16.1824,
      lng: 80.3541
    },
    totalCapacityMT: 6500,
    availableCapacityMT: 6500,
    pricingPerMTMonth: 850,
    commoditiesSupported: ['Fresh Chilli', 'Tomato', 'Turmeric'],
    temperatureZones: [
      {
        name: "Main Multi-Commodity Chamber",
        tempRange: "2°C to 8°C",
        capacityMT: 6500,
        availableMT: 6500,
        suitableCommodities: ['Fresh Chilli', 'Tomato', 'Turmeric']
      }
    ],
    contactPerson: 'K. Rama Rao',
    contactPhone: '9848022334',
    contactEmail: 'owner@ap.gov.in'
  };

  const regRes = await fetch(`${BASE_URL}/cold-storages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ownerToken}`
    },
    body: JSON.stringify(testFacilityData)
  });
  const createdFacility = await regRes.json();
  console.log('✓ Facility created:', createdFacility.facilityName);
  console.log('  - ID:', createdFacility.id);
  console.log('  - isManual:', createdFacility.isManual);
  console.log('  - isSystemSeed:', createdFacility.isSystemSeed);
  console.log('  - approvalStatus:', createdFacility.approvalStatus);
  console.log('  - verificationStatus:', createdFacility.verificationStatus);
  console.log('  - GPS Coordinates:', createdFacility.coordinates);

  if (createdFacility.approvalStatus !== 'Pending') {
    throw new Error(`Expected approvalStatus to be 'Pending', but got '${createdFacility.approvalStatus}'`);
  }

  // Step 3: Check Public Map API (unauthenticated / farmer view)
  console.log('\n3. Checking public GIS map query (GET /api/cold-storages)...');
  const publicRes = await fetch(`${BASE_URL}/cold-storages`);
  const publicStorages = await publicRes.json();
  const foundInPublicBefore = publicStorages.find(s => s.id === createdFacility.id);
  if (foundInPublicBefore) {
    throw new Error('FAILURE: Pending facility appears on public map before admin approval!');
  }
  console.log('✓ Verified: Pending facility is ISOLATED from the public GIS map (Not visible before approval).');

  // Step 4: Admin login
  console.log('\n4. Logging in as System Administrator (admin@ap.gov.in)...');
  const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@ap.gov.in', password: 'password123' })
  });
  const adminLogin = await adminLoginRes.json();
  if (!adminLogin.token) throw new Error('Admin login failed');
  const adminToken = adminLogin.token;
  console.log('✓ Admin login successful. User:', adminLogin.user.name);

  // Step 5: Admin inspects pending approvals queue
  console.log('\n5. Admin fetching pending facilities queue (GET /api/admin/pending-facilities)...');
  const pendingRes = await fetch(`${BASE_URL}/admin/pending-facilities`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const pendingList = await pendingRes.json();
  const pendingMatch = pendingList.find(s => s.id === createdFacility.id);
  if (!pendingMatch) {
    throw new Error('FAILURE: Submitted facility not found in admin pending queue!');
  }
  console.log('✓ Verified: Facility found in Admin pending queue at GPS:', pendingMatch.coordinates);

  // Step 6: Admin approves the facility
  console.log('\n6. Admin approving facility (POST /api/admin/facilities/:id/approve)...');
  const approveRes = await fetch(`${BASE_URL}/admin/facilities/${createdFacility.id}/approve`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const approveData = await approveRes.json();
  console.log('✓ Approval response:', approveData.message);
  console.log('  - approvalStatus:', approveData.facility.approvalStatus);
  console.log('  - verificationStatus:', approveData.facility.verificationStatus);
  console.log('  - approvedBy:', approveData.facility.approvedBy);

  // Step 7: Verify facility is NOW live on the public GIS map at exact GPS coordinates
  console.log('\n7. Verifying public GIS map query after admin approval...');
  const publicResAfter = await fetch(`${BASE_URL}/cold-storages`);
  const publicStoragesAfter = await publicResAfter.json();
  const foundInPublicAfter = publicStoragesAfter.find(s => s.id === createdFacility.id);
  if (!foundInPublicAfter) {
    throw new Error('FAILURE: Approved facility is NOT appearing on public GIS map!');
  }
  console.log('✓ SUCCESS: Facility is NOW LIVE on the AP GIS map!');
  console.log('  - Name:', foundInPublicAfter.facilityName);
  console.log('  - Exact Lat:', foundInPublicAfter.coordinates.lat);
  console.log('  - Exact Lng:', foundInPublicAfter.coordinates.lng);
  console.log('  - Total Capacity:', foundInPublicAfter.totalCapacityMT, 'MT');
  console.log('  - Operating Status:', foundInPublicAfter.operatingStatus);

  // Step 8: Admin deletes the owner/manually added cold storage
  console.log('\n8. Testing Admin deletion of the newly added cold storage (DELETE /api/cold-storages/:id)...');
  const deleteRes = await fetch(`${BASE_URL}/cold-storages/${createdFacility.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const deleteData = await deleteRes.json();
  console.log('✓ Deletion response status:', deleteRes.status);
  console.log('  - Message:', deleteData.message);

  if (deleteRes.status !== 200) {
    throw new Error(`Expected deletion status 200, got ${deleteRes.status}`);
  }

  // Verify it is gone from public map
  const publicResFinal = await fetch(`${BASE_URL}/cold-storages`);
  const publicStoragesFinal = await publicResFinal.json();
  const foundInPublicFinal = publicStoragesFinal.find(s => s.id === createdFacility.id);
  if (foundInPublicFinal) {
    throw new Error('FAILURE: Deleted facility still found in public storages!');
  }
  console.log('✓ Verified: Facility cleanly removed from public database and map.');

  // Step 9: Verify security rule: Admin CANNOT delete official API benchmark data
  console.log('\n9. Verifying security constraint: Admin CANNOT delete official API benchmark facilities...');
  const protectedRes = await fetch(`${BASE_URL}/cold-storages/cs-gnt-001`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const protectedData = await protectedRes.json();
  console.log('✓ Attempt to delete official benchmark facility returned status:', protectedRes.status);
  console.log('  - Protected Error Message:', protectedData.error);
  if (protectedRes.status !== 403) {
    throw new Error(`Expected HTTP 403 for benchmark facility deletion, got ${protectedRes.status}`);
  }
  console.log('✓ Benchmark data protection rule strictly enforced!');

  console.log('\n=======================================================');
  console.log(' ALL TESTS PASSED SUCCESSFULLY! COMPLETE FLOW VERIFIED.');
  console.log('=======================================================');
}

runTest().catch(err => {
  console.error('\n❌ TEST FAILED:', err.message);
  process.exit(1);
});
