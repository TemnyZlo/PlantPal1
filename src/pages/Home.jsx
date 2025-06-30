import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Leaf, 
  Users, 
  Bot, 
  TrendingUp,
  Camera,
  Calendar,
  Heart,
  Star,
  Sparkles,
  Zap,
  Brain,
  Eye,
  Shield
} from 'lucide-react'
import Button from '../components/UI/Button'
import { useAuth } from '../contexts/AuthContext'
import { usePlant } from '../contexts/PlantContext'
import AuthModal from '../components/Auth/AuthModal'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { user } = useAuth()
  const { plantsCount, favoritesCount } = usePlant()
  const { t } = useTranslation()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const features = [
    {
      icon: Brain,
      title: t('home.features.aiIntelligence.title'),
      description: t('home.features.aiIntelligence.description'),
      color: 'from-blue-500 to-purple-600',
      badge: 'AI-Powered'
    },
    {
      icon: Eye,
      title: t('home.features.computerVision.title'),
      description: t('home.features.computerVision.description'),
      color: 'from-green-500 to-emerald-600',
      badge: 'Vision AI'
    },
    {
      icon: Zap,
      title: t('home.features.predictiveCare.title'),
      description: t('home.features.predictiveCare.description'),
      color: 'from-orange-500 to-red-600',
      badge: 'Predictive'
    },
    {
      icon: Shield,
      title: t('home.features.automatedMonitoring.title'),
      description: t('home.features.automatedMonitoring.description'),
      color: 'from-pink-500 to-rose-600',
      badge: 'Automated'
    },
  ]

  const stats = [
    { label: t('home.stats.aiModels'), value: '50+', icon: Brain },
    { label: t('home.stats.plantsAnalyzed'), value: '1M+', icon: Leaf },
    { label: t('home.stats.successRate'), value: '98.5%', icon: TrendingUp },
    { label: t('home.stats.happyGardeners'), value: '100K+', icon: Heart },
  ]

  const aiCapabilities = [
    {
      title: t('home.capabilities.plantDiagnosis.title'),
      description: t('home.capabilities.plantDiagnosis.description'),
      icon: Eye,
      demo: t('home.capabilities.plantDiagnosis.demo')
    },
    {
      title: t('home.capabilities.predictiveAlerts.title'),
      description: t('home.capabilities.predictiveAlerts.description'),
      icon: Zap,
      demo: t('home.capabilities.predictiveAlerts.demo')
    },
    {
      title: t('home.capabilities.gardenPlanning.title'),
      description: t('home.capabilities.gardenPlanning.description'),
      icon: Brain,
      demo: t('home.capabilities.gardenPlanning.demo')
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-mesh-gradient opacity-5 animate-gradient"></div>
        
        <div className="relative container-xl py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center px-6 py-3 glass rounded-full text-primary mb-8"
            >
              <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
              <span className="font-medium">{t('home.subtitle')}</span>
              <div className="ml-3 px-2 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full">
                V3.0
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
              <span className="gradient-text">{t('home.title')}</span>
              <br />
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              {user ? (
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="group text-lg px-8 py-4 shadow-glow hover:shadow-glow-lg"
                    icon={<ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                    iconPosition="right"
                  >
                    Go to Dashboard
                    {t('home.experienceAI')}
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="group text-lg px-8 py-4 shadow-glow hover:shadow-glow-lg"
                  icon={<ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                  iconPosition="right"
                  onClick={() => setShowAuthModal(true)}
                >
                  Experience AI Magic
                </Button>
              )}
              
              <Link to="/ai-assistant">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                  icon={<Camera className="h-5 w-5" />}
                >
                  {t('home.tryScanner')}
                </Button>
              </Link>
            </div>

            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass p-8 rounded-2xl max-w-md mx-auto"
              >
                <h3 className="text-xl font-semibold mb-6">
                  {t('home.welcomeBack', { name: user.user_metadata?.full_name || 'Plant Parent' })} 🌱
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{plantsCount}</div>
                    <div className="text-sm text-muted-foreground">{t('home.totalPlants')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{favoritesCount}</div>
                    <div className="text-sm text-muted-foreground">{t('home.favorites')}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Floating AI elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl opacity-60 blur-sm"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full opacity-40 blur-sm"
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/20">
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-20">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <Brain className="h-4 w-4 mr-2" />
              {t('home.capabilities.title')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('home.capabilities.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.capabilities.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group card card-hover p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <capability.icon className="h-10 w-10 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">
                  {capability.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {capability.description}
                </p>

                <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {capability.demo}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('home.features.aiIntelligence.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.features.aiIntelligence.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group card card-hover p-8 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full">
                    {feature.badge}
                  </div>
                </div>

                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10"></div>
        <div className="relative container-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {user ? (
                <Link to="/plants">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 shadow-glow hover:shadow-glow-lg"
                    icon={<Leaf className="h-5 w-5" />}
                  >
                    {t('home.cta.startGarden')}
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 shadow-glow hover:shadow-glow-lg"
                  icon={<Leaf className="h-5 w-5" />}
                  onClick={() => setShowAuthModal(true)}
                >
                  {t('home.cta.startGarden')}
                </Button>
              )}
              
              <Link to="/community">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                  icon={<Users className="h-5 w-5" />}
                >
                  {t('home.cta.joinCommunity')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  )
}

export default Home