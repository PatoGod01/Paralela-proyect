import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Play, Users, Clock, BarChart } from 'lucide-react'
import { useExamData } from '../hooks/useRealTimeData'
import { examAPI } from '../services/api'
import toast from 'react-hot-toast'

const ExamManagement: React.FC = () => {
  const { exams, isLoading, refetch } = useExamData()
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleActivateExam = async (examId: string) => {
    try {
      await examAPI.activateExam(examId)
      toast.success('Examen activado correctamente')
      refetch.exams()
    } catch (error) {
      toast.error('Error al activar el examen')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'draft': return 'Borrador'
      case 'in_progress': return 'En Progreso'
      case 'completed': return 'Completado'
      default: return status
    }
  }

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Exámenes</h1>
            <p className="mt-2 text-gray-600">
              Crear, configurar y administrar exámenes
            </p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Nuevo Examen</span>
          </button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar exámenes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </button>
        </div>
      </motion.div>

      {/* Exams List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        {exams.length === 0 ? (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileText className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay exámenes creados</h3>
              <p className="text-gray-600 mb-6">Comienza creando tu primer examen</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Crear Primer Examen
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {exams.map((exam: any, index: number) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                        {getStatusText(exam.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{exam.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{exam.duration_minutes} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BarChart className="h-4 w-4" />
                        <span>{exam.total_questions} preguntas</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{exam.total_points} puntos</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {exam.status === 'draft' && (
                      <button
                        onClick={() => handleActivateExam(exam.id)}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Activar</span>
                      </button>
                    )}
                    <button className="btn-secondary">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Create Exam Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Crear Nuevo Examen</h3>
            <p className="text-gray-600 mb-6">
              Esta funcionalidad estará disponible próximamente. Por ahora puedes usar la API directamente.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-secondary"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ExamManagement