# PlantPal - Your Native Gardening Companion

PlantPal is a comprehensive web application that helps users discover and grow native plants, creating sustainable gardens that support local ecosystems.

## Features

### 🌱 Plant Recommendations
- Personalized plant suggestions based on location, soil type, and sun exposure
- Compatibility scoring system
- Native plant prioritization
- Care advice and growing tips

### 📚 Plant Database
- Comprehensive database of native and garden plants
- Advanced search and filtering
- Detailed plant information including care instructions
- Beautiful plant imagery

### 👥 Community Features
- Share gardening experiences and tips
- Ask questions and get advice from fellow gardeners
- Like and interact with community posts
- Tag-based content organization

### 🏆 Gamification System
- Eco-score tracking based on sustainable gardening practices
- Achievement badges for various milestones
- Progress tracking and motivation
- Rewards for native plant cultivation

### 🌤️ Weather Integration
- Current weather conditions
- Weather-based plant care recommendations
- Location-based climate considerations

## Technology Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Supabase** - Backend-as-a-Service (database, auth, storage)
- **Axios** - HTTP client for external APIs

### External APIs
- **OpenWeatherMap** - Weather data (configurable)
- **Geolocation API** - User location services

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd plantpal
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Configure environment variables**
   
   Copy `server/.env.example` to `server/.env` and configure:
   ```env
   # Supabase Configuration (optional for demo)
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

   # External APIs (optional)
   OPENWEATHER_API_KEY=your_openweather_api_key_here

   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend server on http://localhost:3000
   - Backend API server on http://localhost:3001

## Project Structure

```
plantpal/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── main.jsx        # App entry point
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/             # API route handlers
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration files
│   └── index.js            # Server entry point
└── package.json            # Root package.json
```

## API Endpoints

### Plants
- `GET /api/plants` - Get all plants
- `GET /api/plants/search?query=` - Search plants
- `POST /api/plants/recommendations` - Get plant recommendations
- `POST /api/plants/native` - Get native plants for location
- `GET /api/plants/:id` - Get plant by ID

### Community
- `GET /api/community/posts` - Get recent posts
- `POST /api/community/posts` - Create new post
- `POST /api/community/posts/:id/like` - Like a post
- `GET /api/community/users/:userId/posts` - Get user's posts

### Gamification
- `GET /api/gamification/badges` - Get all badges
- `GET /api/gamification/users/:userId/badges` - Get user badges
- `GET /api/gamification/users/:userId/eco-score` - Get user eco score

### Weather
- `POST /api/weather/current` - Get current weather
- `POST /api/weather/forecast` - Get weather forecast

## Features in Detail

### Plant Recommendation System
The recommendation engine considers multiple factors:
- **Native Status**: Prioritizes plants native to the user's region
- **Soil Compatibility**: Matches plants to user's soil type
- **Sun Requirements**: Considers garden's sun exposure
- **Water Efficiency**: Favors drought-tolerant plants
- **Climate Suitability**: Uses weather data for recommendations

### Gamification Elements
- **Eco Score**: Points awarded for sustainable practices
- **Badges**: Achievements for various milestones
- **Progress Tracking**: Visual feedback on gardening journey
- **Community Recognition**: Social aspects of achievement

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Progressive Web App capabilities

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Plant images from Pexels
- Icons and emojis for visual elements
- Open source community for tools and libraries
- Native plant organizations for inspiration

## Future Enhancements

- **Mobile App**: React Native implementation
- **AR Garden Planner**: Augmented reality plant placement
- **Advanced Analytics**: Garden performance tracking
- **Social Features**: Friend connections and garden sharing
- **E-commerce Integration**: Plant purchasing capabilities
- **Expert Consultation**: Connect with gardening professionals

---

**PlantPal** - Growing a greener future together 🌱