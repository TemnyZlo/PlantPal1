import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  User, 
  Globe, 
  Moon, 
  Sun, 
  Zap,
  Brain,
  Eye,
  Sliders,
  Save,
  RefreshCw,
  Sparkles
} from 'lucide-react'
import Button from '../components/UI/Button'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const Settings = () => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('account')
  const [saving, setSaving] = useState(false)
  
  const [settings, setSettings] = useState({
    account: {
      name: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      bio: user?.user_metadata?.bio || '',
    },
    notifications: {
      careReminders: true,
      aiInsights: true,
      communityActivity: false,
      marketingEmails: false,
    },
    privacy: {
      shareGardenData: true,
      publicProfile: false,
      allowDataAnalysis: true,
      locationSharing: false,
    },
    ai: {
      enablePredictions: true,
      dataCollection: true,
      automatedCare: true,
      advancedAnalytics: true,
      personalizedRecommendations: true,
    },
    appearance: {
      theme: theme,
      compactMode: false,
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium',
    }
  })

  const handleChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleSave = () => {
    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      // Update theme if changed
      if (settings.appearance.theme !== theme) {
        toggleTheme()
      }
      
      setSaving(false)
    }, 1000)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in to access settings</h2>
          <p className="text-muted-foreground mb-6">Customize your PlantPal experience</p>
          <Button onClick={() => window.location.href = '/'}>Sign In</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-xl py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground text-lg">
            Customize your PlantPal experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card overflow-hidden">
              <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
                <h2 className="font-semibold">Settings Menu</h2>
              </div>
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center p-3 rounded-lg text-left mb-1 ${
                    activeTab === 'account' 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Account
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center p-3 rounded-lg text-left mb-1 ${
                    activeTab === 'notifications' 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center p-3 rounded-lg text-left mb-1 ${
                    activeTab === 'privacy' 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Lock className="h-5 w-5 mr-3" />
                  Privacy
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`w-full flex items-center p-3 rounded-lg text-left mb-1 ${
                    activeTab === 'ai' 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Brain className="h-5 w-5 mr-3" />
                  AI Settings
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`w-full flex items-center p-3 rounded-lg text-left mb-1 ${
                    activeTab === 'appearance' 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <SettingsIcon className="h-5 w-5 mr-3" />
                  Appearance
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">
                  {activeTab === 'account' && 'Account Settings'}
                  {activeTab === 'notifications' && 'Notification Preferences'}
                  {activeTab === 'privacy' && 'Privacy Settings'}
                  {activeTab === 'ai' && 'AI Configuration'}
                  {activeTab === 'appearance' && 'Appearance Settings'}
                </h2>
              </div>
              
              <div className="p-6">
                {/* Account Settings */}
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={settings.account.name}
                        onChange={(e) => handleChange('account', 'name', e.target.value)}
                        className="input w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.account.email}
                        onChange={(e) => handleChange('account', 'email', e.target.value)}
                        className="input w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Bio
                      </label>
                      <textarea
                        value={settings.account.bio}
                        onChange={(e) => handleChange('account', 'bio', e.target.value)}
                        rows="4"
                        className="input w-full"
                        placeholder="Tell us about yourself and your gardening experience..."
                      />
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button
                        onClick={handleSave}
                        loading={saving}
                        icon={<Save className="h-4 w-4" />}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Care Reminders</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications for watering, fertilizing, and other care tasks
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.careReminders}
                            onChange={(e) => handleChange('notifications', 'careReminders', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">AI Insights</h3>
                          <p className="text-sm text-muted-foreground">
                            Get notified about AI-generated insights and predictions
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.aiInsights}
                            onChange={(e) => handleChange('notifications', 'aiInsights', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Community Activity</h3>
                          <p className="text-sm text-muted-foreground">
                            Notifications about comments, likes, and mentions
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.communityActivity}
                            onChange={(e) => handleChange('notifications', 'communityActivity', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Marketing Emails</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about new features and promotions
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.marketingEmails}
                            onChange={(e) => handleChange('notifications', 'marketingEmails', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button
                        onClick={handleSave}
                        loading={saving}
                        icon={<Save className="h-4 w-4" />}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Share Garden Data</h3>
                          <p className="text-sm text-muted-foreground">
                            Allow anonymous sharing of your garden data to improve AI recommendations
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.shareGardenData}
                            onChange={(e) => handleChange('privacy', 'shareGardenData', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Public Profile</h3>
                          <p className="text-sm text-muted-foreground">
                            Make your profile and garden visible to other users
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.publicProfile}
                            onChange={(e) => handleChange('privacy', 'publicProfile', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Allow Data Analysis</h3>
                          <p className="text-sm text-muted-foreground">
                            Let our AI analyze your garden data to provide personalized insights
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.allowDataAnalysis}
                            onChange={(e) => handleChange('privacy', 'allowDataAnalysis', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Location Sharing</h3>
                          <p className="text-sm text-muted-foreground">
                            Share your location for climate-specific recommendations
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.locationSharing}
                            onChange={(e) => handleChange('privacy', 'locationSharing', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button
                        onClick={handleSave}
                        loading={saving}
                        icon={<Save className="h-4 w-4" />}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}

                {/* AI Settings */}
                {activeTab === 'ai' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl mb-4">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">AI Features</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Configure how our advanced AI interacts with your garden data to provide personalized insights and recommendations.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Enable AI Predictions</h3>
                          <p className="text-sm text-muted-foreground">
                            Allow AI to predict plant needs and growth patterns
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.ai.enablePredictions}
                            onChange={(e) => handleChange('ai', 'enablePredictions', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Data Collection</h3>
                          <p className="text-sm text-muted-foreground">
                            Collect plant data to improve AI model accuracy
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.ai.dataCollection}
                            onChange={(e) => handleChange('ai', 'dataCollection', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Automated Care</h3>
                          <p className="text-sm text-muted-foreground">
                            Allow AI to automatically adjust care schedules based on plant needs
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.ai.automatedCare}
                            onChange={(e) => handleChange('ai', 'automatedCare', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Advanced Analytics</h3>
                          <p className="text-sm text-muted-foreground">
                            Enable deep learning analysis of your garden performance
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.ai.advancedAnalytics}
                            onChange={(e) => handleChange('ai', 'advancedAnalytics', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Personalized Recommendations</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive AI-tailored plant and care recommendations
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.ai.personalizedRecommendations}
                            onChange={(e) => handleChange('ai', 'personalizedRecommendations', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex space-x-3">
                        <Button
                          onClick={handleSave}
                          loading={saving}
                          icon={<Save className="h-4 w-4" />}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          icon={<RefreshCw className="h-4 w-4" />}
                        >
                          Reset AI Model
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Theme
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleChange('appearance', 'theme', 'light')}
                          className={`p-4 rounded-xl border flex items-center justify-center ${
                            settings.appearance.theme === 'light' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-muted'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Sun className="h-6 w-6 mb-2" />
                            <span className="text-sm font-medium">Light</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleChange('appearance', 'theme', 'dark')}
                          className={`p-4 rounded-xl border flex items-center justify-center ${
                            settings.appearance.theme === 'dark' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-muted'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Moon className="h-6 w-6 mb-2" />
                            <span className="text-sm font-medium">Dark</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Font Size
                      </label>
                      <select
                        value={settings.appearance.fontSize}
                        onChange={(e) => handleChange('appearance', 'fontSize', e.target.value)}
                        className="input w-full"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Compact Mode</h3>
                          <p className="text-sm text-muted-foreground">
                            Display more content with reduced spacing
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.appearance.compactMode}
                            onChange={(e) => handleChange('appearance', 'compactMode', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">High Contrast</h3>
                          <p className="text-sm text-muted-foreground">
                            Increase contrast for better readability
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.appearance.highContrast}
                            onChange={(e) => handleChange('appearance', 'highContrast', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Reduced Motion</h3>
                          <p className="text-sm text-muted-foreground">
                            Minimize animations and transitions
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.appearance.reducedMotion}
                            onChange={(e) => handleChange('appearance', 'reducedMotion', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button
                        onClick={handleSave}
                        loading={saving}
                        icon={<Save className="h-4 w-4" />}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Settings