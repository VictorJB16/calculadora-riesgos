import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

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

export const useRiskAssessments = () => {
  const [assessments, setAssessments] = useState<RiskAssessment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  console.log('🔥 Hook useRiskAssessments inicializado')

  // Cargar evaluaciones desde Firebase
  const loadAssessments = async () => {
    console.log('🔄 loadAssessments: Iniciando carga desde Firebase...')
    setLoading(true)
    setError(null)
    
    try {
      console.log('📊 Ejecutando query a Firebase...')
      const q = query(collection(db, 'riskAssessments'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      console.log(`📝 Firebase devolvió ${querySnapshot.size} documentos`)
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
    } catch (err) {
      console.error('Error loading assessments:', err)
      setError('Error al cargar las evaluaciones')
      // Fallback a localStorage si Firebase falla
      const localAssessments = localStorage.getItem('riskAssessments')
      if (localAssessments) {
        const parsed = JSON.parse(localAssessments)
        const converted = parsed.map((a: RiskAssessment & { createdAt: string }) => ({
          ...a,
          createdAt: new Date(a.createdAt)
        }))
        setAssessments(converted)
      }
    } finally {
      setLoading(false)
    }
  }

  // Guardar nueva evaluación
  const addAssessment = async (assessment: Omit<RiskAssessment, 'id' | 'createdAt'>) => {
    console.log('💾 addAssessment: Guardando evaluación:', assessment)
    setLoading(true)
    setError(null)
    
    const newAssessment: RiskAssessment = {
      ...assessment,
      createdAt: Timestamp.now()
    }
    
    try {
      console.log('🔥 Enviando a Firebase:', newAssessment)
      const docRef = await addDoc(collection(db, 'riskAssessments'), newAssessment)
      console.log('✅ Firebase devolvió ID:', docRef.id)
      
      const savedAssessment = { 
        ...newAssessment, 
        id: docRef.id,
        createdAt: new Date()
      }
      
      setAssessments(prev => [savedAssessment, ...prev])
      
      // También guardar en localStorage como backup
      const updatedAssessments = [savedAssessment, ...assessments]
      localStorage.setItem('riskAssessments', JSON.stringify(updatedAssessments))
      
      return savedAssessment
    } catch (err) {
      console.error('Error saving assessment:', err)
      setError('Error al guardar la evaluación')
      
      // Fallback a localStorage si Firebase falla
      const savedAssessment = { 
        ...newAssessment, 
        id: Date.now().toString(),
        createdAt: new Date()
      }
      setAssessments(prev => [savedAssessment, ...prev])
      
      const updatedAssessments = [savedAssessment, ...assessments]
      localStorage.setItem('riskAssessments', JSON.stringify(updatedAssessments))
      
      return savedAssessment
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
  }, [])

  return {
    assessments,
    loading,
    error,
    addAssessment,
    saveAssessment,
    loadAssessments
  }
}
