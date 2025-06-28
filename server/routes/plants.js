const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Mock data for when Supabase is not configured
const mockPlants = [
  {
    id: 1,
    name: 'Purple Coneflower',
    scientific_name: 'Echinacea purpurea',
    description: 'A beautiful native wildflower that attracts butterflies and bees.',
    image_url: 'https://images.pexels.com/photos/56866/garden-flower-purple-echinacea-56866.jpeg',
    care_level: 'Easy',
    water_needs: 'Low',
    sun_requirements: 'Full Sun',
    bloom_time: 'Summer to Fall',
    height: '2-4 feet',
    native_regions: ['Eastern US', 'Central US']
  },
  {
    id: 2,
    name: 'Black-Eyed Susan',
    scientific_name: 'Rudbeckia hirta',
    description: 'Bright yellow flowers that bloom from summer through fall.',
    image_url: 'https://images.pexels.com/photos/158028/bellis-perennis-daisy-flower-spring-158028.jpeg',
    care_level: 'Easy',
    water_needs: 'Low',
    sun_requirements: 'Full Sun',
    bloom_time: 'Summer to Fall',
    height: '1-3 feet',
    native_regions: ['Eastern US', 'Central US']
  },
  {
    id: 3,
    name: 'Wild Bergamot',
    scientific_name: 'Monarda fistulosa',
    description: 'Aromatic herb with lavender flowers, loved by pollinators.',
    image_url: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg',
    care_level: 'Easy',
    water_needs: 'Medium',
    sun_requirements: 'Full Sun to Partial Shade',
    bloom_time: 'Summer',
    height: '2-4 feet',
    native_regions: ['Eastern US', 'Central US', 'Western US']
  },
  {
    id: 4,
    name: 'New England Aster',
    scientific_name: 'Symphyotrichum novae-angliae',
    description: 'Late-season bloomer with purple flowers, important for fall pollinators.',
    image_url: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg',
    care_level: 'Easy',
    water_needs: 'Medium',
    sun_requirements: 'Full Sun',
    bloom_time: 'Fall',
    height: '3-6 feet',
    native_regions: ['Eastern US', 'Central US']
  },
  {
    id: 5,
    name: 'Wild Columbine',
    scientific_name: 'Aquilegia canadensis',
    description: 'Delicate red and yellow flowers, perfect for shade gardens.',
    image_url: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg',
    care_level: 'Medium',
    water_needs: 'Medium',
    sun_requirements: 'Partial Shade',
    bloom_time: 'Spring to Early Summer',
    height: '1-2 feet',
    native_regions: ['Eastern US', 'Central US']
  },
  {
    id: 6,
    name: 'Cardinal Flower',
    scientific_name: 'Lobelia cardinalis',
    description: 'Brilliant red flowers that attract hummingbirds.',
    image_url: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg',
    care_level: 'Medium',
    water_needs: 'High',
    sun_requirements: 'Partial Shade',
    bloom_time: 'Late Summer',
    height: '2-4 feet',
    native_regions: ['Eastern US', 'Central US']
  }
];

// GET /api/plants - Get all plants
router.get('/', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('plants')
        .select('*');
      
      if (error) {
        console.error('Supabase error:', error);
        return res.json(mockPlants);
      }
      
      res.json(data || mockPlants);
    } else {
      res.json(mockPlants);
    }
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.json(mockPlants);
  }
});

// GET /api/plants/:id - Get plant by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (supabase) {
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        const mockPlant = mockPlants.find(p => p.id === parseInt(id));
        return res.json(mockPlant || null);
      }
      
      res.json(data);
    } else {
      const mockPlant = mockPlants.find(p => p.id === parseInt(id));
      res.json(mockPlant || null);
    }
  } catch (error) {
    console.error('Error fetching plant:', error);
    const mockPlant = mockPlants.find(p => p.id === parseInt(req.params.id));
    res.json(mockPlant || null);
  }
});

// POST /api/plants/recommendations - Get plant recommendations
router.post('/recommendations', async (req, res) => {
  try {
    const { location, soilType, sunlight, waterAvailability } = req.body;
    
    // Simple recommendation logic using mock data
    let recommendations = [...mockPlants];
    
    // Filter by sunlight requirements
    if (sunlight) {
      recommendations = recommendations.filter(plant => 
        plant.sun_requirements.toLowerCase().includes(sunlight.toLowerCase()) ||
        plant.sun_requirements.toLowerCase().includes('full sun to partial shade')
      );
    }
    
    // Filter by water needs
    if (waterAvailability) {
      const waterMap = {
        'low': ['Low'],
        'medium': ['Low', 'Medium'],
        'high': ['Low', 'Medium', 'High']
      };
      
      if (waterMap[waterAvailability.toLowerCase()]) {
        recommendations = recommendations.filter(plant =>
          waterMap[waterAvailability.toLowerCase()].includes(plant.water_needs)
        );
      }
    }
    
    res.json(recommendations.slice(0, 10)); // Return top 10 recommendations
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

module.exports = router;