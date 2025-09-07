import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { captureError, addBreadcrumb, setContext, captureMessage } from '../lib/sentry'

export interface RiskAssessment {
  id?: string
  name: string
  asset: string
  description: string
  threat: string
  vulnerability: string
  method: 'qualitative' | 'quantitative'
  probability: number
  impact: number
  vulnerabilitySeverity?: number
  controlEffectiveness?: number
  detectionCapability?: number
  responseCapability?: number
  confidentialityImpact?: number
  integrityImpact?: number
  availabilityImpact?: number
  existingControls?: string
  proposedControls?: string
  inherentRisk?: number
  residualRisk?: number
  riskLevel?: string
  createdAt?: Timestamp | Date
  organization?: string
}

interface FirebaseError extends Error {
  code?: string;
}

export const useRiskAssessments = () => {
  const [assessments, setAssessments] = useState<RiskAssessment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  console.log('🔥 Hook useRiskAssessments inicializado')
  addBreadcrumb('useRiskAssessments hook initialized', 'navigation')

  // Función para verificar si Firebase está disponible
  const isFirebaseAvailable = () => {
    try {
      return !!db && import.meta.env.VITE_FIREBASE_PROJECT_ID !== undefined;
    } catch {
      return false;
    }
  };

  // Cargar evaluaciones desde Firebase
  const loadAssessments = async () => {
    console.log('🔄 loadAssessments: Iniciando carga desde Firebase...')
    addBreadcrumb('Starting to load assessments from Firebase', 'data')
    setLoading(true)
    setError(null)
    
    // Primero intentar cargar desde localStorage como cache
    try {
      const localAssessments = localStorage.getItem('riskAssessments')
      if (localAssessments) {
        const parsed = JSON.parse(localAssessments)
        const converted = parsed.map((a: RiskAssessment & { createdAt: string | Timestamp }) => ({
          ...a,
          createdAt: typeof a.createdAt === 'string' ? new Date(a.createdAt) : a.createdAt
        }))
        setAssessments(converted)
        console.log('📱 Cargados datos desde localStorage como cache:', converted.length, 'evaluaciones')
      }
    } catch (localError) {
      console.warn('⚠️ Error cargando cache de localStorage:', localError)
    }
    
    // Luego intentar cargar desde Firebase
    if (!isFirebaseAvailable()) {
      console.warn('⚠️ Firebase no está disponible, usando solo localStorage')
      captureMessage('Firebase not available, using localStorage only', 'warning')
      setLoading(false)
      return
    }
    
    try {
      console.log('📊 Ejecutando query a Firebase...')
      const q = query(collection(db, 'riskAssessments'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      console.log(`📝 Firebase devolvió ${querySnapshot.size} documentos`)
      addBreadcrumb(`Firebase returned ${querySnapshot.size} documents`, 'data', {
        documentCount: querySnapshot.size
      })
      
      const loadedAssessments: RiskAssessment[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        loadedAssessments.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt || new Date()
        } as RiskAssessment)
      })
      
      setAssessments(loadedAssessments)
      
      // Actualizar localStorage con datos de Firebase
      localStorage.setItem('riskAssessments', JSON.stringify(loadedAssessments))
      
      setContext('assessments_loaded', {
        count: loadedAssessments.length,
        source: 'firebase'
      })
      
      captureMessage(`Successfully loaded ${loadedAssessments.length} assessments from Firebase`, 'info')
    } catch (err) {
      console.error('❌ Error loading assessments from Firebase:', err)
      const error = err as Error
      
      // Verificar si es un error de permisos específicamente
      if (error.message.includes('Missing or insufficient permissions')) {
        console.warn('🔒 Error de permisos de Firebase - usando localStorage')
        captureMessage('Firebase permissions error - falling back to localStorage', 'warning')
        setError('Usando almacenamiento local. Para sincronización completa, revisa la configuración de Firebase.')
      } else {
        captureError(error, {
          operation: 'loadAssessments',
          source: 'firebase',
          errorCode: (error as FirebaseError).code,
          errorMessage: error.message
        })
        setError('Error al cargar desde Firebase. Usando datos locales.')
      }
      
      // Los datos de localStorage ya están cargados arriba
    } finally {
      setLoading(false)
    }
  }

  // Guardar nueva evaluación
  const addAssessment = async (assessment: Omit<RiskAssessment, 'id' | 'createdAt'>) => {
    console.log('💾 addAssessment: Guardando evaluación:', assessment)
    addBreadcrumb('Saving new risk assessment', 'data', {
      method: assessment.method,
      asset: assessment.asset
    })
    setLoading(true)
    setError(null)
    
    const newAssessment: RiskAssessment = {
      ...assessment,
      createdAt: new Date() // Usar Date en lugar de Timestamp para localStorage
    }
    
    // Primero guardar en localStorage inmediatamente
    const tempId = Date.now().toString()
    const localAssessment = { 
      ...newAssessment, 
      id: tempId
    }
    
    try {
      // Actualizar estado local inmediatamente
      setAssessments(prev => [localAssessment, ...prev])
      
      // Guardar en localStorage
      const updatedAssessments = [localAssessment, ...assessments]
      localStorage.setItem('riskAssessments', JSON.stringify(updatedAssessments))
      
      console.log('� Guardado en localStorage con ID temporal:', tempId)
      
      // Luego intentar guardar en Firebase si está disponible
      if (isFirebaseAvailable()) {
        console.log('�🔥 Enviando a Firebase:', newAssessment)
        const docRef = await addDoc(collection(db, 'riskAssessments'), {
          ...newAssessment,
          createdAt: Timestamp.now() // Usar Timestamp para Firebase
        })
        
        console.log('✅ Firebase devolvió ID:', docRef.id)
        
        // Actualizar con el ID real de Firebase
        const firebaseAssessment = { 
          ...newAssessment, 
          id: docRef.id
        }
        
        setAssessments(prev => prev.map(a => 
          a.id === tempId ? firebaseAssessment : a
        ))
        
        // Actualizar localStorage con ID real
        const finalAssessments = [firebaseAssessment, ...assessments]
        localStorage.setItem('riskAssessments', JSON.stringify(finalAssessments))
        
        addBreadcrumb('Assessment saved to Firebase', 'data', {
          assessmentId: docRef.id
        })
        
        setContext('assessment_saved', {
          id: docRef.id,
          method: assessment.method,
          source: 'firebase'
        })
        
        captureMessage(`Assessment saved successfully to Firebase with ID: ${docRef.id}`, 'info')
        
        return firebaseAssessment
      } else {
        console.warn('⚠️ Firebase no disponible, guardado solo en localStorage')
        captureMessage('Firebase not available, saved to localStorage only', 'warning')
        
        setContext('assessment_saved', {
          id: tempId,
          method: assessment.method,
          source: 'localStorage'
        })
        
        return localAssessment
      }
    } catch (err) {
      console.error('❌ Error saving assessment:', err)
      const error = err as Error
      
      if (error.message.includes('Missing or insufficient permissions')) {
        console.warn('🔒 Error de permisos de Firebase - manteniendo en localStorage')
        captureMessage('Firebase permissions error during save - assessment kept in localStorage', 'warning')
        setError('Evaluación guardada localmente. Para sincronización completa, revisa la configuración de Firebase.')
      } else {
        captureError(error, {
          operation: 'addAssessment',
          assessment: {
            method: assessment.method,
            asset: assessment.asset
          },
          errorCode: (error as FirebaseError).code,
          errorMessage: error.message
        })
        setError('Error al sincronizar con Firebase. Evaluación guardada localmente.')
      }
      
      // La evaluación ya está guardada en localStorage y en el estado
      return localAssessment
    } finally {
      setLoading(false)
    }
  }

  // Alias para compatibilidad
  const saveAssessment = addAssessment

  // Cargar evaluaciones al inicializar
  useEffect(() => {
    console.log('🚀 useEffect: Hook montado, iniciando carga...')
    loadAssessments()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    assessments,
    loading,
    error,
    addAssessment,
    saveAssessment,
    loadAssessments,
    isFirebaseAvailable: isFirebaseAvailable()
  }
}
