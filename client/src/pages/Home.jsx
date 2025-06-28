import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import PlantCard from '../components/PlantCard'

const Home = () => {
  const [featuredPlants, setFeaturedPlants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedPlants = async () => {
      try {
        const plants = await api.getAllPlants()
        setFeaturedPlants(plants.slice(0, 6)) // Show first 6 plants
      } catch (error) {
        console.error('Error loading featured plants:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedPlants()
  }, [])

  return (
    <div>
      {/* Built with Bolt.new badge */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a 
            href="https://bolt.new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-black border border-gray-800 rounded-lg text-white hover:bg-gray-900 transition-all duration-200 text-sm font-medium"
          >
            <span className="mr-2">⚡</span>
            Built with Bolt.new
          </a>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-plant-green-600 to-plant-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Grow Native, <span className="text-plant-green-200">Grow Smart</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-plant-green-100">
              Discover the perfect native plants for your garden and help create a sustainable ecosystem
            </p>
            <div className="space-x-4">
              <Link to="/recommendations" className="btn-primary bg-white text-plant-green-600 hover:bg-gray-100">
                Get Plant Recommendations
              </Link>
              <Link to="/plants" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-plant-green-600 transition-colors">
                Browse Plants
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Native Plants?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Native plants are adapted to your local climate and soil, requiring less water and maintenance while supporting local wildlife.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center card">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Support local ecosystems and reduce your environmental impact</p>
            </div>
            <div className="text-center card">
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-xl font-semibold mb-2">Water Efficient</h3>
              <p className="text-gray-600">Native plants require less watering once established</p>
            </div>
            <div className="text-center card">
              <div className="text-4xl mb-4">🦋</div>
              <h3 className="text-xl font-semibold mb-2">Wildlife Friendly</h3>
              <p className="text-gray-600">Attract butterflies, bees, and birds to your garden</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Native Plants</h2>
            <p className="text-gray-600">Discover some popular native plants that could thrive in your garden</p>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading featured plants...</p>
            </div>
          ) : featuredPlants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No featured plants available</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link to="/plants" className="btn-primary">
              View All Plants
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-plant-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Native Garden?</h2>
          <p className="text-xl mb-8 text-plant-green-100">
            Get personalized plant recommendations based on your location and garden conditions
          </p>
          <Link to="/recommendations" className="bg-white text-plant-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Now
          </Link>
        </div>
      </section>
      
      {/* Built with Bolt.new badge */}
      <div className="mt-8">
        <a 
          href="https://bolt.new" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-black border border-gray-800 rounded-lg text-white hover:bg-gray-900 transition-all duration-200 text-sm font-medium"
        >
          <span className="mr-2">⚡</span>
          Built with Bolt.new
        </a>
      </div>
    </div>
  )
}

export default Home