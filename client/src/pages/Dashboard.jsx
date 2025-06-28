import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = () => {
  const [userBadges, setUserBadges] = useState([])
  const [allBadges, setAllBadges] = useState([])
  const [ecoScore, setEcoScore] = useState(0)
  const [loadingBadges, setLoadingBadges] = useState(true)
  const [loadingAllBadges, setLoadingAllBadges] = useState(true)
  
  // Mock user ID - in a real app, this would come from authentication
  const mockUserId = 'demo-user'

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const [badges, allBadgesData, score] = await Promise.all([
        api.getUserBadges(mockUserId),
        api.getAllBadges(),
        api.getEcoScore(mockUserId)
      ])
      
      setUserBadges(badges)
      setAllBadges(allBadgesData)
      setEcoScore(score)
    } catch (error) {
      console.error('Error loading user data:', error)
      // Set demo data on error
      setEcoScore(150)
    } finally {
      setLoadingBadges(false)
      setLoadingAllBadges(false)
    }
  }

  const availableBadges = allBadges.filter(badge => 
    !userBadges.some(userBadge => userBadge.id === badge.id)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-plant-green-600 mb-2">Your Garden Dashboard</h1>
        <p className="text-gray-600">Track your eco-score, badges, and gardening progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-plant-green-600 mb-2">{ecoScore}</div>
          <div className="text-sm text-gray-600">Eco Score</div>
          <div className="text-xs text-gray-500 mt-1">🌱 Keep growing!</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{userBadges.length}</div>
          <div className="text-sm text-gray-600">Badges Earned</div>
          <div className="text-xs text-gray-500 mt-1">🏆 Great progress!</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">12</div>
          <div className="text-sm text-gray-600">Plants Growing</div>
          <div className="text-xs text-gray-500 mt-1">🌿 Thriving garden!</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
          <div className="text-sm text-gray-600">Native Species</div>
          <div className="text-xs text-gray-500 mt-1">🦋 Eco-friendly!</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Badges Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Badges</h2>
          
          {loadingBadges ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-plant-green-600 mx-auto mb-2"></div>
              <p className="text-gray-500 text-sm">Loading badges...</p>
            </div>
          ) : userBadges.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {userBadges.slice(0, 4).map((badge) => (
                  <div key={badge.id} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl mb-2">{badge.icon_url || '🏆'}</div>
                    <div className="font-semibold text-sm text-gray-800">{badge.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
                  </div>
                ))}
              </div>
              
              {userBadges.length > 4 && (
                <div className="text-center">
                  <button className="text-plant-green-600 hover:text-plant-green-700 text-sm font-medium">
                    View All {userBadges.length} Badges
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🏆</div>
              <p className="text-gray-600 mb-4">No badges earned yet</p>
              <p className="text-sm text-gray-500">Start gardening to earn your first badge!</p>
            </div>
          )}
        </div>

        {/* Available Badges */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Badges</h2>
          
          {loadingAllBadges ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-plant-green-600 mx-auto mb-2"></div>
              <p className="text-gray-500 text-sm">Loading available badges...</p>
            </div>
          ) : availableBadges.length > 0 ? (
            <div className="space-y-3">
              {availableBadges.slice(0, 5).map((badge) => (
                <div key={badge.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mr-3">{badge.icon_url || '🏆'}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-800">{badge.name}</div>
                    <div className="text-xs text-gray-600">{badge.description}</div>
                    <div className="text-xs text-plant-green-600 mt-1">+{badge.eco_score_reward} eco points</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">All badges earned! 🎉</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 card">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl mr-3">🌱</div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">Planted Purple Coneflower</div>
              <div className="text-sm text-gray-600">Added a native plant to your garden</div>
            </div>
            <div className="text-sm text-gray-500">2 days ago</div>
          </div>
          
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl mr-3">🏆</div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">Earned "Green Thumb" Badge</div>
              <div className="text-sm text-gray-600">Planted your first plant</div>
            </div>
            <div className="text-sm text-gray-500">3 days ago</div>
          </div>
          
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl mr-3">📝</div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">Shared Garden Progress</div>
              <div className="text-sm text-gray-600">Posted in the community</div>
            </div>
            <div className="text-sm text-gray-500">1 week ago</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-plant-green-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-plant-green-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/recommendations" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mr-3">🔍</div>
            <div>
              <div className="font-medium text-gray-800">Get Plant Recommendations</div>
              <div className="text-sm text-gray-600">Find perfect plants for your garden</div>
            </div>
          </Link>
          
          <Link to="/community" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mr-3">👥</div>
            <div>
              <div className="font-medium text-gray-800">Join Community</div>
              <div className="text-sm text-gray-600">Share and learn from others</div>
            </div>
          </Link>
          
          <Link to="/plants" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mr-3">📚</div>
            <div>
              <div className="font-medium text-gray-800">Browse Plant Database</div>
              <div className="text-sm text-gray-600">Explore our plant collection</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard