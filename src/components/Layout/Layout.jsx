import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import { useAuth } from '../../contexts/AuthContext'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <MobileNav 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        />

        {/* Page Content */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Layout