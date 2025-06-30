import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { plantAPI } from '../services/api'
import toast from 'react-hot-toast'

const PlantContext = createContext({})

export const usePlant = () => {
  const context = useContext(PlantContext)
  if (!context) {
    throw new Error('usePlant must be used within a PlantProvider')
  }
  return context
}

// Plant state management with Zustand-like reducer
const initialState = {
  myPlants: [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      status: 'healthy',
      lastWatered: '2023-12-10',
      nextWatering: '2023-12-15'
    },
    {
      id: 2,
      name: 'Snake Plant',
      status: 'healthy',
      lastWatered: '2023-12-05',
      nextWatering: '2023-12-20'
    },
    {
      id: 3,
      name: 'Peace Lily',
      status: 'needs_attention',
      lastWatered: '2023-12-08',
      nextWatering: '2023-12-14'
    }
  ],
  favorites: [1, 2],
  recentlyViewed: [],
  searchHistory: [],
  filters: {
    category: 'all',
    difficulty: 'all',
    sunlight: 'all',
    watering: 'all',
    native: false,
  },
  sortBy: 'name',
  viewMode: 'grid', // grid, list
  aiInsights: [],
}

const plantReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MY_PLANTS':
      return { ...state, myPlants: action.payload }
    
    case 'ADD_PLANT':
      return { 
        ...state, 
        myPlants: [...state.myPlants, action.payload] 
      }
    
    case 'REMOVE_PLANT':
      return {
        ...state,
        myPlants: state.myPlants.filter(plant => plant.id !== action.payload)
      }
    
    case 'UPDATE_PLANT':
      return {
        ...state,
        myPlants: state.myPlants.map(plant =>
          plant.id === action.payload.id ? { ...plant, ...action.payload.updates } : plant
        )
      }
    
    case 'TOGGLE_FAVORITE':
      const plantId = action.payload
      const isFavorite = state.favorites.includes(plantId)
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== plantId)
          : [...state.favorites, plantId]
      }
    
    case 'ADD_TO_RECENTLY_VIEWED':
      const recentlyViewed = [
        action.payload,
        ...state.recentlyViewed.filter(id => id !== action.payload)
      ].slice(0, 10) // Keep only last 10
      return { ...state, recentlyViewed }
    
    case 'ADD_TO_SEARCH_HISTORY':
      const searchHistory = [
        action.payload,
        ...state.searchHistory.filter(term => term !== action.payload)
      ].slice(0, 5) // Keep only last 5
      return { ...state, searchHistory }
    
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      }
    
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload }
    
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload }
    
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters }
    
    case 'ADD_AI_INSIGHT':
      return {
        ...state,
        aiInsights: [action.payload, ...state.aiInsights.slice(0, 9)] // Keep last 10
      }
    
    default:
      return state
  }
}

export const PlantProvider = ({ children }) => {
  const [state, dispatch] = useReducer(plantReducer, initialState)
  const queryClient = useQueryClient()

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('plantpal-plant-state')
    if (savedState) {
      const parsed = JSON.parse(savedState)
      dispatch({ type: 'SET_MY_PLANTS', payload: parsed.myPlants || [] })
      if (parsed.favorites) {
        parsed.favorites.forEach(id => {
          dispatch({ type: 'TOGGLE_FAVORITE', payload: id })
        })
      }
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    const stateToSave = {
      myPlants: state.myPlants,
      favorites: state.favorites,
      recentlyViewed: state.recentlyViewed,
      searchHistory: state.searchHistory,
      aiInsights: state.aiInsights,
    }
    localStorage.setItem('plantpal-plant-state', JSON.stringify(stateToSave))
  }, [state.myPlants, state.favorites, state.recentlyViewed, state.searchHistory, state.aiInsights])

  // Mutations with optimistic updates
  const addPlantMutation = useMutation({
    mutationFn: plantAPI.addToMyGarden,
    onMutate: async (newPlant) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['myPlants'])
      
      // Snapshot previous value
      const previousPlants = queryClient.getQueryData(['myPlants'])
      
      // Optimistically update
      dispatch({ type: 'ADD_PLANT', payload: newPlant })
      
      return { previousPlants }
    },
    onError: (err, newPlant, context) => {
      // Rollback on error
      if (context?.previousPlants) {
        dispatch({ type: 'SET_MY_PLANTS', payload: context.previousPlants })
      }
      toast.error('Failed to add plant to garden')
    },
    onSuccess: () => {
      toast.success('Plant added to your garden! 🌱')
      queryClient.invalidateQueries(['myPlants'])
    }
  })

  const removePlantMutation = useMutation({
    mutationFn: plantAPI.removeFromMyGarden,
    onMutate: async (plantId) => {
      await queryClient.cancelQueries(['myPlants'])
      const previousPlants = queryClient.getQueryData(['myPlants'])
      dispatch({ type: 'REMOVE_PLANT', payload: plantId })
      return { previousPlants }
    },
    onError: (err, plantId, context) => {
      if (context?.previousPlants) {
        dispatch({ type: 'SET_MY_PLANTS', payload: context.previousPlants })
      }
      toast.error('Failed to remove plant')
    },
    onSuccess: () => {
      toast.success('Plant removed from garden')
      queryClient.invalidateQueries(['myPlants'])
    }
  })

  const updatePlantMutation = useMutation({
    mutationFn: plantAPI.updatePlant,
    onSuccess: (data) => {
      dispatch({ type: 'UPDATE_PLANT', payload: { id: data.id, updates: data } })
      toast.success('Plant updated! ✨')
      queryClient.invalidateQueries(['myPlants'])
    },
    onError: () => {
      toast.error('Failed to update plant')
    }
  })

  // Actions
  const addPlant = (plant) => {
    addPlantMutation.mutate(plant)
  }

  const removePlant = (plantId) => {
    removePlantMutation.mutate(plantId)
  }

  const updatePlant = (plantId, updates) => {
    updatePlantMutation.mutate({ id: plantId, ...updates })
  }

  const toggleFavorite = (plantId) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: plantId })
    const isFavorite = state.favorites.includes(plantId)
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites! ❤️')
  }

  const addToRecentlyViewed = (plantId) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: plantId })
  }

  const addToSearchHistory = (searchTerm) => {
    if (searchTerm.trim()) {
      dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: searchTerm.trim() })
    }
  }

  const updateFilters = (filters) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: filters })
  }

  const setSortBy = (sortBy) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy })
  }

  const setViewMode = (viewMode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: viewMode })
  }

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }

  const addAIInsight = (insight) => {
    dispatch({ type: 'ADD_AI_INSIGHT', payload: insight })
  }

  const value = {
    // State
    ...state,
    
    // Loading states
    isAddingPlant: addPlantMutation.isPending,
    isRemovingPlant: removePlantMutation.isPending,
    isUpdatingPlant: updatePlantMutation.isPending,
    
    // Actions
    addPlant,
    removePlant,
    updatePlant,
    toggleFavorite,
    addToRecentlyViewed,
    addToSearchHistory,
    updateFilters,
    setSortBy,
    setViewMode,
    resetFilters,
    addAIInsight,
    
    // Computed values
    favoritePlants: state.myPlants.filter(plant => state.favorites.includes(plant.id)),
    plantsCount: state.myPlants.length,
    favoritesCount: state.favorites.length,
    healthyPlantsCount: state.myPlants.filter(plant => plant.status === 'healthy').length,
    needsAttentionCount: state.myPlants.filter(plant => plant.status === 'needs_attention').length,
  }

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  )
}