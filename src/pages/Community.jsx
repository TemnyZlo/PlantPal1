import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Bookmark, 
  TrendingUp,
  Award,
  Sparkles,
  Brain,
  Play,
  ExternalLink,
  Clock,
  Eye
} from 'lucide-react'
import Button from '../components/UI/Button'
import { useAuth } from '../contexts/AuthContext'

// Mock community data
const mockPosts = [
  {
    id: 1,
    user: {
      id: 'user1',
      name: 'Emily Chen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      badge: 'Plant Expert'
    },
    title: 'My Monstera Transformation',
    content: `I've been using the AI care recommendations for my Monstera for 3 months now, and the results are incredible! The computer vision detected early signs of nutrient deficiency that I completely missed. After following the AI's custom fertilizer schedule, my plant has exploded with new growth and the leaves are bigger than ever.`,
    images: ['https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg'],
    tags: ['monstera', 'ai-success', 'plant-care'],
    likes: 128,
    comments: 32,
    created_at: '2023-12-01T14:32:00Z',
    ai_insights: 'Growth rate 35% above average for this species'
  },
  {
    id: 2,
    user: {
      id: 'user2',
      name: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      badge: 'Tech Gardener'
    },
    title: 'Smart Garden Setup with Sensor Integration',
    content: `Just connected my soil moisture sensors to the PlantPal API! Now the AI gets real-time data from my plants and automatically adjusts care recommendations. The predictive watering schedule is spot-on - it actually notified me 2 days before my Calathea started showing signs of thirst. Game changer for finicky plants!`,
    images: ['https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg'],
    tags: ['smart-garden', 'sensors', 'automation', 'calathea'],
    likes: 95,
    comments: 41,
    created_at: '2023-12-05T09:15:00Z',
    ai_insights: 'Optimal sensor placement detected'
  },
  {
    id: 3,
    user: {
      id: 'user3',
      name: 'Sophia Williams',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      badge: 'Plant Scientist'
    },
    title: 'AI-Generated Garden Layout Success',
    content: `I was skeptical about the AI garden planner, but I'm amazed by the results! I uploaded photos of my backyard, specified my climate zone, and the AI designed a beautiful native plant garden with companion planting for pest resistance. The visualization tool helped me see how it would look through the seasons. Three months in and everything is thriving with minimal intervention!`,
    images: ['https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg'],
    tags: ['garden-design', 'native-plants', 'ai-design', 'companion-planting'],
    likes: 156,
    comments: 47,
    created_at: '2023-12-10T16:45:00Z',
    ai_insights: 'Biodiversity score 85% higher than average gardens'
  },
  {
    id: 4,
    user: {
      id: 'user4',
      name: 'David Rodriguez',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      badge: 'Eco Warrior'
    },
    title: 'From Brown Thumb to Green Paradise',
    content: `Six months ago, I couldn't keep a cactus alive. Today, my apartment is a jungle! The AI assistant taught me that I was overwatering everything. The computer vision feature helped me identify why my plants were dying - turns out my "bright" window was actually too dim. After relocating and following AI watering schedules, I now have 47 thriving plants!`,
    images: ['https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg'],
    tags: ['beginner-success', 'apartment-garden', 'ai-learning', 'plant-collection'],
    likes: 203,
    comments: 68,
    created_at: '2023-12-12T11:20:00Z',
    ai_insights: 'Learning curve optimization: 340% improvement in plant survival rate'
  },
  {
    id: 5,
    user: {
      id: 'user5',
      name: 'Luna Martinez',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      badge: 'Sustainability Expert'
    },
    title: 'Zero-Waste Garden with AI Optimization',
    content: `Using PlantPal's AI to create a completely zero-waste garden! The system calculated optimal plant spacing to minimize water usage, suggested companion plants that naturally repel pests (no chemicals needed), and even predicted the best harvest times to reduce food waste. My carbon footprint dropped 40% and I'm saving $200/month on groceries!`,
    images: ['https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'],
    tags: ['zero-waste', 'sustainability', 'food-garden', 'carbon-reduction'],
    likes: 189,
    comments: 52,
    created_at: '2023-12-14T08:45:00Z',
    ai_insights: 'Resource efficiency: 67% water reduction, 40% carbon footprint decrease'
  },
  {
    id: 6,
    user: {
      id: 'user6',
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      badge: 'Urban Farmer'
    },
    title: 'Rooftop Revolution: AI-Powered Urban Farm',
    content: `Transformed my city rooftop into a productive farm using AI weather predictions and growth optimization! The system accounts for wind patterns, heat reflection from buildings, and seasonal light changes. In 4 months, I've harvested 150 lbs of vegetables and herbs. The AI even suggested heat-resistant varieties I'd never heard of that are perfect for rooftop conditions.`,
    images: ['https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'],
    tags: ['urban-farming', 'rooftop-garden', 'food-production', 'weather-ai'],
    likes: 167,
    comments: 43,
    created_at: '2023-12-15T15:30:00Z',
    ai_insights: 'Microclimate adaptation: 89% yield optimization for urban conditions'
  },
  {
    id: 7,
    user: {
      id: 'user7',
      name: 'Sarah Kim',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      badge: 'Pollinator Advocate'
    },
    title: 'AI-Designed Pollinator Paradise',
    content: `Used the AI garden planner to create a year-round pollinator habitat! The system selected native plants that bloom in succession, ensuring food sources from spring through fall. The results are incredible - I've documented 23 butterfly species, 15 bee species, and countless beneficial insects. My neighbors are now asking for AI garden designs too!`,
    images: ['https://images.pexels.com/photos/56866/garden-flower-purple-echinacea-56866.jpeg'],
    tags: ['pollinators', 'native-plants', 'biodiversity', 'ecosystem-design'],
    likes: 234,
    comments: 71,
    created_at: '2023-12-16T12:15:00Z',
    ai_insights: 'Biodiversity index: 340% increase in beneficial insect activity'
  },
  {
    id: 8,
    user: {
      id: 'user8',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      badge: 'Therapy Gardener'
    },
    title: 'Healing Garden: Plants for Mental Health',
    content: `After struggling with anxiety, I used PlantPal's AI to design a therapeutic garden. The system recommended plants with calming scents, soothing colors, and textures that promote mindfulness. The lavender, chamomile, and mint create a sensory experience that's become my daily meditation space. My therapist is amazed at my progress!`,
    images: ['https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg'],
    tags: ['therapy-garden', 'mental-health', 'aromatherapy', 'mindfulness'],
    likes: 298,
    comments: 89,
    created_at: '2023-12-17T09:00:00Z',
    ai_insights: 'Therapeutic plant selection: 95% stress reduction correlation'
  },
  {
    id: 9,
    user: {
      id: 'user9',
      name: 'Isabella Rodriguez',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      badge: 'Vertical Garden Expert'
    },
    title: 'Vertical Garden Transformation: 200 Plants in 50 Square Feet',
    content: `Living in a tiny apartment didn't stop me from creating a plant paradise! Using PlantPal's AI space optimization, I designed a vertical garden system that houses 200+ plants in just 50 square feet. The AI calculated perfect spacing, light distribution, and watering zones. My electricity bill actually went DOWN because the plants naturally cool my apartment! Neighbors call it the "Green Wall of Wonder."`,
    images: ['https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg'],
    tags: ['vertical-garden', 'small-space', 'apartment-living', 'space-optimization'],
    likes: 412,
    comments: 127,
    created_at: '2023-12-18T14:20:00Z',
    ai_insights: 'Space efficiency: 400% plant density increase with optimal growth conditions'
  },
  {
    id: 10,
    user: {
      id: 'user10',
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      badge: 'Hydroponic Pioneer'
    },
    title: 'AI-Controlled Hydroponic System: Growing Food Year-Round',
    content: `Built an AI-controlled hydroponic system using PlantPal's nutrient optimization algorithms! The system monitors pH, nutrients, and growth rates 24/7, automatically adjusting everything. In 8 months, I've harvested 400 lbs of vegetables with 90% less water than traditional gardening. The AI even predicts harvest dates with 96% accuracy. My family hasn't bought vegetables in months!`,
    images: ['https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg'],
    tags: ['hydroponics', 'automation', 'food-production', 'water-conservation'],
    likes: 356,
    comments: 98,
    created_at: '2023-12-19T10:30:00Z',
    ai_insights: 'Resource optimization: 90% water reduction, 300% yield increase per square foot'
  },
  {
    id: 11,
    user: {
      id: 'user11',
      name: 'Aisha Patel',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      badge: 'Climate Activist'
    },
    title: 'Carbon Negative Garden: Sequestering 2 Tons CO2 Annually',
    content: `Used PlantPal's climate impact calculator to design a carbon-negative garden! The AI selected fast-growing trees, deep-rooted perennials, and carbon-sequestering grasses. After 18 months, soil tests confirm we're sequestering 2 tons of CO2 annually while producing food and supporting 47 bird species. The AI tracks our environmental impact in real-time - we're officially carbon negative!`,
    images: ['https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg'],
    tags: ['carbon-sequestration', 'climate-action', 'environmental-impact', 'sustainability'],
    likes: 523,
    comments: 156,
    created_at: '2023-12-20T16:45:00Z',
    ai_insights: 'Environmental impact: 2.3 tons CO2 sequestered annually, 340% biodiversity increase'
  },
  {
    id: 12,
    user: {
      id: 'user12',
      name: 'Roberto Silva',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      badge: 'Community Organizer'
    },
    title: 'Neighborhood Food Forest: AI Planning for 500 Families',
    content: `Organized our neighborhood to create a community food forest using PlantPal's large-scale planning AI! The system designed a 5-acre food forest that feeds 500 families year-round. The AI optimized for maximum nutrition diversity, seasonal availability, and minimal maintenance. We've reduced neighborhood food costs by 60% and created a beautiful gathering space. Other cities are now copying our AI-designed model!`,
    images: ['https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'],
    tags: ['community-garden', 'food-forest', 'neighborhood-organizing', 'food-security'],
    likes: 789,
    comments: 234,
    created_at: '2023-12-21T11:15:00Z',
    ai_insights: 'Community impact: 500 families fed, 60% food cost reduction, 12-month harvest cycle'
  },
  {
    id: 13,
    user: {
      id: 'user13',
      name: 'Dr. Elena Kowalski',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      badge: 'Research Scientist'
    },
    title: 'Medicinal Plant Garden: AI-Guided Pharmaceutical Research',
    content: `As a pharmaceutical researcher, I used PlantPal's AI to create a medicinal plant research garden! The system identified 127 plants with therapeutic compounds, optimized growing conditions for maximum potency, and tracks chemical composition changes. We've discovered 3 new compounds with anti-inflammatory properties. The AI's molecular analysis capabilities are revolutionizing how we study plant medicine!`,
    images: ['https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg'],
    tags: ['medicinal-plants', 'pharmaceutical-research', 'plant-compounds', 'scientific-research'],
    likes: 445,
    comments: 89,
    created_at: '2023-12-22T13:40:00Z',
    ai_insights: 'Research breakthrough: 3 novel compounds identified, 40% potency increase through AI optimization'
  },
  {
    id: 14,
    user: {
      id: 'user14',
      name: 'Maya Thompson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      badge: 'Youth Educator'
    },
    title: 'School Garden Revolution: Teaching 1000+ Kids with AI',
    content: `Implemented PlantPal's educational AI in our school district's garden program! The system creates personalized learning experiences for each student, tracks their plant's progress, and gamifies the learning process. 1,200 students now understand ecology, nutrition, and sustainability through hands-on AI-guided gardening. Test scores in science increased 35%, and we've reduced cafeteria waste by 80%!`,
    images: ['https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg'],
    tags: ['education', 'school-gardens', 'youth-engagement', 'STEM-learning'],
    likes: 667,
    comments: 178,
    created_at: '2023-12-23T09:25:00Z',
    ai_insights: 'Educational impact: 1,200 students engaged, 35% science score improvement, 80% waste reduction'
  },
  {
    id: 15,
    user: {
      id: 'user15',
      name: 'Ahmed Hassan',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      badge: 'Desert Gardener'
    },
    title: 'Desert Oasis: AI Water Management in Extreme Conditions',
    content: `Living in Arizona's desert, I thought gardening was impossible until I discovered PlantPal's desert AI algorithms! The system designed a water-efficient oasis using native cacti, drought-resistant vegetables, and innovative water capture. Using only 20 gallons per week, I grow enough food for my family of 6. The AI's evapotranspiration calculations are so precise, I haven't lost a single plant to drought!`,
    images: ['https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg'],
    tags: ['desert-gardening', 'water-conservation', 'drought-resistant', 'extreme-conditions'],
    likes: 398,
    comments: 112,
    created_at: '2023-12-24T15:50:00Z',
    ai_insights: 'Water efficiency: 95% water reduction compared to traditional gardens, 100% plant survival rate'
  }
]

// YouTube content for eco and gardening
const youtubeContent = [
  {
    id: 'yt1',
    title: 'AI Plant Care Revolution: The Future is Here',
    channel: 'EcoTech Today',
    thumbnail: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
    duration: '12:45',
    views: '2.3M',
    uploadDate: '2023-12-10',
    description: 'Exploring how AI is transforming plant care and sustainable gardening practices.',
    category: 'Technology'
  },
  {
    id: 'yt2',
    title: 'Zero Waste Gardening: Complete Beginner Guide',
    channel: 'Sustainable Living',
    thumbnail: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    duration: '18:32',
    views: '1.8M',
    uploadDate: '2023-12-08',
    description: 'Learn how to create a completely zero-waste garden that feeds your family and the planet.',
    category: 'Sustainability'
  },
  {
    id: 'yt3',
    title: 'Urban Farming Revolution: Growing Food in Small Spaces',
    channel: 'City Growers',
    thumbnail: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    duration: '15:20',
    views: '3.1M',
    uploadDate: '2023-12-12',
    description: 'Transform any small space into a productive urban farm with these proven techniques.',
    category: 'Urban Farming'
  },
  {
    id: 'yt4',
    title: 'Native Plants: Why They Matter for Climate Change',
    channel: 'Climate Gardeners',
    thumbnail: 'https://images.pexels.com/photos/56866/garden-flower-purple-echinacea-56866.jpeg',
    duration: '22:15',
    views: '987K',
    uploadDate: '2023-12-14',
    description: 'Understanding the critical role of native plants in fighting climate change and supporting biodiversity.',
    category: 'Climate Action'
  },
  {
    id: 'yt5',
    title: 'Smart Garden Sensors: DIY Setup Guide',
    channel: 'Garden Tech Hub',
    thumbnail: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg',
    duration: '25:40',
    views: '756K',
    uploadDate: '2023-12-16',
    description: 'Step-by-step guide to setting up smart sensors for automated plant care.',
    category: 'Technology'
  },
  {
    id: 'yt6',
    title: 'Pollinator Gardens: Creating Wildlife Corridors',
    channel: 'Wildlife Gardening',
    thumbnail: 'https://images.pexels.com/photos/33109/sunflower-blossom-bloom-yellow.jpg',
    duration: '19:28',
    views: '1.2M',
    uploadDate: '2023-12-18',
    description: 'Design gardens that support pollinators and create vital wildlife corridors in urban areas.',
    category: 'Conservation'
  },
  {
    id: 'yt7',
    title: 'Vertical Gardening: Maximize Small Spaces',
    channel: 'Small Space Gardens',
    thumbnail: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    duration: '16:45',
    views: '2.8M',
    uploadDate: '2023-12-20',
    description: 'Transform any small space into a productive vertical garden with these space-saving techniques.',
    category: 'Space Optimization'
  },
  {
    id: 'yt8',
    title: 'Hydroponic Systems: Soil-Free Growing Guide',
    channel: 'Future Farming',
    thumbnail: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg',
    duration: '28:30',
    views: '1.9M',
    uploadDate: '2023-12-22',
    description: 'Complete guide to setting up hydroponic systems for year-round food production.',
    category: 'Hydroponics'
  },
  {
    id: 'yt9',
    title: 'Medicinal Plants: Growing Your Own Pharmacy',
    channel: 'Herbal Medicine Today',
    thumbnail: 'https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg',
    duration: '24:15',
    views: '1.4M',
    uploadDate: '2023-12-24',
    description: 'Learn to grow and use medicinal plants for natural health and wellness.',
    category: 'Medicinal Plants'
  },
  {
    id: 'yt10',
    title: 'Community Gardens: Building Food Security',
    channel: 'Community Resilience',
    thumbnail: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    duration: '21:40',
    views: '967K',
    uploadDate: '2023-12-26',
    description: 'How community gardens are solving food insecurity and building stronger neighborhoods.',
    category: 'Community Building'
  },
  {
    id: 'yt11',
    title: 'Desert Gardening: Thriving in Arid Climates',
    channel: 'Arid Zone Agriculture',
    thumbnail: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg',
    duration: '20:55',
    views: '1.1M',
    uploadDate: '2023-12-28',
    description: 'Innovative techniques for successful gardening in desert and drought conditions.',
    category: 'Climate Adaptation'
  },
  {
    id: 'yt12',
    title: 'School Gardens: Education Through Nature',
    channel: 'Educational Gardening',
    thumbnail: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    duration: '18:20',
    views: '834K',
    uploadDate: '2023-12-30',
    description: 'How school gardens are transforming education and connecting kids with nature.',
    category: 'Education'
  }
]

const trendingTopics = [
  { name: 'AI Plant Diagnosis', count: 1843, growth: '+76%' },
  { name: 'Vertical Gardening', count: 1456, growth: '+89%' },
  { name: 'Smart Sensors', count: 1276, growth: '+52%' },
  { name: 'Hydroponic Systems', count: 1098, growth: '+67%' },
  { name: 'Community Gardens', count: 987, growth: '+45%' },
  { name: 'Desert Gardening', count: 876, growth: '+123%' },
  { name: 'Medicinal Plants', count: 754, growth: '+34%' },
  { name: 'Carbon Sequestration', count: 654, growth: '+91%' },
  { name: 'School Gardens', count: 543, growth: '+56%' },
  { name: 'Food Forests', count: 432, growth: '+78%' }
]

const Community = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState(mockPosts)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const createPost = (e) => {
    e.preventDefault()
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      return
    }

    const createdPost = {
      id: Date.now(),
      user: {
        id: user?.id || 'guest',
        name: user?.user_metadata?.full_name || 'Guest User',
        avatar: user?.user_metadata?.avatar_url || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        badge: 'New Gardener'
      },
      title: newPost.title,
      content: newPost.content,
      images: [],
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      likes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      ai_insights: 'AI analysis pending...'
    }
    
    setPosts([createdPost, ...posts])
    setNewPost({ title: '', content: '', tags: '' })
    setShowCreateModal(false)
  }

  const likePost = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    
    if (diffInSeconds < 60) {
      return 'just now'
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    }
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      return `${diffInDays}d ago`
    }
    
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-xl py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              AI Community
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect with plant enthusiasts and share AI-powered insights
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="mt-4 md:mt-0"
            icon={<MessageSquare className="h-4 w-4 mr-2" />}
          >
            Share Your Experience
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card mb-6 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={post.user.avatar} 
                      alt={post.user.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-bold">{post.user.name}</h3>
                        <div className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {post.user.badge}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(post.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                  
                  <p className="text-muted-foreground mb-4 whitespace-pre-line">
                    {post.content}
                  </p>
                  
                  {post.images && post.images.length > 0 && (
                    <div className="mb-4 rounded-xl overflow-hidden">
                      <img 
                        src={post.images[0]} 
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  {post.ai_insights && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
                      <div className="flex items-center mb-2">
                        <Brain className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">AI Insight</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {post.ai_insights}
                      </p>
                    </div>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          #{typeof tag === 'string' ? tag : tag.name || 'tag'}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => likePost(post.id)} 
                        className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Heart className="h-5 w-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare className="h-5 w-5" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <Bookmark className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* YouTube Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-center mb-4">
                <Play className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-xl font-bold">Eco & Garden Videos</h3>
              </div>
              <div className="space-y-4">
                {youtubeContent.slice(0, 3).map((video, index) => (
                  <div 
                    key={video.id}
                    className="group cursor-pointer"
                    onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
                  >
                    <div className="relative rounded-lg overflow-hidden mb-2">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute center">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <Play className="h-4 w-4 text-white ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{video.channel}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Eye className="h-3 w-3 mr-1" />
                        {video.views}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => window.open('https://youtube.com/results?search_query=sustainable+gardening+AI', '_blank')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View More Videos
              </Button>
            </motion.div>
            
            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-xl font-bold">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-3">#</span>
                      <span className="font-medium">{topic.name}</span>
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      {topic.growth}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <div className="flex items-center mb-4">
                <Award className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-xl font-bold">Top Contributors</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Emily Chen', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', contributions: 156, badge: 'Plant Expert' },
                  { name: 'Marcus Johnson', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', contributions: 142, badge: 'Tech Gardener' },
                  { name: 'Sophia Williams', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', contributions: 128, badge: 'Plant Scientist' },
                  { name: 'Luna Martinez', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg', contributions: 98, badge: 'Sustainability Expert' },
                  { name: 'Sarah Kim', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', contributions: 87, badge: 'Pollinator Advocate' },
                  { name: 'Isabella Rodriguez', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg', contributions: 76, badge: 'Vertical Garden Expert' },
                  { name: 'Dr. Elena Kowalski', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg', contributions: 65, badge: 'Research Scientist' },
                  { name: 'Maya Thompson', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', contributions: 54, badge: 'Youth Educator' }
                ].map((contributor, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                  >
                    <div className="flex items-center">
                      <img 
                        src={contributor.avatar} 
                        alt={contributor.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium">{contributor.name}</div>
                        <div className="text-xs text-muted-foreground">{contributor.badge}</div>
                      </div>
                    </div>
                    <div className="text-xs font-medium">
                      {contributor.contributions} posts
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* AI Community Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 bg-gradient-to-br from-primary/5 to-accent/5"
            >
              <div className="flex items-center mb-4">
                <Sparkles className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-xl font-bold">AI Community Insights</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <h4 className="font-medium mb-2">AI Success Metrics</h4>
                  <p className="text-sm text-muted-foreground">
                    Computer vision plant diagnosis: 98.7% accuracy across 150K+ scans
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <h4 className="font-medium mb-2">Global Community Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    250K+ gardeners worldwide, 73% reduction in plant mortality rates
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <h4 className="font-medium mb-2">Environmental Achievement</h4>
                  <p className="text-sm text-muted-foreground">
                    Community saved 50M gallons of water, sequestered 12K tons CO2
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <h4 className="font-medium mb-2">Innovation Milestone</h4>
                  <p className="text-sm text-muted-foreground">
                    AI discovered 47 new plant compounds with therapeutic potential
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Featured YouTube Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Play className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-2xl font-bold">Featured Educational Content</h2>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.open('https://youtube.com/results?search_query=sustainable+gardening+permaculture', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              More Videos
            </Button>
          </div>
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'Technology', 'Sustainability', 'Urban Farming', 'Education', 'Conservation', 'Hydroponics'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-muted/20 hover:bg-primary/10 text-sm rounded-full transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {youtubeContent.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute center">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-1 bg-primary/90 text-white text-xs rounded-full">
                    {video.category}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium truncate">{video.channel}</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {video.views}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Educational Content
            </Button>
          </div>
        </motion.div>
        
        {/* Community Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 card p-8 bg-gradient-to-r from-primary/5 to-accent/5"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Community Impact</h2>
            <p className="text-muted-foreground text-lg">
              Together, we're growing a more sustainable future
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">250K+</div>
              <div className="text-sm text-muted-foreground">Active Gardeners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50M</div>
              <div className="text-sm text-muted-foreground">Gallons Water Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12K</div>
              <div className="text-sm text-muted-foreground">Tons CO2 Sequestered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1.2M</div>
              <div className="text-sm text-muted-foreground">Plants Grown Successfully</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Share Your Experience</h2>
                <button 
                  onClick={() => setShowCreateModal(false)} 
                  className="text-muted-foreground hover:text-foreground"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <form onSubmit={createPost}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newPost.title}
                      onChange={handleInputChange}
                      className="input w-full"
                      placeholder="What's your post about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Content
                    </label>
                    <textarea
                      name="content"
                      value={newPost.content}
                      onChange={handleInputChange}
                      rows="6"
                      className="input w-full"
                      placeholder="Share your experience, tips, or ask questions..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={newPost.tags}
                      onChange={handleInputChange}
                      className="input w-full"
                      placeholder="ai-care, monstera, success-story"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>AI will analyze your post to provide insights and recommendations</span>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                    >
                      Publish Post
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Community