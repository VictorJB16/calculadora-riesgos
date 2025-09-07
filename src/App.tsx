import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import { PerformanceMonitor } from './components/PerformanceMonitor'
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
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<RiskCalculator />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </ErrorBoundary>
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
  const SentryErrorBoundary = Sentry.withErrorBoundary(
    () => (
      <ErrorBoundary>
        <PerformanceMonitor>
          <Router>
            <AppContent />
          </Router>
        </PerformanceMonitor>
      </ErrorBoundary>
    ),
    {
      fallback: ({ error, resetError }) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">¡Ups! Algo salió mal</h2>
            <p className="text-gray-600 mb-4">
              Ha ocurrido un error inesperado. El error ha sido reportado automáticamente.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {error instanceof Error ? error.message : 'Error desconocido'}
            </p>
            <button
              onClick={resetError}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      ),
      beforeCapture: (scope) => {
        scope.setTag('errorBoundary', true);
        scope.setContext('errorInfo', {
          timestamp: new Date().toISOString(),
          component: 'App ErrorBoundary'
        });
      }
    }
  );

  return <SentryErrorBoundary />;
}

export default App
