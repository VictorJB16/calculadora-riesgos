import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function About() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Acerca de Risk-Calcu</h1>
        <p className="text-xl text-gray-600">
          Conoce más sobre nuestra metodología y compromiso con la seguridad informática en Costa Rica
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Nuestra Metodología</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Risk-Calcu utiliza una metodología híbrida que combina los mejores aspectos de 
              frameworks internacionales reconocidos:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">🏗️ Base Metodológica</h3>
                <ul className="text-sm space-y-1">
                  <li>• ISO 27005 - Gestión de Riesgos de Seguridad</li>
                  <li>• ISO 31000 - Gestión de Riesgos</li>
                  <li>• NIST SP 800-30 - Risk Assessment</li>
                  <li>• OCTAVE - Evaluación Operativa</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🇨🇷 Adaptación Local</h3>
                <ul className="text-sm space-y-1">
                  <li>• Ley de Protección de Datos (8968)</li>
                  <li>• Normativas SUTEL y MICITT</li>
                  <li>• Amenazas regionales específicas</li>
                  <li>• Contexto empresarial costarricense</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proceso de Evaluación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <h3 className="font-semibold mb-2">Identificación</h3>
                <p className="text-sm text-gray-600">
                  Catalogación de activos, amenazas y vulnerabilidades
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <h3 className="font-semibold mb-2">Evaluación</h3>
                <p className="text-sm text-gray-600">
                  Análisis cuantitativo de impacto y probabilidad
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <h3 className="font-semibold mb-2">Tratamiento</h3>
                <p className="text-sm text-gray-600">
                  Recomendaciones específicas para mitigación
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compromiso con Costa Rica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Desarrollado específicamente para el ecosistema digital costarricense, Risk-Calcu 
              considera las particularidades del marco regulatorio nacional y las amenazas 
              específicas de la región centroamericana.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🎯 Sectores Objetivo</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <span>• Banca y Finanzas</span>
                <span>• Gobierno</span>
                <span>• Telecomunicaciones</span>
                <span>• Salud</span>
                <span>• Educación</span>
                <span>• Manufactura</span>
                <span>• Comercio</span>
                <span>• Servicios</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacto y Soporte</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Para consultas específicas, capacitaciones o implementaciones empresariales:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> soporte@risk-calcu.cr</p>
              <p><strong>Teléfono:</strong> +506 2XXX-XXXX</p>
              <p><strong>Ubicación:</strong> San José, Costa Rica</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
