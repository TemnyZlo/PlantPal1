const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Mock community posts
const mockPosts = [
  {
    id: 1,
    title: 'My First Native Garden Success!',
    content: 'Just wanted to share my experience with native plants this season. The purple coneflowers have been amazing!',
    author: 'GardenLover123',
    created_at: new Date().toISOString(),
    likes: 15,
    comments: 3
  },
  {
    id: 2,
    title: 'Best Native Plants for Butterflies?',
    content: 'Looking for recommendations on native plants that attract butterflies in the Midwest region.',
    author: 'ButterflyWatcher',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    likes: 8,
    comments: 12
  }
];

// GET /api/community/posts - Get all community posts
router.get('/posts', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        return res.json(mockPosts);
      }
      
      res.json(data || mockPosts);
    } else {
      res.json(mockPosts);
    }
  } catch (error) {
    console.error('Error fetching community posts:', error);
    res.json(mockPosts);
  }
});

// POST /api/community/posts - Create a new post
router.post('/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (supabase) {
      const { data, error } = await supabase
        .from('community_posts')
        .insert([{ title, content, author }])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Failed to create post' });
      }
      
      res.status(201).json(data);
    } else {
      const newPost = {
        id: mockPosts.length + 1,
        title,
        content,
        author,
        created_at: new Date().toISOString(),
        likes: 0,
        comments: 0
      };
      mockPosts.unshift(newPost);
      res.status(201).json(newPost);
    }
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

module.exports = router;