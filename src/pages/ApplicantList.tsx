import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Mail, User } from 'lucide-react'

const ApplicantList: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Aplicantes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona todos los aplicantes registrados
          </p>
        </div>
        <Link to="/applicants/create" className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Registrar Aplicante
        </Link>
      </div>

      {/* Placeholder content */}
      <div className="text-center py-12">
        <div className="card">
          <div className="card-body text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay aplicantes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza registrando tu primer aplicante.
            </p>
            <div className="mt-6">
              <Link to="/applicants/create" className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Registrar Aplicante
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantList