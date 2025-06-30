import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Droplets, 
  Sun, 
  Thermometer, 
  Leaf,
  Brain,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react'
import Button from '../components/UI/Button'
import { useAuth } from '../contexts/AuthContext'

const Analytics = () => {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState('month')
  const [loading, setLoading] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in to view analytics</h2>
          <p className="text-muted-foreground mb-6">Track your garden's performance with AI-powered insights</p>
          <Button onClick={() => window.location.href = '/'}>Sign In</Button>
        </div>
      </div>
    )
  }

  const metrics = [
    {
      title: 'Plant Health Score',
      value: '92%',
      change: '+5%',
      trend: 'up',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Growth Rate',
      value: '1.8x',
      change: '+0.3x',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Care Efficiency',
      value: '87%',
      change: '+12%',
      trend: 'up',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      title: 'Resource Usage',
      value: '28%',
      change: '-8%',
      trend: 'down',
      icon: Droplets,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/20'
    }
  ]

  const aiInsights = [
    {
      title: 'Optimal Watering Pattern',
      description: 'AI analysis shows your Snake Plant thrives with 30% less water than typical care guides suggest.',
      icon: Droplets,
      action: 'View Water Analytics'
    },
    {
      title: 'Growth Acceleration',
      description: 'Your Monstera is growing 1.8x faster than average due to optimal light and humidity conditions.',
      icon: TrendingUp,
      action: 'View Growth Trends'
    },
    {
      title: 'Seasonal Adjustment',
      description: 'Prepare for winter dormancy by reducing watering frequency by 40% for all tropical plants.',
      icon: Calendar,
      action: 'View Seasonal Plan'
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
                AI Analytics
              </h1>
              <p className="text-muted-foreground text-lg">
                Advanced insights and predictions for your garden
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
                <option value="year">Last 365 Days</option>
              </select>
              <Button>
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${metric.bgColor} rounded-xl`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                  metric.trend === 'up' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</h3>
              <div className="text-3xl font-bold">{metric.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                Growth Analytics
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs text-muted-foreground">Actual Growth</span>
                <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                <span className="text-xs text-muted-foreground">AI Prediction</span>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Growth analytics visualization would appear here
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-muted/20 rounded-xl">
              <div className="flex items-center mb-2">
                <Brain className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">AI Growth Insight</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your plants are growing 32% faster than average due to optimal light conditions and consistent care. 
                The AI predicts continued acceleration if current care patterns are maintained.
              </p>
            </div>
          </motion.div>

          {/* Environmental Factors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Thermometer className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-bold">Environmental Factors</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Sun className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium">Light Levels</span>
                  </div>
                  <span className="text-sm font-bold">Optimal</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">Humidity</span>
                  </div>
                  <span className="text-sm font-bold">Good</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm font-medium">Temperature</span>
                  </div>
                  <span className="text-sm font-bold">Perfect</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Cool</span>
                  <span>Moderate</span>
                  <span>Warm</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted/20 rounded-xl">
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">AI Environment Insight</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your home's conditions are in the top 10% for tropical plant growth. 
                The combination of consistent temperature and moderate humidity creates an ideal environment.
              </p>
            </div>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center mb-6">
            <Brain className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-2xl font-bold">AI Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mr-3">
                    <insight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{insight.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {insight.description}
                </p>
                <Button variant="outline" className="w-full">
                  {insight.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Predictive Maintenance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-6"
        >
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-2xl font-bold">Predictive Maintenance</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Plant</th>
                  <th className="text-left py-3 px-4 font-medium">Next Action</th>
                  <th className="text-left py-3 px-4 font-medium">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium">Priority</th>
                  <th className="text-left py-3 px-4 font-medium">AI Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Monstera Deliciosa</td>
                  <td className="py-3 px-4">Watering</td>
                  <td className="py-3 px-4">Tomorrow</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs">
                      High
                    </span>
                  </td>
                  <td className="py-3 px-4">98%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Snake Plant</td>
                  <td className="py-3 px-4">Fertilizing</td>
                  <td className="py-3 px-4">Next week</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs">
                      Medium
                    </span>
                  </td>
                  <td className="py-3 px-4">95%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Peace Lily</td>
                  <td className="py-3 px-4">Repotting</td>
                  <td className="py-3 px-4">Next month</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
                      Low
                    </span>
                  </td>
                  <td className="py-3 px-4">92%</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button>
              View Full Maintenance Schedule
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics