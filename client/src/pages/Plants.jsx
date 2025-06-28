import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import PlantCard from '../components/PlantCard'
import LoadingSpinner from '../components/LoadingSpinner'

const Plants = () => {
  const [allPlants, setAllPlants] = useState([])
  const [filteredPlants, setFilteredPlants] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentFilter, setCurrentFilter] = useState('all')

  useEffect(() => {
    loadPlants()
  }, [])

  useEffect(() => {
    applyFilter()
  }, [allPlants, currentFilter])

  const loadPlants = async () => {
    try {
      setLoading(true)
      const plants = await api.getAllPlants()
      setAllPlants(plants)
    } catch (error) {
      console.error('Error loading plants:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchPlants = async () => {
    if (!searchQuery.trim()) {
      applyFilter()
      return
    }

    try {
      setLoading(true)
      const results = await api.searchPlants(searchQuery)
      setFilteredPlants(results)
    } catch (error) {
      console.error('Error searching plants:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilter = () => {
    let filtered = [...allPlants]
    
    switch (currentFilter) {
      case 'native':
        filtered = allPlants.filter(plant => plant.is_native)
        break
      case 'herbs':
        filtered = allPlants.filter(plant => 
          plant.common_name.toLowerCase().includes('basil') ||
          plant.common_name.toLowerCase().includes('lavender') ||
          plant.common_name.toLowerCase().includes('herb')
        )
        break
      default:
        filtered = allPlants
    }
    
    setFilteredPlants(filtered)
  }

  const setFilter = (filter) => {
    setCurrentFilter(filter)
    setSearchQuery('')
  }

  const clearSearch = () => {
    setSearchQuery('')
    applyFilter()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPlants()
    }
  }

  const getTabClass = (filter) => {
    return currentFilter === filter
      ? 'border-plant-green-500 text-plant-green-600'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-plant-green-600 mb-4">Plant Database</h1>
        <p className="text-gray-600 mb-6">Explore our comprehensive database of native and garden plants</p>
        
        {/* Search Bar */}
        <div className="max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
          <button onClick={searchPlants} className="mt-2 btn-primary">
            Search
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setFilter('all')}
              className={`${getTabClass('all')} py-2 px-1 border-b-2 font-medium text-sm`}
            >
              All Plants ({allPlants.length})
            </button>
            <button
              onClick={() => setFilter('native')}
              className={`${getTabClass('native')} py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Native Plants ({allPlants.filter(p => p.is_native).length})
            </button>
            <button
              onClick={() => setFilter('herbs')}
              className={`${getTabClass('herbs')} py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Herbs ({allPlants.filter(p => 
                p.common_name.toLowerCase().includes('basil') ||
                p.common_name.toLowerCase().includes('lavender')
              ).length})
            </button>
          </nav>
        </div>
      </div>

      {/* Plants Grid */}
      {loading ? (
        <LoadingSpinner message="Loading plants..." />
      ) : filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No plants found</h3>
          <p className="text-gray-600">
            {searchQuery ? (
              <>No plants match your search for "{searchQuery}".</>
            ) : (
              <>No plants available in this category.</>
            )}
          </p>
          {searchQuery && (
            <button onClick={clearSearch} className="mt-4 btn-primary">
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Plants