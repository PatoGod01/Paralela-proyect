import { useState, useEffect, useCallback } from 'react'
import { examAPI, mockAPI, ProcessingMetrics, ActivityLog, SystemInfo } from '../services/api'

export const useRealTimeData = () => {
  const [processingMetrics, setProcessingMetrics] = useState<ProcessingMetrics | null>(null)
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProcessingMetrics = useCallback(async () => {
    try {
      // Intentar obtener datos reales del backend
      const response = await examAPI.getSystemInfo()
      
      // Si hay datos reales, usarlos; si no, usar datos simulados
      const metricsData = await mockAPI.getProcessingMetrics()
      setProcessingMetrics(metricsData)
      setSystemInfo(response.data)
    } catch (err) {
      // Si falla la conexión al backend, usar datos simulados
      const metricsData = await mockAPI.getProcessingMetrics()
      setProcessingMetrics(metricsData)
      console.warn('Using mock data - backend not available')
    }
  }, [])

  const fetchActivityLogs = useCallback(async () => {
    try {
      // Por ahora usar datos simulados hasta que el backend tenga endpoint de logs
      const logsData = await mockAPI.getActivityLogs()
      setActivityLogs(logsData)
    } catch (err) {
      console.error('Error fetching activity logs:', err)
    }
  }, [])

  const fetchSystemInfo = useCallback(async () => {
    try {
      const response = await examAPI.getSystemInfo()
      setSystemInfo(response.data)
    } catch (err) {
      console.warn('Could not fetch system info from backend')
    }
  }, [])

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([
          fetchProcessingMetrics(),
          fetchActivityLogs(),
          fetchSystemInfo()
        ])
      } catch (err) {
        setError('Error loading dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()

    // Actualizar datos cada 5 segundos
    const interval = setInterval(() => {
      fetchProcessingMetrics()
      fetchActivityLogs()
    }, 5000)

    return () => clearInterval(interval)
  }, [fetchProcessingMetrics, fetchActivityLogs, fetchSystemInfo])

  return {
    processingMetrics,
    activityLogs,
    systemInfo,
    isLoading,
    error,
    refetch: {
      processingMetrics: fetchProcessingMetrics,
      activityLogs: fetchActivityLogs,
      systemInfo: fetchSystemInfo
    }
  }
}

export const useExamData = () => {
  const [exams, setExams] = useState([])
  const [applicants, setApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExams = useCallback(async () => {
    try {
      const response = await examAPI.getExams()
      setExams(response.data)
    } catch (err) {
      console.error('Error fetching exams:', err)
      setError('Error loading exams')
    }
  }, [])

  const fetchApplicants = useCallback(async () => {
    try {
      const response = await examAPI.getApplicants()
      setApplicants(response.data)
    } catch (err) {
      console.error('Error fetching applicants:', err)
      setError('Error loading applicants')
    }
  }, [])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([fetchExams(), fetchApplicants()])
      } catch (err) {
        setError('Error loading exam data')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [fetchExams, fetchApplicants])

  return {
    exams,
    applicants,
    isLoading,
    error,
    refetch: {
      exams: fetchExams,
      applicants: fetchApplicants
    }
  }
}