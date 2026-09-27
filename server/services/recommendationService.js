import dbStore from '../db/dbStore.js';
import gisService from './gisService.js';
import { AP_HORTICULTURE_CROPS } from '../data/andhraPradeshData.js';

export const recommendationService = {
  async findColdStoragesForFarmer({ district, mandal, village, crop, quantityMT = 10, maxDistanceKm = 150 }) {
    if (!district) {
      throw new Error("District within Andhra Pradesh is required for cold storage matching");
    }

    const farmerCoords = gisService.getCoordinatesForLocation(district, mandal);
    const allStorages = dbStore.getColdStorages();
    const cropMeta = AP_HORTICULTURE_CROPS.find(c => c.name.toLowerCase() === (crop || '').toLowerCase());

    const scoredFacilities = allStorages.map(cs => {
      // Calculate road distance in km
      const distanceKm = gisService.calculateDistance(farmerCoords, cs.coordinates);

      // Check crop compatibility
      let isCropDirectMatch = false;
      let compatibleZone = null;

      if (crop) {
        isCropDirectMatch = cs.commoditiesSupported.some(
          c => c.toLowerCase() === crop.toLowerCase()
        );

        compatibleZone = cs.temperatureZones.find(tz => 
          tz.suitableCommodities.some(sc => sc.toLowerCase() === crop.toLowerCase())
        );
      }

      const hasSufficientCapacity = cs.availableCapacityMT >= Number(quantityMT);
      const isWithinDistrict = cs.district.toLowerCase() === district.toLowerCase();

      // Estimate costs
      // AP Agri-transport benchmark: Rs 18 per km per MT for refrigerated/ventilated transit
      const estimatedTransitCostINR = Math.round(distanceKm * 18 * Number(quantityMT));
      const monthlyStorageCostINR = Math.round((cs.pricingPerMTMonth || 800) * Number(quantityMT));
      const totalFirstMonthOutlayINR = estimatedTransitCostINR + monthlyStorageCostINR;

      // Scoring algorithm (0 to 100)
      let score = 50;

      // Distance score (closer is better, max 35 pts)
      const distanceScore = Math.max(0, 35 - (distanceKm * 0.35));
      score += distanceScore;

      // Capacity score (adequate available MT, max 25 pts)
      if (hasSufficientCapacity) {
        score += 25;
      } else {
        score += Math.max(0, (cs.availableCapacityMT / Number(quantityMT)) * 15);
      }

      // Crop compatibility (max 20 pts)
      if (isCropDirectMatch || compatibleZone) {
        score += 20;
      } else if (!crop) {
        score += 10;
      }

      // Amenities score (max 10 pts)
      score += Math.min(10, (cs.amenities ? cs.amenities.length : 2) * 1.5);

      // District bonus
      if (isWithinDistrict) {
        score += 10;
      }

      return {
        ...cs,
        distanceKm,
        farmerOrigin: {
          state: "Andhra Pradesh",
          district,
          mandal: mandal || "Central",
          village: village || ""
        },
        cropRequested: crop,
        quantityMT: Number(quantityMT),
        hasSufficientCapacity,
        isCropDirectMatch: isCropDirectMatch || !!compatibleZone,
        compatibleZoneName: compatibleZone ? compatibleZone.name : null,
        estimatedTransitCostINR,
        monthlyStorageCostINR,
        totalFirstMonthOutlayINR,
        matchScore: Math.min(100, Math.round(score))
      };
    });

    // Sort by match score descending
    scoredFacilities.sort((a, b) => b.matchScore - a.matchScore);

    // Filter within maxDistanceKm unless none found, then return top 3 closest
    let filtered = scoredFacilities.filter(f => f.distanceKm <= maxDistanceKm);
    if (filtered.length === 0) {
      filtered = scoredFacilities.slice(0, 3);
    }

    // Assign UI badges
    if (filtered.length > 0) {
      filtered[0].badge = "Best Overall Match";
      
      const nearest = [...filtered].sort((a, b) => a.distanceKm - b.distanceKm)[0];
      if (nearest && nearest.id !== filtered[0].id) {
        nearest.badge = "Nearest Facility";
      }

      const cheapest = [...filtered].sort((a, b) => a.pricingPerMTMonth - b.pricingPerMTMonth)[0];
      if (cheapest && !cheapest.badge) {
        cheapest.badge = "Most Economical";
      }
    }

    return {
      query: {
        state: "Andhra Pradesh",
        district,
        mandal,
        village,
        crop,
        quantityMT: Number(quantityMT),
        cropMeta
      },
      resultsCount: filtered.length,
      recommendations: filtered
    };
  }
};

export default recommendationService;
