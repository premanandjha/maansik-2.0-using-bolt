import React, { useState, useEffect } from 'react'
import { Book, Video, FileText, ExternalLink } from 'lucide-react'

interface Resource {
  id: number
  title: string
  type: 'article' | 'video' | 'book'
  description: string
  link: string
}

const sampleResources: Resource[] = [
  {
    id: 1,
    title: "Understanding Anxiety: Causes, Symptoms, and Treatment",
    type: "article",
    description: "A comprehensive guide to anxiety disorders, their causes, and various treatment options.",
    link: "https://example.com/anxiety-guide"
  },
  {
    id: 2,
    title: "Mindfulness Meditation for Stress Reduction",
    type: "video",
    description: "A 15-minute guided meditation video to help reduce stress and promote relaxation.",
    link: "https://example.com/mindfulness-video"
  },
  {
    id: 3,
    title: "The Power of Vulnerability by Brené Brown",
    type: "book",
    description: "A transformative book about embracing vulnerability and living wholeheartedly.",
    link: "https://example.com/vulnerability-book"
  },
  // Add more sample resources as needed
]

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [filter, setFilter] = useState<'all' | 'article' | 'video' | 'book'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = () => {
    try {
      // In a real application, you would fetch resources from an API
      // For now, we'll use the sample resources
      setResources(sampleResources)
    } catch (err) {
      console.error('Error fetching resources:', err)
      setError('Failed to load resources. Please try again later.')
    }
  }

  const filteredResources = resources
    .filter(resource => filter === 'all' || resource.type === filter)
    .filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const ResourceIcon: React.FC<{ type: Resource['type'] }> = ({ type }) => {
    switch (type) {
      case 'article':
        return <FileText className="text-blue-500" size={24} />
      case 'video':
        return <Video className="text-red-500" size={24} />
      case 'book':
        return <Book className="text-green-500" size={24} />
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Mental Health Resources</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('article')}
            className={`px-4 py-2 rounded-full ${filter === 'article' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Articles
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 rounded-full ${filter === 'video' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Videos
          </button>
          <button
            onClick={() => setFilter('book')}
            className={`px-4 py-2 rounded-full ${filter === 'book' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Books
          </button>
        </div>
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <ResourceIcon type={resource.type} />
              <h3 className="text-xl font-semibold">{resource.title}</h3>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-600 hover:text-green-800 font-medium"
            >
              Learn More
              <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resources