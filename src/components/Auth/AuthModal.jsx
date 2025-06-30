import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Leaf, Sparkles } from 'lucide-react'
import Button from '../UI/Button'
import { useAuth } from '../../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

const AuthModal = ({ isOpen, onClose }) => {
  const { signIn, signUp, loading } = useAuth()
  const { t } = useTranslation()
  const [mode, setMode] = useState('signin') // 'signin' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  })

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.email || !formData.password) {
      return
    }
    
    if (mode === 'signup' && !formData.fullName) {
      return
    }
    
    try {
      if (mode === 'signin') {
        const { error } = await signIn(formData.email, formData.password)
        if (!error) {
          onClose()
          setFormData({ email: '', password: '', fullName: '' })
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName
        })
        if (!error) {
          onClose()
          setFormData({ email: '', password: '', fullName: '' })
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
    }
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setFormData({ email: '', password: '', fullName: '' })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="card max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <Leaf className="h-8 w-8 text-primary" />
                  <Sparkles className="h-3 w-3 text-accent absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {mode === 'signin' ? t('auth.welcomeBack') : t('auth.joinPlantPal')}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {mode === 'signin' 
                      ? t('auth.signInSubtitle')
                      : t('auth.signUpSubtitle')
                    }
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Demo Notice */}
            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium text-primary">{t('auth.demoMode')}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('auth.demoDescription')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('auth.fullName')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="input pl-10 w-full"
                      placeholder={t('auth.enterFullName')}
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('auth.emailAddress')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder={t('auth.enterEmail')}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder={t('auth.enterPassword')}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                {mode === 'signin' ? t('auth.signIn') : t('auth.createAccount')}
              </Button>
            </form>

            {/* Switch Mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {mode === 'signin' 
                  ? t('auth.noAccount') + ' '
                  : t('auth.hasAccount') + ' '
                }
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {mode === 'signin' ? t('auth.signUp') : t('auth.signIn')}
                </button>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 bg-muted/20 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                {t('auth.demoCredentials')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default AuthModal