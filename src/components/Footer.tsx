import React from 'react'
import { Brain } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex items-center">
              <Brain className="text-green-400 mr-2" size={24} />
              <span className="text-xl font-bold">Maansik</span>
            </div>
            <p className="mt-2 text-sm">Empowering mental wellness, one step at a time.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/forum" className="hover:text-green-400 transition-colors">Forum</a></li>
              <li><a href="/search" className="hover:text-green-400 transition-colors">Find Help</a></li>
              <li><a href="/journal" className="hover:text-green-400 transition-colors">Journal</a></li>
              <li><a href="/resources" className="hover:text-green-400 transition-colors">Resources</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
            <p className="text-sm mb-2">Stay updated on our latest resources and community events.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 Maansik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer