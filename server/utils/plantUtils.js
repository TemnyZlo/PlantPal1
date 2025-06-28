// Utility functions for plant recommendations

function calculateCompatibilityScore(plant, soilType, sunExposure) {
  let score = 0;
  
  // Base score for native plants
  if (plant.is_native) {
    score += 20;
  }
  
  // Soil compatibility (0-30 points)
  if (soilType && plant.soil_type) {
    if (plant.soil_type.toLowerCase().includes(soilType.toLowerCase()) ||
        plant.soil_type.toLowerCase().includes('any')) {
      score += 30;
    } else {
      score += 10; // Partial compatibility
    }
  }
  
  // Sun exposure compatibility (0-30 points)
  if (sunExposure && plant.sun_requirements) {
    const plantSun = plant.sun_requirements.toLowerCase();
    const userSun = sunExposure.toLowerCase();
    
    if (plantSun.includes(userSun)) {
      score += 30;
    } else if (plantSun.includes('partial')) {
      score += 20; // Partial sun plants are more adaptable
    }
  }
  
  // Water efficiency bonus (0-20 points)
  if (plant.water_requirements && plant.water_requirements.toLowerCase().includes('low')) {
    score += 20;
  } else if (plant.water_requirements && plant.water_requirements.toLowerCase().includes('medium')) {
    score += 10;
  }
  
  return Math.min(score, 100); // Cap at 100%
}

function generateRecommendationReason(plant, soilType, sunExposure) {
  const reasons = [];
  
  if (plant.is_native) {
    reasons.push('native to your area');
  }
  
  if (soilType && plant.soil_type && 
      plant.soil_type.toLowerCase().includes(soilType.toLowerCase())) {
    reasons.push(`thrives in ${soilType} soil`);
  }
  
  if (sunExposure && plant.sun_requirements && 
      plant.sun_requirements.toLowerCase().includes(sunExposure.toLowerCase())) {
    reasons.push(`perfect for ${sunExposure.toLowerCase().replace('-', ' ')} conditions`);
  }
  
  if (plant.water_requirements && plant.water_requirements.toLowerCase().includes('low')) {
    reasons.push('drought tolerant');
  }
  
  return reasons.length > 0 
    ? `Great choice because it's ${reasons.join(', ')}.`
    : 'A beautiful addition to any garden.';
}

function generateCareAdvice(plant) {
  const advice = [];
  
  if (plant.water_requirements) {
    advice.push(`Water: ${plant.water_requirements}`);
  }
  
  if (plant.sun_requirements) {
    advice.push(`Light: ${plant.sun_requirements}`);
  }
  
  if (plant.soil_type) {
    advice.push(`Soil: ${plant.soil_type}`);
  }
  
  if (plant.care_instructions) {
    advice.push(plant.care_instructions);
  }
  
  return advice;
}

module.exports = {
  calculateCompatibilityScore,
  generateRecommendationReason,
  generateCareAdvice
};