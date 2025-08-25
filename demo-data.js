// Script para probar Firebase y generar datos de demostración
console.log('🔥 Iniciando prueba de Firebase...');

// Datos de prueba para demostración
const sampleData = [
  {
    name: 'Vulnerabilidad en Servidor Web',
    asset: 'Servidor Apache Principal',
    description: 'Servidor web con versión desactualizada presenta vulnerabilidades de seguridad',
    threat: 'Explotación de vulnerabilidades conocidas (CVE-2023-XXXX)',
    vulnerability: 'Software Apache HTTP Server versión 2.4.41 con parches de seguridad pendientes',
    method: 'quantitative',
    probability: 4,
    impact: 4,
    vulnerabilitySeverity: 7.5,
    controlEffectiveness: 60,
    detectionCapability: 3,
    responseCapability: 2,
    confidentialityImpact: 3,
    integrityImpact: 4,
    availabilityImpact: 5,
    existingControls: 'Firewall perimetral, IDS básico, logs de acceso',
    proposedControls: 'Actualización de software, WAF, monitoreo 24/7, respuesta automática'
  },
  {
    name: 'Acceso No Autorizado Base de Datos',
    asset: 'Base de Datos MySQL Clientes',
    description: 'Riesgo de acceso no autorizado a información sensible de clientes',
    threat: 'Inyección SQL, credenciales débiles, acceso directo',
    vulnerability: 'Contraseñas débiles en cuentas administrativas, puertos expuestos',
    method: 'qualitative',
    probability: 3,
    impact: 5,
    existingControls: 'Autenticación básica, backup diario',
    proposedControls: 'Autenticación multifactor, encriptación, auditoría de accesos'
  },
  {
    name: 'Ataque de Phishing a Empleados',
    asset: 'Cuentas de Correo Corporativo',
    description: 'Empleados pueden ser víctimas de ataques de phishing dirigidos',
    threat: 'Correos maliciosos, suplantación de identidad, ingeniería social',
    vulnerability: 'Falta de capacitación en seguridad, ausencia de filtros avanzados',
    method: 'qualitative',
    probability: 4,
    impact: 3,
    existingControls: 'Filtro de spam básico, políticas de seguridad',
    proposedControls: 'Capacitación mensual, simulacros de phishing, filtros avanzados'
  }
];

console.log('📊 Datos de prueba preparados:');
console.log(`- ${sampleData.length} evaluaciones de riesgo`);
console.log('- Métodos: Cualitativo y Cuantitativo');
console.log('- Sectores: Servidor Web, Base de Datos, Email');

// Función para simular el guardado en Firebase
function simulateFirebaseSave(data) {
  console.log('💾 Simulando guardado en Firebase...');
  
  data.forEach((item, index) => {
    setTimeout(() => {
      // Calcular riesgos
      const inherentRisk = item.method === 'qualitative' 
        ? item.probability * item.impact
        : (item.probability * (item.vulnerabilitySeverity || 1) * 
           ((item.confidentialityImpact + item.integrityImpact + item.availabilityImpact) / 3)) / 10;
      
      const controlReduction = (item.controlEffectiveness || 0) / 100;
      const residualRisk = inherentRisk * (1 - controlReduction);
      
      let riskLevel = 'Bajo';
      if (residualRisk >= 20) riskLevel = 'Crítico';
      else if (residualRisk >= 15) riskLevel = 'Alto';
      else if (residualRisk >= 10) riskLevel = 'Medio';
      else if (residualRisk >= 5) riskLevel = 'Bajo';
      else riskLevel = 'Muy Bajo';
      
      console.log(`✅ [${index + 1}/${data.length}] ${item.name}`);
      console.log(`   📈 Riesgo Inherente: ${inherentRisk.toFixed(2)}`);
      console.log(`   📉 Riesgo Residual: ${residualRisk.toFixed(2)}`);
      console.log(`   🎯 Nivel: ${riskLevel}`);
      console.log(`   📅 Fecha: ${new Date().toLocaleDateString()}`);
      console.log('');
      
    }, index * 500);
  });
}

// Ejecutar simulación
simulateFirebaseSave(sampleData);

console.log('🎉 Prueba completada! Ve a la aplicación para ver los resultados.');
