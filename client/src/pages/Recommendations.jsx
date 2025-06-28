import React, { useState } from 'react'
import { api } from '../services/api'
import PlantCard from '../components/PlantCard'
import LoadingSpinner from '../components/LoadingSpinner'

const Recommendations = () => {
  const [formData, setFormData] = useState({
    soilType: '',
    sunExposure: '',
    gardenSize: ''
  })
  const [location, setLocation] = useState({
    latitude: 40.7128, // Default to New York
    longitude: -74.0060,
    city: 'New York',
    state: 'NY',
    country: 'USA'
  })
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [locationStatus, setLocationStatus] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getUserLocation = async () => {
    try {
      setLocationStatus('Getting your location...')
      
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported'))
        }
        
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true
        })
      })
      
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
      
      setLocationStatus(`Location found: ${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
    } catch (error) {
      setLocationStatus('Could not get location. Using default location.')
      console.error('Error getting location:', error)
    }
  }

  const getRecommendations = async (e) => {
    e.preventDefault()
    
    setLoading(true)
    setHasSearched(true)
    
    try {
      const requestData = {
        location,
        soilType: formData.soilType,
        sunExposure: formData.sunExposure,
        gardenSize: formData.gardenSize ? parseFloat(formData.gardenSize) : null
      }
      
      const results = await api.getPlantRecommendations(requestData)
      setRecommendations(results)
    } catch (error) {
      console.error('Error getting recommendations:', error)
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-plant-green-600 mb-6">Plant Recommendations for Your Garden</h1>
      
      {/* Garden Information Form */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Tell us about your garden</h2>
        <form onSubmit={getRecommendations}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select soil type</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loam">Loam</option>
                <option value="rocky">Rocky</option>
                <option value="well-drained">Well-drained</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sun Exposure</label>
              <select
                name="sunExposure"
                value={formData.sunExposure}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select sun exposure</option>
                <option value="full-sun">Full Sun</option>
                <option value="partial-sun">Partial Sun</option>
                <option value="partial-shade">Partial Shade</option>
                <option value="shade">Shade</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Garden Size (sq meters)</label>
              <input
                type="number"
                name="gardenSize"
                value={formData.gardenSize}
                onChange={handleInputChange}
                placeholder="Optional"
                className="input-field"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
            </button>
            
            <button type="button" onClick={getUserLocation} className="btn-secondary">
              📍 Use My Location
            </button>
          </div>
          
          {locationStatus && (
            <p className="mt-2 text-sm text-gray-600">{locationStatus}</p>
          )}
        </form>
      </div>

      {/* Recommendations Results */}
      {loading ? (
        <LoadingSpinner message="Finding the perfect plants for your garden..." />
      ) : recommendations.length > 0 ? (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Recommended Plants for Your Garden
              <span className="text-sm font-normal text-gray-600"> ({recommendations.length} results)</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recommendation) => (
              <PlantCard
                key={recommendation.plant.id}
                plant={recommendation.plant}
                compatibilityScore={recommendation.compatibilityScore}
                reason={recommendation.reason}
                careAdvice={recommendation.careAdvice}
                showCompatibility={true}
              />
            ))}
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No recommendations found</h3>
          <p className="text-gray-600">Try adjusting your garden conditions or check back later for more plants.</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No recommendations yet</h3>
          <p className="text-gray-600">Fill out the form above to get personalized plant recommendations for your garden.</p>
        </div>
      )}
    </div>
  )
}

export default Recommendations