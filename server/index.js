const express = require('express');
const cors = require('cors');
require('dotenv').config();

const plantsRoutes = require('./routes/plants');
const communityRoutes = require('./routes/community');
const gamificationRoutes = require('./routes/gamification');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/plants', plantsRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/weather', weatherRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PlantPal API is running' });
});

app.listen(PORT, () => {
  console.log(`🌱 PlantPal server running on port ${PORT}`);
});