import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter,
  Grid,
  List,
  Leaf,
  Sun,
  Droplets,
  Sparkles,
  SlidersHorizontal,
  Brain,
} from 'lucide-react'
import Button from '../components/UI/Button'
import LoadingSpinner from '../components/UI/LoadingSpinner'

// Mock plant data
const mockPlants = [
  {
    id: 1,
    common_name: 'Monstera Deliciosa',
    scientific_name: 'Monstera deliciosa',
    description: 'Popular houseplant known for its distinctive split leaves',
    image_url: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
    care_level: 'Intermediate',
    water_requirements: 'Moderate',
    sun_requirements: 'Bright Indirect',
    blooming_season: 'Rarely blooms indoors',
    is_native: false,
    growth_stage: 'Fast growing',
    soil_type: 'Well-draining',
    ai_score: 98,
    ai_recommendation: 'Ideal for living rooms with filtered light'
  },
  {
    id: 2,
    common_name: 'Snake Plant',
    scientific_name: 'Dracaena trifasciata',
    description: 'Extremely hardy plant with upright, sword-like leaves',
    image_url: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    care_level: 'Easy',
    water_requirements: 'Low',
    sun_requirements: 'Any Light',
    blooming_season: 'Rarely blooms indoors',
    is_native: false,
    growth_stage: 'Slow growing',
    soil_type: 'Well-draining',
    ai_score: 99,
    ai_recommendation: 'Perfect for beginners and low-light areas'
  },
  {
    id: 3,
    common_name: 'Fiddle Leaf Fig',
    scientific_name: 'Ficus lyrata',
    description: 'Trendy houseplant with large, violin-shaped leaves',
    image_url: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg',
    care_level: 'Difficult',
    water_requirements: 'Moderate',
    sun_requirements: 'Bright Indirect',
    blooming_season: 'Non-flowering',
    is_native: false,
    growth_stage: 'Moderate growing',
    soil_type: 'Well-draining',
    ai_score: 85,
    ai_recommendation: 'Needs consistent care and stable conditions'
  },
  {
    id: 4,
    common_name: 'Peace Lily',
    scientific_name: 'Spathiphyllum wallisii',
    description: 'Elegant plant with glossy leaves and white flowers',
    image_url: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    care_level: 'Easy',
    water_requirements: 'Moderate',
    sun_requirements: 'Low to Bright Indirect',
    blooming_season: 'Spring to Summer',
    is_native: false,
    growth_stage: 'Moderate growing',
    soil_type: 'Rich, loose potting soil',
    ai_score: 95,
    ai_recommendation: 'Great air purifier for bedrooms and offices'
  },
  {
    id: 5,
    common_name: 'ZZ Plant',
    scientific_name: 'Zamioculcas zamiifolia',
    description: 'Nearly indestructible plant with glossy, dark green leaves',
    image_url: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    care_level: 'Very Easy',
    water_requirements: 'Low',
    sun_requirements: 'Low to Bright Indirect',
    blooming_season: 'Rarely blooms indoors',
    is_native: false,
    growth_stage: 'Slow growing',
    soil_type: 'Well-draining',
    ai_score: 100,
    ai_recommendation: 'Ideal for forgetful gardeners and low-light spaces'
  },
  {
    id: 6,
    common_name: 'Purple Coneflower',
    scientific_name: 'Echinacea purpurea',
    description: 'Native wildflower with purple petals and spiky center',
    image_url: 'https://images.pexels.com/photos/56866/garden-flower-purple-echinacea-56866.jpeg',
    care_level: 'Easy',
    water_requirements: 'Low',
    sun_requirements: 'Full Sun',
    blooming_season: 'Summer to Fall',
    is_native: true,
    growth_stage: 'Perennial',
    soil_type: 'Well-draining',
    ai_score: 97,
    ai_recommendation: 'Excellent for attracting pollinators to outdoor gardens'
  },
  {
    id: 7,
    common_name: 'Sunflower',
    scientific_name: 'Helianthus annuus',
    description: 'Iconic tall flower that follows the sun with bright yellow petals',
    image_url: 'https://images.pexels.com/photos/33109/sunflower-blossom-bloom-yellow.jpg',
    care_level: 'Easy',
    water_requirements: 'Moderate',
    sun_requirements: 'Full Sun',
    blooming_season: 'Summer to Fall',
    is_native: true,
    growth_stage: 'Annual',
    soil_type: 'Well-draining',
    ai_score: 94,
    ai_recommendation: 'Perfect for children\'s gardens and attracting birds'
  },
  {
    id: 8,
    common_name: 'Lavender',
    scientific_name: 'Lavandula angustifolia',
    description: 'Fragrant purple flowers beloved by bees and humans alike',
    image_url: 'https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg',
    care_level: 'Easy',
    water_requirements: 'Low',
    sun_requirements: 'Full Sun',
    blooming_season: 'Summer',
    is_native: false,
    growth_stage: 'Perennial',
    soil_type: 'Well-draining',
    ai_score: 96,
    ai_recommendation: 'Excellent for aromatherapy gardens and dry climates'
  },
  {
    id: 9,
    common_name: 'Rose',
    scientific_name: 'Rosa rubiginosa',
    description: 'Classic garden flower with layered petals and sweet fragrance',
    image_url: 'https://images.pexels.com/photos/56866/garden-flower-purple-echinacea-56866.jpeg',
    care_level: 'Intermediate',
    water_requirements: 'Moderate',
    sun_requirements: 'Full Sun',
    blooming_season: 'Spring to Fall',
    is_native: false,
    growth_stage: 'Perennial',
    soil_type: 'Rich, well-draining',
    ai_score: 88,
    ai_recommendation: 'Requires regular pruning but rewards with beautiful blooms'
  },
  {
    id: 10,
    common_name: 'Marigold',
    scientific_name: 'Tagetes patula',
    description: 'Vibrant orange and yellow flowers that repel garden pests',
    image_url: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
    care_level: 'Very Easy',
    water_requirements: 'Low',
    sun_requirements: 'Full Sun',
    blooming_season: 'Spring to Fall',
    is_native: false,
    growth_stage: 'Annual',
    soil_type: 'Any soil',
    ai_score: 99,
    ai_recommendation: 'Perfect companion plant for vegetable gardens'
  },
  {
    id: 11,
    common_name: 'Tulip',
    scientific_name: 'Tulipa gesneriana',
    description: 'Spring bulb flower with cup-shaped blooms in many colors',
    image_url: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-spring.jpg',
    care_level: 'Easy',
    water_requirements: 'Moderate',
    sun_requirements: 'Full Sun to Partial',
    blooming_season: 'Spring',
    is_native: false,
    growth_stage: 'Bulb',
    soil_type: 'Well-draining',
    ai_score: 92,
    ai_recommendation: 'Plant bulbs in fall for spectacular spring display'
  },
  {
    id: 12,
    common_name: 'Dahlia',
    scientific_name: 'Dahlia pinnata',
    description: 'Showy flowers with intricate petal patterns in vibrant colors',
    image_url: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
    care_level: 'Intermediate',
    water_requirements: 'Moderate',
    sun_requirements: 'Full Sun',
    blooming_season: 'Summer to Fall',
    is_native: false,
    growth_stage: 'Tuber',
    soil_type: 'Rich, well-draining',
    ai_score: 89,
    ai_recommendation: 'Excellent for cut flower gardens and late season color'
  },
  {
    id: 13,
    common_name: 'Black-Eyed Susan',
    scientific_name: 'Rudbeckia hirta',
    description: 'Cheerful yellow flowers with dark centers, native wildflower',
    image_url: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
    care_level: 'Very Easy',
    water_requirements: 'Low',
    sun_requirements: 'Full Sun',
    blooming_season: 'Summer to Fall',
    is_native: true,
    growth_stage: 'Perennial',
    soil_type: 'Any soil',
    ai_score: 98,
    ai_recommendation: 'Drought-tolerant native that attracts butterflies'
  },
  {
    id: 14,
    common_name: 'Petunia',
    scientific_name: 'Petunia × atkinsiana',
    description: 'Trumpet-shaped flowers in a rainbow of colors, perfect for containers',
    image_url: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
    care_level: 'Easy',
    water_requirements: 'Moderate',
    sun_requirements: 'Full Sun',
    blooming_season: 'Spring to Fall',
    is_native: false,
    growth_stage: 'Annual',
    soil_type: 'Well-draining',
    ai_score: 93,
    ai_recommendation: 'Ideal for hanging baskets and continuous color'
  },
  {
    id: 15,
    common_name: 'Cosmos',
    scientific_name: 'Cosmos bipinnatus',
    description: 'Delicate daisy-like flowers with feathery foliage',
    image_url: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
    care_level: 'Very Easy',
    water_requirements: 'Low',
    sun_requirements: 'Full Sun',
    blooming_season: 'Summer to Fall',
    is_native: false,
    growth_stage: 'Annual',
    soil_type: 'Poor to average',
    ai_score: 97,
    ai_recommendation: 'Self-seeding annual that attracts beneficial insects'
  }
]

const Plants = () => {
  const [plants, setPlants] = useState(mockPlants)
  const [filteredPlants, setFilteredPlants] = useState(mockPlants)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    careLevel: 'all',
    waterRequirements: 'all',
    sunRequirements: 'all',
    native: false
  })

  const handleSearch = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const results = plants.filter(plant => 
        plant.common_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredPlants(results)
      setLoading(false)
    }, 500)
  }

  const applyFilters = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      let results = [...plants]
      
      if (filters.careLevel !== 'all') {
        results = results.filter(plant => 
          plant.care_level.toLowerCase().includes(filters.careLevel.toLowerCase())
        )
      }
      
      if (filters.waterRequirements !== 'all') {
        results = results.filter(plant => 
          plant.water_requirements.toLowerCase().includes(filters.waterRequirements.toLowerCase())
        )
      }
      
      if (filters.sunRequirements !== 'all') {
        results = results.filter(plant => 
          plant.sun_requirements.toLowerCase().includes(filters.sunRequirements.toLowerCase())
        )
      }
      
      if (filters.native) {
        results = results.filter(plant => plant.is_native)
      }
      
      setFilteredPlants(results)
      setLoading(false)
      setFilterOpen(false)
    }, 500)
  }

  const resetFilters = () => {
    setFilters({
      careLevel: 'all',
      waterRequirements: 'all',
      sunRequirements: 'all',
      native: false
    })
    setFilteredPlants(plants)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-xl py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                Plant Database
              </h1>
              <p className="text-muted-foreground text-lg">
                Explore our AI-curated collection of plants
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search plants by name, features, or care needs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="input pl-10 pr-4 py-3 w-full"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
              </Button>

              <div className="flex rounded-lg border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Care Level
                      </label>
                      <select
                        value={filters.careLevel}
                        onChange={(e) => setFilters({...filters, careLevel: e.target.value})}
                        className="input w-full"
                      >
                        <option value="all">All Levels</option>
                        <option value="easy">Easy</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="difficult">Difficult</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Water Needs
                      </label>
                      <select
                        value={filters.waterRequirements}
                        onChange={(e) => setFilters({...filters, waterRequirements: e.target.value})}
                        className="input w-full"
                      >
                        <option value="all">All Water Needs</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Light Needs
                      </label>
                      <select
                        value={filters.sunRequirements}
                        onChange={(e) => setFilters({...filters, sunRequirements: e.target.value})}
                        className="input w-full"
                      >
                        <option value="all">All Light Needs</option>
                        <option value="low">Low Light</option>
                        <option value="indirect">Indirect Light</option>
                        <option value="bright">Bright Light</option>
                        <option value="full">Full Sun</option>
                      </select>
                    </div>
                    
                    <div className="flex items-end">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.native}
                          onChange={(e) => setFilters({...filters, native: e.target.checked})}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium">Native Plants Only</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button onClick={applyFilters}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Plants Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" text="Loading plants..." />
          </div>
        ) : filteredPlants.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }
          >
            {filteredPlants.map((plant, index) => (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card card-hover ${viewMode === 'list' ? 'flex' : 'overflow-hidden'}`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative h-60">
                      <img
                        src={plant.image_url}
                        alt={plant.common_name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 glass text-sm font-medium rounded-full flex items-center">
                        <Leaf className="h-4 w-4 text-primary mr-1" />
                        <span>AI Score: {plant.ai_score}</span>
                      </div>
                      {plant.is_native && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-bold">
                          Native
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">
                            {plant.common_name}
                          </h3>
                          <p className="text-sm text-muted-foreground italic">
                            {plant.scientific_name}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Sparkles className="h-4 w-4 text-accent mr-1" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {plant.care_level}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {plant.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
                          <Droplets className="h-3 w-3 mr-1" />
                          {plant.water_requirements}
                        </div>
                        <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs">
                          <Sun className="h-3 w-3 mr-1" />
                          {plant.sun_requirements}
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 p-3 rounded-lg mb-4">
                        <div className="flex items-center mb-1">
                          <Brain className="h-4 w-4 text-primary mr-2" />
                          <span className="text-xs font-medium">AI Recommendation</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {plant.ai_recommendation}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Link to={`/plants/${plant.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                        <Button size="sm">
                          Add to Garden
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={plant.image_url}
                      alt={plant.common_name}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-lg font-bold">
                            {plant.common_name}
                          </h3>
                          <p className="text-sm text-muted-foreground italic">
                            {plant.scientific_name}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Sparkles className="h-4 w-4 text-accent mr-1" />
                          <span className="text-xs font-medium">
                            AI Score: {plant.ai_score}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {plant.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        <div className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
                          <Droplets className="h-3 w-3 mr-1" />
                          {plant.water_requirements}
                        </div>
                        <div className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs">
                          <Sun className="h-3 w-3 mr-1" />
                          {plant.sun_requirements}
                        </div>
                        {plant.is_native && (
                          <div className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                            Native
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Link to={`/plants/${plant.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                        <Button size="sm">
                          Add
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="card max-w-md mx-auto p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {searchQuery ? 'No plants found' : 'Start exploring plants'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? `No plants match your search for "${searchQuery}". Try different keywords or adjust your filters.`
                  : 'Use the search bar or filters to discover plants that match your needs.'
                }
              </p>
              {searchQuery && (
                <Button onClick={() => {
                  setSearchQuery('')
                  setFilteredPlants(plants)
                }}>
                  Clear Search
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Plants