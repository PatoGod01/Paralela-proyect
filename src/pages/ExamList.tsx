import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Play, Users } from 'lucide-react'
import { useExams, useActivateExam } from '../hooks/useExams'
import LoadingSpinner from '../components/LoadingSpinner'
import StatusBadge from '../components/StatusBadge'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

const ExamList: React.FC = () => {
  const { data: exams, isLoading, error } = useExams()
  const activateExamMutation = useActivateExam()

  const handleActivateExam = (examId: string) => {
    if (window.confirm('¿Estás seguro de que quieres activar este examen?')) {
      activateExamMutation.mutate(examId)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error al cargar los exámenes</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exámenes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona todos los exámenes del sistema
          </p>
        </div>
        <Link to="/exams/create" className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Crear Examen
        </Link>
      </div>

      {/* Exams List */}
      {exams && exams.length > 0 ? (
        <div className="card">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Examen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preguntas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Creado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {exam.title}
                        </div>
                        {exam.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {exam.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={exam.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {exam.total_questions} preguntas
                      <div className="text-xs text-gray-500">
                        {exam.total_points} puntos
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {exam.duration_minutes} min
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDistanceToNow(new Date(exam.created_at), { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                      <Link
                        to={`/exams/${exam.id}`}
                        className="text-primary-600 hover:text-primary-900"
                        title="Ver detalles"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      
                      {exam.status === 'draft' && (
                        <button
                          onClick={() => handleActivateExam(exam.id)}
                          disabled={activateExamMutation.isPending}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          title="Activar examen"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="card">
            <div className="card-body text-center py-12">
              <Plus className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay exámenes</h3>
              <p className="mt-1 text-sm text-gray-500">
                Comienza creando tu primer examen.
              </p>
              <div className="mt-6">
                <Link to="/exams/create" className="btn-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Examen
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExamList