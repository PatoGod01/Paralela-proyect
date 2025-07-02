import React, { useState } from 'react'
import { X, Search, Plus } from 'lucide-react'
import { useEnrollApplicants } from '../hooks/useExams'

interface EnrollApplicantsModalProps {
  examId: string
  onClose: () => void
}

const EnrollApplicantsModal: React.FC<EnrollApplicantsModalProps> = ({ examId, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([])
  
  const enrollApplicantsMutation = useEnrollApplicants()

  // Mock applicants data - in real app, this would come from an API
  const mockApplicants = [
    { id: '1', name: 'Juan Pérez', email: 'juan@ejemplo.com', registration_number: 'REG-001' },
    { id: '2', name: 'María García', email: 'maria@ejemplo.com', registration_number: 'REG-002' },
    { id: '3', name: 'Carlos López', email: 'carlos@ejemplo.com', registration_number: 'REG-003' },
  ]

  const filteredApplicants = mockApplicants.filter(applicant =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.registration_number?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleToggleApplicant = (applicantId: string) => {
    setSelectedApplicants(prev =>
      prev.includes(applicantId)
        ? prev.filter(id => id !== applicantId)
        : [...prev, applicantId]
    )
  }

  const handleEnroll = async () => {
    if (selectedApplicants.length === 0) return

    try {
      await enrollApplicantsMutation.mutateAsync({
        examId,
        data: { applicant_ids: selectedApplicants }
      })
      onClose()
    } catch (error) {
      console.error('Error enrolling applicants:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Inscribir Aplicantes</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar aplicantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 form-input"
              />
            </div>
          </div>

          {/* Applicants List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {filteredApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedApplicants.includes(applicant.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleToggleApplicant(applicant.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{applicant.name}</h4>
                      <p className="text-xs text-gray-500">{applicant.email}</p>
                      {applicant.registration_number && (
                        <p className="text-xs text-gray-500">#{applicant.registration_number}</p>
                      )}
                    </div>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedApplicants.includes(applicant.id)
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedApplicants.includes(applicant.id) && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredApplicants.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No se encontraron aplicantes</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {selectedApplicants.length} aplicante(s) seleccionado(s)
            </p>
            <div className="flex space-x-3">
              <button onClick={onClose} className="btn-secondary">
                Cancelar
              </button>
              <button
                onClick={handleEnroll}
                disabled={selectedApplicants.length === 0 || enrollApplicantsMutation.isPending}
                className="btn-primary"
              >
                <Plus className="mr-2 h-4 w-4" />
                {enrollApplicantsMutation.isPending ? 'Inscribiendo...' : 'Inscribir'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrollApplicantsModal