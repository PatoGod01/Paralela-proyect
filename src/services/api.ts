import axios from 'axios'

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Tipos de datos
export interface Exam {
  id: string
  title: string
  description?: string
  duration_minutes: number
  total_questions: number
  total_points: number
  status: 'draft' | 'active' | 'in_progress' | 'completed' | 'archived'
  questions: Question[]
  created_at: string
  updated_at?: string
}

export interface Question {
  id: string
  content: string
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay'
  options?: string[]
  correct_answer: string
  points: number
  created_at: string
  updated_at?: string
}

export interface Applicant {
  id: string
  name: string
  email: string
  registration_number?: string
  created_at: string
}

export interface ExamSession {
  id: string
  exam_id: string
  applicant_id: string
  start_time?: string
  end_time?: string
  status: string
  created_at: string
}

export interface ApplicantResponse {
  id: string
  session_id: string
  question_id: string
  answer: string
  is_correct?: boolean
  points_earned?: number
  submitted_at: string
}

export interface EvaluationResult {
  job_id: string
  status: string
  start_time: string
  end_time?: string
  execution_time_seconds?: number
  output_data?: any
  error_message?: string
}

export interface ExamStats {
  exam_id: string
  total_participants: number
  completed_sessions: number
  average_score: number
  score_distribution: Record<string, number>
}

export interface SystemInfo {
  app_name: string
  debug_mode: boolean
  mpi_processor_path: string
  database_connected: boolean
  supported_operations: {
    max_parallel_processes: number
    supported_question_types: string[]
    max_exam_duration: number
  }
}

export interface ProcessingMetrics {
  postulantes_procesados: number
  total_postulantes: number
  velocidad_procesamiento: number
  tiempo_restante: string
  procesos_activos: number
  total_procesos: number
  utilizacion_promedio: number
  procesos: Array<{
    id: number
    nombre: string
    utilizacion: number
    estado: 'activo' | 'inactivo' | 'error'
  }>
}

export interface ActivityLog {
  id: string
  timestamp: string
  level: 'info' | 'success' | 'warning' | 'error'
  message: string
  source: string
}

// API Functions
export const examAPI = {
  // Exámenes
  getExams: () => api.get<Exam[]>('/api/v1/exams'),
  getExam: (id: string) => api.get<Exam>(`/api/v1/exams/${id}`),
  createExam: (data: any) => api.post<Exam>('/api/v1/exams', data),
  activateExam: (id: string) => api.put(`/api/v1/exams/${id}/activate`),

  // Postulantes
  getApplicants: () => api.get<Applicant[]>('/api/v1/applicants'),
  getApplicant: (id: string) => api.get<Applicant>(`/api/v1/applicants/${id}`),
  getApplicantByEmail: (email: string) => api.get<Applicant>(`/api/v1/applicants/email/${email}`),
  createApplicant: (data: any) => api.post<Applicant>('/api/v1/applicants', data),

  // Inscripciones
  enrollApplicants: (examId: string, applicantIds: string[]) => 
    api.post(`/api/v1/exams/${examId}/enrollments`, { applicant_ids: applicantIds }),
  getEnrolledApplicants: (examId: string) => 
    api.get<Applicant[]>(`/api/v1/exams/${examId}/enrollments`),

  // Sesiones
  startAllSessions: (examId: string) => 
    api.post(`/api/v1/exams/${examId}/start-all`),
  submitResponse: (sessionId: string, data: any) => 
    api.post<ApplicantResponse>(`/api/v1/sessions/${sessionId}/responses`, data),
  endSession: (sessionId: string) => 
    api.put(`/api/v1/sessions/${sessionId}/end`),
  getSessionResponses: (sessionId: string) => 
    api.get<ApplicantResponse[]>(`/api/v1/sessions/${sessionId}/responses`),

  // Evaluación
  evaluateExam: (data: any) => 
    api.post<EvaluationResult>('/api/v1/evaluations/evaluate-exam', data),

  // Reportes
  getExamStats: (examId: string) => 
    api.get<ExamStats>(`/api/v1/reports/exam-stats/${examId}`),

  // Sistema
  getSystemInfo: () => api.get<SystemInfo>('/api/v1/system/info'),
  getHealthCheck: () => api.get('/health'),
}

// Funciones para simular datos en tiempo real (mientras no hay datos reales)
export const mockAPI = {
  getProcessingMetrics: (): Promise<ProcessingMetrics> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const procesos = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          nombre: `Proceso ${i + 1}`,
          utilizacion: Math.floor(Math.random() * 100),
          estado: Math.random() > 0.1 ? 'activo' : 'inactivo' as 'activo' | 'inactivo'
        }))

        const procesosActivos = procesos.filter(p => p.estado === 'activo').length
        const utilizacionPromedio = procesos.reduce((acc, p) => acc + p.utilizacion, 0) / procesos.length

        resolve({
          postulantes_procesados: Math.floor(Math.random() * 1000),
          total_postulantes: 50000,
          velocidad_procesamiento: Math.floor(Math.random() * 100),
          tiempo_restante: '--',
          procesos_activos: procesosActivos,
          total_procesos: 8,
          utilizacion_promedio: utilizacionPromedio,
          procesos
        })
      }, 100)
    })
  },

  getActivityLogs: (): Promise<ActivityLog[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const logs: ActivityLog[] = [
          {
            id: '1',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString('es-ES', { hour12: false }),
            level: 'success',
            message: 'Evaluación completada - Examen de Matemáticas - 45 postulantes',
            source: 'Evaluator'
          },
          {
            id: '2',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toLocaleTimeString('es-ES', { hour12: false }),
            level: 'info',
            message: 'Nuevo postulante registrado - María González',
            source: 'System'
          },
          {
            id: '3',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toLocaleTimeString('es-ES', { hour12: false }),
            level: 'success',
            message: 'Examen de Física disponible',
            source: 'ExamManager'
          },
          {
            id: '4',
            timestamp: new Date(Date.now() - 45 * 60 * 1000).toLocaleTimeString('es-ES', { hour12: false }),
            level: 'warning',
            message: 'Proceso 3 con baja utilización',
            source: 'Monitor'
          },
          {
            id: '5',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleTimeString('es-ES', { hour12: false }),
            level: 'info',
            message: 'Sistema iniciado - Todos los servicios operativos',
            source: 'System'
          }
        ]
        resolve(logs)
      }, 100)
    })
  }
}

export default api