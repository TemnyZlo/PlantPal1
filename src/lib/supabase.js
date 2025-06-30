import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo_anon_key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Mock authentication for demo purposes
export const mockAuth = {
  signUp: async (email, password, userData = {}) => {
    console.log('Mock signUp called with:', { email, userData })
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (!email || !password) {
      throw new Error('Email and password are required')
    }
    
    const user = {
      id: crypto.randomUUID(),
      email,
      user_metadata: {
        full_name: userData.full_name || email.split('@')[0],
        avatar_url: userData.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        ...userData
      },
      created_at: new Date().toISOString()
    }
    
    console.log('Created user:', user)
    
    // Store in localStorage for demo
    localStorage.setItem('plantpal_user', JSON.stringify(user))
    localStorage.setItem('plantpal_session', JSON.stringify({
      access_token: 'demo_token',
      user
    }))
    
    console.log('Stored in localStorage')
    
    return { data: { user }, error: null }
  },
  
  signIn: async (email, password) => {
    console.log('Mock signIn called with:', { email })
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (!email || !password) {
      throw new Error('Email and password are required')
    }
    
    const user = {
      id: crypto.randomUUID(),
      email,
      user_metadata: {
        full_name: email.split('@')[0],
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      },
      created_at: new Date().toISOString()
    }
    
    console.log('Created user for sign in:', user)
    
    // Store in localStorage for demo
    localStorage.setItem('plantpal_user', JSON.stringify(user))
    localStorage.setItem('plantpal_session', JSON.stringify({
      access_token: 'demo_token',
      user
    }))
    
    console.log('Stored in localStorage for sign in')
    
    return { data: { user }, error: null }
  },
  
  signOut: async () => {
    console.log('Mock signOut called')
    localStorage.removeItem('plantpal_user')
    localStorage.removeItem('plantpal_session')
    return { error: null }
  },
  
  getSession: () => {
    const session = localStorage.getItem('plantpal_session')
    console.log('Getting session from localStorage:', session)
    return session ? JSON.parse(session) : null
  },
  
  getUser: () => {
    const user = localStorage.getItem('plantpal_user')
    console.log('Getting user from localStorage:', user)
    return user ? JSON.parse(user) : null
  }
}
// Database helpers with enhanced error handling
export const db = {
  // Plants
  plants: {
    getAll: () => supabase.from('plants').select('*'),
    getById: (id) => supabase.from('plants').select('*').eq('id', id).single(),
    search: (query) => supabase.from('plants').select('*').textSearch('name', query),
    getByCategory: (category) => supabase.from('plants').select('*').eq('category', category),
    getNative: () => supabase.from('plants').select('*').eq('is_native', true),
  },

  // User plants with AI insights
  userPlants: {
    getAll: (userId) => supabase.from('user_plants').select('*, plants(*)').eq('user_id', userId),
    add: (data) => supabase.from('user_plants').insert(data),
    update: (id, data) => supabase.from('user_plants').update(data).eq('id', id),
    delete: (id) => supabase.from('user_plants').delete().eq('id', id),
    getHealthStatus: (userId) => supabase.rpc('get_plant_health_summary', { user_id: userId }),
  },

  // Community with enhanced features
  posts: {
    getAll: () => supabase.from('community_posts').select('*, profiles(username, avatar_url)').order('created_at', { ascending: false }),
    getById: (id) => supabase.from('community_posts').select('*, profiles(username, avatar_url)').eq('id', id).single(),
    create: (data) => supabase.from('community_posts').insert(data),
    update: (id, data) => supabase.from('community_posts').update(data).eq('id', id),
    delete: (id) => supabase.from('community_posts').delete().eq('id', id),
    like: (id) => supabase.rpc('increment_post_likes', { post_id: id }),
    getTrending: () => supabase.from('community_posts').select('*, profiles(username, avatar_url)').order('likes', { ascending: false }).limit(10),
  },

  // User profiles with AI preferences
  profiles: {
    get: (userId) => supabase.from('profiles').select('*').eq('id', userId).single(),
    update: (userId, data) => supabase.from('profiles').update(data).eq('id', userId),
    create: (data) => supabase.from('profiles').insert(data),
    updateAIPreferences: (userId, preferences) => supabase.from('profiles').update({ ai_preferences: preferences }).eq('id', userId),
  },

  // AI-powered care logs
  careLogs: {
    getAll: (userId) => supabase.from('care_logs').select('*, user_plants(*, plants(*))').eq('user_id', userId),
    add: (data) => supabase.from('care_logs').insert(data),
    update: (id, data) => supabase.from('care_logs').update(data).eq('id', id),
    delete: (id) => supabase.from('care_logs').delete().eq('id', id),
    getInsights: (userId) => supabase.rpc('get_care_insights', { user_id: userId }),
  },

  // Smart reminders
  reminders: {
    getAll: (userId) => supabase.from('reminders').select('*, user_plants(*, plants(*))').eq('user_id', userId),
    add: (data) => supabase.from('reminders').insert(data),
    update: (id, data) => supabase.from('reminders').update(data).eq('id', id),
    delete: (id) => supabase.from('reminders').delete().eq('id', id),
    getUpcoming: (userId) => supabase.from('reminders').select('*, user_plants(*, plants(*))').eq('user_id', userId).gte('next_due', new Date().toISOString()).order('next_due'),
  },

  // AI insights and analytics
  aiInsights: {
    getAll: (userId) => supabase.from('ai_insights').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    add: (data) => supabase.from('ai_insights').insert(data),
    getByType: (userId, type) => supabase.from('ai_insights').select('*').eq('user_id', userId).eq('type', type),
  },
}

// Real-time subscriptions with enhanced features
export const subscriptions = {
  // Subscribe to user's plants changes
  userPlants: (userId, callback) => {
    return supabase
      .channel('user_plants_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'user_plants',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe()
  },

  // Subscribe to community posts
  communityPosts: (callback) => {
    return supabase
      .channel('community_posts_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'community_posts'
        }, 
        callback
      )
      .subscribe()
  },

  // Subscribe to AI insights
  aiInsights: (userId, callback) => {
    return supabase
      .channel('ai_insights_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'ai_insights',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe()
  },

  // Subscribe to care reminders
  reminders: (userId, callback) => {
    return supabase
      .channel('reminders_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'reminders',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe()
  },
}

// Enhanced storage helpers
export const storage = {
  // Upload plant images with AI analysis
  uploadPlantImage: async (file, path, options = {}) => {
    const { data, error } = await supabase.storage
      .from('plant-images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: options.upsert || false
      })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('plant-images')
      .getPublicUrl(path)
    
    return publicUrl
  },

  // Upload user avatars
  uploadAvatar: async (file, userId) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)
    
    return publicUrl
  },

  // Upload AI analysis results
  uploadAnalysisData: async (data, path) => {
    const { data: uploadData, error } = await supabase.storage
      .from('ai-analysis')
      .upload(path, JSON.stringify(data), {
        contentType: 'application/json'
      })
    
    if (error) throw error
    return uploadData
  },

  // Delete file
  deleteFile: async (bucket, path) => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])
    
    if (error) throw error
  },
}

// AI-powered functions
export const ai = {
  // Analyze plant health from image
  analyzePlantHealth: async (imageUrl, plantId) => {
    const { data, error } = await supabase.functions.invoke('analyze-plant-health', {
      body: { imageUrl, plantId }
    })
    
    if (error) throw error
    return data
  },

  // Get personalized care recommendations
  getCareRecommendations: async (userId, plantId) => {
    const { data, error } = await supabase.functions.invoke('get-care-recommendations', {
      body: { userId, plantId }
    })
    
    if (error) throw error
    return data
  },

  // Predict plant growth
  predictGrowth: async (plantId, conditions) => {
    const { data, error } = await supabase.functions.invoke('predict-growth', {
      body: { plantId, conditions }
    })
    
    if (error) throw error
    return data
  },

  // Generate garden layout suggestions
  suggestLayout: async (userId, gardenData) => {
    const { data, error } = await supabase.functions.invoke('suggest-layout', {
      body: { userId, gardenData }
    })
    
    if (error) throw error
    return data
  },
}