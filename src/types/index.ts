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
  id: string
  session_id: string
  total_questions: number
  correct_answers: number
  total_points: number
  score_percentage: number
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  evaluation_time?: string
  created_at: string
}

export interface ExamStats {
  exam_id: string
  total_participants: number
  completed_sessions: number
  average_score: number
  score_distribution: Record<string, number>
}

export interface MPIJobResult {
  job_id: string
  config: {
    num_processes: number
    input_file: string
    output_file: string
    timeout_seconds: number
  }
  status: string
  start_time: string
  end_time?: string
  execution_time_seconds?: number
  output_data?: any
  error_message?: string
}

export interface CreateExamRequest {
  title: string
  description?: string
  duration_minutes: number
  questions: Omit<Question, 'id' | 'created_at' | 'updated_at'>[]
}

export interface CreateApplicantRequest {
  name: string
  email: string
  registration_number?: string
}

export interface BulkEnrollRequest {
  applicant_ids: string[]
}

export interface EvaluateExamRequest {
  exam_id: string
  parallel_processes: number
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