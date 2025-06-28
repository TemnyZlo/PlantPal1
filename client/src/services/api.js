import axios from 'axios'

const API_BASE_URL = '/api'

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Plant API methods
export const plantApi = {
  getAllPlants: () => httpClient.get('/plants').then(res => res.data),
  searchPlants: (query) => httpClient.get(`/plants/search?query=${encodeURIComponent(query)}`).then(res => res.data),
  getPlantRecommendations: (data) => httpClient.post('/plants/recommendations', data).then(res => res.data),
  getNativePlants: (location) => httpClient.post('/plants/native', location).then(res => res.data),
  getPlantById: (id) => httpClient.get(`/plants/${id}`).then(res => res.data)
}

// Community API methods
export const communityApi = {
  getRecentPosts: (count = 20) => httpClient.get(`/community/posts?count=${count}`).then(res => res.data),
  getPostById: (id) => httpClient.get(`/community/posts/${id}`).then(res => res.data),
  createPost: (post) => httpClient.post('/community/posts', post).then(res => res.data),
  likePost: (id) => httpClient.post(`/community/posts/${id}/like`).then(res => res.data),
  getUserPosts: (userId) => httpClient.get(`/community/users/${userId}/posts`).then(res => res.data)
}

// Gamification API methods
export const gamificationApi = {
  getAllBadges: () => httpClient.get('/gamification/badges').then(res => res.data),
  getUserBadges: (userId) => httpClient.get(`/gamification/users/${userId}/badges`).then(res => res.data),
  getEcoScore: (userId) => httpClient.get(`/gamification/users/${userId}/eco-score`).then(res => res.data),
  checkBadges: (userId) => httpClient.post(`/gamification/users/${userId}/check-badges`).then(res => res.data)
}

// Weather API methods
export const weatherApi = {
  getCurrentWeather: (location) => httpClient.post('/weather/current', location).then(res => res.data),
  getWeatherForecast: (location, days = 5) => httpClient.post('/weather/forecast', { ...location, days }).then(res => res.data)
}

// Combined API object for easier imports
export const api = {
  // Plants
  getAllPlants: plantApi.getAllPlants,
  searchPlants: plantApi.searchPlants,
  getPlantRecommendations: plantApi.getPlantRecommendations,
  getNativePlants: plantApi.getNativePlants,
  getPlantById: plantApi.getPlantById,
  
  // Community
  getRecentPosts: communityApi.getRecentPosts,
  getPostById: communityApi.getPostById,
  createPost: communityApi.createPost,
  likePost: communityApi.likePost,
  getUserPosts: communityApi.getUserPosts,
  
  // Gamification
  getAllBadges: gamificationApi.getAllBadges,
  getUserBadges: gamificationApi.getUserBadges,
  getEcoScore: gamificationApi.getEcoScore,
  checkBadges: gamificationApi.checkBadges,
  
  // Weather
  getCurrentWeather: weatherApi.getCurrentWeather,
  getWeatherForecast: weatherApi.getWeatherForecast
}

export default api