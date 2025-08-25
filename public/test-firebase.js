import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHI1JV_gxUE0tqnaWF9bWJvCwTrhzdSMM",
  authDomain: "risk-calculator-9251e.firebaseapp.com",
  projectId: "risk-calculator-9251e",
  storageBucket: "risk-calculator-9251e.firebasestorage.app",
  messagingSenderId: "657154942565",
  appId: "1:657154942565:web:85b75fe6769db548a0c88c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🔥 Firebase iniciado');

// Función para probar Firebase
async function testFirebase() {
  try {
    console.log('📝 Intentando escribir en Firebase...');
    
    const testDoc = {
      name: 'Prueba desde navegador',
      asset: 'Test Asset',
      description: 'Prueba de conectividad',
      threat: 'Test threat',
      vulnerability: 'Test vulnerability',
      method: 'qualitative',
      probability: 3,
      impact: 4,
      createdAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'riskAssessments'), testDoc);
    console.log('✅ Documento escrito con ID: ', docRef.id);
    
    console.log('📖 Leyendo documentos...');
    const querySnapshot = await getDocs(collection(db, 'riskAssessments'));
    console.log('📊 Total documentos:', querySnapshot.size);
    
    querySnapshot.forEach((doc) => {
      console.log('📄 Documento:', doc.id, '=>', doc.data());
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error Firebase:', error);
    return false;
  }
}

// Exportar para uso global
window.testFirebase = testFirebase;
window.db = db;

console.log('🎯 Ejecuta testFirebase() en la consola para probar');
