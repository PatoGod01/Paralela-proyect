import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Pause, Play, Square } from 'lucide-react'
import { useRealTimeData } from '../hooks/useRealTimeData'

const ProcessingStatus: React.FC = () => {
  const { processingMetrics, isLoading } = useRealTimeData()
  const [isRunning, setIsRunning] = useState(true)

  if (isLoading || !processingMetrics) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'bg-green-500'
      case 'inactivo': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Estado del Procesamiento Paralelo</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`p-2 rounded-lg transition-colors ${
              isRunning 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Square className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Métricas de Rendimiento */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-sm text-blue-600 font-medium">Postulantes Procesados</div>
          <div className="text-2xl font-bold text-blue-900">
            {processingMetrics.postulantes_procesados.toLocaleString()} / {processingMetrics.total_postulantes.toLocaleString()}
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-sm text-green-600 font-medium">Velocidad de Procesamiento</div>
          <div className="text-2xl font-bold text-green-900">
            {processingMetrics.velocidad_procesamiento} post/min
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="text-sm text-orange-600 font-medium">Tiempo Restante</div>
          <div className="text-2xl font-bold text-orange-900">
            {processingMetrics.tiempo_restante}
          </div>
        </div>
      </div>

      {/* Utilización de Procesos */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Utilización de Procesos</h4>
          <span className="text-sm text-gray-500">
            {processingMetrics.procesos_activos}/{processingMetrics.total_procesos} activos
          </span>
        </div>
        
        <div className="space-y-3">
          {processingMetrics.procesos.map((proceso) => (
            <motion.div
              key={proceso.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className={`w-2 h-2 rounded-full ${getStatusColor(proceso.estado)}`} />
              <span className="text-sm font-medium text-gray-700 w-20">{proceso.nombre}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${proceso.utilizacion}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{proceso.utilizacion}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Promedio de utilización */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Utilización Promedio</span>
          <span className="text-sm font-bold text-blue-600">
            {processingMetrics.utilizacion_promedio.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProcessingStatus