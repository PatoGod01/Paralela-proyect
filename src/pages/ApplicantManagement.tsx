import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Upload, Mail, User, Calendar } from 'lucide-react'
import { useExamData } from '../hooks/useRealTimeData'
import { examAPI } from '../services/api'
import toast from 'react-hot-toast'

const ApplicantManagement: React.FC = () => {
  const { applicants, isLoading, refetch } = useExamData()
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newApplicant, setNewApplicant] = useState({
    name: '',
    email: '',
    registration_number: ''
  })

  const handleCreateApplicant = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await examAPI.createApplicant(newApplicant)
      toast.success('Postulante registrado correctamente')
      setShowCreateModal(false)
      setNewApplicant({ name: '', email: '', registration_number: '' })
      refetch.applicants()
    } catch (error) {
      toast.error('Error al registrar postulante')
    }
  }

  const filteredApplicants = applicants.filter((applicant: any) =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Postulantes</h1>
            <p className="mt-2 text-gray-600">
              Registrar y administrar postulantes
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Importar CSV</span>
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Postulante</span>
            </button>
          </div>
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
              placeholder="Buscar postulantes..."
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

      {/* Applicants List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        {filteredApplicants.length === 0 ? (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <User className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {applicants.length === 0 ? 'No hay postulantes registrados' : 'No se encontraron postulantes'}
              </h3>
              <p className="text-gray-600 mb-6">
                {applicants.length === 0 
                  ? 'Comienza registrando postulantes para los exámenes'
                  : 'Intenta con otros términos de búsqueda'
                }
              </p>
              {applicants.length === 0 && (
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="btn-primary"
                >
                  Registrar Primer Postulante
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700">
                <div>Nombre</div>
                <div>Email</div>
                <div>Número de Registro</div>
                <div>Fecha de Registro</div>
              </div>
            </div>
            {filteredApplicants.map((applicant: any, index: number) => (
              <motion.div
                key={applicant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">{applicant.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{applicant.email}</span>
                  </div>
                  <div className="text-gray-600">
                    {applicant.registration_number || 'N/A'}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(applicant.created_at).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Create Applicant Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Registrar Nuevo Postulante</h3>
            <form onSubmit={handleCreateApplicant} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={newApplicant.name}
                  onChange={(e) => setNewApplicant({ ...newApplicant, name: e.target.value })}
                  className="input-field"
                  placeholder="Ingresa el nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newApplicant.email}
                  onChange={(e) => setNewApplicant({ ...newApplicant, email: e.target.value })}
                  className="input-field"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de registro (opcional)
                </label>
                <input
                  type="text"
                  value={newApplicant.registration_number}
                  onChange={(e) => setNewApplicant({ ...newApplicant, registration_number: e.target.value })}
                  className="input-field"
                  placeholder="Número de registro"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Registrar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ApplicantManagement