import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Leaf, 
  Droplets, 
  Sun, 
  Thermometer, 
  Calendar, 
  Heart, 
  Share2, 
  ArrowLeft,
  Brain,
  Zap,
  Eye,
  Clock,
  AlertTriangle,
  Sparkles
} from 'lucide-react'
import Button from '../components/UI/Button'
import LoadingSpinner from '../components/UI/LoadingSpinner'

// Mock plant data
const mockPlant = {
  id: 1,
  common_name: 'Monstera Deliciosa',
  scientific_name: 'Monstera deliciosa',
  description: 'The Monstera deliciosa is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very popular as a houseplant.',
  image_url: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
  care_level: 'Intermediate',
  water_requirements: 'Moderate',
  sun_requirements: 'Bright Indirect Light',
  blooming_season: 'Rarely blooms indoors',
  is_native: false,
  growth_stage: 'Fast growing',
  soil_type: 'Well-draining potting mix',
  temperature_range: '65-85°F (18-29°C)',
  humidity: 'Medium to High',
  propagation: 'Stem cuttings or air layering',
  toxicity: 'Toxic to pets if ingested',
  ai_score: 98,
  ai_recommendation: 'Based on your home conditions and experience level, this plant is an excellent match. The bright indirect light in your living room is ideal for a Monstera.',
  ai_care_schedule: {
    watering: {
      frequency: 'Every 7-10 days',
      next_due: '2023-12-15',
      instructions: 'Allow top 2-3 inches of soil to dry out between waterings. Reduce in winter.'
    },
    fertilizing: {
      frequency: 'Monthly during growing season',
      next_due: '2024-01-10',
      instructions: 'Use balanced liquid fertilizer diluted to half strength.'
    },
    pruning: {
      frequency: 'As needed',
      next_due: null,
      instructions: 'Remove yellow or damaged leaves. Prune to control size.'
    },
    repotting: {
      frequency: 'Every 2 years',
      next_due: '2025-04-15',
      instructions: 'Repot in spring when roots become crowded.'
    }
  },
  ai_growth_prediction: {
    one_month: 'Expect 1-2 new leaves to unfurl',
    six_months: 'Plant should increase in height by 6-8 inches',
    one_year: 'Potential for 8-12 new leaves and significant size increase'
  },
  common_issues: [
    {
      name: 'Yellow Leaves',
      causes: ['Overwatering', 'Nutrient deficiency', 'Low light'],
      solutions: ['Allow soil to dry between waterings', 'Check for proper drainage', 'Ensure bright indirect light']
    },
    {
      name: 'Brown Leaf Edges',
      causes: ['Low humidity', 'Fertilizer burn', 'Underwatering'],
      solutions: ['Increase humidity with misting or humidifier', 'Flush soil if over-fertilized', 'Maintain consistent watering schedule']
    },
    {
      name: 'No Fenestrations (Leaf Holes)',
      causes: ['Young plant', 'Insufficient light', 'Poor nutrition'],
      solutions: ['Be patient - leaves develop holes with maturity', 'Provide brighter indirect light', 'Fertilize appropriately during growing season']
    }
  ]
}

const PlantDetails = () => {
  const { id } = useParams()
  const [plant, setPlant] = useState(mockPlant)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('care')
  const [isFavorite, setIsFavorite] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading plant details..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-xl py-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            className="flex items-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plants
          </Button>
        </motion.div>

        {/* Plant Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Plant Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-1"
          >
            <div className="card overflow-hidden">
              <div className="relative">
                <img
                  src={plant.image_url}
                  alt={plant.common_name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full ${
                      isFavorite 
                        ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' 
                        : 'bg-white/80 text-gray-700 dark:bg-gray-800/80 dark:text-gray-300'
                    }`}
                  >
                    <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2 rounded-full bg-white/80 text-gray-700 dark:bg-gray-800/80 dark:text-gray-300">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 glass text-sm font-medium rounded-full flex items-center">
                  <Leaf className="h-4 w-4 text-primary mr-1" />
                  <span>AI Score: {plant.ai_score}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{plant.common_name}</h1>
                    <p className="text-muted-foreground italic">{plant.scientific_name}</p>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {plant.care_level}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <div className="text-xs text-muted-foreground">Water</div>
                      <div className="text-sm font-medium">{plant.water_requirements}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                    <div>
                      <div className="text-xs text-muted-foreground">Light</div>
                      <div className="text-sm font-medium">{plant.sun_requirements}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                    <div>
                      <div className="text-xs text-muted-foreground">Temperature</div>
                      <div className="text-sm font-medium">{plant.temperature_range}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                    <div>
                      <div className="text-xs text-muted-foreground">Blooming</div>
                      <div className="text-sm font-medium">{plant.blooming_season}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-xl mb-4">
                  <div className="flex items-center mb-2">
                    <Brain className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">AI Recommendation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plant.ai_recommendation}
                  </p>
                </div>
                
                <Button className="w-full">
                  Add to My Garden
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Plant Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card p-6">
              {/* Tabs */}
              <div className="flex border-b mb-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('care')}
                  className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                    activeTab === 'care' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  AI Care Guide
                </button>
                <button
                  onClick={() => setActiveTab('growth')}
                  className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                    activeTab === 'growth' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Growth Prediction
                </button>
                <button
                  onClick={() => setActiveTab('issues')}
                  className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                    activeTab === 'issues' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Troubleshooting
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                    activeTab === 'about' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  About
                </button>
              </div>

              {/* Tab Content */}
              <div>
                {/* AI Care Guide */}
                {activeTab === 'care' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <Brain className="h-6 w-6 text-primary mr-2" />
                      <h2 className="text-2xl font-bold">AI Care Schedule</h2>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      Our AI has analyzed this plant species and created a personalized care schedule 
                      optimized for your environment and experience level.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="card p-5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
                        <div className="flex items-center mb-3">
                          <Droplets className="h-5 w-5 text-blue-600 mr-2" />
                          <h3 className="text-lg font-semibold">Watering</h3>
                          <div className="ml-auto px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
                            Next: {plant.ai_care_schedule.watering.next_due}
                          </div>
                        </div>
                        <p className="text-sm mb-2">
                          <span className="font-medium">Frequency:</span> {plant.ai_care_schedule.watering.frequency}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {plant.ai_care_schedule.watering.instructions}
                        </p>
                      </div>
                      
                      <div className="card p-5 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
                        <div className="flex items-center mb-3">
                          <Zap className="h-5 w-5 text-green-600 mr-2" />
                          <h3 className="text-lg font-semibold">Fertilizing</h3>
                          <div className="ml-auto px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                            Next: {plant.ai_care_schedule.fertilizing.next_due}
                          </div>
                        </div>
                        <p className="text-sm mb-2">
                          <span className="font-medium">Frequency:</span> {plant.ai_care_schedule.fertilizing.frequency}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {plant.ai_care_schedule.fertilizing.instructions}
                        </p>
                      </div>
                      
                      <div className="card p-5 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
                        <div className="flex items-center mb-3">
                          <Clock className="h-5 w-5 text-purple-600 mr-2" />
                          <h3 className="text-lg font-semibold">Repotting</h3>
                          <div className="ml-auto px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs">
                            Next: {plant.ai_care_schedule.repotting.next_due || 'As needed'}
                          </div>
                        </div>
                        <p className="text-sm mb-2">
                          <span className="font-medium">Frequency:</span> {plant.ai_care_schedule.repotting.frequency}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {plant.ai_care_schedule.repotting.instructions}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-center">
                      <Button>
                        Add to My Care Calendar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Growth Prediction */}
                {activeTab === 'growth' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <Eye className="h-6 w-6 text-primary mr-2" />
                      <h2 className="text-2xl font-bold">AI Growth Prediction</h2>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      Our predictive AI model forecasts how your plant will develop over time based on 
                      species data, your care patterns, and environmental conditions.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="card p-5 bg-gradient-to-r from-primary/5 to-primary/10">
                        <div className="flex items-center mb-3">
                          <Clock className="h-5 w-5 text-primary mr-2" />
                          <h3 className="text-lg font-semibold">1 Month Forecast</h3>
                        </div>
                        <p className="text-muted-foreground">
                          {plant.ai_growth_prediction.one_month}
                        </p>
                      </div>
                      
                      <div className="card p-5 bg-gradient-to-r from-primary/10 to-primary/20">
                        <div className="flex items-center mb-3">
                          <Clock className="h-5 w-5 text-primary mr-2" />
                          <h3 className="text-lg font-semibold">6 Month Forecast</h3>
                        </div>
                        <p className="text-muted-foreground">
                          {plant.ai_growth_prediction.six_months}
                        </p>
                      </div>
                      
                      <div className="card p-5 bg-gradient-to-r from-primary/20 to-primary/30">
                        <div className="flex items-center mb-3">
                          <Clock className="h-5 w-5 text-primary mr-2" />
                          <h3 className="text-lg font-semibold">1 Year Forecast</h3>
                        </div>
                        <p className="text-muted-foreground">
                          {plant.ai_growth_prediction.one_year}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted/20 rounded-xl">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">AI Insight</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on your home's conditions, this Monstera is likely to grow faster than average. 
                        The combination of optimal humidity and light levels in your space creates ideal growing conditions.
                      </p>
                    </div>
                  </div>
                )}

                {/* Troubleshooting */}
                {activeTab === 'issues' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="h-6 w-6 text-primary mr-2" />
                      <h2 className="text-2xl font-bold">AI Troubleshooting</h2>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      Our AI has identified common issues for this plant species and provided 
                      solutions based on scientific research and expert knowledge.
                    </p>
                    
                    <div className="space-y-6">
                      {plant.common_issues.map((issue, index) => (
                        <div key={index} className="card p-5">
                          <h3 className="text-lg font-semibold mb-3">{issue.name}</h3>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium mb-2">Possible Causes:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {issue.causes.map((cause, i) => (
                                <li key={i} className="text-sm text-muted-foreground">{cause}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Solutions:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {issue.solutions.map((solution, i) => (
                                <li key={i} className="text-sm text-muted-foreground">{solution}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex items-center justify-center">
                      <Button>
                        Scan My Plant for Issues
                      </Button>
                    </div>
                  </div>
                )}

                {/* About */}
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About {plant.common_name}</h2>
                    
                    <p className="text-muted-foreground mb-6 whitespace-pre-line">
                      {plant.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="card p-4">
                        <h3 className="font-medium mb-2">Plant Details</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Scientific Name:</span>
                            <span className="font-medium">{plant.scientific_name}</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Growth Rate:</span>
                            <span className="font-medium">{plant.growth_stage}</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Soil Type:</span>
                            <span className="font-medium">{plant.soil_type}</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Humidity:</span>
                            <span className="font-medium">{plant.humidity}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="card p-4">
                        <h3 className="font-medium mb-2">Additional Information</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Propagation:</span>
                            <span className="font-medium">{plant.propagation}</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Toxicity:</span>
                            <span className="font-medium">{plant.toxicity}</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Native:</span>
                            <span className="font-medium">{plant.is_native ? 'Yes' : 'No'}</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Care Level:</span>
                            <span className="font-medium">{plant.care_level}</span>
                          </li>
                        </ul>
                      </div>
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

export default PlantDetails