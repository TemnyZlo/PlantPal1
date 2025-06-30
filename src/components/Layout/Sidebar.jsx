import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  BarChart3,
  Sprout,
  Users,
  Bot,
  User,
  Settings,
  Leaf,
  Sparkles,
  Heart,
  TrendingUp,
  Zap
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { usePlant } from '../../contexts/PlantContext'
import Button from '../UI/Button'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const { plantsCount, favoritesCount } = usePlant()
  const { t } = useTranslation()

  const navigation = [
    { name: t('navigation.home'), href: '/', icon: Home },
    { name: t('navigation.dashboard'), href: '/dashboard', icon: BarChart3 },
    { name: t('navigation.plants'), href: '/plants', icon: Sprout },
    { name: t('navigation.aiAssistant'), href: '/ai-assistant', icon: Bot },
    { name: t('navigation.community'), href: '/community', icon: Users },
    { name: t('navigation.analytics'), href: '/analytics', icon: TrendingUp },
  ]

  const secondaryNavigation = [
    { name: t('navigation.settings'), href: '/settings', icon: Settings },
  ]

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="flex flex-col h-full glass border-r">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b">
        <div className="relative">
          <Leaf className="h-8 w-8 text-primary" />
          <Sparkles className="h-3 w-3 text-accent-500 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <span className="ml-3 text-xl font-bold gradient-text">
          PlantPal
        </span>
        <div className="ml-2 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
          V3
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${active
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 transition-colors duration-200
                    ${active
                      ? 'text-primary'
                      : 'text-muted-foreground group-hover:text-accent-foreground'
                    }
                  `}
                />
                {item.name}
                
                {/* Show counts for relevant items */}
                {item.href === '/plants' && plantsCount > 0 && (
                  <span className="ml-auto bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                    {plantsCount}
                  </span>
                )}
                
                {/* AI indicator */}
                {item.href === '/ai-assistant' && (
                  <Zap className="ml-auto h-3 w-3 text-accent-500 animate-pulse" />
                )}
              </NavLink>
            )
          })}
        </div>

        {/* Quick Stats */}
        {user && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t('dashboard.stats.totalPlants')}
            </h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Sprout className="h-4 w-4 mr-2" />
                  {t('navigation.plants')}
                </span>
                <span className="font-medium text-foreground">{plantsCount}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  {t('home.favorites')}
                </span>
                <span className="font-medium text-foreground">{favoritesCount}</span>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Navigation */}
        <div className="mt-8 pt-6 border-t">
          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const active = isActive(item.href)
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${active
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 h-5 w-5 transition-colors duration-200
                      ${active
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-accent-foreground'
                      }
                    `}
                  />
                  {item.name}
                </NavLink>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User section */}
      {user && (
        <div className="p-4 border-t">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.user_metadata?.full_name || 'Plant Parent'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="w-full justify-start text-muted-foreground"
          >
            {t('navigation.signOut')}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Sidebar