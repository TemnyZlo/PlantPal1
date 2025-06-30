import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, mockAuth } from '../lib/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Check for existing session in localStorage (demo mode)
    const existingSession = mockAuth.getSession()
    const existingUser = mockAuth.getUser()
    
    if (existingSession && existingUser) {
      setSession(existingSession)
      setUser(existingUser)
    }
    
    setLoading(false)
  }, [])

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true)
      const { data, error } = await mockAuth.signUp(email, password, userData)

      if (error) throw error

      setUser(data.user)
      setSession({ user: data.user, access_token: 'demo_token' })
      toast.success('Welcome to PlantPal! 🌱')
      return { data, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error(error.message || 'Failed to create account')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      const { data, error } = await mockAuth.signIn(email, password)

      if (error) throw error

      setUser(data.user)
      setSession({ user: data.user, access_token: 'demo_token' })
      toast.success('Welcome back! 🌿')
      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error(error.message || 'Failed to sign in')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
       
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      const { error } = await mockAuth.signOut()
      if (error) throw error
      
      setUser(data.user)
      setSession({ user: data.user, access_token: 'demo_token' })
      setUser(null)
      setSession(null)
      toast.success('See you later! 👋')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email) => {
    try {
      // Mock password reset
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Password reset email sent! 📧')
      return { error: null }
    } catch (error) {
      toast.error(error.message)
      return { error }
    }
  }

  const updateProfile = async (updates) => {
    try {
      setLoading(true)
      // Mock profile update
      const updatedUser = { ...user, user_metadata: { ...user.user_metadata, ...updates } }
      setUser(updatedUser)
      localStorage.setItem('plantpal_user', JSON.stringify(updatedUser))

      toast.success('Profile updated! ✨')
      return { error: null }
    } catch (error) {
      toast.error(error.message)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}