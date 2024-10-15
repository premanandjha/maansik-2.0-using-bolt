import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Menu, X, Home } from 'lucide-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="text-green-600" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">
              Maansik
            </span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-600 hover:text-green-600 transition-colors flex items-center"><Home size={18} className="mr-1" /> Home</Link></li>
              <li><Link to="/forum" className="text-gray-600 hover:text-green-600 transition-colors">Forum</Link></li>
              <li><Link to="/search" className="text-gray-600 hover:text-green-600 transition-colors">Find Help</Link></li>
              <li><Link to="/journal" className="text-gray-600 hover:text-green-600 transition-colors">Journal</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-green-600 transition-colors">Resources</Link></li>
            </ul>
          </nav>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2">
              <li><Link to="/" className="block py-2 text-gray-600 hover:text-green-600 transition-colors flex items-center" onClick={toggleMenu}><Home size={18} className="mr-1" /> Home</Link></li>
              <li><Link to="/forum" className="block py-2 text-gray-600 hover:text-green-600 transition-colors" onClick={toggleMenu}>Forum</Link></li>
              <li><Link to="/search" className="block py-2 text-gray-600 hover:text-green-600 transition-colors" onClick={toggleMenu}>Find Help</Link></li>
              <li><Link to="/journal" className="block py-2 text-gray-600 hover:text-green-600 transition-colors" onClick={toggleMenu}>Journal</Link></li>
              <li><Link to="/resources" className="block py-2 text-gray-600 hover:text-green-600 transition-colors" onClick={toggleMenu}>Resources</Link></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header