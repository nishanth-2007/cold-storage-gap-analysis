# Cold Storage Gap Mapping for Horticulture Produce
### Dedicated AgriTech & GIS Spatial Logistics Platform for Andhra Pradesh, India

---

## 1. Executive Summary & Project Purpose

The **Cold Storage Gap Mapping for Horticulture Produce** platform is a production-grade web application engineered to address post-harvest losses, seasonal gluts, and cold-chain infrastructure bottlenecks across **Andhra Pradesh, India**.

The platform fulfills four core functions:
1. **Farmer / FPO Proximity Matchmaker:** Direct spatial matching of horticultural farmers to nearby cold storage facilities with live capacity and road-distance calculations.
2. **Real-Time Warehouse Capacity Management:** Direct portal for cold storage warehouse operators to update live occupied vs available capacity and manage incoming farmer reservation requests.
3. **Government & Planner Gap Analytics:** Macro quantitative deficit modeling analyzing district-level horticulture harvest yields against operational cold storage capacity.
4. **Algorithmic Infrastructure Sizing:** Identification of high-risk agricultural catchments requiring new multi-commodity / Controlled Atmosphere (CA) cold storage facilities with capex estimations and payback projections.

---

## 2. Geographic Scope: Andhra Pradesh Only

The platform strictly serves **Andhra Pradesh, India** across all 26 administrative districts:
- Alluri Sitharama Raju, Anakapalli, Ananthapuramu, Annamayya, Bapatla, Chittoor, Dr. B.R. Ambedkar Konaseema, East Godavari, Eluru, Guntur, Kakinada, Krishna, Kurnool, Nandyal, NTR, Palnadu, Parvathipuram Manyam, Prakasam, Sri Potti Sriramulu Nellore, Sri Sathya Sai, Srikakulam, Tirupati, Visakhapatnam, Vizianagaram, West Godavari, YSR Kadapa.

**Farmer Location Flow:**
$$\text{Andhra Pradesh (Fixed)} \longrightarrow \text{District} \longrightarrow \text{Mandal} \longrightarrow \text{Village / Location} \longrightarrow \text{Horticulture Crop}$$

---

## 3. Technology Stack

- **Frontend:**
  - React 19 (Vite 8 build system)
  - React Router v7 (Role-based navigation and route architecture)
  - Tailwind CSS v4 (Modern responsive AgriTech/GIS aesthetic with custom tokens)
  - Leaflet + OpenStreetMap / CartoDB (Interactive geospatial mapping with custom SVG markers, deficit heat circles, and radar hotspots)
  - Recharts (Interactive comparative bar charts and pie charts)
  - Lucide React (Visual iconography)
- **Backend:**
  - Node.js (v24 LTS)
  - Express.js (REST API engine)
  - MongoDB & Mongoose (Schema validation with self-contained fallback database store)
  - JSON Web Tokens (JWT) & Bcryptjs (Role-based authentication)
  - Geodesic Haversine spatial calculations with AP road-curvature multiplier (1.25x)

---

## 4. Reusable Service Architecture

Business logic is completely decoupled from UI components into dedicated service modules:

| Service | Backend Module (`server/services/`) | Frontend Module (`client/src/services/`) | Core Responsibility |
|---|---|---|---|
| **coldStorageService** | `coldStorageService.js` | `coldStorageService.js` | Facility queries, live capacity updates, registrations |
| **inventoryService** | `inventoryService.js` | `inventoryService.js` | Chamber-level temperature zones & telemetry |
| **cropProductionService**| `cropProductionService.js`| `cropProductionService.js`| AP horticulture yield statistics & harvest seasons |
| **recommendationService**| `recommendationService.js`| `recommendationService.js`| Proximity & commodity matching algorithm |
| **gapAnalysisService** | `gapAnalysisService.js` | `gapAnalysisService.js` | Deficit modeling & severity index ranking |
| **newStorageLocationService**| `newStorageLocationService.js`| `newStorageLocationService.js`| Deficit cluster & capex feasibility analysis |
| **marketService** | `marketService.js` | `marketService.js` | APMC mandi arrivals, modal prices & ROI calculator |
| **gisService** | `gisService.js` | `gisService.js` | 26 AP districts administrative hierarchy & bounds |
| **authService** | `authService.js` | `authService.js` | JWT issue, verification & role switching |
| **dataSourceService** | `dataSourceService.js` | `dataSourceService.js` | Provenance metadata, verification & timestamps |

---

## 5. MongoDB Models & Schemas

1. `users`: User entity with role (`farmer`, `owner`, `planner`, `admin`), credentials, organization, and district.
2. `cold_storages`: Licensed facility details, GPS coordinates, licensed capacity, live available capacity, chamber specifications, commodities, pricing, contact.
3. `cold_storage_inventory`: Chamber telemetry, temperature ranges, humidity percentages, and real-time allocations.
4. `crop_production`: District horticulture crop acreage, annual yield (MT), perishability days, storage demand factor.
5. `markets`: APMC regulated market yards across AP with geographic centroids and primary commodities.
6. `market_prices`: Daily modal, minimum, and maximum prices (Rs/Quintal) and cold storage benefit multiplier.
7. `gis_regions`: Spatial district centroids, boundaries, acreage, and mandal-village relationships.
8. `farmer_requests`: Farmer storage reservations, lot sizes (MT), requested duration, and status tracking.
9. `storage_requests`: Operator capacity update audit logs.
10. `data_sources`: Administrative provenance catalog (issuing agency, portal, verification protocol).
11. `gap_analysis`: Quantitative district storage demand vs capacity records.

---

## 6. Data Transparency & Provenance

Every dataset displayed across the platform features explicit provenance tagging (`DataBadge` component):
- **Government:** Directorate of Horticulture (Govt. of AP), NCCD Cold Storage Census, APAMB / e-NAM.
- **Owner Provided:** Verified cold storage warehouse manager live updates.
- **Platform Calculated:** Algorithmic spatial models (Haversine road distances, storage deficit formulas).
- **Demo Data:** Synthetic demonstration scenarios, clearly labeled with warning indicators.

---

## 7. Main Pages & Routes

1. **Landing Page (`/`):** Hero, value proposition, 4 persona feature cards, workflow pipeline, AP live metrics ribbon.
2. **Farmer Search (`/farmer-search`):** AP location hierarchy (District $\to$ Mandal $\to$ Village $\to$ Crop $\to$ Volume MT), instant matching with distance, pricing, and reservation modal.
3. **Interactive Map (`/map`):** Full Leaflet GIS mapping with layer toggles (Cold Storages, Deficit Heat Circles, New Hotspots, APMC Mandis).
4. **Cold Storage Details (`/cold-storage/:id`):** Chamber breakdown, live occupancy progress gauge, amenities, and direct reservation form.
5. **Gap Analysis (`/gap-analysis`):** Recharts comparative bar charts, severity pie charts, and district deficit ranking.
6. **Potential New Storage Locations (`/potential-locations`):** Underserved cluster appraisals, produce at risk, recommended capacity MT, capex, and payback.
7. **Market Insights (`/market-insights`):** APMC daily modal prices, historical trends, and Cold Storage ROI Value Addition Calculator.
8. **Owner Login (`/owner-login`):** Role-specific login with one-click demo credentials.
9. **Owner Dashboard (`/owner-dashboard`):** Live capacity slider/updater, chamber inventory editor, and incoming farmer inquiries manager.
10. **Government / Planner Dashboard (`/planner-dashboard`):** Macro command console, capital subsidy allocation matrix (AIF / APFPS), and printable policy briefing.
11. **Data Sources (`/data-sources`):** Complete provenance registry with reliability ratings and update frequency.
12. **Methodology (`/methodology`):** Detailed mathematical formulations, GIS road curvature factors, and temperature/humidity preservation envelopes.
13. **Admin Dashboard (`/admin-dashboard`):** Master registry oversight, database telemetry, and new facility registration.

---

## 8. Quick Start & Execution

### Prerequisites
- Node.js v18+ (tested on Node v24 LTS)
- npm v9+

### Running the Platform
1. **Start Backend API Server (Port 5000):**
   ```bash
   npm run dev:server
   ```
2. **Start Frontend React Client (Port 5173):**
   ```bash
   npm run dev:client
   ```
3. Open `http://localhost:5173/` in your web browser.

### Test Accounts
| Role | Email | Password |
|---|---|---|
| **Farmer / FPO** | `farmer@ap.gov.in` | `password123` |
| **Storage Owner** | `owner@ap.gov.in` | `password123` |
| **Govt. Planner** | `planner@ap.gov.in` | `password123` |
| **System Admin** | `admin@ap.gov.in` | `password123` |
