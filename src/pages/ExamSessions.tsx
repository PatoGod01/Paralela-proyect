import React from 'react'
import { PlayCircle } from 'lucide-react'

const ExamSessions: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sesiones de Examen</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitorea las sesiones activas y completadas
        </p>
      </div>

      {/* Placeholder content */}
      <div className="text-center py-12">
        <div className="card">
          <div className="card-body text-center py-12">
            <PlayCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay sesiones activas</h3>
            <p className="mt-1 text-sm text-gray-500">
              Las sesiones aparecerán aquí cuando se inicien los exámenes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamSessions