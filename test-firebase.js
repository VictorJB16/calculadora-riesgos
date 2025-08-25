import { db } from './src/lib/firebase.ts';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Función de prueba para Firebase
async function testFirebase() {
  try {
    console.log('🔥 Probando conexión a Firebase...');
    
    // Crear un documento de prueba
    const testData = {
      name: 'Prueba de Riesgo de Seguridad',
      asset: 'Servidor Web Principal',
      description: 'Evaluación de prueba para verificar conectividad con Firebase',
      threat: 'Ataque DDoS',
      vulnerability: 'Configuración de firewall insuficiente',
      method: 'qualitative',
      probability: 3,
      impact: 4,
      inherentRisk: 12,
      residualRisk: 8,
      riskLevel: 'Medio',
      createdAt: new Date(),
      testDocument: true
    };

    // Insertar documento
    console.log('📝 Insertando documento de prueba...');
    const docRef = await addDoc(collection(db, 'riskAssessments'), testData);
    console.log('✅ Documento insertado con ID:', docRef.id);

    // Leer documentos
    console.log('📖 Leyendo documentos de Firebase...');
    const querySnapshot = await getDocs(collection(db, 'riskAssessments'));
    console.log('📊 Total de documentos encontrados:', querySnapshot.size);
    
    querySnapshot.forEach((doc) => {
      console.log('📄 Documento:', doc.id, '=>', doc.data());
    });

    console.log('🎉 ¡Prueba de Firebase completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error en la prueba de Firebase:', error);
  }
}

// Ejecutar prueba
testFirebase();
