import React, { useState } from 'react'
import { Search as SearchIcon, MapPin, Star, Phone } from 'lucide-react'

interface Provider {
  id: number
  name: string
  specialty: string
  location: string
  rating: number
  distance: string
  phone: string
}

const sampleProviders: Provider[] = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialty: "Clinical Psychologist",
    location: "New York, NY",
    rating: 4.8,
    distance: "2.5 miles",
    phone: "(555) 123-4567"
  },
  {
    id: 2,
    name: "Michael Chen, LMFT",
    specialty: "Marriage and Family Therapist",
    location: "San Francisco, CA",
    rating: 4.6,
    distance: "3.2 miles",
    phone: "(555) 987-6543"
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    specialty: "Psychiatrist",
    location: "Chicago, IL",
    rating: 4.9,
    distance: "1.8 miles",
    phone: "(555) 246-8135"
  }
]

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [providers, setProviders] = useState<Provider[]>(sampleProviders)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredProviders = sampleProviders.filter(
      provider => provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  provider.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setProviders(filteredProviders)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Find Mental Health Providers</h1>
      
      <form onSubmit={handleSearch} className="flex space-x-4">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search by name, specialty, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Search
        </button>
      </form>

      <div className="space-y-6">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <img
              src={`https://source.unsplash.com/random/100x100?face&${provider.id}`}
              alt={provider.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2">{provider.name}</h3>
              <p className="text-purple-600 font-medium mb-2">{provider.specialty}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {provider.location}
                </span>
                <span className="flex items-center">
                  <Star size={16} className="mr-1 text-yellow-500" />
                  {provider.rating}
                </span>
                <span>{provider.distance}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-1" />
                {provider.phone}
              </div>
            </div>
            <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search