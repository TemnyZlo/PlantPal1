import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-plant-green-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl">🌱</span>
                <span className="text-white text-xl font-bold">PlantPal</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-plant-green-700 text-white' 
                    : 'text-white hover:text-plant-green-200'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/recommendations" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/recommendations') 
                    ? 'bg-plant-green-700 text-white' 
                    : 'text-white hover:text-plant-green-200'
                }`}
              >
                Recommendations
              </Link>
              <Link 
                to="/plants" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/plants') 
                    ? 'bg-plant-green-700 text-white' 
                    : 'text-white hover:text-plant-green-200'
                }`}
              >
                Plants
              </Link>
              <Link 
                to="/community" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/community') 
                    ? 'bg-plant-green-700 text-white' 
                    : 'text-white hover:text-plant-green-200'
                }`}
              >
                Community
              </Link>
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard') 
                    ? 'bg-plant-green-700 text-white' 
                    : 'text-white hover:text-plant-green-200'
                }`}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-plant-green-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PlantPal</h3>
              <p className="text-plant-green-200">Your companion for sustainable, native gardening. Grow local, think global.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-plant-green-200">
                <li><Link to="/recommendations" className="hover:text-white">Plant Recommendations</Link></li>
                <li><Link to="/plants" className="hover:text-white">Plant Database</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-plant-green-200">PlantPal helps you create sustainable gardens with native plants that support local ecosystems.</p>
            </div>
          </div>
          <div className="border-t border-plant-green-700 mt-8 pt-8 text-center text-plant-green-200">
            <p>&copy; 2024 PlantPal. Growing a greener future together.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout