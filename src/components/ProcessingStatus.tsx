import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Pause, Play, Square } from 'lucide-react'

interface ProcessData {
  id: number
  name: string
  usage: number
  status: 'active' | 'idle' | 'error'
}

const ProcessingStatus: React.FC = () => {
  const [processes, setProcesses] = useState<ProcessData[]>([])
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    // Simular datos de procesos MPI
    const generateProcessData = () => {
      return Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        name: `Proceso ${i + 1}`,
        usage: Math.floor(Math.random() * 100),
        status: Math.random() > 0.1 ? 'active' : 'idle' as 'active' | 'idle'
      }))
    }

    setProcesses(generateProcessData())

    // Actualizar datos cada 2 segundos si está corriendo
    const interval = setInterval(() => {
      if (isRunning) {
        setProcesses(generateProcessData())
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isRunning])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'idle': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const averageUsage = processes.reduce((acc, p) => acc + p.usage, 0) / processes.length || 0
  const activeProcesses = processes.filter(p => p.status === 'active').length

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="h-6 w-6 text-primary-600" />
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
          <div className="text-2xl font-bold text-blue-900">0 / 50,000</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-sm text-green-600 font-medium">Velocidad de Procesamiento</div>
          <div className="text-2xl font-bold text-green-900">0 post/min</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="text-sm text-orange-600 font-medium">Tiempo Restante</div>
          <div className="text-2xl font-bold text-orange-900">--</div>
        </div>
      </div>

      {/* Utilización de Procesos */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Utilización de Procesos</h4>
          <span className="text-sm text-gray-500">
            {activeProcesses}/{processes.length} activos
          </span>
        </div>
        
        <div className="space-y-3">
          {processes.map((process) => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className={`w-2 h-2 rounded-full ${getStatusColor(process.status)}`} />
              <span className="text-sm font-medium text-gray-700 w-20">{process.name}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${process.usage}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary-500 h-2 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{process.usage}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Promedio de utilización */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Utilización Promedio</span>
          <span className="text-sm font-bold text-primary-600">{averageUsage.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}

export default ProcessingStatus