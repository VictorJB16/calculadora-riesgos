import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RiskCalculator from './pages/RiskCalculator'
import About from './pages/About'
import './App.css'

function AppContent() {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPath={location.pathname} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<RiskCalculator />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className="border-t border-gray-200 mt-12 bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 Risk-Calcu. Herramienta de evaluación de riesgos para Costa Rica.</p>
            <p className="mt-2">
              Desarrollado con tecnologías modernas para la seguridad informática nacional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
