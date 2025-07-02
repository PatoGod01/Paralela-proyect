import React from 'react'
import { BarChart3 } from 'lucide-react'

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reportes y Estadísticas</h1>
        <p className="mt-1 text-sm text-gray-500">
          Analiza el rendimiento y estadísticas de los exámenes
        </p>
      </div>

      {/* Placeholder content */}
      <div className="text-center py-12">
        <div className="card">
          <div className="card-body text-center py-12">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay reportes disponibles</h3>
            <p className="mt-1 text-sm text-gray-500">
              Los reportes se generarán cuando haya exámenes completados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports