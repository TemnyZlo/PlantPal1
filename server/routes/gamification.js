const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Mock badges
const mockBadges = [
  {
    id: 1,
    name: 'First Plant',
    description: 'Added your first plant to the garden',
    icon: '🌱',
    earned: true
  },
  {
    id: 2,
    name: 'Native Enthusiast',
    description: 'Added 5 native plants to your garden',
    icon: '🌿',
    earned: false
  },
  {
    id: 3,
    name: 'Community Helper',
    description: 'Helped 10 community members',
    icon: '🤝',
    earned: false
  }
];

// GET /api/gamification/badges - Get user badges
router.get('/badges', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('badges')
        .select('*');
      
      if (error) {
        console.error('Supabase error:', error);
        return res.json(mockBadges);
      }
      
      res.json(data || mockBadges);
    } else {
      res.json(mockBadges);
    }
  } catch (error) {
    console.error('Error fetching badges:', error);
    res.json(mockBadges);
  }
});

// GET /api/gamification/stats - Get user stats
router.get('/stats', async (req, res) => {
  try {
    const mockStats = {
      plantsAdded: 3,
      daysActive: 15,
      communityPosts: 2,
      badgesEarned: 1,
      level: 2,
      experience: 150
    };
    
    res.json(mockStats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;