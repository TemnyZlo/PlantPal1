import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './contexts/ThemeContext'
import { PlantProvider } from './contexts/PlantContext'
import { AuthProvider } from './contexts/AuthContext'

// Lazy load pages for optimal performance
const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Plants = lazy(() => import('./pages/Plants'))
const PlantDetails = lazy(() => import('./pages/PlantDetails'))
const AIAssistant = lazy(() => import('./pages/AIAssistant'))
const Community = lazy(() => import('./pages/Community'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Settings = lazy(() => import('./pages/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <PlantProvider>
            <Layout>
              <AnimatePresence mode="wait">
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <LoadingSpinner size="lg" />
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/plants" element={<Plants />} />
                    <Route path="/plants/:id" element={<PlantDetails />} />
                    <Route path="/ai-assistant" element={<AIAssistant />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </Layout>
          </PlantProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App