import React, { useState } from 'react';
import { useRiskAssessments } from '../hooks/useRiskAssessments';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Timestamp } from 'firebase/firestore';

interface RiskAssessment {
  id?: string;
  name: string;
  asset: string;
  description: string;
  threat: string;
  vulnerability: string;
  method: 'qualitative' | 'quantitative';
  probability: number;
  impact: number;
  vulnerabilitySeverity?: number;
  controlEffectiveness?: number;
  detectionCapability?: number;
  responseCapability?: number;
  confidentialityImpact?: number;
  integrityImpact?: number;
  availabilityImpact?: number;
  existingControls?: string;
  proposedControls?: string;
  inherentRisk?: number;
  residualRisk?: number;
  riskLevel?: string;
  createdAt: Date;
}

const RiskCalculator: React.FC = () => {
  const { assessments, addAssessment, loading } = useRiskAssessments();
  const [activeTab, setActiveTab] = useState<'calculator' | 'results' | 'matrix' | 'registry'>('calculator');
  
  const [formData, setFormData] = useState<Omit<RiskAssessment, 'id' | 'createdAt'>>({
    name: '',
    asset: '',
    description: '',
    threat: '',
    vulnerability: '',
    method: 'qualitative',
    probability: 1,
    impact: 1,
    vulnerabilitySeverity: 1,
    controlEffectiveness: 0,
    detectionCapability: 1,
    responseCapability: 1,
    confidentialityImpact: 1,
    integrityImpact: 1,
    availabilityImpact: 1,
    existingControls: '',
    proposedControls: ''
  });

  // Helper function to convert dates
  const formatDate = (date: Date | Timestamp | undefined): string => {
    if (!date) return '';
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString();
    }
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return '';
  };

  const calculateInherentRisk = () => {
    if (formData.method === 'qualitative') {
      return formData.probability * formData.impact;
    } else {
      // Método cuantitativo más complejo
      const vulnerabilityScore = formData.vulnerabilitySeverity || 1;
      const avgImpact = ((formData.confidentialityImpact || 1) + 
                       (formData.integrityImpact || 1) + 
                       (formData.availabilityImpact || 1)) / 3;
      return (formData.probability * vulnerabilityScore * avgImpact) / 10;
    }
  };

  const calculateResidualRisk = () => {
    const inherentRisk = calculateInherentRisk();
    const controlReduction = (formData.controlEffectiveness || 0) / 100;
    const detectionFactor = (6 - (formData.detectionCapability || 1)) / 5;
    const responseFactor = (6 - (formData.responseCapability || 1)) / 5;
    
    return inherentRisk * (1 - controlReduction) * (1 + detectionFactor + responseFactor) / 3;
  };

  const getRiskLevel = (riskScore: number) => {
    if (riskScore >= 20) return 'Crítico';
    if (riskScore >= 15) return 'Alto';
    if (riskScore >= 10) return 'Medio';
    if (riskScore >= 5) return 'Bajo';
    return 'Muy Bajo';
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Crítico': return 'bg-red-600 text-white';
      case 'Alto': return 'bg-red-500 text-white';
      case 'Medio': return 'bg-yellow-500 text-black';
      case 'Bajo': return 'bg-green-500 text-white';
      case 'Muy Bajo': return 'bg-green-400 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const inherentRisk = calculateInherentRisk();
    const residualRisk = calculateResidualRisk();
    const riskLevel = getRiskLevel(residualRisk);

    const assessment: RiskAssessment = {
      ...formData,
      inherentRisk,
      residualRisk,
      riskLevel,
      createdAt: new Date()
    };

    try {
      await addAssessment(assessment);
      setActiveTab('results');
      // Reset form
      setFormData({
        name: '',
        asset: '',
        description: '',
        threat: '',
        vulnerability: '',
        method: 'qualitative',
        probability: 1,
        impact: 1,
        vulnerabilitySeverity: 1,
        controlEffectiveness: 0,
        detectionCapability: 1,
        responseCapability: 1,
        confidentialityImpact: 1,
        integrityImpact: 1,
        availabilityImpact: 1,
        existingControls: '',
        proposedControls: ''
      });
    } catch (error) {
      console.error('Error al guardar la evaluación:', error);
      alert('Error al guardar la evaluación. Se guardará localmente.');
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      asset: '',
      description: '',
      threat: '',
      vulnerability: '',
      method: 'qualitative',
      probability: 1,
      impact: 1,
      vulnerabilitySeverity: 1,
      controlEffectiveness: 0,
      detectionCapability: 1,
      responseCapability: 1,
      confidentialityImpact: 1,
      integrityImpact: 1,
      availabilityImpact: 1,
      existingControls: '',
      proposedControls: ''
    });
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Nombre', 'Activo', 'Probabilidad', 'Impacto', 'Riesgo Inherente', 'Riesgo Residual', 'Nivel', 'Fecha'],
      ...assessments.map(a => [
        a.name, a.asset, a.probability, a.impact, 
        a.inherentRisk?.toFixed(2), a.residualRisk?.toFixed(2), 
        a.riskLevel, formatDate(a.createdAt)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evaluaciones-riesgo.csv';
    a.click();
  };

  const renderMatrix = () => {
    const matrix = Array(5).fill(null).map(() => Array(5).fill([]));
    
    assessments.forEach(assessment => {
      const prob = Math.min(assessment.probability - 1, 4);
      const impact = Math.min(assessment.impact - 1, 4);
      matrix[4 - impact][prob] = [...matrix[4 - impact][prob], assessment];
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Matriz de Riesgo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-1 text-sm">
            <div></div>
            {[1,2,3,4,5].map(i => (
              <div key={i} className="text-center font-semibold p-2">P{i}</div>
            ))}
            {matrix.map((row, i) => (
              <React.Fragment key={i}>
                <div className="text-center font-semibold p-2">I{5-i}</div>
                {row.map((cell: RiskAssessment[], j) => (
                  <div key={j} className={`p-2 border min-h-16 ${
                    (5-i) * (j+1) >= 20 ? 'bg-red-600' :
                    (5-i) * (j+1) >= 15 ? 'bg-red-500' :
                    (5-i) * (j+1) >= 10 ? 'bg-yellow-500' :
                    (5-i) * (j+1) >= 5 ? 'bg-green-500' : 'bg-green-400'
                  }`}>
                    {cell.map((assessment, k) => (
                      <div key={k} className="text-xs bg-white bg-opacity-80 p-1 mb-1 rounded">
                        {assessment.name}
                      </div>
                    ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calculadora de Riesgo de Ciberseguridad</h1>
        <p className="text-gray-600">Complete los campos para evaluar el riesgo utilizando metodologías cualitativas o cuantitativas</p>
      </div>

      {/* Navegación por pestañas */}
      <div className="flex space-x-1 mb-6 border-b">
        {[
          { key: 'calculator', label: 'Calculadora' },
          { key: 'results', label: 'Resultados' },
          { key: 'matrix', label: 'Matriz' },
          { key: 'registry', label: 'Registro' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'calculator' | 'results' | 'matrix' | 'registry')}
            className={`px-4 py-2 font-medium rounded-t-lg ${
              activeTab === tab.key 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'calculator' && (
        <Card>
          <CardHeader>
            <CardTitle>Evaluación de Riesgo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Riesgo *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activo Afectado *
                  </label>
                  <Input
                    type="text"
                    value={formData.asset}
                    onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción de la Amenaza *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.threat}
                    onChange={(e) => setFormData({ ...formData, threat: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción de la Vulnerabilidad *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.vulnerability}
                    onChange={(e) => setFormData({ ...formData, vulnerability: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de Cálculo
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="qualitative"
                      checked={formData.method === 'qualitative'}
                      onChange={(e) => setFormData({ ...formData, method: e.target.value as 'qualitative' | 'quantitative' })}
                      className="mr-2"
                    />
                    Cualitativo
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="quantitative"
                      checked={formData.method === 'quantitative'}
                      onChange={(e) => setFormData({ ...formData, method: e.target.value as 'qualitative' | 'quantitative' })}
                      className="mr-2"
                    />
                    Cuantitativo
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Probabilidad (1-5) <br />
                    <span className="text-xs text-gray-500">1=Muy Baja, 5=Muy Alta</span>
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.probability}
                    onChange={(e) => setFormData({ ...formData, probability: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Impacto (1-5) <br />
                    <span className="text-xs text-gray-500">1=Mínimo, 5=Catastrófico</span>
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: parseInt(e.target.value) })}
                    required
                  />
                </div>

                {formData.method === 'quantitative' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Severidad Vulnerabilidad (1-10) <br />
                        <span className="text-xs text-gray-500">Basado en escala CVSS</span>
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.vulnerabilitySeverity}
                        onChange={(e) => setFormData({ ...formData, vulnerabilitySeverity: parseInt(e.target.value) })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Efectividad de Controles (%)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.controlEffectiveness}
                        onChange={(e) => setFormData({ ...formData, controlEffectiveness: parseInt(e.target.value) })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Capacidad de Detección (1-5)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={formData.detectionCapability}
                        onChange={(e) => setFormData({ ...formData, detectionCapability: parseInt(e.target.value) })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Capacidad de Respuesta (1-5)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={formData.responseCapability}
                        onChange={(e) => setFormData({ ...formData, responseCapability: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Evaluación de Impacto por Dimensión</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confidencialidad (1-5)
                          </label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={formData.confidentialityImpact}
                            onChange={(e) => setFormData({ ...formData, confidentialityImpact: parseInt(e.target.value) })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Integridad (1-5)
                          </label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={formData.integrityImpact}
                            onChange={(e) => setFormData({ ...formData, integrityImpact: parseInt(e.target.value) })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Disponibilidad (1-5)
                          </label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={formData.availabilityImpact}
                            onChange={(e) => setFormData({ ...formData, availabilityImpact: parseInt(e.target.value) })}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Controles Existentes
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.existingControls}
                    onChange={(e) => setFormData({ ...formData, existingControls: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Controles Propuestos
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.proposedControls}
                    onChange={(e) => setFormData({ ...formData, proposedControls: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>
                  Calcular Riesgo
                </Button>
                <Button type="button" onClick={clearForm} className="bg-gray-500 hover:bg-gray-600">
                  Limpiar Formulario
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'results' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Resultados de Evaluaciones</h2>
            <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700">
              Exportar CSV
            </Button>
          </div>
          
          <div className="grid gap-4">
            {assessments.map((assessment, index) => (
              <Card key={assessment.id || index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{assessment.name}</CardTitle>
                    <Badge className={getRiskColor(assessment.riskLevel || 'Bajo')}>
                      {assessment.riskLevel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Activo: {assessment.asset}</p>
                      <p className="text-sm text-gray-600">Probabilidad: {assessment.probability}/5</p>
                      <p className="text-sm text-gray-600">Impacto: {assessment.impact}/5</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Riesgo Inherente: {assessment.inherentRisk?.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Riesgo Residual: {assessment.residualRisk?.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Método: {assessment.method === 'qualitative' ? 'Cualitativo' : 'Cuantitativo'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fecha: {formatDate(assessment.createdAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'matrix' && renderMatrix()}

      {activeTab === 'registry' && (
        <Card>
          <CardHeader>
            <CardTitle>Registro de Riesgos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">Activo</th>
                    <th className="text-left p-2">Nivel</th>
                    <th className="text-left p-2">Inherente</th>
                    <th className="text-left p-2">Residual</th>
                    <th className="text-left p-2">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((assessment, index) => (
                    <tr key={assessment.id || index} className="border-b">
                      <td className="p-2">{assessment.name}</td>
                      <td className="p-2">{assessment.asset}</td>
                      <td className="p-2">
                        <Badge className={getRiskColor(assessment.riskLevel || 'Bajo')}>
                          {assessment.riskLevel}
                        </Badge>
                      </td>
                      <td className="p-2">{assessment.inherentRisk?.toFixed(2)}</td>
                      <td className="p-2">{assessment.residualRisk?.toFixed(2)}</td>
                      <td className="p-2">{formatDate(assessment.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RiskCalculator;
