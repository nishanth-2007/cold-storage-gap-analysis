// Seed Data for Cold Storage Gap Mapping - Andhra Pradesh
import { AP_STATE, AP_DATA_SOURCES } from './andhraPradeshData.js';

export const SEED_USERS = [
  {
    id: "usr-farmer-01",
    name: "Srinivasa Rao",
    email: "farmer@ap.gov.in",
    passwordHash: "$2a$10$X8mG2Q/zZkQ33p48P20c7e2k/0zZ2M4F4Y7Wl0tW/mQZ4C6iS7Jve", // "password123"
    role: "farmer",
    organization: "Guntur Fresh Chilli Rythu Mithra FPO",
    district: "Guntur",
    mandal: "Duggirala",
    village: "Duggirala Village",
    phone: "+91 94401 23456",
    createdAt: "2025-10-15T09:00:00.000Z"
  },
  {
    id: "usr-owner-01",
    name: "Venkat Reddy",
    email: "owner@ap.gov.in",
    passwordHash: "$2a$10$X8mG2Q/zZkQ33p48P20c7e2k/0zZ2M4F4Y7Wl0tW/mQZ4C6iS7Jve", // "password123"
    role: "owner",
    organization: "Krishna Godavari Cold Chain Logistics Ltd",
    district: "Guntur",
    mandal: "Guntur Urban",
    village: "Nallapadu",
    phone: "+91 98480 55432",
    createdAt: "2025-08-10T11:30:00.000Z"
  },
  {
    id: "usr-planner-01",
    name: "Dr. K. Lakshmi Narayana",
    email: "planner@ap.gov.in",
    passwordHash: "$2a$10$X8mG2Q/zZkQ33p48P20c7e2k/0zZ2M4F4Y7Wl0tW/mQZ4C6iS7Jve", // "password123"
    role: "planner",
    organization: "AP Directorate of Horticulture & Agri Infra Mission",
    district: "NTR",
    phone: "+91 866 2445566",
    createdAt: "2025-05-01T14:15:00.000Z"
  },
  {
    id: "usr-admin-01",
    name: "System Administrator",
    email: "admin@ap.gov.in",
    passwordHash: "$2a$10$X8mG2Q/zZkQ33p48P20c7e2k/0zZ2M4F4Y7Wl0tW/mQZ4C6iS7Jve", // "password123"
    role: "admin",
    organization: "AP AgTech GIS Data Management Center",
    district: "Guntur",
    phone: "+91 863 2221100",
    createdAt: "2025-01-01T00:00:00.000Z"
  }
];

export const SEED_COLD_STORAGES = [
  {
    "id": "cs-gnt-001",
    "facilityName": "Sri Venkateswara Cold Storage & Agro Warehouse",
    "registrationNumber": "AP-GNT-CS-2018-042",
    "ownerId": "usr-owner-01",
    "state": "Andhra Pradesh",
    "district": "Guntur",
    "mandal": "Guntur Urban",
    "village": "Nallapadu",
    "address": "Plot 14-18, Autonagar Industrial Area, Nallapadu, Guntur 522005",
    "coordinates": {
      "lat": 16.289,
      "lng": 80.401
    },
    "totalCapacityMT": 8500,
    "availableCapacityMT": 1200,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber A (Spices & Fresh Chilli)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 4500,
        "availableMT": 600,
        "suitableCommodities": [
          "Fresh Chilli",
          "Turmeric"
        ]
      },
      {
        "name": "Chamber B (Fresh Fruits)",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2500,
        "availableMT": 450,
        "suitableCommodities": [
          "Mango",
          "Sweet Orange",
          "Banana"
        ]
      },
      {
        "name": "Chamber C (Vegetables)",
        "tempRange": "2°C to 5°C",
        "capacityMT": 1500,
        "availableMT": 150,
        "suitableCommodities": [
          "Tomato",
          "Fresh Chilli"
        ]
      }
    ],
    "commoditiesSupported": [
      "Fresh Chilli",
      "Turmeric",
      "Mango",
      "Tomato",
      "Sweet Orange"
    ],
    "pricingPerMTMonth": 850,
    "contactPerson": "K. Venkata Ramanayya",
    "contactPhone": "+91 98480 55432",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 50T",
      "De-stoner",
      "Sorting & Grading Conveyor",
      "CCTV 24/7",
      "Power Backup (250 KVA)"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Owner Provided",
    "sourceLastUpdated": "2026-09-27T10:00:00.000Z",
    "lastVerified": "2026-09-27T14:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-gnt-002",
    "facilityName": "Duggirala Turmeric Mega Cold Chain Terminal",
    "registrationNumber": "AP-GNT-CS-2020-089",
    "ownerId": "usr-owner-02",
    "state": "Andhra Pradesh",
    "district": "Guntur",
    "mandal": "Duggirala",
    "village": "Duggirala Village",
    "address": "NH-16 By-pass Junction, Duggirala, Guntur 522330",
    "coordinates": {
      "lat": 16.327,
      "lng": 80.6275
    },
    "totalCapacityMT": 12000,
    "availableCapacityMT": 3100,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Controlled Atmosphere CA-1",
        "tempRange": "2°C to 6°C",
        "capacityMT": 7000,
        "availableMT": 1900,
        "suitableCommodities": [
          "Turmeric",
          "Fresh Chilli"
        ]
      },
      {
        "name": "Multi-Commodity Chamber B",
        "tempRange": "10°C to 14°C",
        "capacityMT": 5000,
        "availableMT": 1200,
        "suitableCommodities": [
          "Banana",
          "Mango"
        ]
      }
    ],
    "commoditiesSupported": [
      "Turmeric",
      "Fresh Chilli",
      "Banana",
      "Mango"
    ],
    "pricingPerMTMonth": 780,
    "contactPerson": "M. Subba Rao",
    "contactPhone": "+91 94405 88991",
    "amenities": [
      "e-NAM Integrated Yard Access",
      "Humidity Controlled Dryers",
      "Weighbridge 100T",
      "Fumigation Chambers"
    ],
    "source": "APAMB Official Register",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T11:00:00.000Z",
    "lastVerified": "2026-09-26T16:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-gnt-003",
    "facilityName": "Tenali Spices & Agro Cold Preservation Hub",
    "registrationNumber": "AP-GNT-CS-2021-104",
    "ownerId": "usr-owner-01",
    "state": "Andhra Pradesh",
    "district": "Guntur",
    "mandal": "Tenali",
    "village": "Angalakuduru",
    "address": "Tenali-Guntur Main Road, Angalakuduru, Tenali 522211",
    "coordinates": {
      "lat": 16.243,
      "lng": 80.64
    },
    "totalCapacityMT": 6500,
    "availableCapacityMT": 1400,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Chilli & Turmeric)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 4000,
        "availableMT": 800,
        "suitableCommodities": [
          "Fresh Chilli",
          "Turmeric"
        ]
      },
      {
        "name": "Chamber 2 (Fresh Produce)",
        "tempRange": "2°C to 6°C",
        "capacityMT": 2500,
        "availableMT": 600,
        "suitableCommodities": [
          "Tomato",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Fresh Chilli",
      "Turmeric",
      "Tomato",
      "Banana"
    ],
    "pricingPerMTMonth": 810,
    "contactPerson": "K. Sambasiva Rao",
    "contactPhone": "+91 98481 22334",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 40T",
      "Power Backup",
      "CCTV 24/7"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T10:00:00.000Z",
    "lastVerified": "2026-09-27T12:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-pln-001",
    "facilityName": "Palnadu Integrated Chilli & Spices Cold Store",
    "registrationNumber": "AP-PLN-CS-2021-012",
    "ownerId": "usr-owner-02",
    "state": "Andhra Pradesh",
    "district": "Palnadu",
    "mandal": "Narasaraopet",
    "village": "Ravipadu",
    "address": "NH-544D Industrial Zone, Ravipadu, Narasaraopet 522601",
    "coordinates": {
      "lat": 16.231,
      "lng": 80.052
    },
    "totalCapacityMT": 7500,
    "availableCapacityMT": 1850,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber A (Dry & Fresh Chilli)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 4500,
        "availableMT": 1100,
        "suitableCommodities": [
          "Fresh Chilli"
        ]
      },
      {
        "name": "Chamber B (Vegetables & Tomato)",
        "tempRange": "2°C to 6°C",
        "capacityMT": 3000,
        "availableMT": 750,
        "suitableCommodities": [
          "Tomato",
          "Lime"
        ]
      }
    ],
    "commoditiesSupported": [
      "Fresh Chilli",
      "Tomato",
      "Lime",
      "Papaya"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "Ch. Samba Siva Rao",
    "contactPhone": "+91 94403 66789",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 60T",
      "Sorting & Grading Conveyor",
      "Solar Hybrid Power Backup"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T08:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-pln-002",
    "facilityName": "Chilakaluripet Agro & Lime Cold Terminal",
    "registrationNumber": "AP-PLN-CS-2022-033",
    "ownerId": "usr-owner-02",
    "state": "Andhra Pradesh",
    "district": "Palnadu",
    "mandal": "Chilakaluripet",
    "village": "Purushothapatnam",
    "address": "NH-16 Bypass, Purushothapatnam, Chilakaluripet 522616",
    "coordinates": {
      "lat": 16.089,
      "lng": 80.167
    },
    "totalCapacityMT": 6000,
    "availableCapacityMT": 2200,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber L-1 (Citrus & Lime)",
        "tempRange": "6°C to 10°C",
        "capacityMT": 3500,
        "availableMT": 1300,
        "suitableCommodities": [
          "Lime",
          "Sweet Orange"
        ]
      },
      {
        "name": "Chamber L-2 (Chilli & Tomato)",
        "tempRange": "3°C to 7°C",
        "capacityMT": 2500,
        "availableMT": 900,
        "suitableCommodities": [
          "Fresh Chilli",
          "Tomato"
        ]
      }
    ],
    "commoditiesSupported": [
      "Lime",
      "Fresh Chilli",
      "Tomato",
      "Sweet Orange"
    ],
    "pricingPerMTMonth": 790,
    "contactPerson": "Y. Srinivasa Reddy",
    "contactPhone": "+91 98485 77123",
    "amenities": [
      "Weighbridge 50T",
      "Pallet Storage",
      "Air Circulation Fans",
      "Genset 200 KVA"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T09:00:00.000Z",
    "lastVerified": "2026-09-27T11:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-bpt-001",
    "facilityName": "Bapatla Coastal Agro & Banana Cold Logistics",
    "registrationNumber": "AP-BPT-CS-2020-044",
    "ownerId": "usr-owner-02",
    "state": "Andhra Pradesh",
    "district": "Bapatla",
    "mandal": "Bapatla",
    "village": "Appikatla",
    "address": "Karlapalem Highway, Appikatla, Bapatla 522101",
    "coordinates": {
      "lat": 15.901,
      "lng": 80.465
    },
    "totalCapacityMT": 5500,
    "availableCapacityMT": 1600,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Banana Controlled Temp)",
        "tempRange": "12°C to 14°C",
        "capacityMT": 3000,
        "availableMT": 900,
        "suitableCommodities": [
          "Banana",
          "Papaya"
        ]
      },
      {
        "name": "Chamber 2 (Cashew & Spices)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 2500,
        "availableMT": 700,
        "suitableCommodities": [
          "Cashew",
          "Fresh Chilli"
        ]
      }
    ],
    "commoditiesSupported": [
      "Banana",
      "Fresh Chilli",
      "Cashew",
      "Vegetables"
    ],
    "pricingPerMTMonth": 800,
    "contactPerson": "P. Raghava Rao",
    "contactPhone": "+91 94402 11988",
    "amenities": [
      "Ripening Chambers",
      "Pre-cooling Dock",
      "Weighbridge 40T",
      "CCTV"
    ],
    "source": "AP Food Processing Society",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T14:00:00.000Z",
    "lastVerified": "2026-09-26T16:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-bpt-002",
    "facilityName": "Chirala Cashew & Marine-Agro Cold Chain",
    "registrationNumber": "AP-BPT-CS-2021-081",
    "ownerId": "usr-owner-02",
    "state": "Andhra Pradesh",
    "district": "Bapatla",
    "mandal": "Chirala",
    "village": "Vetapalem",
    "address": "Vetapalem Industrial Road, Chirala 523157",
    "coordinates": {
      "lat": 15.825,
      "lng": 80.352
    },
    "totalCapacityMT": 4500,
    "availableCapacityMT": 800,
    "operatingStatus": "Near Full",
    "temperatureZones": [
      {
        "name": "Chamber C-1 (Cashew & Dry Produce)",
        "tempRange": "5°C to 10°C",
        "capacityMT": 2500,
        "availableMT": 300,
        "suitableCommodities": [
          "Cashew"
        ]
      },
      {
        "name": "Chamber C-2 (Vegetables)",
        "tempRange": "2°C to 5°C",
        "capacityMT": 2000,
        "availableMT": 500,
        "suitableCommodities": [
          "Vegetables",
          "Tomato"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cashew",
      "Vegetables",
      "Tomato",
      "Banana"
    ],
    "pricingPerMTMonth": 830,
    "contactPerson": "D. Venkataramaiah",
    "contactPhone": "+91 8594 223344",
    "amenities": [
      "De-humidifier",
      "Weighbridge 50T",
      "24hr Power Backup"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T08:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-kri-001",
    "facilityName": "Nuzvid Royal Mango Cold Logistics",
    "registrationNumber": "AP-KRI-CS-2021-033",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "mandal": "Nuzvid",
    "village": "Nuzvid Town",
    "address": "Mylavaram Road, Nuzvid, Krishna 521201",
    "coordinates": {
      "lat": 16.7865,
      "lng": 80.8465
    },
    "totalCapacityMT": 6000,
    "availableCapacityMT": 2400,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber M-1 (Mango Specials)",
        "tempRange": "10°C to 13°C",
        "capacityMT": 4000,
        "availableMT": 1800,
        "suitableCommodities": [
          "Mango",
          "Guava"
        ]
      },
      {
        "name": "Chamber M-2 (Multi-Commodity)",
        "tempRange": "4°C to 10°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Vegetables",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Mango",
      "Guava",
      "Banana",
      "Tomato"
    ],
    "pricingPerMTMonth": 800,
    "contactPerson": "N. Prasad Babu",
    "contactPhone": "+91 94412 33445",
    "amenities": [
      "Solar Powered Hybrid Backup",
      "Hot Water Immersion Treatment",
      "Grading Lines"
    ],
    "source": "National Horticulture Board (NHB)",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-20T10:00:00.000Z",
    "lastVerified": "2026-09-24T15:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-kri-002",
    "facilityName": "Gudivada Horticultural & Guava Cold Hub",
    "registrationNumber": "AP-KRI-CS-2019-052",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "mandal": "Gudivada",
    "village": "Valivartipadu",
    "address": "Gudivada Bypass, Valivartipadu, Krishna 521301",
    "coordinates": {
      "lat": 16.441,
      "lng": 80.992
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1200,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Guava & Banana)",
        "tempRange": "8°C to 12°C",
        "capacityMT": 3000,
        "availableMT": 700,
        "suitableCommodities": [
          "Guava",
          "Banana"
        ]
      },
      {
        "name": "Chamber 2 (Mango & Vegetables)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 2000,
        "availableMT": 500,
        "suitableCommodities": [
          "Mango",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Guava",
      "Banana",
      "Mango",
      "Vegetables"
    ],
    "pricingPerMTMonth": 780,
    "contactPerson": "V. Ramamohana Rao",
    "contactPhone": "+91 98480 33211",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 50T",
      "Automated Dataloggers"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T12:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-kri-003",
    "facilityName": "Machilipatnam Port Agro Cold Terminal",
    "registrationNumber": "AP-KRI-CS-2022-091",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "mandal": "Machilipatnam",
    "village": "Chilakalapudi",
    "address": "Port Road, Chilakalapudi, Machilipatnam 521002",
    "coordinates": {
      "lat": 16.182,
      "lng": 81.135
    },
    "totalCapacityMT": 7000,
    "availableCapacityMT": 2800,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Multi-Fruit Export)",
        "tempRange": "4°C to 10°C",
        "capacityMT": 4000,
        "availableMT": 1600,
        "suitableCommodities": [
          "Mango",
          "Banana"
        ]
      },
      {
        "name": "Chamber 2 (Vegetables)",
        "tempRange": "2°C to 6°C",
        "capacityMT": 3000,
        "availableMT": 1200,
        "suitableCommodities": [
          "Vegetables",
          "Tomato"
        ]
      }
    ],
    "commoditiesSupported": [
      "Mango",
      "Banana",
      "Vegetables",
      "Tomato"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "G. Satyanarayana",
    "contactPhone": "+91 8672 255122",
    "amenities": [
      "Reefer Van Dock",
      "Weighbridge 60T",
      "Blast Chiller"
    ],
    "source": "AP Food Processing Society",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T15:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-ntr-001",
    "facilityName": "Nunna Mango & Horticultural Cold Storage Hub",
    "registrationNumber": "AP-NTR-CS-2016-015",
    "ownerId": "usr-owner-03",
    "state": "Andhra Pradesh",
    "district": "NTR",
    "mandal": "Vijayawada Rural",
    "village": "Nunna",
    "address": "Near Nunna Mango Market Yard, Inner Ring Road, Vijayawada 521212",
    "coordinates": {
      "lat": 16.5823,
      "lng": 80.6934
    },
    "totalCapacityMT": 10000,
    "availableCapacityMT": 450,
    "operatingStatus": "Near Full",
    "temperatureZones": [
      {
        "name": "Ripening & Cold Chamber 1",
        "tempRange": "10°C to 13°C",
        "capacityMT": 6000,
        "availableMT": 200,
        "suitableCommodities": [
          "Mango",
          "Papaya"
        ]
      },
      {
        "name": "Vegetable Preservation Unit",
        "tempRange": "4°C to 8°C",
        "capacityMT": 4000,
        "availableMT": 250,
        "suitableCommodities": [
          "Tomato",
          "Fresh Chilli"
        ]
      }
    ],
    "commoditiesSupported": [
      "Mango",
      "Papaya",
      "Tomato",
      "Fresh Chilli"
    ],
    "pricingPerMTMonth": 920,
    "contactPerson": "G. Radha Krishna",
    "contactPhone": "+91 866 2884433",
    "amenities": [
      "Ethylene Ripening Chambers",
      "Reefer Van Fleet (5 units)",
      "Blast Chiller",
      "APEDA Export Packhouse"
    ],
    "source": "APEDA & AP Horticulture Dept",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T08:00:00.000Z",
    "lastVerified": "2026-09-27T12:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-ntr-002",
    "facilityName": "Jaggayyapeta Horticulture & Spices Depot",
    "registrationNumber": "AP-NTR-CS-2021-067",
    "ownerId": "usr-owner-03",
    "state": "Andhra Pradesh",
    "district": "NTR",
    "mandal": "Jaggayyapeta",
    "village": "Chillakallu",
    "address": "NH-65 Hyderabad Highway, Chillakallu, Jaggayyapeta 521175",
    "coordinates": {
      "lat": 16.892,
      "lng": 80.098
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1900,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Fresh Chilli & Spices)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3000,
        "availableMT": 1100,
        "suitableCommodities": [
          "Fresh Chilli"
        ]
      },
      {
        "name": "Chamber 2 (Mango & Papaya)",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2000,
        "availableMT": 800,
        "suitableCommodities": [
          "Mango",
          "Papaya"
        ]
      }
    ],
    "commoditiesSupported": [
      "Fresh Chilli",
      "Mango",
      "Papaya",
      "Tomato"
    ],
    "pricingPerMTMonth": 780,
    "contactPerson": "M. Nageswara Rao",
    "contactPhone": "+91 94406 55432",
    "amenities": [
      "Weighbridge 50T",
      "Pre-cooling Chambers",
      "Power Backup"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T10:00:00.000Z",
    "lastVerified": "2026-09-27T11:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-ctr-001",
    "facilityName": "Tirupati Agro Cold Chain & Export Packhouse",
    "registrationNumber": "AP-CTR-CS-2021-008",
    "ownerId": "usr-owner-09",
    "state": "Andhra Pradesh",
    "district": "Chittoor",
    "mandal": "Palamaner",
    "village": "Palamaner Town",
    "address": "Bangalore - Chennai Corridor, Palamaner, Chittoor 517408",
    "coordinates": {
      "lat": 13.2015,
      "lng": 78.7523
    },
    "totalCapacityMT": 9000,
    "availableCapacityMT": 800,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Multi-fruit Chamber 1",
        "tempRange": "8°C to 12°C",
        "capacityMT": 5000,
        "availableMT": 400,
        "suitableCommodities": [
          "Mango",
          "Tomato"
        ]
      },
      {
        "name": "Pulp & Puree Freezer Cell",
        "tempRange": "-18°C to -22°C",
        "capacityMT": 4000,
        "availableMT": 400,
        "suitableCommodities": [
          "Mango Pulp",
          "Fruit Concentrate"
        ]
      }
    ],
    "commoditiesSupported": [
      "Mango",
      "Tomato",
      "Banana",
      "Papaya"
    ],
    "pricingPerMTMonth": 890,
    "contactPerson": "V. Anand Kumar",
    "contactPhone": "+91 8579 251122",
    "amenities": [
      "Deep Freeze -20°C",
      "VHT (Vapour Heat Treatment) Line",
      "Export Documentation Support"
    ],
    "source": "APEDA Certified Cold Chain Directory",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T18:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-ctr-002",
    "facilityName": "Chittoor Mango Pulp & Fruit Cold Terminal",
    "registrationNumber": "AP-CTR-CS-2018-055",
    "ownerId": "usr-owner-09",
    "state": "Andhra Pradesh",
    "district": "Chittoor",
    "mandal": "Chittoor",
    "village": "Murakambattu",
    "address": "Industrial Estate, Murakambattu, Chittoor 517127",
    "coordinates": {
      "lat": 13.218,
      "lng": 79.102
    },
    "totalCapacityMT": 8000,
    "availableCapacityMT": 2100,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber M-1 (Totapuri & Alphonso)",
        "tempRange": "10°C to 13°C",
        "capacityMT": 5000,
        "availableMT": 1400,
        "suitableCommodities": [
          "Mango"
        ]
      },
      {
        "name": "Chamber M-2 (Tomato & Banana)",
        "tempRange": "4°C to 10°C",
        "capacityMT": 3000,
        "availableMT": 700,
        "suitableCommodities": [
          "Tomato",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Mango",
      "Tomato",
      "Banana",
      "Papaya"
    ],
    "pricingPerMTMonth": 860,
    "contactPerson": "S. Mohan Reddy",
    "contactPhone": "+91 8572 233890",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 50T",
      "Automated Pulping Integration"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T11:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-ctr-003",
    "facilityName": "Kuppam Tri-Junction Agro Cold Depot",
    "registrationNumber": "AP-CTR-CS-2022-098",
    "ownerId": "usr-owner-09",
    "state": "Andhra Pradesh",
    "district": "Chittoor",
    "mandal": "Kuppam",
    "village": "Kuppam Town",
    "address": "Bangalore Highway, Kuppam 517425",
    "coordinates": {
      "lat": 12.752,
      "lng": 78.368
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1500,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Tomato & Vegetables)",
        "tempRange": "3°C to 7°C",
        "capacityMT": 3000,
        "availableMT": 900,
        "suitableCommodities": [
          "Tomato"
        ]
      },
      {
        "name": "Chamber 2 (Mango & Papaya)",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Mango",
          "Papaya"
        ]
      }
    ],
    "commoditiesSupported": [
      "Tomato",
      "Mango",
      "Papaya",
      "Banana"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "K. Murali Krishna",
    "contactPhone": "+91 94404 88712",
    "amenities": [
      "Weighbridge 40T",
      "Solar Rooftop (150 KW)",
      "Transit Dock"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T14:00:00.000Z",
    "lastVerified": "2026-09-27T09:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-tpt-001",
    "facilityName": "Srikalahasti Agro & Citrus Cold Logistics",
    "registrationNumber": "AP-TPT-CS-2020-031",
    "ownerId": "usr-owner-05",
    "state": "Andhra Pradesh",
    "district": "Tirupati",
    "mandal": "Srikalahasti",
    "village": "Yerpedu",
    "address": "Renigunta - Srikalahasti Highway, Yerpedu, Tirupati 517619",
    "coordinates": {
      "lat": 13.749,
      "lng": 79.702
    },
    "totalCapacityMT": 6500,
    "availableCapacityMT": 1800,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber C-1 (Acid Lime & Citrus)",
        "tempRange": "6°C to 10°C",
        "capacityMT": 4000,
        "availableMT": 1100,
        "suitableCommodities": [
          "Lime",
          "Sweet Orange"
        ]
      },
      {
        "name": "Chamber C-2 (Mango & Tomato)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 2500,
        "availableMT": 700,
        "suitableCommodities": [
          "Mango",
          "Tomato"
        ]
      }
    ],
    "commoditiesSupported": [
      "Lime",
      "Mango",
      "Tomato",
      "Cashew"
    ],
    "pricingPerMTMonth": 810,
    "contactPerson": "P. Venkata Subbaiah",
    "contactPhone": "+91 877 2289110",
    "amenities": [
      "Waxing Table",
      "Weighbridge 50T",
      "Pre-cooling Cells",
      "Genset Backup"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T16:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-tpt-002",
    "facilityName": "Renigunta Airport Agro Cargo Cold Terminal",
    "registrationNumber": "AP-TPT-CS-2022-076",
    "ownerId": "usr-owner-05",
    "state": "Andhra Pradesh",
    "district": "Tirupati",
    "mandal": "Tirupati Urban",
    "village": "Renigunta",
    "address": "Airport Road, Settipalli, Renigunta, Tirupati 517520",
    "coordinates": {
      "lat": 13.652,
      "lng": 79.518
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1300,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Air Cargo Packhouse (Chilled)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3000,
        "availableMT": 800,
        "suitableCommodities": [
          "Mango",
          "Tomato"
        ]
      },
      {
        "name": "Tropical Fruit Zone",
        "tempRange": "10°C to 14°C",
        "capacityMT": 2000,
        "availableMT": 500,
        "suitableCommodities": [
          "Papaya",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Mango",
      "Tomato",
      "Papaya",
      "Lime"
    ],
    "pricingPerMTMonth": 880,
    "contactPerson": "R. Jayachandra",
    "contactPhone": "+91 94411 77654",
    "amenities": [
      "Reefer Docking Bays",
      "APEDA Inspection Area",
      "X-Ray Scanner Integration"
    ],
    "source": "APEDA & AP State Warehouse Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T08:00:00.000Z",
    "lastVerified": "2026-09-27T11:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-tpt-003",
    "facilityName": "Gudur Coastal Citrus & Cashew Cold Facility",
    "registrationNumber": "AP-TPT-CS-2019-019",
    "ownerId": "usr-owner-05",
    "state": "Andhra Pradesh",
    "district": "Tirupati",
    "mandal": "Gudur",
    "village": "Chillakur",
    "address": "Chennai - Kolkata NH-16, Chillakur, Gudur 524101",
    "coordinates": {
      "lat": 14.148,
      "lng": 79.851
    },
    "totalCapacityMT": 4500,
    "availableCapacityMT": 1100,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Lime & Citrus Chamber",
        "tempRange": "7°C to 10°C",
        "capacityMT": 2500,
        "availableMT": 600,
        "suitableCommodities": [
          "Lime"
        ]
      },
      {
        "name": "Cashew & Dry Goods Chamber",
        "tempRange": "5°C to 9°C",
        "capacityMT": 2000,
        "availableMT": 500,
        "suitableCommodities": [
          "Cashew"
        ]
      }
    ],
    "commoditiesSupported": [
      "Lime",
      "Cashew",
      "Mango",
      "Vegetables"
    ],
    "pricingPerMTMonth": 790,
    "contactPerson": "T. Sudhakar Rao",
    "contactPhone": "+91 8624 251188",
    "amenities": [
      "De-stoner",
      "Weighbridge 40T",
      "Automated Humidifiers"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T11:00:00.000Z",
    "lastVerified": "2026-09-27T07:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-amm-001",
    "facilityName": "Madanapalle High-Altitude Tomato & Multi-Crop Cold Storage",
    "registrationNumber": "AP-AMM-CS-2019-077",
    "ownerId": "usr-owner-05",
    "state": "Andhra Pradesh",
    "district": "Annamayya",
    "mandal": "Madanapalle",
    "village": "Basinikonda",
    "address": "Basinikonda Industrial Estate, Madanapalle 517325",
    "coordinates": {
      "lat": 13.551,
      "lng": 78.502
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 350,
    "operatingStatus": "Near Full",
    "temperatureZones": [
      {
        "name": "Chamber T-1 (Tomato Controlled Humidity)",
        "tempRange": "10°C to 13°C",
        "capacityMT": 3500,
        "availableMT": 200,
        "suitableCommodities": [
          "Tomato"
        ]
      },
      {
        "name": "Chamber T-2 (Fruit & Papaya)",
        "tempRange": "10°C to 14°C",
        "capacityMT": 1500,
        "availableMT": 150,
        "suitableCommodities": [
          "Papaya",
          "Mango"
        ]
      }
    ],
    "commoditiesSupported": [
      "Tomato",
      "Papaya",
      "Mango"
    ],
    "pricingPerMTMonth": 950,
    "contactPerson": "C. Surendra Naidu",
    "contactPhone": "+91 8571 228899",
    "amenities": [
      "Hydro-cooling wash tanks",
      "Crate sterilization",
      "Weighbridge 40T",
      "Refrigerated Transit Dock"
    ],
    "source": "AP Cold Chain Portal",
    "sourceType": "Owner Provided",
    "sourceLastUpdated": "2026-09-27T07:30:00.000Z",
    "lastVerified": "2026-09-27T11:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-amm-002",
    "facilityName": "Rayachoti Papaya & Sweet Orange Cold Hub",
    "registrationNumber": "AP-AMM-CS-2022-045",
    "ownerId": "usr-owner-05",
    "state": "Andhra Pradesh",
    "district": "Annamayya",
    "mandal": "Rayachoti",
    "village": "Sambepalli",
    "address": "Kadapa - Bengaluru Road, Sambepalli, Rayachoti 516269",
    "coordinates": {
      "lat": 14.058,
      "lng": 78.756
    },
    "totalCapacityMT": 6000,
    "availableCapacityMT": 2100,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Papaya & Banana)",
        "tempRange": "12°C to 14°C",
        "capacityMT": 3500,
        "availableMT": 1200,
        "suitableCommodities": [
          "Papaya",
          "Banana"
        ]
      },
      {
        "name": "Chamber 2 (Tomato & Sweet Orange)",
        "tempRange": "5°C to 10°C",
        "capacityMT": 2500,
        "availableMT": 900,
        "suitableCommodities": [
          "Tomato",
          "Sweet Orange"
        ]
      }
    ],
    "commoditiesSupported": [
      "Papaya",
      "Banana",
      "Tomato",
      "Sweet Orange"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "M. Bhaskara Reddy",
    "contactPhone": "+91 94405 66123",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 50T",
      "Solar Power Backup"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T14:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-atp-001",
    "facilityName": "Rayalaseema Citrus & Sweet Orange Cold Chain",
    "registrationNumber": "AP-ATP-CS-2022-019",
    "ownerId": "usr-owner-07",
    "state": "Andhra Pradesh",
    "district": "Ananthapuramu",
    "mandal": "Tadipatri",
    "village": "Tadipatri Rural",
    "address": "Tadipatri - Kadapa Bypass Road, Ananthapuramu 515411",
    "coordinates": {
      "lat": 14.908,
      "lng": 78.012
    },
    "totalCapacityMT": 6500,
    "availableCapacityMT": 2100,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Citrus Precision Cell A",
        "tempRange": "5°C to 8°C",
        "capacityMT": 4500,
        "availableMT": 1400,
        "suitableCommodities": [
          "Sweet Orange",
          "Pomegranate"
        ]
      },
      {
        "name": "Banana Ripening / Holding Cell B",
        "tempRange": "12°C to 15°C",
        "capacityMT": 2000,
        "availableMT": 700,
        "suitableCommodities": [
          "Banana",
          "Papaya"
        ]
      }
    ],
    "commoditiesSupported": [
      "Sweet Orange",
      "Banana",
      "Pomegranate",
      "Papaya"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "D. Sreenivasulu",
    "contactPhone": "+91 94402 77112",
    "amenities": [
      "Degreening Room",
      "Automatic Sizing Roller Table",
      "Waxing Line",
      "Weighbridge 60T"
    ],
    "source": "National Centre for Cold-chain Development (NCCD)",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-22T09:00:00.000Z",
    "lastVerified": "2026-09-25T11:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-atp-002",
    "facilityName": "Ananthapuramu Precision Pomegranate & Horticulture Store",
    "registrationNumber": "AP-ATP-CS-2020-058",
    "ownerId": "usr-owner-07",
    "state": "Andhra Pradesh",
    "district": "Ananthapuramu",
    "mandal": "Ananthapuramu",
    "village": "Atmakur",
    "address": "Bellary Road, Atmakur, Ananthapuramu 515751",
    "coordinates": {
      "lat": 14.685,
      "lng": 77.605
    },
    "totalCapacityMT": 7000,
    "availableCapacityMT": 2600,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber P-1 (Pomegranate & Sweet Orange)",
        "tempRange": "5°C to 8°C",
        "capacityMT": 4000,
        "availableMT": 1500,
        "suitableCommodities": [
          "Pomegranate",
          "Sweet Orange"
        ]
      },
      {
        "name": "Chamber P-2 (Papaya & Vegetables)",
        "tempRange": "8°C to 12°C",
        "capacityMT": 3000,
        "availableMT": 1100,
        "suitableCommodities": [
          "Papaya",
          "Tomato"
        ]
      }
    ],
    "commoditiesSupported": [
      "Pomegranate",
      "Sweet Orange",
      "Papaya",
      "Tomato"
    ],
    "pricingPerMTMonth": 840,
    "contactPerson": "K. Ramanjaneyulu",
    "contactPhone": "+91 8554 277334",
    "amenities": [
      "Weighbridge 50T",
      "Pre-cooling Chambers",
      "Humidity Controlled Docks"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T15:00:00.000Z",
    "lastVerified": "2026-09-27T08:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-atp-003",
    "facilityName": "Guntakal Junction Multi-Commodity Cold Depot",
    "registrationNumber": "AP-ATP-CS-2021-088",
    "ownerId": "usr-owner-07",
    "state": "Andhra Pradesh",
    "district": "Ananthapuramu",
    "mandal": "Guntakal",
    "village": "Kasapuram",
    "address": "Railway Bypass Road, Kasapuram, Guntakal 515803",
    "coordinates": {
      "lat": 15.172,
      "lng": 77.378
    },
    "totalCapacityMT": 5500,
    "availableCapacityMT": 1900,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Railway Transit Chamber",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3500,
        "availableMT": 1200,
        "suitableCommodities": [
          "Sweet Orange",
          "Pomegranate"
        ]
      },
      {
        "name": "Banana Ripening Chamber",
        "tempRange": "12°C to 15°C",
        "capacityMT": 2000,
        "availableMT": 700,
        "suitableCommodities": [
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Sweet Orange",
      "Pomegranate",
      "Banana",
      "Tomato"
    ],
    "pricingPerMTMonth": 790,
    "contactPerson": "V. Somasekhar",
    "contactPhone": "+91 94408 99123",
    "amenities": [
      "Direct Rail Freight Access",
      "Weighbridge 60T",
      "Power Backup"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T14:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-sss-001",
    "facilityName": "Hindupur Industrial Border Cold Logistics",
    "registrationNumber": "AP-SSS-CS-2021-022",
    "ownerId": "usr-owner-07",
    "state": "Andhra Pradesh",
    "district": "Sri Sathya Sai",
    "mandal": "Hindupur",
    "village": "Lepakshi",
    "address": "Bengaluru Highway NH-44, Lepakshi, Hindupur 515331",
    "coordinates": {
      "lat": 13.829,
      "lng": 77.492
    },
    "totalCapacityMT": 6000,
    "availableCapacityMT": 1700,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber H-1 (Citrus & Sweet Orange)",
        "tempRange": "5°C to 8°C",
        "capacityMT": 3500,
        "availableMT": 1000,
        "suitableCommodities": [
          "Sweet Orange",
          "Pomegranate"
        ]
      },
      {
        "name": "Chamber H-2 (Mango & Banana)",
        "tempRange": "10°C to 14°C",
        "capacityMT": 2500,
        "availableMT": 700,
        "suitableCommodities": [
          "Mango",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Sweet Orange",
      "Pomegranate",
      "Mango",
      "Banana"
    ],
    "pricingPerMTMonth": 850,
    "contactPerson": "B. Gangadhar Reddy",
    "contactPhone": "+91 8556 221190",
    "amenities": [
      "Reefer Docking",
      "Pre-cooling",
      "Weighbridge 50T",
      "Power Backup (200 KVA)"
    ],
    "source": "AP Food Processing Society",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T12:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-sss-002",
    "facilityName": "Dharmavaram Sweet Orange & Horticultural Store",
    "registrationNumber": "AP-SSS-CS-2020-049",
    "ownerId": "usr-owner-07",
    "state": "Andhra Pradesh",
    "district": "Sri Sathya Sai",
    "mandal": "Dharmavaram",
    "village": "Bathalapalli",
    "address": "Bathalapalli Road, Dharmavaram 515671",
    "coordinates": {
      "lat": 14.415,
      "lng": 77.721
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1400,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Citrus Cell",
        "tempRange": "5°C to 9°C",
        "capacityMT": 3000,
        "availableMT": 800,
        "suitableCommodities": [
          "Sweet Orange"
        ]
      },
      {
        "name": "Vegetable Cell",
        "tempRange": "2°C to 6°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Tomato",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Sweet Orange",
      "Banana",
      "Tomato",
      "Mango"
    ],
    "pricingPerMTMonth": 810,
    "contactPerson": "P. Chandra Mohan",
    "contactPhone": "+91 98488 44556",
    "amenities": [
      "Waxing Table",
      "Weighbridge 40T",
      "Automated Dataloggers"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T10:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-knl-001",
    "facilityName": "Tungabhadra Fresh Chilli & Spices Preservation Cold Store",
    "registrationNumber": "AP-KNL-CS-2017-062",
    "ownerId": "usr-owner-06",
    "state": "Andhra Pradesh",
    "district": "Kurnool",
    "mandal": "Kurnool Urban",
    "village": "Gargeyapuram",
    "address": "NH-44 Bengaluru Highway, Gargeyapuram, Kurnool 518002",
    "coordinates": {
      "lat": 15.801,
      "lng": 78.075
    },
    "totalCapacityMT": 8000,
    "availableCapacityMT": 2800,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Precision Temperature Chamber 1",
        "tempRange": "7°C to 10°C",
        "capacityMT": 5000,
        "availableMT": 1600,
        "suitableCommodities": [
          "Fresh Chilli",
          "Sweet Orange"
        ]
      },
      {
        "name": "Fresh Chilli & Vegetable Chamber 2",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3000,
        "availableMT": 1200,
        "suitableCommodities": [
          "Fresh Chilli",
          "Tomato"
        ]
      }
    ],
    "commoditiesSupported": [
      "Fresh Chilli",
      "Tomato",
      "Sweet Orange"
    ],
    "pricingPerMTMonth": 720,
    "contactPerson": "B. Prabhakar Reddy",
    "contactPhone": "+91 8518 255677",
    "amenities": [
      "Forced Air Drying Ventilation",
      "Direct Highway Ramp Access",
      "24hr Genset Backup"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-24T14:00:00.000Z",
    "lastVerified": "2026-09-26T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-knl-002",
    "facilityName": "Adoni Commercial Agro & Spices Cold Terminal",
    "registrationNumber": "AP-KNL-CS-2021-039",
    "ownerId": "usr-owner-06",
    "state": "Andhra Pradesh",
    "district": "Kurnool",
    "mandal": "Adoni",
    "village": "Mandagiri",
    "address": "Adoni - Alur Road, Mandagiri, Adoni 518301",
    "coordinates": {
      "lat": 15.632,
      "lng": 77.275
    },
    "totalCapacityMT": 6500,
    "availableCapacityMT": 2300,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber A-1 (Fresh Chilli & Spices)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 4000,
        "availableMT": 1400,
        "suitableCommodities": [
          "Fresh Chilli"
        ]
      },
      {
        "name": "Chamber A-2 (Tomato & Vegetables)",
        "tempRange": "2°C to 6°C",
        "capacityMT": 2500,
        "availableMT": 900,
        "suitableCommodities": [
          "Tomato",
          "Sweet Orange"
        ]
      }
    ],
    "commoditiesSupported": [
      "Fresh Chilli",
      "Tomato",
      "Sweet Orange",
      "Banana"
    ],
    "pricingPerMTMonth": 740,
    "contactPerson": "V. Mallikarjuna",
    "contactPhone": "+91 8512 253321",
    "amenities": [
      "Weighbridge 60T",
      "Pre-cooling Fans",
      "Solar Power Backup"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T11:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-ndl-001",
    "facilityName": "Nandyal Golden Agri & Turmeric Cold Chain",
    "registrationNumber": "AP-NDL-CS-2020-018",
    "ownerId": "usr-owner-06",
    "state": "Andhra Pradesh",
    "district": "Nandyal",
    "mandal": "Nandyal",
    "village": "Chabolu",
    "address": "Gooty - Kurnool Highway, Chabolu, Nandyal 518501",
    "coordinates": {
      "lat": 15.482,
      "lng": 78.489
    },
    "totalCapacityMT": 7500,
    "availableCapacityMT": 2500,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber N-1 (Turmeric & Spices)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 4500,
        "availableMT": 1500,
        "suitableCommodities": [
          "Turmeric",
          "Fresh Chilli"
        ]
      },
      {
        "name": "Chamber N-2 (Banana & Sweet Orange)",
        "tempRange": "8°C to 12°C",
        "capacityMT": 3000,
        "availableMT": 1000,
        "suitableCommodities": [
          "Banana",
          "Sweet Orange"
        ]
      }
    ],
    "commoditiesSupported": [
      "Turmeric",
      "Fresh Chilli",
      "Banana",
      "Sweet Orange"
    ],
    "pricingPerMTMonth": 760,
    "contactPerson": "K. Raghunatha Reddy",
    "contactPhone": "+91 8514 244199",
    "amenities": [
      "Weighbridge 50T",
      "De-humidifier",
      "Pre-cooling Units",
      "Power Backup"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T14:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-ndl-002",
    "facilityName": "Allagadda Turmeric & Horticultural Cold Hub",
    "registrationNumber": "AP-NDL-CS-2022-064",
    "ownerId": "usr-owner-06",
    "state": "Andhra Pradesh",
    "district": "Nandyal",
    "mandal": "Allagadda",
    "village": "Rudravaram",
    "address": "NH-40 Bypass, Rudravaram, Allagadda 518543",
    "coordinates": {
      "lat": 15.132,
      "lng": 78.512
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1600,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Turmeric Precision Chamber",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3000,
        "availableMT": 900,
        "suitableCommodities": [
          "Turmeric"
        ]
      },
      {
        "name": "Banana Ripening Chamber",
        "tempRange": "12°C to 15°C",
        "capacityMT": 2000,
        "availableMT": 700,
        "suitableCommodities": [
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Turmeric",
      "Banana",
      "Sweet Orange",
      "Fresh Chilli"
    ],
    "pricingPerMTMonth": 780,
    "contactPerson": "Y. Narayana Swamy",
    "contactPhone": "+91 94407 11223",
    "amenities": [
      "Weighbridge 40T",
      "Solar Powered Backup",
      "Fumigation Chambers"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T11:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-kdp-001",
    "facilityName": "Kadapa Banana & Tropical Fruits Cold Logistics Hub",
    "registrationNumber": "AP-KDP-CS-2020-054",
    "ownerId": "usr-owner-08",
    "state": "Andhra Pradesh",
    "district": "YSR Kadapa",
    "mandal": "Pulivendula",
    "village": "Pulivendula Town",
    "address": "Agro Food Park, Pulivendula, YSR Kadapa 516390",
    "coordinates": {
      "lat": 14.423,
      "lng": 78.231
    },
    "totalCapacityMT": 7000,
    "availableCapacityMT": 1450,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Banana Holding Chamber 1",
        "tempRange": "13°C to 15°C",
        "capacityMT": 4000,
        "availableMT": 850,
        "suitableCommodities": [
          "Banana",
          "Papaya"
        ]
      },
      {
        "name": "Turmeric & General Chamber 2",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3000,
        "availableMT": 600,
        "suitableCommodities": [
          "Turmeric",
          "Sweet Orange"
        ]
      }
    ],
    "commoditiesSupported": [
      "Banana",
      "Papaya",
      "Turmeric",
      "Sweet Orange"
    ],
    "pricingPerMTMonth": 840,
    "contactPerson": "T. Harinath Reddy",
    "contactPhone": "+91 8568 244119",
    "amenities": [
      "Ethylene Scrubbers",
      "Pallet Inverters",
      "Blast Cooler",
      "Reefer Docking Bays"
    ],
    "source": "AP Food Processing Society (APFPS)",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T15:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-kdp-002",
    "facilityName": "Proddatur Commercial Agro & Fruit Cold Store",
    "registrationNumber": "AP-KDP-CS-2021-082",
    "ownerId": "usr-owner-08",
    "state": "Andhra Pradesh",
    "district": "YSR Kadapa",
    "mandal": "Proddatur",
    "village": "Modameedapalle",
    "address": "Jammalamadugu Road, Modameedapalle, Proddatur 516360",
    "coordinates": {
      "lat": 14.752,
      "lng": 78.552
    },
    "totalCapacityMT": 6000,
    "availableCapacityMT": 1800,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Banana & Papaya)",
        "tempRange": "12°C to 15°C",
        "capacityMT": 3500,
        "availableMT": 1100,
        "suitableCommodities": [
          "Banana",
          "Papaya"
        ]
      },
      {
        "name": "Chamber 2 (Turmeric & Citrus)",
        "tempRange": "5°C to 9°C",
        "capacityMT": 2500,
        "availableMT": 700,
        "suitableCommodities": [
          "Turmeric",
          "Sweet Orange"
        ]
      }
    ],
    "commoditiesSupported": [
      "Banana",
      "Papaya",
      "Turmeric",
      "Sweet Orange"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "M. Subbarayudu",
    "contactPhone": "+91 8564 252190",
    "amenities": [
      "Weighbridge 50T",
      "Pre-cooling Unit",
      "Power Backup (150 KVA)"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T16:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-pkm-001",
    "facilityName": "Ongole Spices & Horticultural Cold Chain Terminal",
    "registrationNumber": "AP-PKM-CS-2019-029",
    "ownerId": "usr-owner-02",
    "state": "Andhra Pradesh",
    "district": "Prakasam",
    "mandal": "Ongole",
    "village": "Pelluru",
    "address": "NH-16 Bypass, Pelluru, Ongole 523272",
    "coordinates": {
      "lat": 15.512,
      "lng": 80.045
    },
    "totalCapacityMT": 8000,
    "availableCapacityMT": 2200,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Fresh Chilli & Spices)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 4500,
        "availableMT": 1300,
        "suitableCommodities": [
          "Fresh Chilli"
        ]
      },
      {
        "name": "Chamber 2 (Sweet Orange & Tomato)",
        "tempRange": "5°C to 10°C",
        "capacityMT": 3500,
        "availableMT": 900,
        "suitableCommodities": [
          "Sweet Orange",
          "Tomato"
        ]
      }
    ],
    "commoditiesSupported": [
      "Fresh Chilli",
      "Sweet Orange",
      "Tomato",
      "Cashew"
    ],
    "pricingPerMTMonth": 800,
    "contactPerson": "S. Venkateswarlu",
    "contactPhone": "+91 8592 232110",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 60T",
      "Solar Rooftop 200KW",
      "CCTV"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T12:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-pkm-002",
    "facilityName": "Markapur Agro & Sweet Orange Cold Hub",
    "registrationNumber": "AP-PKM-CS-2022-073",
    "ownerId": "usr-owner-02",
    "state": "Andhra Pradesh",
    "district": "Prakasam",
    "mandal": "Markapur",
    "village": "Dornala",
    "address": "Srisailam Highway, Dornala, Markapur 523331",
    "coordinates": {
      "lat": 15.735,
      "lng": 79.271
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1700,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Citrus Chamber",
        "tempRange": "5°C to 8°C",
        "capacityMT": 3000,
        "availableMT": 1000,
        "suitableCommodities": [
          "Sweet Orange"
        ]
      },
      {
        "name": "Chilli & Vegetable Chamber",
        "tempRange": "3°C to 6°C",
        "capacityMT": 2000,
        "availableMT": 700,
        "suitableCommodities": [
          "Fresh Chilli",
          "Tomato"
        ]
      }
    ],
    "commoditiesSupported": [
      "Sweet Orange",
      "Fresh Chilli",
      "Tomato"
    ],
    "pricingPerMTMonth": 770,
    "contactPerson": "K. Chenna Kesava Rao",
    "contactPhone": "+91 94409 33211",
    "amenities": [
      "Weighbridge 40T",
      "Pre-cooling",
      "Power Backup"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T11:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-nlr-001",
    "facilityName": "Nellore Citrus & Acid Lime Cold Logistics",
    "registrationNumber": "AP-NLR-CS-2020-041",
    "ownerId": "usr-owner-05",
    "state": "Andhra Pradesh",
    "district": "Sri Potti Sriramulu Nellore",
    "mandal": "Nellore Urban",
    "village": "Kallurpalli",
    "address": "Autonagar Industrial Area, Kallurpalli, Nellore 524004",
    "coordinates": {
      "lat": 14.448,
      "lng": 79.989
    },
    "totalCapacityMT": 7000,
    "availableCapacityMT": 1900,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Acid Lime Precision Chamber",
        "tempRange": "7°C to 10°C",
        "capacityMT": 4000,
        "availableMT": 1100,
        "suitableCommodities": [
          "Acid Lime"
        ]
      },
      {
        "name": "Cashew & Produce Chamber",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3000,
        "availableMT": 800,
        "suitableCommodities": [
          "Cashew",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Acid Lime",
      "Cashew",
      "Papaya",
      "Vegetables"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "P. Ravindra Naidu",
    "contactPhone": "+91 861 2344567",
    "amenities": [
      "Degreening Cells",
      "Waxing Line",
      "Weighbridge 50T",
      "Reefer Dock"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T14:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-nlr-002",
    "facilityName": "Kavali Coastal Agro & Cashew Cold Depot",
    "registrationNumber": "AP-NLR-CS-2022-099",
    "ownerId": "usr-owner-05",
    "state": "Andhra Pradesh",
    "district": "Sri Potti Sriramulu Nellore",
    "mandal": "Kavali",
    "village": "Musunur",
    "address": "NH-16 Chennai - Kolkata Highway, Musunur, Kavali 524201",
    "coordinates": {
      "lat": 14.912,
      "lng": 79.992
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1500,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Cashew Zone",
        "tempRange": "5°C to 9°C",
        "capacityMT": 3000,
        "availableMT": 900,
        "suitableCommodities": [
          "Cashew"
        ]
      },
      {
        "name": "Vegetable & Papaya Zone",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Papaya",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cashew",
      "Papaya",
      "Acid Lime",
      "Vegetables"
    ],
    "pricingPerMTMonth": 790,
    "contactPerson": "G. Sudhakar Reddy",
    "contactPhone": "+91 94406 88910",
    "amenities": [
      "De-humidifier",
      "Weighbridge 40T",
      "Power Backup"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T15:00:00.000Z",
    "lastVerified": "2026-09-27T08:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-egd-001",
    "facilityName": "Godavari Delta Banana & Mango Cold Terminal",
    "registrationNumber": "AP-EGD-CS-2019-011",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "East Godavari",
    "mandal": "Rajahmundry Urban",
    "village": "Morampudi",
    "address": "Morampudi Junction, NH-16, Rajahmundry 533106",
    "coordinates": {
      "lat": 17.008,
      "lng": 81.812
    },
    "totalCapacityMT": 8500,
    "availableCapacityMT": 2400,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Banana Ripening & Holding CA",
        "tempRange": "12°C to 15°C",
        "capacityMT": 4500,
        "availableMT": 1300,
        "suitableCommodities": [
          "Banana"
        ]
      },
      {
        "name": "Mango & Cocoa Cold Chamber",
        "tempRange": "8°C to 12°C",
        "capacityMT": 4000,
        "availableMT": 1100,
        "suitableCommodities": [
          "Mango",
          "Cocoa",
          "Cashew"
        ]
      }
    ],
    "commoditiesSupported": [
      "Banana",
      "Mango",
      "Cocoa",
      "Cashew"
    ],
    "pricingPerMTMonth": 860,
    "contactPerson": "K. Satya Narayana Murthy",
    "contactPhone": "+91 883 2466789",
    "amenities": [
      "Ethylene Ripening (10 chambers)",
      "Weighbridge 60T",
      "Automated Pallet Conveyor"
    ],
    "source": "AP Food Processing Society",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T16:00:00.000Z",
    "lastVerified": "2026-09-27T09:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-egd-002",
    "facilityName": "Kovvur Agro Fresh & Cocoa Preservation Hub",
    "registrationNumber": "AP-EGD-CS-2021-057",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "East Godavari",
    "mandal": "Kovvur",
    "village": "Dommeru",
    "address": "Nidadavole Road, Dommeru, Kovvur 534350",
    "coordinates": {
      "lat": 17.015,
      "lng": 81.728
    },
    "totalCapacityMT": 5500,
    "availableCapacityMT": 1800,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Cocoa & Cashew Controlled Store",
        "tempRange": "10°C to 14°C",
        "capacityMT": 3000,
        "availableMT": 1000,
        "suitableCommodities": [
          "Cocoa",
          "Cashew"
        ]
      },
      {
        "name": "Banana & Mango Cell",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2500,
        "availableMT": 800,
        "suitableCommodities": [
          "Banana",
          "Mango"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cocoa",
      "Banana",
      "Cashew",
      "Mango"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "B. Venkanna Babu",
    "contactPhone": "+91 98482 66551",
    "amenities": [
      "Moisture Control",
      "Weighbridge 40T",
      "Power Backup 150 KVA"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T11:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-kkd-001",
    "facilityName": "Kakinada Port Deep-Water Agro Cold Logistics",
    "registrationNumber": "AP-KKD-CS-2020-025",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Kakinada",
    "mandal": "Kakinada Urban",
    "village": "Suryaraopeta",
    "address": "Port Main Road, Suryaraopeta, Kakinada 533001",
    "coordinates": {
      "lat": 16.992,
      "lng": 82.251
    },
    "totalCapacityMT": 9500,
    "availableCapacityMT": 2900,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Export Fresh Produce Zone",
        "tempRange": "4°C to 8°C",
        "capacityMT": 5500,
        "availableMT": 1700,
        "suitableCommodities": [
          "Mango",
          "Banana"
        ]
      },
      {
        "name": "Cashew & Value-Added Products",
        "tempRange": "6°C to 10°C",
        "capacityMT": 4000,
        "availableMT": 1200,
        "suitableCommodities": [
          "Cashew",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Mango",
      "Cashew",
      "Banana",
      "Vegetables"
    ],
    "pricingPerMTMonth": 880,
    "contactPerson": "D. Suryanarayana Raju",
    "contactPhone": "+91 884 2377890",
    "amenities": [
      "Direct Port Reefer Access",
      "Bonded Warehouse",
      "Weighbridge 60T",
      "Blast Freezer"
    ],
    "source": "APEDA Certified Facility",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T17:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-kkd-002",
    "facilityName": "Samalkota Cashew & Horticultural Cold Store",
    "registrationNumber": "AP-KKD-CS-2022-088",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Kakinada",
    "mandal": "Samalkota",
    "village": "Peddapuram",
    "address": "ADB Road, Peddapuram Industrial Zone, Samalkota 533440",
    "coordinates": {
      "lat": 17.051,
      "lng": 82.172
    },
    "totalCapacityMT": 6000,
    "availableCapacityMT": 1600,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Cashew Processing & Holding Chamber",
        "tempRange": "5°C to 9°C",
        "capacityMT": 3500,
        "availableMT": 900,
        "suitableCommodities": [
          "Cashew"
        ]
      },
      {
        "name": "Mango & Tropical Fruit Chamber",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2500,
        "availableMT": 700,
        "suitableCommodities": [
          "Mango",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cashew",
      "Mango",
      "Banana",
      "Vegetables"
    ],
    "pricingPerMTMonth": 810,
    "contactPerson": "V. Subba Rao",
    "contactPhone": "+91 94401 77890",
    "amenities": [
      "De-humidifier",
      "Weighbridge 50T",
      "Power Backup 200 KVA"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T14:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-kns-001",
    "facilityName": "Konaseema Banana & Coconut Cold Logistics Terminal",
    "registrationNumber": "AP-KNS-CS-2021-037",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "Dr. B.R. Ambedkar Konaseema",
    "mandal": "Amalapuram",
    "village": "Bandarulanka",
    "address": "Bandarulanka Road, Amalapuram 533201",
    "coordinates": {
      "lat": 16.582,
      "lng": 82.012
    },
    "totalCapacityMT": 7000,
    "availableCapacityMT": 2100,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Banana Controlled Humidity Cell",
        "tempRange": "12°C to 15°C",
        "capacityMT": 4500,
        "availableMT": 1400,
        "suitableCommodities": [
          "Banana",
          "Papaya"
        ]
      },
      {
        "name": "Cashew & Vegetables Cell",
        "tempRange": "4°C to 8°C",
        "capacityMT": 2500,
        "availableMT": 700,
        "suitableCommodities": [
          "Cashew",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Banana",
      "Cashew",
      "Papaya",
      "Vegetables"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "M. Ramakrishna Raju",
    "contactPhone": "+91 8856 233441",
    "amenities": [
      "Ethylene Scrubbers",
      "Pre-cooling Units",
      "Weighbridge 50T"
    ],
    "source": "AP Food Processing Society",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T12:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-kns-002",
    "facilityName": "Ravulapalem Horticultural Fresh Cold Hub",
    "registrationNumber": "AP-KNS-CS-2022-094",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "Dr. B.R. Ambedkar Konaseema",
    "mandal": "Ravulapalem",
    "village": "Kothapeta",
    "address": "NH-16 River Bridge Approach, Ravulapalem 533238",
    "coordinates": {
      "lat": 16.749,
      "lng": 81.842
    },
    "totalCapacityMT": 5500,
    "availableCapacityMT": 1700,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Banana Ripening Chamber",
        "tempRange": "13°C to 16°C",
        "capacityMT": 3500,
        "availableMT": 1100,
        "suitableCommodities": [
          "Banana"
        ]
      },
      {
        "name": "Tropical Fruit & Veg Chamber",
        "tempRange": "6°C to 10°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Papaya",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Banana",
      "Papaya",
      "Cashew",
      "Vegetables"
    ],
    "pricingPerMTMonth": 800,
    "contactPerson": "P. Trinadha Rao",
    "contactPhone": "+91 94418 55234",
    "amenities": [
      "Direct Highway Loading Dock",
      "Weighbridge 40T",
      "Automated Dataloggers"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T16:00:00.000Z",
    "lastVerified": "2026-09-27T08:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-wgd-001",
    "facilityName": "Tadepalligudem Agro Wholesale Cold Terminal",
    "registrationNumber": "AP-WGD-CS-2018-028",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "West Godavari",
    "mandal": "Tadepalligudem",
    "village": "Pentapadu",
    "address": "NH-16 Industrial Corridor, Pentapadu, Tadepalligudem 534101",
    "coordinates": {
      "lat": 16.812,
      "lng": 81.528
    },
    "totalCapacityMT": 9000,
    "availableCapacityMT": 2600,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Banana & Multi-Fruit CA Unit",
        "tempRange": "10°C to 14°C",
        "capacityMT": 5000,
        "availableMT": 1500,
        "suitableCommodities": [
          "Banana",
          "Guava"
        ]
      },
      {
        "name": "Cocoa & Vegetable Cold Cell",
        "tempRange": "4°C to 8°C",
        "capacityMT": 4000,
        "availableMT": 1100,
        "suitableCommodities": [
          "Cocoa",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Banana",
      "Guava",
      "Cocoa",
      "Vegetables"
    ],
    "pricingPerMTMonth": 840,
    "contactPerson": "N. Venkateswara Rao",
    "contactPhone": "+91 8818 224455",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 60T",
      "Automated Sorting",
      "Power Backup (250 KVA)"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T15:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-wgd-002",
    "facilityName": "Bhimavaram Delta Agro & Marine Cold Storage",
    "registrationNumber": "AP-WGD-CS-2020-072",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "West Godavari",
    "mandal": "Bhimavaram",
    "village": "Rayalam",
    "address": "Rayalam Bypass, Bhimavaram 534208",
    "coordinates": {
      "lat": 16.541,
      "lng": 81.525
    },
    "totalCapacityMT": 7000,
    "availableCapacityMT": 2000,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Guava & Fruit Holding Zone",
        "tempRange": "8°C to 12°C",
        "capacityMT": 4000,
        "availableMT": 1200,
        "suitableCommodities": [
          "Guava",
          "Banana"
        ]
      },
      {
        "name": "Fresh Vegetables Cell",
        "tempRange": "2°C to 6°C",
        "capacityMT": 3000,
        "availableMT": 800,
        "suitableCommodities": [
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Guava",
      "Banana",
      "Vegetables",
      "Cocoa"
    ],
    "pricingPerMTMonth": 830,
    "contactPerson": "K. Satish Varma",
    "contactPhone": "+91 8816 235567",
    "amenities": [
      "Blast Chiller",
      "Weighbridge 50T",
      "Pre-cooling Dock"
    ],
    "source": "AP Food Processing Society",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T11:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-wgd-003",
    "facilityName": "Tanuku Fruit & Vegetable Cold Chain",
    "registrationNumber": "AP-WGD-CS-2022-099",
    "ownerId": "usr-owner-04",
    "state": "Andhra Pradesh",
    "district": "West Godavari",
    "mandal": "Tanuku",
    "village": "Tetali",
    "address": "NH-16 By-pass, Tetali, Tanuku 534211",
    "coordinates": {
      "lat": 16.755,
      "lng": 81.682
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1400,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Banana & Guava)",
        "tempRange": "8°C to 12°C",
        "capacityMT": 3000,
        "availableMT": 800,
        "suitableCommodities": [
          "Banana",
          "Guava"
        ]
      },
      {
        "name": "Chamber 2 (Cocoa & Produce)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Cocoa",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Banana",
      "Guava",
      "Cocoa",
      "Vegetables"
    ],
    "pricingPerMTMonth": 810,
    "contactPerson": "P. Ranga Rao",
    "contactPhone": "+91 94403 44190",
    "amenities": [
      "Weighbridge 40T",
      "Pre-cooling Units",
      "Power Backup"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T14:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-elr-001",
    "facilityName": "Eluru District Agro Preservation Hub",
    "registrationNumber": "AP-ELR-CS-2020-034",
    "ownerId": "usr-owner-03",
    "state": "Andhra Pradesh",
    "district": "Eluru",
    "mandal": "Eluru Urban",
    "village": "Sanivarapupeta",
    "address": "Bypass Road, Sanivarapupeta, Eluru 534003",
    "coordinates": {
      "lat": 16.715,
      "lng": 81.102
    },
    "totalCapacityMT": 7500,
    "availableCapacityMT": 2200,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Oil Palm & Cocoa)",
        "tempRange": "10°C to 14°C",
        "capacityMT": 4500,
        "availableMT": 1300,
        "suitableCommodities": [
          "Cocoa",
          "Banana"
        ]
      },
      {
        "name": "Chamber 2 (Mango & Vegetables)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3000,
        "availableMT": 900,
        "suitableCommodities": [
          "Mango",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cocoa",
      "Banana",
      "Mango",
      "Oil Palm"
    ],
    "pricingPerMTMonth": 800,
    "contactPerson": "Ch. Venkanna Chowdary",
    "contactPhone": "+91 8812 245566",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 50T",
      "Solar Power Backup (150 KW)"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T16:00:00.000Z",
    "lastVerified": "2026-09-27T09:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-elr-002",
    "facilityName": "Jangareddigudem Horticulture Cold Terminal",
    "registrationNumber": "AP-ELR-CS-2022-081",
    "ownerId": "usr-owner-03",
    "state": "Andhra Pradesh",
    "district": "Eluru",
    "mandal": "Jangareddigudem",
    "village": "Chintalapudi Road",
    "address": "State Highway 42, Jangareddigudem 534447",
    "coordinates": {
      "lat": 17.125,
      "lng": 81.295
    },
    "totalCapacityMT": 5500,
    "availableCapacityMT": 1700,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Cocoa & Banana)",
        "tempRange": "8°C to 12°C",
        "capacityMT": 3500,
        "availableMT": 1100,
        "suitableCommodities": [
          "Cocoa",
          "Banana"
        ]
      },
      {
        "name": "Chamber 2 (Mango & Produce)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Mango",
          "Vegetables"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cocoa",
      "Banana",
      "Mango",
      "Vegetables"
    ],
    "pricingPerMTMonth": 780,
    "contactPerson": "K. Mohan Babu",
    "contactPhone": "+91 94408 22199",
    "amenities": [
      "Weighbridge 40T",
      "Pre-cooling Dock",
      "Power Backup"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T12:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-vsp-001",
    "facilityName": "Visakha Coastal Cold Chain & Reefer Logistics",
    "registrationNumber": "AP-VSP-CS-2015-003",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "mandal": "Visakhapatnam Urban",
    "village": "Gajuwaka",
    "address": "Industrial Development Area, Gajuwaka, Visakhapatnam 530026",
    "coordinates": {
      "lat": 17.698,
      "lng": 83.195
    },
    "totalCapacityMT": 11000,
    "availableCapacityMT": 3900,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Dry Spices & Cashew Zone",
        "tempRange": "5°C to 10°C",
        "capacityMT": 6000,
        "availableMT": 2200,
        "suitableCommodities": [
          "Cashew",
          "Coffee",
          "Turmeric"
        ]
      },
      {
        "name": "Vegetables & Local Produce Zone",
        "tempRange": "2°C to 6°C",
        "capacityMT": 5000,
        "availableMT": 1700,
        "suitableCommodities": [
          "Tomato",
          "Vegetables",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cashew",
      "Tomato",
      "Banana",
      "Turmeric"
    ],
    "pricingPerMTMonth": 880,
    "contactPerson": "K. Appa Rao",
    "contactPhone": "+91 891 2755441",
    "amenities": [
      "Port Proximity 8km",
      "Bonded Warehouse",
      "Container Reefer Plugs 40 units"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T16:00:00.000Z",
    "lastVerified": "2026-09-26T14:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-vsp-002",
    "facilityName": "Anandapuram Multi-Crop Urban Transit Cold Hub",
    "registrationNumber": "AP-VSP-CS-2021-061",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "mandal": "Anandapuram",
    "village": "Padmanabham",
    "address": "NH-16 Outer Ring Corridor, Anandapuram, Visakhapatnam 530052",
    "coordinates": {
      "lat": 17.905,
      "lng": 83.398
    },
    "totalCapacityMT": 6500,
    "availableCapacityMT": 1800,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Vegetable Chilling Cell",
        "tempRange": "2°C to 5°C",
        "capacityMT": 4000,
        "availableMT": 1100,
        "suitableCommodities": [
          "Vegetables",
          "Tomato"
        ]
      },
      {
        "name": "Cashew & Fruit Cell",
        "tempRange": "6°C to 10°C",
        "capacityMT": 2500,
        "availableMT": 700,
        "suitableCommodities": [
          "Cashew",
          "Papaya"
        ]
      }
    ],
    "commoditiesSupported": [
      "Vegetables",
      "Cashew",
      "Tomato",
      "Papaya"
    ],
    "pricingPerMTMonth": 850,
    "contactPerson": "B. Jagannadha Rao",
    "contactPhone": "+91 94401 99882",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 50T",
      "Automated Dataloggers"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T11:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-akp-001",
    "facilityName": "Anakapalli Agro Terminal & Jaggery-Fruit Cold Store",
    "registrationNumber": "AP-AKP-CS-2020-043",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Anakapalli",
    "mandal": "Anakapalli",
    "village": "Thummapala",
    "address": "Thummapala Industrial Area, Anakapalli 531001",
    "coordinates": {
      "lat": 17.695,
      "lng": 83.008
    },
    "totalCapacityMT": 7000,
    "availableCapacityMT": 2100,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Tomato & Vegetables)",
        "tempRange": "3°C to 7°C",
        "capacityMT": 4000,
        "availableMT": 1200,
        "suitableCommodities": [
          "Tomato",
          "Vegetables"
        ]
      },
      {
        "name": "Chamber 2 (Mango & Cashew)",
        "tempRange": "6°C to 10°C",
        "capacityMT": 3000,
        "availableMT": 900,
        "suitableCommodities": [
          "Mango",
          "Cashew"
        ]
      }
    ],
    "commoditiesSupported": [
      "Tomato",
      "Cashew",
      "Mango",
      "Vegetables"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "G. Varahala Naidu",
    "contactPhone": "+91 8924 221190",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 50T",
      "Power Backup (150 KVA)"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T14:00:00.000Z",
    "lastVerified": "2026-09-27T08:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-akp-002",
    "facilityName": "Chodavaram Organic & Agro Cold Depot",
    "registrationNumber": "AP-AKP-CS-2022-095",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Anakapalli",
    "mandal": "Chodavaram",
    "village": "K.Kotapadu",
    "address": "SH-9 Highway, K.Kotapadu, Chodavaram 531036",
    "coordinates": {
      "lat": 17.835,
      "lng": 82.948
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1600,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Vegetable Cell",
        "tempRange": "2°C to 6°C",
        "capacityMT": 3000,
        "availableMT": 1000,
        "suitableCommodities": [
          "Tomato",
          "Vegetables"
        ]
      },
      {
        "name": "Cashew & Fruit Cell",
        "tempRange": "7°C to 11°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Cashew",
          "Mango"
        ]
      }
    ],
    "commoditiesSupported": [
      "Tomato",
      "Vegetables",
      "Cashew",
      "Mango"
    ],
    "pricingPerMTMonth": 790,
    "contactPerson": "D. Sanyasi Rao",
    "contactPhone": "+91 94407 66554",
    "amenities": [
      "Weighbridge 40T",
      "Pre-cooling Fans",
      "Solar Rooftop 100 KW"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T16:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-asr-001",
    "facilityName": "Araku Valley Hill Produce & Organic Coffee Cold Store",
    "registrationNumber": "AP-ASR-CS-2021-016",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Alluri Sitharama Raju",
    "mandal": "Araku Valley",
    "village": "Dumbriguda",
    "address": "Araku - Paderu Ghat Road, Dumbriguda, Araku Valley 531149",
    "coordinates": {
      "lat": 18.328,
      "lng": 82.879
    },
    "totalCapacityMT": 4000,
    "availableCapacityMT": 1200,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Organic Coffee & Pepper Cell",
        "tempRange": "12°C to 16°C",
        "capacityMT": 2500,
        "availableMT": 800,
        "suitableCommodities": [
          "Coffee",
          "Black Pepper"
        ]
      },
      {
        "name": "Ginger & Turmeric Cell",
        "tempRange": "6°C to 10°C",
        "capacityMT": 1500,
        "availableMT": 400,
        "suitableCommodities": [
          "Ginger",
          "Turmeric"
        ]
      }
    ],
    "commoditiesSupported": [
      "Coffee",
      "Turmeric",
      "Ginger",
      "Black Pepper"
    ],
    "pricingPerMTMonth": 850,
    "contactPerson": "P. Somalingam Dora",
    "contactPhone": "+91 8936 249910",
    "amenities": [
      "Solar-Diesel Hybrid Generator",
      "De-humidifier",
      "Weighbridge 30T",
      "Tribal FPO Dedicated Bays"
    ],
    "source": "GCC (Girijan Co-operative Corporation) & AP Horti Dept",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T15:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-asr-002",
    "facilityName": "Paderu Tribal Agency Horticultural Cold Depot",
    "registrationNumber": "AP-ASR-CS-2022-074",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Alluri Sitharama Raju",
    "mandal": "Paderu",
    "village": "G.Madugula",
    "address": "Main Agency Road, Paderu 531024",
    "coordinates": {
      "lat": 18.086,
      "lng": 82.671
    },
    "totalCapacityMT": 3500,
    "availableCapacityMT": 1100,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Ginger & Turmeric Holding Chamber",
        "tempRange": "7°C to 10°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Ginger",
          "Turmeric"
        ]
      },
      {
        "name": "Coffee & Spices Chamber",
        "tempRange": "12°C to 15°C",
        "capacityMT": 1500,
        "availableMT": 500,
        "suitableCommodities": [
          "Coffee"
        ]
      }
    ],
    "commoditiesSupported": [
      "Turmeric",
      "Ginger",
      "Coffee",
      "Black Pepper"
    ],
    "pricingPerMTMonth": 800,
    "contactPerson": "K. Balaraju",
    "contactPhone": "+91 94412 88712",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 30T",
      "Power Backup"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T11:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-vzm-001",
    "facilityName": "Vizianagaram Agro & Mango Export Cold Chain",
    "registrationNumber": "AP-VZM-CS-2019-021",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Vizianagaram",
    "mandal": "Vizianagaram",
    "village": "Dharmapuri",
    "address": "NH-26 Raipur Highway, Dharmapuri, Vizianagaram 535002",
    "coordinates": {
      "lat": 18.118,
      "lng": 83.398
    },
    "totalCapacityMT": 7000,
    "availableCapacityMT": 2100,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Mango & Tropical Fruit Chamber",
        "tempRange": "8°C to 12°C",
        "capacityMT": 4000,
        "availableMT": 1200,
        "suitableCommodities": [
          "Mango",
          "Banana"
        ]
      },
      {
        "name": "Cashew & Tomato Cell",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3000,
        "availableMT": 900,
        "suitableCommodities": [
          "Cashew",
          "Tomato"
        ]
      }
    ],
    "commoditiesSupported": [
      "Mango",
      "Cashew",
      "Tomato",
      "Banana"
    ],
    "pricingPerMTMonth": 810,
    "contactPerson": "S. Appala Naidu",
    "contactPhone": "+91 8922 278890",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 50T",
      "Power Backup (200 KVA)",
      "Grading Table"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T16:00:00.000Z",
    "lastVerified": "2026-09-27T10:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-vzm-002",
    "facilityName": "Bobbili Horticultural & Cashew Cold Depot",
    "registrationNumber": "AP-VZM-CS-2021-085",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Vizianagaram",
    "mandal": "Bobbili",
    "village": "Badangi",
    "address": "Bobbili Industrial Growth Center, Bobbili 535558",
    "coordinates": {
      "lat": 18.572,
      "lng": 83.365
    },
    "totalCapacityMT": 5000,
    "availableCapacityMT": 1500,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Cashew Chamber",
        "tempRange": "5°C to 9°C",
        "capacityMT": 3000,
        "availableMT": 900,
        "suitableCommodities": [
          "Cashew"
        ]
      },
      {
        "name": "Mango & Produce Chamber",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Mango",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cashew",
      "Mango",
      "Banana",
      "Tomato"
    ],
    "pricingPerMTMonth": 780,
    "contactPerson": "M. Satyanarayana",
    "contactPhone": "+91 94405 11982",
    "amenities": [
      "Weighbridge 40T",
      "Pre-cooling Units",
      "Power Backup"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T14:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-pvm-001",
    "facilityName": "Manyam Tribal & Cashew Agro Cold Terminal",
    "registrationNumber": "AP-PVM-CS-2021-032",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Parvathipuram Manyam",
    "mandal": "Parvathipuram",
    "village": "Seethanagaram",
    "address": "SH-4 Raipur Road, Seethanagaram, Parvathipuram 535501",
    "coordinates": {
      "lat": 18.779,
      "lng": 83.432
    },
    "totalCapacityMT": 5500,
    "availableCapacityMT": 1700,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Cashew & Turmeric Chamber",
        "tempRange": "5°C to 9°C",
        "capacityMT": 3500,
        "availableMT": 1100,
        "suitableCommodities": [
          "Cashew",
          "Turmeric"
        ]
      },
      {
        "name": "Mango & Fruit Cell",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Mango",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cashew",
      "Mango",
      "Banana",
      "Turmeric"
    ],
    "pricingPerMTMonth": 790,
    "contactPerson": "V. Jagannadham",
    "contactPhone": "+91 8963 221145",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 40T",
      "Solar Powered Backup 120 KW"
    ],
    "source": "AP Food Processing Society",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T12:00:00.000Z",
    "lastVerified": "2026-09-27T09:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-pvm-002",
    "facilityName": "Salur Agro Fresh & Spices Cold Depot",
    "registrationNumber": "AP-PVM-CS-2022-069",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Parvathipuram Manyam",
    "mandal": "Salur",
    "village": "Makkuva",
    "address": "Ghat Road, Makkuva, Salur 535591",
    "coordinates": {
      "lat": 18.528,
      "lng": 83.212
    },
    "totalCapacityMT": 4500,
    "availableCapacityMT": 1300,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Spices & Cashew Chamber",
        "tempRange": "5°C to 9°C",
        "capacityMT": 2500,
        "availableMT": 700,
        "suitableCommodities": [
          "Turmeric",
          "Cashew"
        ]
      },
      {
        "name": "Fresh Produce Chamber",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2000,
        "availableMT": 600,
        "suitableCommodities": [
          "Mango",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cashew",
      "Turmeric",
      "Mango",
      "Banana"
    ],
    "pricingPerMTMonth": 770,
    "contactPerson": "Ch. Suryanarayana",
    "contactPhone": "+91 94409 77123",
    "amenities": [
      "Weighbridge 40T",
      "Pre-cooling Fans",
      "Power Backup"
    ],
    "source": "AP Horticulture Department",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T11:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-skl-001",
    "facilityName": "Palasa Cashew & Multi-Crop Cold Logistics Hub",
    "registrationNumber": "AP-SKL-CS-2018-014",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Srikakulam",
    "mandal": "Palasa-Kasibugga",
    "village": "Palasa Town",
    "address": "Cashew Industrial Zone, NH-16, Palasa 532221",
    "coordinates": {
      "lat": 18.771,
      "lng": 84.415
    },
    "totalCapacityMT": 8000,
    "availableCapacityMT": 2400,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Cashew Processing & Holding CA",
        "tempRange": "4°C to 8°C",
        "capacityMT": 5000,
        "availableMT": 1500,
        "suitableCommodities": [
          "Cashew"
        ]
      },
      {
        "name": "Mango & Tropical Produce Chamber",
        "tempRange": "8°C to 12°C",
        "capacityMT": 3000,
        "availableMT": 900,
        "suitableCommodities": [
          "Mango",
          "Banana"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cashew",
      "Mango",
      "Banana",
      "Tomato"
    ],
    "pricingPerMTMonth": 820,
    "contactPerson": "K. Mohan Rao",
    "contactPhone": "+91 8945 241190",
    "amenities": [
      "Moisture Control De-humidifiers",
      "Weighbridge 60T",
      "Automated Packaging Lines",
      "Genset 250 KVA"
    ],
    "source": "AP Cashew Board & AP Horticulture Dept",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-26T17:00:00.000Z",
    "lastVerified": "2026-09-27T10:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  },
  {
    "id": "cs-skl-002",
    "facilityName": "Srikakulam Central Horticultural Cold Store",
    "registrationNumber": "AP-SKL-CS-2021-073",
    "ownerId": "usr-owner-10",
    "state": "Andhra Pradesh",
    "district": "Srikakulam",
    "mandal": "Srikakulam",
    "village": "Singupuram",
    "address": "NH-16 By-pass Road, Singupuram, Srikakulam 532001",
    "coordinates": {
      "lat": 18.301,
      "lng": 83.901
    },
    "totalCapacityMT": 6000,
    "availableCapacityMT": 1900,
    "operatingStatus": "Active",
    "temperatureZones": [
      {
        "name": "Chamber 1 (Cashew & Tomato)",
        "tempRange": "4°C to 8°C",
        "capacityMT": 3500,
        "availableMT": 1100,
        "suitableCommodities": [
          "Cashew",
          "Tomato"
        ]
      },
      {
        "name": "Chamber 2 (Banana & Mango)",
        "tempRange": "8°C to 12°C",
        "capacityMT": 2500,
        "availableMT": 800,
        "suitableCommodities": [
          "Banana",
          "Mango"
        ]
      }
    ],
    "commoditiesSupported": [
      "Cashew",
      "Tomato",
      "Banana",
      "Mango"
    ],
    "pricingPerMTMonth": 790,
    "contactPerson": "P. Trinatha Naidu",
    "contactPhone": "+91 8942 223388",
    "amenities": [
      "Pre-cooling Unit",
      "Weighbridge 50T",
      "Power Backup (150 KVA)"
    ],
    "source": "AP State Warehouse Regulatory Authority",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-25T16:00:00.000Z",
    "lastVerified": "2026-09-27T08:30:00.000Z",
    "isSystemSeed": true,
    "isManual": false
  }
];

// APMC Agricultural Markets (Mandis) across Andhra Pradesh
export const SEED_MARKETS = [
  {
    "id": "mkt-gnt-001",
    "marketName": "Guntur Agricultural Market Yard (Asia's Largest Chilli & Spices Yard)",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Guntur",
    "mandal": "Guntur Urban",
    "coordinates": {
      "lat": 16.298,
      "lng": 80.445
    },
    "majorCommodities": [
      "Fresh Chilli",
      "Turmeric",
      "Cotton"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-pln-001",
    "marketName": "Narasaraopet Commercial & Chilli Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Palnadu",
    "mandal": "Narasaraopet",
    "coordinates": {
      "lat": 16.241,
      "lng": 80.059
    },
    "majorCommodities": [
      "Fresh Chilli",
      "Tomato",
      "Lime"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-bpt-001",
    "marketName": "Bapatla Banana & Cashew Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Bapatla",
    "mandal": "Bapatla",
    "coordinates": {
      "lat": 15.908,
      "lng": 80.472
    },
    "majorCommodities": [
      "Banana",
      "Fresh Chilli",
      "Cashew"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-kri-001",
    "marketName": "Nuzvid Royal Mango Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "mandal": "Nuzvid",
    "coordinates": {
      "lat": 16.789,
      "lng": 80.852
    },
    "majorCommodities": [
      "Mango",
      "Guava",
      "Banana"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-ntr-001",
    "marketName": "Nunna Mango APMC Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "NTR",
    "mandal": "Vijayawada Rural",
    "coordinates": {
      "lat": 16.584,
      "lng": 80.695
    },
    "majorCommodities": [
      "Mango",
      "Banana",
      "Acid Lime"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-ctr-001",
    "marketName": "Palamaner Tomato & Fruit Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Chittoor",
    "mandal": "Palamaner",
    "coordinates": {
      "lat": 13.208,
      "lng": 78.761
    },
    "majorCommodities": [
      "Tomato",
      "Mango",
      "Banana"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-tpt-001",
    "marketName": "Srikalahasti Citrus & Agro Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Tirupati",
    "mandal": "Srikalahasti",
    "coordinates": {
      "lat": 13.755,
      "lng": 79.711
    },
    "majorCommodities": [
      "Lime",
      "Mango",
      "Tomato"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-amm-001",
    "marketName": "Madanapalle Tomato Special Market Committee",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Annamayya",
    "mandal": "Madanapalle",
    "coordinates": {
      "lat": 13.556,
      "lng": 78.503
    },
    "majorCommodities": [
      "Tomato",
      "Mango",
      "Papaya"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-atp-001",
    "marketName": "Tadipatri Sweet Orange & Citrus Market",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Ananthapuramu",
    "mandal": "Tadipatri",
    "coordinates": {
      "lat": 14.915,
      "lng": 78.019
    },
    "majorCommodities": [
      "Sweet Orange",
      "Pomegranate",
      "Banana"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-sss-001",
    "marketName": "Hindupur Commercial Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Sri Sathya Sai",
    "mandal": "Hindupur",
    "coordinates": {
      "lat": 13.835,
      "lng": 77.498
    },
    "majorCommodities": [
      "Sweet Orange",
      "Mango",
      "Banana"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-knl-001",
    "marketName": "Kurnool Commercial & Horticultural Crops Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Kurnool",
    "mandal": "Kurnool Urban",
    "coordinates": {
      "lat": 15.823,
      "lng": 78.041
    },
    "majorCommodities": [
      "Fresh Chilli",
      "Tomato",
      "Sweet Orange"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-ndl-001",
    "marketName": "Nandyal Turmeric & Commercial Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Nandyal",
    "mandal": "Nandyal",
    "coordinates": {
      "lat": 15.489,
      "lng": 78.495
    },
    "majorCommodities": [
      "Turmeric",
      "Fresh Chilli",
      "Banana"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-kdp-001",
    "marketName": "Pulivendula Horticulture & Banana Terminal",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "YSR Kadapa",
    "mandal": "Pulivendula",
    "coordinates": {
      "lat": 14.426,
      "lng": 78.234
    },
    "majorCommodities": [
      "Banana",
      "Papaya",
      "Sweet Orange"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-pkm-001",
    "marketName": "Ongole Commercial Spices & Chilli Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Prakasam",
    "mandal": "Ongole",
    "coordinates": {
      "lat": 15.518,
      "lng": 80.052
    },
    "majorCommodities": [
      "Fresh Chilli",
      "Tomato",
      "Sweet Orange"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-nlr-001",
    "marketName": "Podalakur Acid Lime & Citrus Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Sri Potti Sriramulu Nellore",
    "mandal": "Podalakur",
    "coordinates": {
      "lat": 14.452,
      "lng": 79.995
    },
    "majorCommodities": [
      "Acid Lime",
      "Cashew",
      "Papaya"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-egd-001",
    "marketName": "Rajahmundry Banana & Fruit Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "East Godavari",
    "mandal": "Rajahmundry Urban",
    "coordinates": {
      "lat": 17.012,
      "lng": 81.819
    },
    "majorCommodities": [
      "Banana",
      "Cashew",
      "Mango"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-kkd-001",
    "marketName": "Samalkota Cashew & Agricultural Market",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Kakinada",
    "mandal": "Samalkota",
    "coordinates": {
      "lat": 17.058,
      "lng": 82.179
    },
    "majorCommodities": [
      "Cashew",
      "Mango",
      "Banana"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-kns-001",
    "marketName": "Ravulapalem Banana Mega Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Dr. B.R. Ambedkar Konaseema",
    "mandal": "Ravulapalem",
    "coordinates": {
      "lat": 16.755,
      "lng": 81.849
    },
    "majorCommodities": [
      "Banana",
      "Papaya",
      "Cashew"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-wgd-001",
    "marketName": "Tadepalligudem Wholesale Agro Market",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "West Godavari",
    "mandal": "Tadepalligudem",
    "coordinates": {
      "lat": 16.818,
      "lng": 81.534
    },
    "majorCommodities": [
      "Banana",
      "Guava",
      "Cocoa"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-elr-001",
    "marketName": "Eluru Agricultural Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Eluru",
    "mandal": "Eluru Urban",
    "coordinates": {
      "lat": 16.721,
      "lng": 81.109
    },
    "majorCommodities": [
      "Cocoa",
      "Banana",
      "Mango"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-vsp-001",
    "marketName": "Visakhapatnam Regional Agro Produce Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "mandal": "Visakhapatnam Urban",
    "coordinates": {
      "lat": 17.705,
      "lng": 83.201
    },
    "majorCommodities": [
      "Cashew",
      "Vegetables",
      "Tomato"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-akp-001",
    "marketName": "Anakapalli Commercial Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Anakapalli",
    "mandal": "Anakapalli",
    "coordinates": {
      "lat": 17.701,
      "lng": 83.014
    },
    "majorCommodities": [
      "Tomato",
      "Cashew",
      "Mango"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-asr-001",
    "marketName": "Araku Valley Organic Produce Terminal",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Alluri Sitharama Raju",
    "mandal": "Araku Valley",
    "coordinates": {
      "lat": 18.334,
      "lng": 82.885
    },
    "majorCommodities": [
      "Coffee",
      "Turmeric",
      "Ginger"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-vzm-001",
    "marketName": "Vizianagaram Horticultural Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Vizianagaram",
    "mandal": "Vizianagaram",
    "coordinates": {
      "lat": 18.124,
      "lng": 83.404
    },
    "majorCommodities": [
      "Mango",
      "Cashew",
      "Tomato"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-pvm-001",
    "marketName": "Parvathipuram Agency Produce Market",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Parvathipuram Manyam",
    "mandal": "Parvathipuram",
    "coordinates": {
      "lat": 18.784,
      "lng": 83.438
    },
    "majorCommodities": [
      "Cashew",
      "Mango",
      "Turmeric"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  },
  {
    "id": "mkt-skl-001",
    "marketName": "Palasa Cashew Special Market Yard",
    "marketType": "APMC / RMC Yard",
    "state": "Andhra Pradesh",
    "district": "Srikakulam",
    "mandal": "Palasa-Kasibugga",
    "coordinates": {
      "lat": 18.777,
      "lng": 84.421
    },
    "majorCommodities": [
      "Cashew",
      "Mango",
      "Tomato"
    ],
    "source": "APAMB e-NAM",
    "sourceType": "Government",
    "sourceLastUpdated": "2026-09-27T06:00:00.000Z",
    "lastVerified": "2026-09-27T08:00:00.000Z"
  }
];

// Live Market Prices from AP Mandis (e-NAM AP)
export const SEED_MARKET_PRICES = [
  {
    id: "prc-001",
    marketId: "mkt-gnt-001",
    marketName: "Guntur Agricultural Market Yard",
    district: "Guntur",
    commodity: "Fresh Chilli",
    variety: "Teja Green / Red (Fresh)",
    arrivalDate: "2026-09-27",
    minPricePerQuintal: 4500,
    maxPricePerQuintal: 8500,
    modalPricePerQuintal: 6500,
    coldStorageBenefitMultiplier: 1.35, // farmers get ~35% premium when selling from cold storage during off-season
    source: "APAMB Daily Price Bulletin",
    sourceType: "Government",
    sourceLastUpdated: "2026-09-27T10:30:00.000Z",
    lastVerified: "2026-09-27T11:00:00.000Z"
  },
  {
    id: "prc-002",
    marketId: "mkt-amm-001",
    marketName: "Madanapalle Tomato Special Market",
    district: "Annamayya",
    commodity: "Tomato",
    variety: "Hybrid Red Round",
    arrivalDate: "2026-09-27",
    minPricePerQuintal: 1400,
    maxPricePerQuintal: 2600,
    modalPricePerQuintal: 2100,
    coldStorageBenefitMultiplier: 1.45,
    source: "APAMB Daily Price Bulletin",
    sourceType: "Government",
    sourceLastUpdated: "2026-09-27T10:30:00.000Z",
    lastVerified: "2026-09-27T11:00:00.000Z"
  },
  {
    id: "prc-003",
    marketId: "mkt-ntr-001",
    marketName: "Nunna Mango APMC Yard",
    district: "NTR",
    commodity: "Mango",
    variety: "Banganapalle (Benishan)",
    arrivalDate: "2026-09-27",
    minPricePerQuintal: 3800,
    maxPricePerQuintal: 7200,
    modalPricePerQuintal: 5400,
    coldStorageBenefitMultiplier: 1.35,
    source: "APAMB Daily Price Bulletin",
    sourceType: "Government",
    sourceLastUpdated: "2026-09-27T10:30:00.000Z",
    lastVerified: "2026-09-27T11:00:00.000Z"
  },
  {
    id: "prc-004",
    marketId: "mkt-knl-001",
    marketName: "Kurnool Market Yard",
    district: "Kurnool",
    commodity: "Fresh Chilli",
    variety: "G-4 / Hybrid Green",
    arrivalDate: "2026-09-27",
    minPricePerQuintal: 4200,
    maxPricePerQuintal: 7800,
    modalPricePerQuintal: 6200,
    coldStorageBenefitMultiplier: 1.35,
    source: "APAMB Daily Price Bulletin",
    sourceType: "Government",
    sourceLastUpdated: "2026-09-27T10:30:00.000Z",
    lastVerified: "2026-09-27T11:00:00.000Z"
  },
  {
    id: "prc-005",
    marketId: "mkt-kdp-001",
    marketName: "Pulivendula Terminal",
    district: "YSR Kadapa",
    commodity: "Banana",
    variety: "Grand Naine (G9)",
    arrivalDate: "2026-09-27",
    minPricePerQuintal: 1100,
    maxPricePerQuintal: 1800,
    modalPricePerQuintal: 1450,
    coldStorageBenefitMultiplier: 1.25,
    source: "APAMB Daily Price Bulletin",
    sourceType: "Government",
    sourceLastUpdated: "2026-09-27T10:30:00.000Z",
    lastVerified: "2026-09-27T11:00:00.000Z"
  }
];

// District-level Horticulture Production & Cold Storage Gap Analysis
// Source: AP Directorate of Horticulture & NCCD Storage Gap Assessment
export const SEED_GAP_ANALYSIS = [
  {
    id: "gap-amm-01",
    state: AP_STATE,
    district: "Annamayya",
    totalHorticultureProductionMT: 980000,
    annualStorageDemandMT: 392000,
    existingColdStorageCapacityMT: 5000,
    liveAvailableCapacityMT: 350,
    netStorageGapMT: 387000,
    gapPercentage: 98.7,
    gapSeverityIndex: "Critical Deficit",
    primaryVulnerableCrops: ["Tomato", "Papaya", "Mango"],
    recommendedNewCapacityMT: 45000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-knl-01",
    state: AP_STATE,
    district: "Kurnool",
    totalHorticultureProductionMT: 840000,
    annualStorageDemandMT: 378000,
    existingColdStorageCapacityMT: 12000,
    liveAvailableCapacityMT: 2800,
    netStorageGapMT: 366000,
    gapPercentage: 96.8,
    gapSeverityIndex: "Critical Deficit",
    primaryVulnerableCrops: ["Fresh Chilli", "Tomato", "Banana"],
    recommendedNewCapacityMT: 40000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-pln-01",
    state: AP_STATE,
    district: "Palnadu",
    totalHorticultureProductionMT: 710000,
    annualStorageDemandMT: 319500,
    existingColdStorageCapacityMT: 18500,
    liveAvailableCapacityMT: 2900,
    netStorageGapMT: 301000,
    gapPercentage: 94.2,
    gapSeverityIndex: "High Deficit",
    primaryVulnerableCrops: ["Fresh Chilli", "Tomato", "Lime"],
    recommendedNewCapacityMT: 30000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-atp-01",
    state: AP_STATE,
    district: "Ananthapuramu",
    totalHorticultureProductionMT: 920000,
    annualStorageDemandMT: 368000,
    existingColdStorageCapacityMT: 21000,
    liveAvailableCapacityMT: 4200,
    netStorageGapMT: 347000,
    gapPercentage: 94.3,
    gapSeverityIndex: "High Deficit",
    primaryVulnerableCrops: ["Sweet Orange", "Banana", "Pomegranate"],
    recommendedNewCapacityMT: 35000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-kdp-01",
    state: AP_STATE,
    district: "YSR Kadapa",
    totalHorticultureProductionMT: 890000,
    annualStorageDemandMT: 311500,
    existingColdStorageCapacityMT: 24000,
    liveAvailableCapacityMT: 4100,
    netStorageGapMT: 287500,
    gapPercentage: 92.3,
    gapSeverityIndex: "High Deficit",
    primaryVulnerableCrops: ["Banana", "Papaya", "Sweet Orange", "Turmeric"],
    recommendedNewCapacityMT: 28000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-ctr-01",
    state: AP_STATE,
    district: "Chittoor",
    totalHorticultureProductionMT: 1120000,
    annualStorageDemandMT: 448000,
    existingColdStorageCapacityMT: 58000,
    liveAvailableCapacityMT: 6200,
    netStorageGapMT: 390000,
    gapPercentage: 87.1,
    gapSeverityIndex: "High Deficit",
    primaryVulnerableCrops: ["Mango", "Tomato", "Papaya"],
    recommendedNewCapacityMT: 35000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-pkm-01",
    state: AP_STATE,
    district: "Prakasam",
    totalHorticultureProductionMT: 620000,
    annualStorageDemandMT: 279000,
    existingColdStorageCapacityMT: 32000,
    liveAvailableCapacityMT: 5400,
    netStorageGapMT: 247000,
    gapPercentage: 88.5,
    gapSeverityIndex: "High Deficit",
    primaryVulnerableCrops: ["Fresh Chilli", "Sweet Orange", "Tomato"],
    recommendedNewCapacityMT: 25000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-ndl-01",
    state: AP_STATE,
    district: "Nandyal",
    totalHorticultureProductionMT: 580000,
    annualStorageDemandMT: 246500,
    existingColdStorageCapacityMT: 26000,
    liveAvailableCapacityMT: 3800,
    netStorageGapMT: 220500,
    gapPercentage: 89.4,
    gapSeverityIndex: "High Deficit",
    primaryVulnerableCrops: ["Sweet Orange", "Turmeric", "Fresh Chilli"],
    recommendedNewCapacityMT: 22000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-gnt-01",
    state: AP_STATE,
    district: "Guntur",
    totalHorticultureProductionMT: 1250000,
    annualStorageDemandMT: 687500,
    existingColdStorageCapacityMT: 420000,
    liveAvailableCapacityMT: 48000,
    netStorageGapMT: 267500,
    gapPercentage: 38.9,
    gapSeverityIndex: "Moderate Deficit",
    primaryVulnerableCrops: ["Fresh Chilli", "Turmeric"],
    recommendedNewCapacityMT: 35000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-ntr-01",
    state: AP_STATE,
    district: "NTR",
    totalHorticultureProductionMT: 780000,
    annualStorageDemandMT: 312000,
    existingColdStorageCapacityMT: 180000,
    liveAvailableCapacityMT: 18500,
    netStorageGapMT: 132000,
    gapPercentage: 42.3,
    gapSeverityIndex: "Moderate Deficit",
    primaryVulnerableCrops: ["Mango", "Fresh Chilli"],
    recommendedNewCapacityMT: 20000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-kri-01",
    state: AP_STATE,
    district: "Krishna",
    totalHorticultureProductionMT: 690000,
    annualStorageDemandMT: 276000,
    existingColdStorageCapacityMT: 145000,
    liveAvailableCapacityMT: 22000,
    netStorageGapMT: 131000,
    gapPercentage: 47.5,
    gapSeverityIndex: "Moderate Deficit",
    primaryVulnerableCrops: ["Mango", "Banana", "Guava"],
    recommendedNewCapacityMT: 18000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  },
  {
    id: "gap-vsp-01",
    state: AP_STATE,
    district: "Visakhapatnam",
    totalHorticultureProductionMT: 310000,
    annualStorageDemandMT: 108500,
    existingColdStorageCapacityMT: 95000,
    liveAvailableCapacityMT: 14000,
    netStorageGapMT: 13500,
    gapPercentage: 12.4,
    gapSeverityIndex: "Adequate / Surplus",
    primaryVulnerableCrops: ["Vegetables"],
    recommendedNewCapacityMT: 5000,
    source: "AP Horticulture Storage Gap Assessment & NCCD",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27T00:00:00.000Z",
    lastVerified: "2026-09-27T00:00:00.000Z"
  }
];

// Potential New Cold Storage Locations identified by Spatial Deficit & Farm Catchment Clustering
export const SEED_POTENTIAL_LOCATIONS = [
  {
    "id": "pot-amm-001",
    "clusterName": "Madanapalle - Tamballapalle Mega Tomato Cold Hub",
    "district": "Annamayya",
    "mandal": "Madanapalle",
    "suggestedCoordinates": {
      "lat": 13.582,
      "lng": 78.471
    },
    "priorityScore": 98,
    "urgencyLevel": "Critical Priority",
    "localProduceAtRiskMTPerYear": 185000,
    "primaryTargetCommodities": [
      "Tomato",
      "Papaya",
      "Capsicum"
    ],
    "distanceToNearestExistingColdStorageKm": 28.5,
    "recommendedCapacityMT": 10000,
    "recommendedChamberType": "Controlled Atmosphere (CA) Multi-Chamber with Hydro-cooling & Sorting lines",
    "estimatedCapexCroresINR": 14.5,
    "paybackPeriodYears": 3.8,
    "connectivity": "Direct access to NH-71 & NH-42 corridor to Bengaluru & Chennai markets",
    "rationale": "Asia's largest tomato production belt experiences extreme price collapse during harvest gluts (prices dropping to Rs. 2-3/kg). Zero public CA cold storage within 25km radius causes up to 32% post-harvest spoilage.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-nlr-001",
    "clusterName": "Podalakur - Rapur Acid Lime & Citrus Mega Preservation Hub",
    "district": "Sri Potti Sriramulu Nellore",
    "mandal": "Podalakur",
    "suggestedCoordinates": {
      "lat": 14.382,
      "lng": 79.721
    },
    "priorityScore": 95,
    "urgencyLevel": "Critical Priority",
    "localProduceAtRiskMTPerYear": 165000,
    "primaryTargetCommodities": [
      "Acid Lime",
      "Cashew",
      "Papaya"
    ],
    "distanceToNearestExistingColdStorageKm": 42,
    "recommendedCapacityMT": 8500,
    "recommendedChamberType": "Controlled Humidity (85-90%) & Degreening Multi-Chamber Facility",
    "estimatedCapexCroresINR": 12.2,
    "paybackPeriodYears": 3.9,
    "connectivity": "State Highway connecting Nellore and Venkatagiri to NH-16 corridor",
    "rationale": "Podalakur and Rapur produce over 60% of Andhra Pradesh's acid lime. In summer months, skin yellowing and dehydration reduce export value by 45% within 48 hours of plucking without immediate cold staging.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-knl-001",
    "clusterName": "Adoni - Yemmiganur Multi-Commodity Cold Park",
    "district": "Kurnool",
    "mandal": "Adoni",
    "suggestedCoordinates": {
      "lat": 15.632,
      "lng": 77.275
    },
    "priorityScore": 94,
    "urgencyLevel": "Critical Priority",
    "localProduceAtRiskMTPerYear": 142000,
    "primaryTargetCommodities": [
      "Fresh Chilli",
      "Tomato",
      "Sweet Orange"
    ],
    "distanceToNearestExistingColdStorageKm": 42,
    "recommendedCapacityMT": 8000,
    "recommendedChamberType": "Ventilated Precision Multi-Chamber (4-10°C) with Pre-cooling",
    "estimatedCapexCroresINR": 11.8,
    "paybackPeriodYears": 4.1,
    "connectivity": "State Highway 24 connecting Adoni Industrial bypass and railway freight terminal",
    "rationale": "Western Kurnool produces over 140,000 MT of commercial fresh chillies and tomatoes. Severe deficit forces smallholders to sell at sub-optimal farmgate rates, resulting in up to 28% post-harvest decay.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-ntr-001",
    "clusterName": "Mylavaram - Tiruvuru Mango Packhouse & CA Facility",
    "district": "NTR",
    "mandal": "Mylavaram",
    "suggestedCoordinates": {
      "lat": 16.791,
      "lng": 80.642
    },
    "priorityScore": 93,
    "urgencyLevel": "Critical Priority",
    "localProduceAtRiskMTPerYear": 152000,
    "primaryTargetCommodities": [
      "Mango",
      "Papaya",
      "Fresh Chilli"
    ],
    "distanceToNearestExistingColdStorageKm": 32,
    "recommendedCapacityMT": 9000,
    "recommendedChamberType": "APEDA-Certified CA Chambers with Vapour Heat Treatment (VHT) Line",
    "estimatedCapexCroresINR": 13.5,
    "paybackPeriodYears": 3.7,
    "connectivity": "NH-30 linking Vijayawada and Bhadrachalam",
    "rationale": "Dense mango orchard belt in Krishna-NTR border produces Banganapalle and Totapuri varieties. Lack of local packhouse causes fruit fly vulnerability and loss of export premiums during April-June harvest window.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-ctr-001",
    "clusterName": "Bangarupalem - Baireddipalle Mango & Pulp Buffer Facility",
    "district": "Chittoor",
    "mandal": "Bangarupalem",
    "suggestedCoordinates": {
      "lat": 13.195,
      "lng": 78.965
    },
    "priorityScore": 92,
    "urgencyLevel": "Critical Priority",
    "localProduceAtRiskMTPerYear": 138000,
    "primaryTargetCommodities": [
      "Mango",
      "Tomato",
      "Papaya"
    ],
    "distanceToNearestExistingColdStorageKm": 27.5,
    "recommendedCapacityMT": 8000,
    "recommendedChamberType": "Dual Pre-cooling and Deep Freeze Aseptic Pulp Buffer (-18°C)",
    "estimatedCapexCroresINR": 12,
    "paybackPeriodYears": 4,
    "connectivity": "NH-69 Bangalore - Chennai Industrial Expressway corridor",
    "rationale": "Over 80 pulp manufacturing units in Chittoor district depend on smooth mango intake. Processing bottlenecks during peak arrivals cause open-air decay of up to 40,000 MT of high-grade Totapuri fruit.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-gnt-001",
    "clusterName": "Prathipadu - Pedanandipadu Chilli & Turmeric Feeder Depot",
    "district": "Guntur",
    "mandal": "Prathipadu",
    "suggestedCoordinates": {
      "lat": 16.142,
      "lng": 80.321
    },
    "priorityScore": 91,
    "urgencyLevel": "Critical Priority",
    "localProduceAtRiskMTPerYear": 128000,
    "primaryTargetCommodities": [
      "Fresh Chilli",
      "Turmeric"
    ],
    "distanceToNearestExistingColdStorageKm": 26,
    "recommendedCapacityMT": 8000,
    "recommendedChamberType": "Automated Temperature & Low-Humidity Spice Preservation CA Chamber",
    "estimatedCapexCroresINR": 11.5,
    "paybackPeriodYears": 3.9,
    "connectivity": "NH-16 linking Guntur and Chennai",
    "rationale": "Southern Guntur black cotton soil produces high-oleoresin Teja chilli. Central Guntur cold stores reach 98% occupancy by March, leaving small and marginal farmers with no storage options.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-ndl-001",
    "clusterName": "Banaganapalle - Owk Mango & Turmeric Preservation Terminal",
    "district": "Nandyal",
    "mandal": "Banaganapalle",
    "suggestedCoordinates": {
      "lat": 15.321,
      "lng": 78.219
    },
    "priorityScore": 90,
    "urgencyLevel": "Critical Priority",
    "localProduceAtRiskMTPerYear": 118000,
    "primaryTargetCommodities": [
      "Mango",
      "Turmeric",
      "Banana"
    ],
    "distanceToNearestExistingColdStorageKm": 38,
    "recommendedCapacityMT": 7000,
    "recommendedChamberType": "Combined CA Fruit Cell (10-12°C) and Spice Preservation Chamber (4-8°C)",
    "estimatedCapexCroresINR": 10.5,
    "paybackPeriodYears": 4.2,
    "connectivity": "SH-30 connecting Banaganapalle with Tadipatri and Nandyal",
    "rationale": "The geographical origin of the GI-tagged 'Banaganapalle Mango' lacks cold storage at the mandal level. Farmers must transport sensitive produce 40 km to Nandyal town, suffering quality degradation.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-pln-001",
    "clusterName": "Vinukonda - Macherla High-Grade Fresh Chilli & Vegetable Facility",
    "district": "Palnadu",
    "mandal": "Vinukonda",
    "suggestedCoordinates": {
      "lat": 16.054,
      "lng": 79.742
    },
    "priorityScore": 89,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 115000,
    "primaryTargetCommodities": [
      "Fresh Chilli",
      "Tomato",
      "Lime"
    ],
    "distanceToNearestExistingColdStorageKm": 34,
    "recommendedCapacityMT": 6500,
    "recommendedChamberType": "Dual Temperature Cold Chambers (4-8°C and 8-12°C)",
    "estimatedCapexCroresINR": 9.6,
    "paybackPeriodYears": 4.4,
    "connectivity": "NH-544D linking Guntur, Nandyal and Anantapur",
    "rationale": "Western Palnadu farmers travel 60+ km to Guntur city to find cold storage for fresh chillies and vegetables, causing high transport costs and deterioration during transit. A local facility will serve 45+ villages directly.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-sss-001",
    "clusterName": "Kadiri - Gandlapenta Sweet Orange & Pomegranate Center",
    "district": "Sri Sathya Sai",
    "mandal": "Kadiri",
    "suggestedCoordinates": {
      "lat": 14.115,
      "lng": 78.165
    },
    "priorityScore": 88,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 104000,
    "primaryTargetCommodities": [
      "Sweet Orange",
      "Pomegranate",
      "Mango"
    ],
    "distanceToNearestExistingColdStorageKm": 46,
    "recommendedCapacityMT": 6000,
    "recommendedChamberType": "Controlled Humidity Semi-Arid Horticulture Chilling Chambers",
    "estimatedCapexCroresINR": 9.2,
    "paybackPeriodYears": 4.3,
    "connectivity": "NH-42 connecting Madanapalle, Kadiri and Anantapur",
    "rationale": "Drought-prone Kadiri basin has expanded drip-irrigated citrus and pomegranate cultivation. High daytime heat (38-42°C) causes rapid rind desiccations and fungal fruit rot without immediate post-harvest chilling.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-asr-001",
    "clusterName": "Chintapalle - G.K.Veedhi Tribal Agency Spices & Ginger Depot",
    "district": "Alluri Sitharama Raju",
    "mandal": "Chintapalle",
    "suggestedCoordinates": {
      "lat": 17.872,
      "lng": 82.351
    },
    "priorityScore": 88,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 78000,
    "primaryTargetCommodities": [
      "Ginger",
      "Turmeric",
      "Coffee",
      "Black Pepper"
    ],
    "distanceToNearestExistingColdStorageKm": 52,
    "recommendedCapacityMT": 4500,
    "recommendedChamberType": "Solar-Hybrid Micro Cold Chain with Low-Moisture Storage",
    "estimatedCapexCroresINR": 7.2,
    "paybackPeriodYears": 4.5,
    "connectivity": "Ghat Road SH-38 linking Chintapalle, Narsipatnam and Anakapalli",
    "rationale": "High-altitude tribal farmers harvest high-curcumin organic turmeric and ginger. Lack of localized cold storage forces reliance on exploitative middlemen and causes weight losses of over 22% during open transport.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-atp-001",
    "clusterName": "Uravakonda - Beluguppa Sweet Orange (Mosambi) Cold Hub",
    "district": "Ananthapuramu",
    "mandal": "Uravakonda",
    "suggestedCoordinates": {
      "lat": 14.945,
      "lng": 77.258
    },
    "priorityScore": 87,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 98000,
    "primaryTargetCommodities": [
      "Sweet Orange",
      "Pomegranate",
      "Papaya"
    ],
    "distanceToNearestExistingColdStorageKm": 48,
    "recommendedCapacityMT": 6000,
    "recommendedChamberType": "Multi-Chamber with Controlled Humidity & Fungicide Post-Harvest Wash",
    "estimatedCapexCroresINR": 9,
    "paybackPeriodYears": 4.2,
    "connectivity": "NH-67 linking Bellary and Anantapur",
    "rationale": "Sweet orange growers suffer heavy skin shriveling and decay in semi-arid Rayalaseema heat without immediate pre-cooling and cold storage within 2 hours of harvest.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-egd-001",
    "clusterName": "Korukonda - Gokavaram Godavari Basin Banana & Cocoa Cold Depot",
    "district": "East Godavari",
    "mandal": "Korukonda",
    "suggestedCoordinates": {
      "lat": 17.182,
      "lng": 81.825
    },
    "priorityScore": 87,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 108000,
    "primaryTargetCommodities": [
      "Banana",
      "Cocoa",
      "Cashew",
      "Mango"
    ],
    "distanceToNearestExistingColdStorageKm": 31,
    "recommendedCapacityMT": 6500,
    "recommendedChamberType": "Refrigerated Transit Dock with Controlled Humidity Cocoa Pod Holding",
    "estimatedCapexCroresINR": 9.8,
    "paybackPeriodYears": 4.1,
    "connectivity": "SH-41 connecting Rajahmundry, Gokavaram and Rampachodavaram",
    "rationale": "Fertile alluvial tracts along the Godavari river cultivate Cavendish bananas and cocoa as intercrop. High tropical humidity triggers rapid anthracnose and stem-end rot unless chilled to 13°C within 4 hours.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-bpt-001",
    "clusterName": "Addanki - Santhanuthalapadu Chilli & Vegetable Cold Terminal",
    "district": "Bapatla",
    "mandal": "Addanki",
    "suggestedCoordinates": {
      "lat": 15.811,
      "lng": 79.982
    },
    "priorityScore": 86,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 92000,
    "primaryTargetCommodities": [
      "Fresh Chilli",
      "Banana",
      "Vegetables"
    ],
    "distanceToNearestExistingColdStorageKm": 35,
    "recommendedCapacityMT": 5500,
    "recommendedChamberType": "Dual Multi-Commodity Chamber with Forced-Air Cooling",
    "estimatedCapexCroresINR": 8.2,
    "paybackPeriodYears": 4.4,
    "connectivity": "State Highway linking Addanki with Ongole and Chilakaluripet",
    "rationale": "Located at the tri-border of Bapatla, Prakasam and Palnadu. Addanki produces high volumes of green chillies and vegetables for Vijayawada and Chennai wholesale markets.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-pvm-001",
    "clusterName": "Palakonda - Veeraghattam Tribal Agro & Cashew Processing Depot",
    "district": "Parvathipuram Manyam",
    "mandal": "Palakonda",
    "suggestedCoordinates": {
      "lat": 18.601,
      "lng": 83.755
    },
    "priorityScore": 86,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 74000,
    "primaryTargetCommodities": [
      "Cashew",
      "Mango",
      "Turmeric"
    ],
    "distanceToNearestExistingColdStorageKm": 41,
    "recommendedCapacityMT": 5000,
    "recommendedChamberType": "De-humidified Raw Cashew Nut Storage and Pre-cooling Unit",
    "estimatedCapexCroresINR": 7.5,
    "paybackPeriodYears": 4.5,
    "connectivity": "SH-2 linking Parvathipuram, Palakonda and Srikakulam",
    "rationale": "Northern tribal belt produces pesticide-free organic cashew and mangoes. Farmers lose up to 30% of nut quality to seasonal monsoon mould during prolonged storage without controlled humidity.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-kdp-001",
    "clusterName": "Jammalamadugu - Mylavaram Banana & Papaya Packhouse",
    "district": "YSR Kadapa",
    "mandal": "Jammalamadugu",
    "suggestedCoordinates": {
      "lat": 14.851,
      "lng": 78.381
    },
    "priorityScore": 85,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 88000,
    "primaryTargetCommodities": [
      "Banana",
      "Papaya",
      "Turmeric"
    ],
    "distanceToNearestExistingColdStorageKm": 31,
    "recommendedCapacityMT": 5000,
    "recommendedChamberType": "Refrigerated Transit Pre-cooling & Ripening Facility (13-15°C)",
    "estimatedCapexCroresINR": 7.8,
    "paybackPeriodYears": 4,
    "connectivity": "SH-28 connecting Proddatur, Tadipatri and Bellary",
    "rationale": "Penna river basin produces export-grade Grand Naine bananas, but lack of pre-cooling facilities forces farmers to sell at field gates at sub-optimal prices.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-pkm-001",
    "clusterName": "Giddalur - Cumbum Semi-Arid Chilli & Tomato Center",
    "district": "Prakasam",
    "mandal": "Giddalur",
    "suggestedCoordinates": {
      "lat": 15.385,
      "lng": 78.932
    },
    "priorityScore": 85,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 82000,
    "primaryTargetCommodities": [
      "Fresh Chilli",
      "Tomato",
      "Sweet Orange"
    ],
    "distanceToNearestExistingColdStorageKm": 44,
    "recommendedCapacityMT": 5000,
    "recommendedChamberType": "Multi-Chamber Produce Chilling Unit (4°C to 10°C)",
    "estimatedCapexCroresINR": 7.6,
    "paybackPeriodYears": 4.3,
    "connectivity": "State Highway connecting Giddalur with Nandyal and Ongole",
    "rationale": "Western Nallamala foothill tract suffers severe post-harvest tomato gluts. Establishing a localized facility reduces transport distance from 110km to less than 15km for 30+ villages.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-skl-001",
    "clusterName": "Tekkali - Sompeta Coastal Cashew & Fruit Cold Station",
    "district": "Srikakulam",
    "mandal": "Tekkali",
    "suggestedCoordinates": {
      "lat": 18.618,
      "lng": 84.238
    },
    "priorityScore": 85,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 86000,
    "primaryTargetCommodities": [
      "Cashew",
      "Mango",
      "Banana"
    ],
    "distanceToNearestExistingColdStorageKm": 33,
    "recommendedCapacityMT": 5500,
    "recommendedChamberType": "De-humidified Low Temperature Cashew & Fruit Storage Cell",
    "estimatedCapexCroresINR": 8.4,
    "paybackPeriodYears": 4.4,
    "connectivity": "NH-16 Chennai - Kolkata Golden Quadrilateral",
    "rationale": "Northern coastal belt of Srikakulam handles substantial cashew harvests and Banganapalle mangoes. Extreme coastal humidity damages raw cashew shells and causes premature mango softening without cold chain.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-kri-001",
    "clusterName": "Avanigadda - Nagayalanka Coastal Banana & Guava Depot",
    "district": "Krishna",
    "mandal": "Avanigadda",
    "suggestedCoordinates": {
      "lat": 16.021,
      "lng": 80.918
    },
    "priorityScore": 84,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 78000,
    "primaryTargetCommodities": [
      "Banana",
      "Guava",
      "Vegetables"
    ],
    "distanceToNearestExistingColdStorageKm": 39,
    "recommendedCapacityMT": 5000,
    "recommendedChamberType": "Banana Controlled Ripening & Chilling Chambers (12-14°C)",
    "estimatedCapexCroresINR": 7.6,
    "paybackPeriodYears": 4.2,
    "connectivity": "NH-216 Coastal Highway connecting Machilipatnam, Avanigadda and Ongole",
    "rationale": "Krishna river island farmers produce heavy yields of Karpura and Grand Naine bananas. Lack of cold chain on the delta bank forces farmers to sell at distress rates during cyclone threats and heavy rain gluts.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-kns-001",
    "clusterName": "Razole - Sakhinetipalli River Island Banana & Produce Terminal",
    "district": "Dr. B.R. Ambedkar Konaseema",
    "mandal": "Razole",
    "suggestedCoordinates": {
      "lat": 16.482,
      "lng": 81.835
    },
    "priorityScore": 84,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 82000,
    "primaryTargetCommodities": [
      "Banana",
      "Papaya",
      "Cashew"
    ],
    "distanceToNearestExistingColdStorageKm": 36,
    "recommendedCapacityMT": 5000,
    "recommendedChamberType": "Ethylene Scrubbed Pre-cooling & Ripening Facility",
    "estimatedCapexCroresINR": 7.7,
    "paybackPeriodYears": 4.3,
    "connectivity": "NH-216 and inland waterway barge connectivity",
    "rationale": "Konaseema island belt is encircled by Godavari distributaries. Ferry bottlenecks delay transit to mainland cold stores, triggering transit decay of up to 25% for ripe banana bunches.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-tpt-001",
    "clusterName": "Venkatagiri - Dakkili Citrus, Lime & Horticultural Hub",
    "district": "Tirupati",
    "mandal": "Venkatagiri",
    "suggestedCoordinates": {
      "lat": 13.965,
      "lng": 79.582
    },
    "priorityScore": 83,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 76000,
    "primaryTargetCommodities": [
      "Lime",
      "Tomato",
      "Mango"
    ],
    "distanceToNearestExistingColdStorageKm": 37,
    "recommendedCapacityMT": 4500,
    "recommendedChamberType": "Controlled Temperature & Waxing Post-Harvest Unit (7-10°C)",
    "estimatedCapexCroresINR": 6.9,
    "paybackPeriodYears": 4.4,
    "connectivity": "State Highway 61 linking Venkatagiri, Gudur and Tirupati",
    "rationale": "Acid lime growers in Venkatagiri valley face high spoilage in dry Rayalaseema heat. Cold holding facilities will allow orderly marketing into Chennai and Tirupati pilgrim markets.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-vzm-001",
    "clusterName": "Gajapathinagaram - Badangi Mango & Cashew Cold Facility",
    "district": "Vizianagaram",
    "mandal": "Gajapathinagaram",
    "suggestedCoordinates": {
      "lat": 18.282,
      "lng": 83.335
    },
    "priorityScore": 83,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 84000,
    "primaryTargetCommodities": [
      "Mango",
      "Cashew",
      "Tomato"
    ],
    "distanceToNearestExistingColdStorageKm": 29,
    "recommendedCapacityMT": 5000,
    "recommendedChamberType": "Pre-cooling & Palletized Multi-Commodity Cold Store",
    "estimatedCapexCroresINR": 7.5,
    "paybackPeriodYears": 4.4,
    "connectivity": "NH-26 linking Vizianagaram, Bobbili and Raipur",
    "rationale": "Major Suvarnarekha and Banganapalle mango production tract. Cold staging prevents skin blotching and extends shelf life by 3 weeks, enabling sales to northern state markets via rail corridors.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-kkd-001",
    "clusterName": "Pithapuram - Gollaprolu Cashew & Tropical Fruit Cold Station",
    "district": "Kakinada",
    "mandal": "Pithapuram",
    "suggestedCoordinates": {
      "lat": 17.112,
      "lng": 82.259
    },
    "priorityScore": 82,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 72000,
    "primaryTargetCommodities": [
      "Cashew",
      "Mango",
      "Banana"
    ],
    "distanceToNearestExistingColdStorageKm": 27,
    "recommendedCapacityMT": 4500,
    "recommendedChamberType": "De-humidified Raw Nut Cell and Fruit Cold Chamber",
    "estimatedCapexCroresINR": 6.8,
    "paybackPeriodYears": 4.5,
    "connectivity": "NH-16 and Kakinada Port feeder road",
    "rationale": "Pithapuram cashew and mango farms experience high post-harvest losses during early monsoons. Direct cold staging supports value addition for local women self-help group processing clusters.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-vsp-001",
    "clusterName": "Bheemunipatnam - Tagarapuvalasa Urban Periphery Vegetable Cold Hub",
    "district": "Visakhapatnam",
    "mandal": "Bheemunipatnam",
    "suggestedCoordinates": {
      "lat": 17.892,
      "lng": 83.435
    },
    "priorityScore": 82,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 68000,
    "primaryTargetCommodities": [
      "Vegetables",
      "Tomato",
      "Cashew"
    ],
    "distanceToNearestExistingColdStorageKm": 28,
    "recommendedCapacityMT": 4500,
    "recommendedChamberType": "Urban Consumer Supply Pre-cooling & Multi-Chamber (2-6°C)",
    "estimatedCapexCroresINR": 7,
    "paybackPeriodYears": 4.2,
    "connectivity": "Visakhapatnam - Bheemunipatnam Coastal Beach Corridor & NH-16",
    "rationale": "Serves as the vital perishable supply buffer for the Visakhapatnam metropolitan area (pop. 2.4 million). Cushions mid-day heat wilting for local peri-urban farmers.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-akp-001",
    "clusterName": "Chodavaram - K.Kotapadu Organic Produce & Vegetable Center",
    "district": "Anakapalli",
    "mandal": "Chodavaram",
    "suggestedCoordinates": {
      "lat": 17.832,
      "lng": 82.945
    },
    "priorityScore": 81,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 62000,
    "primaryTargetCommodities": [
      "Tomato",
      "Vegetables",
      "Cashew",
      "Mango"
    ],
    "distanceToNearestExistingColdStorageKm": 29,
    "recommendedCapacityMT": 4000,
    "recommendedChamberType": "Solar-Assisted Micro Cold Storage Hub with Pre-cooling",
    "estimatedCapexCroresINR": 6.2,
    "paybackPeriodYears": 4.6,
    "connectivity": "State Highway 9 connecting Anakapalli & Paderu tribal agency tracts",
    "rationale": "Direct supply line for Visakhapatnam urban consumption zone. Prevents mid-day wilting and spoilage for smallholder vegetable and fruit growers.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-wgd-001",
    "clusterName": "Narasapuram - Palakollu Coastal Guava & Horticulture Packhouse",
    "district": "West Godavari",
    "mandal": "Narasapuram",
    "suggestedCoordinates": {
      "lat": 16.442,
      "lng": 81.698
    },
    "priorityScore": 80,
    "urgencyLevel": "High Priority",
    "localProduceAtRiskMTPerYear": 66000,
    "primaryTargetCommodities": [
      "Guava",
      "Banana",
      "Vegetables"
    ],
    "distanceToNearestExistingColdStorageKm": 32,
    "recommendedCapacityMT": 4000,
    "recommendedChamberType": "Pre-cooling and Controlled Temperature Storage (8-12°C)",
    "estimatedCapexCroresINR": 6.3,
    "paybackPeriodYears": 4.4,
    "connectivity": "NH-216 Coastal Highway",
    "rationale": "Vast guava orchards in Palakollu and Mogalthur produce high-yield Allahabad Safeda and Taiwan varieties. Guavas soften rapidly within 36 hours of plucking in coastal heat without pre-cooling.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  },
  {
    "id": "pot-elr-001",
    "clusterName": "Chintalapudi - Kamavarapukota Inland Agro Buffer Station",
    "district": "Eluru",
    "mandal": "Jangareddigudem",
    "suggestedCoordinates": {
      "lat": 17.062,
      "lng": 81.145
    },
    "priorityScore": 79,
    "urgencyLevel": "Medium Priority",
    "localProduceAtRiskMTPerYear": 58000,
    "primaryTargetCommodities": [
      "Cocoa",
      "Banana",
      "Mango"
    ],
    "distanceToNearestExistingColdStorageKm": 36,
    "recommendedCapacityMT": 4000,
    "recommendedChamberType": "Multi-Commodity Pre-cooling & Humidity Regulated Cell",
    "estimatedCapexCroresINR": 6.1,
    "paybackPeriodYears": 4.5,
    "connectivity": "SH-42 connecting Jangareddigudem and Chintalapudi to Vijayawada",
    "rationale": "Inland red-loam belt produces high volumes of cocoa pods and mangoes. Farmers face high freight costs to Eluru city, leading to on-farm degradation during peak summer heat.",
    "source": "GIS Catchment & Cluster Algorithm",
    "sourceType": "Platform Calculated",
    "sourceLastUpdated": "2026-09-27T00:00:00.000Z",
    "lastVerified": "2026-09-27T00:00:00.000Z"
  }
];

export const SEED_FARMER_REQUESTS = [
  {
    id: "req-001",
    farmerName: "B. Venkata Ramana",
    phone: "+91 94401 23456",
    district: "Guntur",
    mandal: "Duggirala",
    village: "Duggirala Village",
    crop: "Turmeric",
    quantityMT: 45,
    requiredFromDate: "2026-10-05",
    durationMonths: 6,
    targetColdStorageId: "cs-gnt-002",
    targetColdStorageName: "Duggirala Turmeric Mega Cold Chain Terminal",
    status: "Accepted",
    estimatedMonthlyCostINR: 35100,
    requestedAt: "2026-09-25T11:20:00.000Z"
  },
  {
    id: "req-002",
    farmerName: "K. Sivaiah Naidu",
    phone: "+91 98482 11990",
    district: "Annamayya",
    mandal: "Madanapalle",
    village: "Basinikonda",
    crop: "Tomato",
    quantityMT: 20,
    requiredFromDate: "2026-10-01",
    durationMonths: 1,
    targetColdStorageId: "cs-amm-001",
    targetColdStorageName: "Madanapalle High-Altitude Tomato & Multi-Crop Cold Storage",
    status: "Pending",
    estimatedMonthlyCostINR: 19000,
    requestedAt: "2026-09-27T09:15:00.000Z"
  }
];
