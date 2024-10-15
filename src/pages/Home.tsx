import React from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Search, BookOpen, PenTool } from 'lucide-react'

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; link: string }> = ({ icon, title, description, link }) => (
  <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="text-green-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link to={link} className="text-green-600 hover:text-green-800 font-medium">
      Learn More &rarr;
    </Link>
  </div>
)

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">
          Welcome to Maansik
        </h1>
        <p className="text-xl text-gray-600 mb-8">Your journey to mental wellness starts here.</p>
        <Link
          to="/forum"
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Join Our Community
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<MessageSquare size={40} />}
          title="Mental Health Forum"
          description="Connect with others, share experiences, and find support in our moderated community."
          link="/forum"
        />
        <FeatureCard
          icon={<Search size={40} />}
          title="Find Help"
          description="Discover mental health professionals and services tailored to your needs."
          link="/search"
        />
        <FeatureCard
          icon={<PenTool size={40} />}
          title="Mood Journal"
          description="Track your emotional well-being and gain insights into your mental health journey."
          link="/journal"
        />
        <FeatureCard
          icon={<BookOpen size={40} />}
          title="Resources"
          description="Access a wealth of articles, videos, and educational materials on mental health."
          link="/resources"
        />
      </section>

      <section className="bg-green-100 bg-opacity-80 backdrop-blur-md rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Wellness Journey Today</h2>
        <p className="text-xl text-gray-700 mb-6">
          Join thousands of others who have taken the first step towards better mental health.
        </p>
        <Link
          to="/journal"
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Create Your First Journal Entry
        </Link>
      </section>
    </div>
  )
}

export default Home