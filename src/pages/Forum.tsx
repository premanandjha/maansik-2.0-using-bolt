import React, { useState, useEffect } from 'react'
import { MessageSquare, ThumbsUp, Flag, Image, Paperclip } from 'lucide-react'

interface Post {
  id: number
  title: string
  content: string
  author: string
  date: string
  likes: number
  replies: number
  media?: string
}

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = () => {
    try {
      const storedPosts = localStorage.getItem('forumPosts')
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts))
      }
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Please try again later.')
    }
  }

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newPost: Post = {
        id: Date.now(),
        title: newPostTitle,
        content: newPostContent,
        author: 'Anonymous', // You can implement user authentication later
        date: new Date().toISOString(),
        likes: 0,
        replies: 0,
        media: mediaFile ? URL.createObjectURL(mediaFile) : undefined
      }
      const updatedPosts = [newPost, ...posts]
      setPosts(updatedPosts)
      localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
      setNewPostTitle('')
      setNewPostContent('')
      setMediaFile(null)
      setError(null)
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Failed to create post. Please try again.')
    }
  }

  const handleLike = (postId: number) => {
    try {
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
      setPosts(updatedPosts)
      localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
    } catch (err) {
      console.error('Error liking post:', err)
      setError('Failed to like post. Please try again.')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Mental Health Forum</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmitPost} className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Share your thoughts..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded h-32"
          required
        ></textarea>
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <label className="cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,video/*" />
              <Image size={20} className="text-gray-500 hover:text-green-600" />
            </label>
            <label className="cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
              <Paperclip size={20} className="text-gray-500 hover:text-green-600" />
            </label>
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Post
          </button>
        </div>
        {mediaFile && <p className="mt-2 text-sm text-gray-600">File selected: {mediaFile.name}</p>}
      </form>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.content}</p>
            {post.media && (
              <div className="mb-4">
                {post.media.endsWith('.mp4') ? (
                  <video src={post.media} controls className="w-full rounded" />
                ) : (
                  <img src={post.media} alt="Post media" className="w-full rounded" />
                )}
              </div>
            )}
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Posted by {post.author} on {new Date(post.date).toLocaleDateString()}</span>
              <div className="flex space-x-4">
                <button 
                  className="flex items-center space-x-1 hover:text-green-600"
                  onClick={() => handleLike(post.id)}
                >
                  <ThumbsUp size={16} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-600">
                  <MessageSquare size={16} />
                  <span>{post.replies}</span>
                </button>
                <button className="hover:text-red-600">
                  <Flag size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forum