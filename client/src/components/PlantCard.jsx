import React from 'react'

const PlantCard = ({ plant, compatibilityScore, reason, careAdvice, showCompatibility = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={plant.image_url || '/placeholder-plant.jpg'} 
          alt={plant.common_name} 
          className="w-full h-48 object-cover"
        />
        {showCompatibility && compatibilityScore && (
          <div className="absolute top-2 right-2 bg-plant-green-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {Math.round(compatibilityScore)}% Match
          </div>
        )}
        {plant.is_native && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            🌿 Native
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{plant.common_name}</h3>
        <p className="text-sm text-gray-600 mb-2 italic">{plant.scientific_name}</p>
        
        {reason && (
          <div className="mb-3">
            <p className="text-sm text-gray-700 font-medium mb-1">Why it's recommended:</p>
            <p className="text-sm text-gray-600">{reason}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {plant.water_requirements && (
            <span className="badge badge-water">💧 {plant.water_requirements}</span>
          )}
          {plant.sun_requirements && (
            <span className="badge badge-sun">☀️ {plant.sun_requirements}</span>
          )}
          {plant.blooming_season && (
            <span className="badge badge-season">🌸 {plant.blooming_season}</span>
          )}
        </div>
        
        {plant.description && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{plant.description}</p>
        )}
        
        {careAdvice && careAdvice.length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-gray-700 font-medium mb-1">Care Tips:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {careAdvice.slice(0, 2).map((advice, index) => (
                <li key={index}>• {advice}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{plant.growth_stage}</span>
          <button className="bg-plant-green-600 text-white px-3 py-1 rounded text-sm hover:bg-plant-green-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlantCard