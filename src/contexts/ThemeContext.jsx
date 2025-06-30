import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({})

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('plantpal-theme')
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add the current theme class
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.add('light')
    }
    
    localStorage.setItem('plantpal-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setLightTheme = () => setTheme('light')
  const setDarkTheme = () => setTheme('dark')

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      // Only auto-switch if no manual preference is saved
      const savedTheme = localStorage.getItem('plantpal-theme')
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const value = {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}