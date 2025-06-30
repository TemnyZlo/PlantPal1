import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Bot, 
  User, 
  Camera, 
  Mic, 
  MicOff, 
  Image as ImageIcon,
  Loader2,
  Lightbulb,
  Leaf,
  Droplets,
  Sun,
  Bug,
  Brain,
  Zap,
  Sparkles,
  Eye
} from 'lucide-react'
import Button from '../components/UI/Button'
import { useAuth } from '../contexts/AuthContext'

const AIAssistant = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI plant care assistant powered by advanced machine learning. I can identify plants, diagnose issues, provide care recommendations, and predict future needs. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickSuggestions = [
    {
      icon: Eye,
      text: "Identify this plant for me",
      category: "identification"
    },
    {
      icon: Bug,
      text: "What's wrong with my plant?",
      category: "diagnosis"
    },
    {
      icon: Brain,
      text: "Create a care schedule",
      category: "care"
    },
    {
      icon: Zap,
      text: "Predict my plant's growth",
      category: "prediction"
    }
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setIsThinking(true)

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsThinking(false)
      
      // Simulate typing effect
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: generateAIResponse(inputMessage),
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
        setIsLoading(false)
      }, 500)
    }, 1500)
  }

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('identify')) {
      return "I'd be happy to identify your plant! Please upload a photo using the camera button, and I'll analyze it using my computer vision system. I can identify thousands of plant species with 98% accuracy."
    }
    
    if (lowerMessage.includes('wrong') || lowerMessage.includes('sick') || lowerMessage.includes('yellow')) {
      return "I can help diagnose plant issues! For accurate diagnosis, please upload 2-3 clear photos showing the affected areas. My AI will analyze visual symptoms, consider environmental factors, and provide a detailed diagnosis with treatment recommendations."
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('calendar')) {
      return "I'll create a personalized care schedule based on your specific plants, local climate, and your home's conditions. This AI-optimized schedule will include watering, fertilizing, pruning, and repotting timelines, with smart reminders that adjust based on seasonal changes and plant growth patterns."
    }
    
    if (lowerMessage.includes('predict') || lowerMessage.includes('growth')) {
      return "My predictive AI can forecast your plant's growth patterns, anticipate flowering periods, and estimate mature size. This helps you plan your space and care routine. For the most accurate prediction, please share which plant you're curious about and any specific growing conditions."
    }
    
    return "I'm your advanced AI plant assistant, trained on millions of plant data points and scientific research. I can identify plants, diagnose issues, create care schedules, predict growth, and provide personalized recommendations. What specific plant question can I help with today?"
  }

  const handleQuickSuggestion = (suggestion) => {
    setInputMessage(suggestion.text)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageMessage = {
        id: Date.now(),
        type: 'user',
        content: `[Image uploaded for AI analysis]`,
        image: URL.createObjectURL(file),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, imageMessage])
      setIsLoading(true)
      
      // Simulate AI image analysis with thinking and typing effects
      setTimeout(() => {
        setIsThinking(true)
        
        setTimeout(() => {
          setIsThinking(false)
          
          setTimeout(() => {
            const analysisResponse = {
              id: Date.now() + 1,
              type: 'bot',
              content: "I've analyzed your plant image using my computer vision system. This appears to be a Monstera Deliciosa (Swiss Cheese Plant) in good health. The leaf fenestrations are well-developed, indicating proper light exposure. I notice slight yellowing on the lower leaf, which could be natural aging or early signs of overwatering. I recommend checking soil moisture and ensuring good drainage. Would you like a detailed care plan for this plant?",
              timestamp: new Date()
            }
            setMessages(prev => [...prev, analysisResponse])
            setIsLoading(false)
          }, 500)
        }, 2000)
      }, 1000)
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input functionality would be implemented here
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-6">
            <div className="relative">
              <Bot className="h-10 w-10 text-primary" />
              <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">
            AI Plant Intelligence
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced machine learning and computer vision to solve any plant problem
          </p>
        </motion.div>

        {/* Quick Suggestions */}
        {messages.length <= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              What can I help you with?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleQuickSuggestion(suggestion)}
                  className="flex items-center p-4 card card-hover text-left"
                >
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mr-4">
                    <suggestion.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-medium">{suggestion.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat Messages */}
        <div className="card mb-6 overflow-hidden">
          <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">PlantPal AI</h3>
                <p className="text-xs text-muted-foreground">Advanced plant intelligence system</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <div className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 rounded-full text-xs font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  Active
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className={`rounded-xl p-4 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 border'
                    }`}>
                      {message.image && (
                        <div className="mb-3 relative">
                          <img 
                            src={message.image} 
                            alt="Uploaded plant" 
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                            AI Analyzing
                          </div>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Brain className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="bg-muted/50 border rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <motion.div 
                          animate={{ scale: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div 
                          animate={{ scale: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div 
                          animate={{ scale: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">AI thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0"
                title="Upload plant image for analysis"
              >
                <Camera className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoiceInput}
                className={`flex-shrink-0 ${isListening ? 'text-red-600' : ''}`}
                title="Voice input"
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask anything about your plants..."
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                </div>
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-4">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Computer Vision
            </h3>
            <p className="text-sm text-muted-foreground">
              Upload photos for instant plant identification and health analysis
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Predictive Intelligence
            </h3>
            <p className="text-sm text-muted-foreground">
              AI predicts plant needs before problems occur
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Smart Automation
            </h3>
            <p className="text-sm text-muted-foreground">
              Automated care schedules that adapt to your plants' changing needs
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIAssistant