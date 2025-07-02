import axios from 'axios'
import toast from 'react-hot-toast'
import type {
  Exam,
  Applicant,
  ExamSession,
  ApplicantResponse,
  ExamStats,
  MPIJobResult,
  CreateExamRequest,
  CreateApplicantRequest,
  BulkEnrollRequest,
  EvaluateExamRequest,
  SystemInfo
} from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth (if needed)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'Error en la solicitud'
    toast.error(message)
    return Promise.reject(error)
  }
)

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health')
  return response.data
}

// Exam endpoints
export const examApi = {
  list: async (skip = 0, limit = 100): Promise<Exam[]> => {
    const response = await api.get(`/api/v1/exams?skip=${skip}&limit=${limit}`)
    return response.data
  },

  get: async (id: string): Promise<Exam> => {
    const response = await api.get(`/api/v1/exams/${id}`)
    return response.data
  },

  create: async (data: CreateExamRequest): Promise<Exam> => {
    const response = await api.post('/api/v1/exams', data)
    return response.data
  },

  activate: async (id: string): Promise<void> => {
    await api.put(`/api/v1/exams/${id}/activate`)
  },

  getEnrolledApplicants: async (examId: string): Promise<Applicant[]> => {
    const response = await api.get(`/api/v1/exams/${examId}/enrollments`)
    return response.data
  },

  enrollApplicants: async (examId: string, data: BulkEnrollRequest): Promise<void> => {
    await api.post(`/api/v1/exams/${examId}/enrollments`, data)
  },

  startAllSessions: async (examId: string): Promise<void> => {
    await api.post(`/api/v1/exams/${examId}/start-all`)
  },
}

// Applicant endpoints
export const applicantApi = {
  create: async (data: CreateApplicantRequest): Promise<Applicant> => {
    const response = await api.post('/api/v1/applicants', data)
    return response.data
  },

  get: async (id: string): Promise<Applicant> => {
    const response = await api.get(`/api/v1/applicants/${id}`)
    return response.data
  },

  getByEmail: async (email: string): Promise<Applicant> => {
    const response = await api.get(`/api/v1/applicants/email/${email}`)
    return response.data
  },
}

// Session endpoints
export const sessionApi = {
  submitResponse: async (sessionId: string, data: { question_id: string; answer: string }): Promise<ApplicantResponse> => {
    const response = await api.post(`/api/v1/sessions/${sessionId}/responses`, data)
    return response.data
  },

  endSession: async (sessionId: string): Promise<void> => {
    await api.put(`/api/v1/sessions/${sessionId}/end`)
  },

  getResponses: async (sessionId: string): Promise<ApplicantResponse[]> => {
    const response = await api.get(`/api/v1/sessions/${sessionId}/responses`)
    return response.data
  },
}

// Evaluation endpoints
export const evaluationApi = {
  evaluateExam: async (data: EvaluateExamRequest): Promise<MPIJobResult> => {
    const response = await api.post('/api/v1/evaluations/evaluate-exam', data)
    return response.data
  },
}

// Reports endpoints
export const reportsApi = {
  getExamStats: async (examId: string): Promise<ExamStats> => {
    const response = await api.get(`/api/v1/reports/exam-stats/${examId}`)
    return response.data
  },
}

// System endpoints
export const systemApi = {
  getInfo: async (): Promise<SystemInfo> => {
    const response = await api.get('/api/v1/system/info')
    return response.data
  },

  getMyInfo: async (): Promise<any> => {
    const response = await api.get('/api/v1/system/me')
    return response.data
  },
}

export default api