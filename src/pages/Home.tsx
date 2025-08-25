import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calculator, BarChart3, FileText, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Calculadora de Riesgo
          </h1>
          <p className="text-xl text-gray-600 mb-2">Ciberseguridad</p>
          <p className="text-lg text-blue-600 font-medium mb-8">ISO 27005 / NIST SP 800-30</p>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-gray-700 mb-6">
              Bienvenido a la Calculadora de Riesgo de Ciberseguridad
            </p>
            <p className="text-gray-600 leading-relaxed">
              Herramienta profesional para evaluación y gestión de riesgos basada en
              metodologías estándar como ISO 27005 y NIST SP 800-30. Evalúe riesgos utilizando métodos
              cualitativos y cuantitativos con análisis comparativo inherente vs residual.
            </p>
          </div>
          
          <Link to="/calculator">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              Comenzar Evaluación
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Cálculo Preciso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Métodos cualitativo y cuantitativo
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Análisis Visual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Matriz de riesgo interactiva
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Registro Completo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Gestión de registro de riesgos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Calculadora de Riesgo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Herramienta profesional para la evaluación y gestión de riesgos de
              ciberseguridad, basada en estándares internacionales como ISO 27005 y NIST SP 800-30.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Análisis cualitativo y cuantitativo</li>
                  <li>• Matriz de riesgo interactiva</li>
                  <li>• Comparación inherente vs residual</li>
                  <li>• Registro de riesgos completo</li>
                  <li>• Exportación CSV/JSON</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Metodologías</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• ISO 27005:2018</li>
                  <li>• NIST SP 800-30</li>
                  <li>• Escala CVSS</li>
                  <li>• Análisis ALE/SLE</li>
                  <li>• Cálculo ROSI</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Calculadora de Riesgo de Ciberseguridad. Desarrollada con Next.js y
            ShadCN.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
