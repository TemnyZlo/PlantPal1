import React, { useState } from 'react'
import { Bell, Sprout, Users, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications] = useState([
    {
      id: 1,
      title: 'AI Care Reminder',
      message: 'Your Monstera needs water based on soil moisture analysis',
      time: '2 minutes ago',
      read: false,
      type: 'care',
      icon: Sprout
    },
    {
      id: 2,
      title: 'Community Update',
      message: 'PlantLover shared a new success story in your area',
      time: '1 hour ago',
      read: false,
      type: 'community',
      icon: Users
    },
    {
      id: 3,
      title: 'AI Insight',
      message: 'New plant disease detected in your region - preventive tips available',
      time: '3 hours ago',
      read: true,
      type: 'ai',
      icon: Zap
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
          >
            {unreadCount}
          </motion.span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 card p-0 z-20 overflow-hidden"
            >
              <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
                <h3 className="text-lg font-semibold">
                  Notifications
                </h3>
                <p className="text-sm text-muted-foreground">
                  {unreadCount} unread updates
                </p>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 border-b border-border hover:bg-accent/50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'care' ? 'bg-green-100 text-green-600' :
                          notification.type === 'community' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <notification.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No notifications</p>
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-4 border-t bg-muted/20">
                  <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium">
                    Mark all as read
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationDropdown