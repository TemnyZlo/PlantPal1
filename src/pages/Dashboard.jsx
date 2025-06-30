import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Sprout, 
  Heart, 
  Zap, 
  Brain,
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { usePlant } from '../contexts/PlantContext'
import Button from '../components/UI/Button'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Dashboard = () => {
  const { user } = useAuth()
  const { plantsCount, favoritesCount, healthyPlantsCount, needsAttentionCount } = usePlant()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in to view your dashboard</h2>
          <p className="text-muted-foreground mb-6">Track your AI-powered plant care journey</p>
          <Button onClick={() => window.location.href = '/'}>Sign In</Button>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Total Plants',
      value: plantsCount,
      icon: Sprout,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+2 this week'
    },
    {
      title: 'Healthy Plants',
      value: healthyPlantsCount,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      change: '98% health rate'
    },
    {
      title: 'Need Attention',
      value: needsAttentionCount,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: 'AI monitoring'
    },
    {
      title: 'Favorites',
      value: favoritesCount,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: 'Curated collection'
    }
  ]

  const aiInsights = [
    {
      type: 'prediction',
      title: 'Watering Prediction',
      message: 'Your Monstera will need water in 2 days based on soil moisture analysis',
      icon: Brain,
      priority: 'medium',
      time: '2 hours ago'
    },
    {
      type: 'health',
      title: 'Health Alert',
      message: 'Early signs of nutrient deficiency detected in your Peace Lily',
      icon: Eye,
      priority: 'high',
      time: '4 hours ago'
    },
    {
      type: 'optimization',
      title: 'Care Optimization',
      message: 'Adjusting fertilizer schedule based on growth patterns',
      icon: Zap,
      priority: 'low',
      time: '1 day ago'
    }
  ]

  const upcomingTasks = [
    {
      plant: 'Monstera Deliciosa',
      task: 'Water',
      due: 'Tomorrow',
      priority: 'high'
    },
    {
      plant: 'Snake Plant',
      task: 'Fertilize',
      due: 'In 3 days',
      priority: 'medium'
    },
    {
      plant: 'Peace Lily',
      task: 'Prune',
      due: 'Next week',
      priority: 'low'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container-xl py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                AI Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Welcome back, {user.user_metadata?.full_name || 'Plant Parent'}! 
                Your AI assistant has been monitoring your garden.
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                AI Active
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-hover p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.change}</div>
                </div>
              </div>
              <h3 className="font-semibold text-foreground">{stat.title}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Brain className="h-6 w-6 text-primary mr-2" />
                AI Insights
              </h2>
              <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                Real-time
              </div>
            </div>

            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-4 rounded-xl border-l-4 ${
                    insight.priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-950/20' :
                    insight.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' :
                    'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                
                      insight.priority === 'high' ? 'bg-red-100 text-red-600' :
                      insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <insight.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <span className="text-xs text-muted-foreground">{insight.time}</span>
                      </div>
                      <p className="text-sm mt-1">{insight.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All AI Insights
              </Button>
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Calendar className="h-6 w-6 text-primary mr-2" />
                AI Care Schedule
              </h2>
              <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                Auto-optimized
              </div>
            </div>

            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-muted/20 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      task.priority === 'high' ? 'bg-red-100 text-red-600' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {task.task === 'Water' ? <Sprout className="h-5 w-5" /> :
                       task.task === 'Fertilize' ? <Zap className="h-5 w-5" /> :
                       <Clock className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">{task.plant}</h3>
                      <p className="text-sm text-muted-foreground">{task.task} • {task.due}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    Complete
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View Full Schedule
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Growth Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-6 mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <TrendingUp className="h-6 w-6 text-primary mr-2" />
              AI Growth Analytics
            </h2>
            <div className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
              +15% Growth Rate
            </div>
          </div>

          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-muted-foreground">
                Loading AI-powered growth analytics...
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard