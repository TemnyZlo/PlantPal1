import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  User,
  Sun,
  Moon,
  Leaf,
  Sparkles
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import Button from '../UI/Button'
import Avatar from '../UI/Avatar'
import SearchBar from '../UI/SearchBar'
import NotificationDropdown from '../UI/NotificationDropdown'
import LanguageSelector from '../UI/LanguageSelector'
import AuthModal from '../Auth/AuthModal'
import { useTranslation } from 'react-i18next'

const Header = ({ onMenuClick, className = '' }) => {
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`glass border-b ${className}`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Logo for mobile */}
              <div className="flex items-center lg:hidden">
                <div className="relative">
                  <Leaf className="h-8 w-8 text-primary" />
                  <Sparkles className="h-3 w-3 text-accent-500 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <span className="ml-2 text-xl font-bold gradient-text">
                  PlantPal
                </span>
              </div>

              {/* Search bar - hidden on mobile */}
              <div className="hidden md:block">
                <SearchBar placeholder={t('plants.searchPlaceholder')} />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              {/* Search button for mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hidden sm:flex items-center"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-600" />
                )}
              </Button>

              {/* Notifications */}
              <NotificationDropdown />

              {/* Language Selector */}
              <LanguageSelector />

              {/* User menu */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={user.user_metadata?.avatar_url}
                    alt={user.user_metadata?.full_name || user.email}
                    size="sm"
                  />
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">
                      {user.user_metadata?.full_name || 'Plant Parent'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t('navigation.signOut')}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                  >
                    {t('navigation.signIn')}
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                  >
                    {t('navigation.signUp')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  )
}

export default Header