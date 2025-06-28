const express = require('express');
const router = express.Router();

// GET /api/weather/:location - Get weather data for location
router.get('/:location', async (req, res) => {
  try {
    const { location } = req.params;
    
    // Mock weather data
    const mockWeather = {
      location: location,
      temperature: 72,
      humidity: 65,
      conditions: 'Partly Cloudy',
      forecast: [
        { day: 'Today', high: 75, low: 60, conditions: 'Sunny' },
        { day: 'Tomorrow', high: 73, low: 58, conditions: 'Partly Cloudy' },
        { day: 'Wednesday', high: 70, low: 55, conditions: 'Cloudy' }
      ],
      gardeningTips: [
        'Good day for watering your plants',
        'Consider mulching to retain moisture',
        'Perfect weather for planting new seedlings'
      ]
    };
    
    res.json(mockWeather);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;