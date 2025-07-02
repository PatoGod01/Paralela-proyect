import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Play, BarChart3, Settings } from 'lucide-react'
import { useExam, useEnrolledApplicants, useStartAllSessions } from '../hooks/useExams'
import { useEvaluateExam } from '../hooks/useEvaluation'
import { useExamStats } from '../hooks/useReports'
import LoadingSpinner from '../components/LoadingSpinner'
import StatusBadge from '../components/StatusBadge'
import EnrollApplicantsModal from '../components/EnrollApplicantsModal'
import EvaluationModal from '../components/EvaluationModal'

const ExamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [showEvaluationModal, setShowEvaluationModal] = useState(false)

  const { data: exam, isLoading: examLoading } = useExam(id!)
  const { data: enrolledApplicants, isLoading: applicantsLoading } = useEnrolledApplicants(id!)
  const { data: examStats, isLoading: statsLoading } = useExamStats(id!)
  
  const startAllSessionsMutation = useStartAllSessions()
  const evaluateExamMutation = useEvaluateExam()

  const handleStartAllSessions = () => {
    if (window.confirm('¿Estás seguro de que quieres iniciar las sesiones para todos los aplicantes inscritos?')) {
      startAllSessionsMutation.mutate(id!)
    }
  }

  if (examLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Examen no encontrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/exams" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
            <StatusBadge status={exam.status} />
          </div>
          {exam.description && (
            <p className="mt-1 text-sm text-gray-500">{exam.description}</p>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Preguntas</p>
                <p className="text-2xl font-semibold text-gray-900">{exam.total_questions}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-lg bg-green-100">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Puntos Totales</p>
                <p className="text-2xl font-semibold text-gray-900">{exam.total_points}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-lg bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Inscritos</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {applicantsLoading ? <LoadingSpinner size="sm" /> : enrolledApplicants?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-lg bg-yellow-100">
                  <Play className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Duración</p>
                <p className="text-2xl font-semibold text-gray-900">{exam.duration_minutes}m</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {exam.status === 'active' && (
          <>
            <button
              onClick={() => setShowEnrollModal(true)}
              className="btn-primary"
            >
              <Users className="mr-2 h-4 w-4" />
              Inscribir Aplicantes
            </button>
            
            {enrolledApplicants && enrolledApplicants.length > 0 && (
              <button
                onClick={handleStartAllSessions}
                disabled={startAllSessionsMutation.isPending}
                className="btn-secondary"
              >
                <Play className="mr-2 h-4 w-4" />
                {startAllSessionsMutation.isPending ? 'Iniciando...' : 'Iniciar Todas las Sesiones'}
              </button>
            )}
          </>
        )}

        {(exam.status === 'completed' || exam.status === 'in_progress') && (
          <button
            onClick={() => setShowEvaluationModal(true)}
            className="btn-primary"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Evaluar Examen
          </button>
        )}
      </div>

      {/* Questions */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Preguntas del Examen</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {exam.questions.map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      Pregunta {index + 1}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">{question.content}</p>
                    
                    {question.options && question.options.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-500 mb-1">Opciones:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <li key={optionIndex} className="flex items-center">
                              <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2">
                                {String.fromCharCode(65 + optionIndex)}
                              </span>
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {question.points} pts
                    </span>
                    <p className="text-xs text-gray-500 mt-1 capitalize">
                      {question.question_type.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrolled Applicants */}
      {enrolledApplicants && enrolledApplicants.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Aplicantes Inscritos</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledApplicants.map((applicant) => (
                <div key={applicant.id} className="border border-gray-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-900">{applicant.name}</h4>
                  <p className="text-xs text-gray-500">{applicant.email}</p>
                  {applicant.registration_number && (
                    <p className="text-xs text-gray-500">#{applicant.registration_number}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      {examStats && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Estadísticas del Examen</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Participantes Totales</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{examStats.total_participants}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Sesiones Completadas</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{examStats.completed_sessions}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Puntuación Promedio</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{examStats.average_score.toFixed(1)}%</dd>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showEnrollModal && (
        <EnrollApplicantsModal
          examId={id!}
          onClose={() => setShowEnrollModal(false)}
        />
      )}

      {showEvaluationModal && (
        <EvaluationModal
          examId={id!}
          onClose={() => setShowEvaluationModal(false)}
        />
      )}
    </div>
  )
}

export default ExamDetail