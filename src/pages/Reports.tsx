import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Download, Calendar } from 'lucide-react'

const Reports: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reportes y Estadísticas</h1>
            <p className="mt-2 text-gray-600">
              Análisis detallado de resultados y rendimiento
            </p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Exportar Reporte</span>
          </button>
        </div>
      </motion.div>

      {/* Date Range Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
      >
        <div className="flex items-center space-x-4">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Período:</span>
          <select className="input-field w-auto">
            <option>Últimos 7 días</option>
            <option>Últimos 30 días</option>
            <option>Últimos 3 meses</option>
            <option>Personalizado</option>
          </select>
        </div>
      </motion.div>

      {/* Reports Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos de reportes</h3>
            <p className="text-gray-600 mb-6">Los reportes aparecerán cuando haya exámenes completados</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Reports