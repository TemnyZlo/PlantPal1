import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const Community = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: ''
  })

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const postsData = await api.getRecentPosts()
      setPosts(postsData)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const createPost = async (e) => {
    e.preventDefault()
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      return
    }

    try {
      setIsCreatingPost(true)
      const createdPost = await api.createPost({
        ...newPost,
        user_id: 'demo-user' // In a real app, this would be the current user's ID
      })
      
      setPosts(prev => [createdPost, ...prev])
      setNewPost({ title: '', content: '', tags: '' })
      setShowCreateModal(false)
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsCreatingPost(false)
    }
  }

  const likePost = async (postId) => {
    try {
      await api.likePost(postId)
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ))
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-plant-green-600">Community Garden</h1>
          <p className="text-gray-600 mt-2">Share your gardening experiences and learn from fellow gardeners</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)} 
          className="btn-primary"
        >
          📝 Share Your Experience
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {loading ? (
            <LoadingSpinner message="Loading community posts..." />
          ) : posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-plant-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-800">{post.user?.username || 'Anonymous'}</h3>
                      <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">{post.title}</h2>
                  <div className="prose prose-sm max-w-none text-gray-700 mb-4">
                    {post.content}
                  </div>
                  
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.split(',').map((tag, index) => (
                        <span key={index} className="badge badge-native">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => likePost(post.id)} 
                      className="flex items-center space-x-2 text-gray-600 hover:text-plant-green-600 transition-colors"
                    >
                      <span>❤️</span>
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <button className="hover:text-plant-green-600 transition-colors">Reply</button>
                      <button className="hover:text-plant-green-600 transition-colors">Share</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-6">Be the first to share your gardening experience with the community!</p>
              <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                Create First Post
              </button>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold text-plant-green-600">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Gardeners</span>
                  <span className="font-semibold text-plant-green-600">
                    {new Set(posts.map(p => p.user_id)).size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Likes</span>
                  <span className="font-semibold text-plant-green-600">
                    {posts.reduce((sum, post) => sum + post.likes, 0)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Popular Tags */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-native">#native-plants</span>
                <span className="badge badge-native">#gardening-tips</span>
                <span className="badge badge-native">#sustainability</span>
                <span className="badge badge-native">#beginners</span>
                <span className="badge badge-native">#herbs</span>
              </div>
            </div>
            
            {/* Quick Tips */}
            <div className="bg-plant-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-plant-green-800">💡 Quick Tips</h3>
              <ul className="space-y-2 text-sm text-plant-green-700">
                <li>• Share photos of your garden progress</li>
                <li>• Ask questions about plant care</li>
                <li>• Tag your posts for better discovery</li>
                <li>• Help fellow gardeners with advice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Share Your Gardening Experience</h2>
                <button 
                  onClick={() => setShowCreateModal(false)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <form onSubmit={createPost}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newPost.title}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="What's your post about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      name="content"
                      value={newPost.content}
                      onChange={handleInputChange}
                      rows="6"
                      className="input-field"
                      placeholder="Share your experience, tips, or ask questions..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={newPost.tags}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="native-plants, gardening-tips, beginners"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setShowCreateModal(false)} 
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={isCreatingPost}
                    >
                      {isCreatingPost ? 'Publishing...' : 'Publish Post'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Community