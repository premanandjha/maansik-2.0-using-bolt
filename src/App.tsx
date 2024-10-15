import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Forum from './pages/Forum'
import Search from './pages/Search'
import Journal from './pages/Journal'
import Resources from './pages/Resources'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/search" element={<Search />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App