import { supabase, db, ai } from '../lib/supabase'

// Enhanced Plant API with AI capabilities
export const plantAPI = {
  // Get all plants with AI-powered filtering
  getPlants: async (filters = {}) => {
    try {
      let query = db.plants.getAll()
      
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category)
      }
      
      if (filters.native) {
        query = query.eq('is_native', true)
      }
      
      if (filters.difficulty) {
        query = query.eq('care_level', filters.difficulty)
      }
      
      const { data, error } = await query
      if (error) throw error
      
      return data || []
    } catch (error) {
      console.error('Error fetching plants:', error)
      return []
    }
  },

  // Get plant by ID with AI insights
  getPlant: async (id) => {
    try {
      const { data, error } = await db.plants.getById(id)
      if (error) throw error
      
      // Get AI insights for this plant
      const insights = await ai.getCareRecommendations(null, id)
      
      return { ...data, aiInsights: insights }
    } catch (error) {
      console.error('Error fetching plant:', error)
      return null
    }
  },

  // AI-powered plant search
  searchPlants: async (query, filters = {}) => {
    try {
      const { data, error } = await db.plants.search(query)
      if (error) throw error
      
      return data || []
    } catch (error) {
      console.error('Error searching plants:', error)
      return []
    }
  },

  // AI-powered plant recommendations
  getRecommendations: async (preferences) => {
    try {
      // Use AI to generate personalized recommendations
      const { data, error } = await supabase.functions.invoke('get-plant-recommendations', {
        body: preferences
      })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting recommendations:', error)
      return []
    }
  },

  // Get native plants for location with AI optimization
  getNativePlants: async (location) => {
    try {
      const { data, error } = await db.plants.getNative()
      if (error) throw error
      
      // Use AI to filter by location compatibility
      const { data: locationData } = await supabase.functions.invoke('filter-by-location', {
        body: { plants: data, location }
      })
      
      return locationData || data || []
    } catch (error) {
      console.error('Error fetching native plants:', error)
      return []
    }
  },

  // AI plant identification from image
  identifyPlant: async (imageFile) => {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      
      const { data, error } = await supabase.functions.invoke('identify-plant', {
        body: formData
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error identifying plant:', error)
      throw error
    }
  },

  // Add plant to user's garden with AI setup
  addToMyGarden: async (plantData) => {
    try {
      const { data, error } = await db.userPlants.add(plantData)
      if (error) throw error
      
      // Generate AI care schedule
      await ai.getCareRecommendations(plantData.user_id, plantData.plant_id)
      
      return data
    } catch (error) {
      console.error('Error adding plant to garden:', error)
      throw error
    }
  },

  // Remove plant from user's garden
  removeFromMyGarden: async (plantId) => {
    try {
      const { error } = await db.userPlants.delete(plantId)
      if (error) throw error
      return plantId
    } catch (error) {
      console.error('Error removing plant:', error)
      throw error
    }
  },

  // Update plant with AI analysis
  updatePlant: async (plantData) => {
    try {
      const { data, error } = await db.userPlants.update(plantData.id, plantData)
      if (error) throw error
      
      // Trigger AI analysis for health updates
      if (plantData.health_status) {
        await ai.analyzePlantHealth(plantData.image_url, plantData.id)
      }
      
      return data
    } catch (error) {
      console.error('Error updating plant:', error)
      throw error
    }
  },

  // Get user's plants with AI insights
  getMyPlants: async (userId) => {
    try {
      const { data, error } = await db.userPlants.getAll(userId)
      if (error) throw error
      
      // Enhance with AI insights
      const plantsWithInsights = await Promise.all(
        (data || []).map(async (plant) => {
          const insights = await ai.getCareRecommendations(userId, plant.plant_id)
          return { ...plant, aiInsights: insights }
        })
      )
      
      return plantsWithInsights
    } catch (error) {
      console.error('Error fetching user plants:', error)
      return []
    }
  },
}

// Enhanced AI Assistant API
export const aiAPI = {
  // Advanced chat with context awareness
  chat: async (message, context = {}) => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message, 
          context: {
            ...context,
            timestamp: new Date().toISOString(),
            sessionId: context.sessionId || crypto.randomUUID()
          }
        }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('AI chat error:', error)
      throw error
    }
  },

  // AI-powered plant care advice with predictive analytics
  getCareAdvice: async (plantId, issues = [], environmentData = {}) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-care-advice', {
        body: { 
          plantId, 
          issues, 
          environmentData,
          timestamp: new Date().toISOString()
        }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error getting care advice:', error)
      throw error
    }
  },

  // Advanced plant diagnosis with computer vision
  diagnosePlant: async (plantId, symptoms, images = [], sensorData = {}) => {
    try {
      const formData = new FormData()
      formData.append('plantId', plantId)
      formData.append('symptoms', JSON.stringify(symptoms))
      formData.append('sensorData', JSON.stringify(sensorData))
      
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image)
      })

      const { data, error } = await supabase.functions.invoke('diagnose-plant', {
        body: formData
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Plant diagnosis error:', error)
      throw error
    }
  },

  // AI garden planning with optimization
  getGardenPlan: async (preferences, constraints = {}) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-garden-plan', {
        body: { 
          preferences, 
          constraints,
          optimization: {
            biodiversity: true,
            waterEfficiency: true,
            seasonalInterest: true,
            maintenanceLevel: preferences.maintenanceLevel || 'medium'
          }
        }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Garden plan error:', error)
      throw error
    }
  },

  // Comprehensive garden analysis with predictive insights
  analyzeGarden: async (userId, includeForecasting = true) => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-garden', {
        body: { 
          userId,
          includeForecasting,
          analysisDepth: 'comprehensive',
          timeRange: '90d'
        }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Garden analysis error:', error)
      throw error
    }
  },

  // Real-time plant monitoring insights
  getPlantInsights: async (plantId, timeRange = '30d') => {
    try {
      const { data, error } = await supabase.functions.invoke('get-plant-insights', {
        body: { plantId, timeRange }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Plant insights error:', error)
      throw error
    }
  },

  // Predictive care scheduling
  generateCareSchedule: async (userId, preferences = {}) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-care-schedule', {
        body: { 
          userId, 
          preferences: {
            ...preferences,
            adaptToWeather: true,
            considerSeasons: true,
            optimizeForHealth: true
          }
        }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Care schedule error:', error)
      throw error
    }
  },
}

// Enhanced Community API with AI moderation
export const communityAPI = {
  // Get posts with AI-powered content filtering
  getPosts: async (filters = {}) => {
    try {
      const { data, error } = await db.posts.getAll()
      if (error) throw error
      
      return data || []
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  },

  // Get trending posts with AI analysis
  getTrendingPosts: async () => {
    try {
      const { data, error } = await db.posts.getTrending()
      if (error) throw error
      
      return data || []
    } catch (error) {
      console.error('Error fetching trending posts:', error)
      return []
    }
  },

  // Create post with AI content enhancement
  createPost: async (postData) => {
    try {
      // AI content moderation and enhancement
      const { data: enhancedData } = await supabase.functions.invoke('enhance-post', {
        body: postData
      })
      
      const { data, error } = await db.posts.create(enhancedData || postData)
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  },

  // AI-powered post recommendations
  getRecommendedPosts: async (userId) => {
    try {
      const { data, error } = await supabase.functions.invoke('recommend-posts', {
        body: { userId }
      })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting recommended posts:', error)
      return []
    }
  },
}

// Weather API with AI predictions
export const weatherAPI = {
  // Get current weather with plant-specific insights
  getCurrentWeather: async (location) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-weather', {
        body: { location, includeGardenInsights: true }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Weather error:', error)
      throw error
    }
  },

  // Get weather forecast with plant care recommendations
  getForecast: async (location, days = 7) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-weather-forecast', {
        body: { location, days, includePlantCare: true }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Forecast error:', error)
      throw error
    }
  },

  // Get garden-specific weather advice with AI
  getGardenWeatherAdvice: async (location, plants = []) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-garden-weather-advice', {
        body: { location, plants }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Garden weather advice error:', error)
      throw error
    }
  },
}

// Analytics API with AI insights
export const analyticsAPI = {
  // Get comprehensive garden analytics
  getGardenAnalytics: async (userId, timeRange = '30d') => {
    try {
      const { data, error } = await supabase.functions.invoke('get-garden-analytics', {
        body: { userId, timeRange, includeAI: true }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Analytics error:', error)
      throw error
    }
  },

  // Get plant growth predictions
  getGrowthPredictions: async (plantId, timeRange = '90d') => {
    try {
      const { data, error } = await ai.predictGrowth(plantId, { timeRange })
      return data
    } catch (error) {
      console.error('Growth prediction error:', error)
      throw error
    }
  },

  // Get care optimization insights
  getCareOptimization: async (userId) => {
    try {
      const { data, error } = await supabase.functions.invoke('optimize-care', {
        body: { userId }
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Care optimization error:', error)
      throw error
    }
  },
}

// Export all APIs
export default {
  plant: plantAPI,
  ai: aiAPI,
  community: communityAPI,
  weather: weatherAPI,
  analytics: analyticsAPI,
}