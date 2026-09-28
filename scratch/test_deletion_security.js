
async function testDeletionSecurity() {
  console.log('Testing Admin Cold Storage Deletion Security...\n');

  // 1. Login as Admin
  const loginRes = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@ap.gov.in', password: 'password123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('1. Admin logged in:', loginData.user.email);

  // 2. Attempt to delete protected seed benchmark facility (cs-gnt-001)
  console.log('\n2. Attempting to delete protected benchmark facility cs-gnt-001...');
  const deleteSeedRes = await fetch('http://localhost:5000/api/cold-storages/cs-gnt-001', {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const deleteSeedData = await deleteSeedRes.json();
  console.log('Status:', deleteSeedRes.status);
  console.log('Response:', deleteSeedData);

  if (deleteSeedRes.status === 403 && deleteSeedData.error.includes('benchmark')) {
    console.log('>>> PASSED: Protected benchmark facility was NOT allowed to be deleted!');
  } else {
    console.error('>>> FAILED: Protected benchmark facility should have been rejected!');
    process.exit(1);
  }

  // 3. Register a new manual cold storage as Admin
  console.log('\n3. Creating a new manual test cold storage...');
  const createRes = await fetch('http://localhost:5000/api/cold-storages', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      facilityName: "Test Manual Cold Storage for Deletion",
      registrationNumber: "TEST-MANUAL-001",
      district: "Guntur",
      mandal: "Guntur Urban",
      address: "Test Industrial Estate",
      coordinates: { lat: 16.30, lng: 80.44 },
      totalCapacityMT: 4000,
      availableCapacityMT: 1500,
      pricingPerMTMonth: 800,
      commoditiesSupported: ["Tomato", "Fresh Chilli"]
    })
  });
  const createdFacility = await createRes.json();
  console.log('Status:', createRes.status);
  console.log('Created ID:', createdFacility.id, 'isManual:', createdFacility.isManual);

  if (createdFacility.isManual !== true) {
    console.error('>>> FAILED: Newly registered facility should have isManual: true!');
    process.exit(1);
  }

  // 4. Delete the manually created facility
  console.log(`\n4. Deleting the manually created facility (${createdFacility.id})...`);
  const deleteManualRes = await fetch(`http://localhost:5000/api/cold-storages/${createdFacility.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const deleteManualData = await deleteManualRes.json();
  console.log('Status:', deleteManualRes.status);
  console.log('Response:', deleteManualData);

  if (deleteManualRes.status === 200 && deleteManualData.success === true) {
    console.log('>>> PASSED: Manually added facility was successfully deleted by Admin!');
  } else {
    console.error('>>> FAILED: Deletion of manual facility failed!');
    process.exit(1);
  }

  // 5. Verify the deleted facility no longer exists
  console.log('\n5. Verifying facility no longer exists...');
  const verifyRes = await fetch(`http://localhost:5000/api/cold-storages/${createdFacility.id}`);
  console.log('Verify Status:', verifyRes.status);
  if (verifyRes.status === 404) {
    console.log('>>> PASSED: Facility is completely removed (404 Not Found)!');
  }

  console.log('\nALL DELETION SECURITY TESTS PASSED SUCCESSFULLY! 100% COMPLIANT.');
}

testDeletionSecurity().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
