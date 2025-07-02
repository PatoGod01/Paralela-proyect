import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Download, Search, Filter, RefreshCw } from 'lucide-react'

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  message: string
  source: string
}

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)

  useEffect(() => {
    // Simular logs del sistema
    const generateLogs = () => {
      const mockLogs: LogEntry[] = [
        {
          id: '1',
          timestamp: '14:37:15',
          level: 'info',
          message: 'Sistema iniciado correctamente',
          source: 'System'
        },
        {
          id: '2',
          timestamp: '14:37:18',
          level: 'success',
          message: 'Procesos MPI configurados (8 procesos)',
          source: 'MPI'
        },
        {
          id: '3',
          timestamp: '14:37:20',
          level: 'info',
          message: 'Cargando datos de examen...',
          source: 'Evaluator'
        },
        {
          id: '4',
          timestamp: '14:37:22',
          level: 'success',
          message: 'Datos cargados: 50,000 postulantes',
          source: 'Database'
        },
        {
          id: '5',
          timestamp: '14:37:25',
          level: 'info',
          message: 'Iniciando distribución de trabajo',
          source: 'Coordinator'
        }
      ]
      setLogs(mockLogs)
    }

    generateLogs()

    // Auto-refresh cada 5 segundos si está habilitado
    const interval = setInterval(() => {
      if (isAutoRefresh) {
        generateLogs()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoRefresh])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      case 'info': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success': return '✓'
      case 'warning': return '⚠'
      case 'error': return '✗'
      case 'info': return 'ℹ'
      default: return '•'
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Log de Eventos del Sistema</h1>
            <p className="mt-2 text-gray-600">
              Monitoreo de eventos y actividad del sistema en tiempo real
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isAutoRefresh 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${isAutoRefresh ? 'animate-spin' : ''}`} />
              <span>{isAutoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}</span>
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Exportar Logs</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
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
              placeholder="Buscar en logs..."
              className="input-field pl-10"
            />
          </div>
          <select className="input-field w-auto">
            <option>Todos los niveles</option>
            <option>Info</option>
            <option>Success</option>
            <option>Warning</option>
            <option>Error</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </button>
        </div>
      </motion.div>

      {/* Logs Terminal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900 rounded-xl shadow-sm border border-gray-700 overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Terminal className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-mono text-sm">system@parallel-exam-server:~$</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div className="p-4 h-96 overflow-y-auto font-mono text-sm">
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start space-x-3 py-1 hover:bg-gray-800 px-2 rounded"
            >
              <span className="text-gray-500 w-16 flex-shrink-0">{log.timestamp}</span>
              <span className={`w-4 flex-shrink-0 ${getLevelColor(log.level)}`}>
                {getLevelIcon(log.level)}
              </span>
              <span className={`${getLevelColor(log.level)} w-20 flex-shrink-0`}>
                {log.source}
              </span>
              <span className="text-gray-300 flex-1">{log.message}</span>
            </motion.div>
          ))}
          
          {/* Cursor */}
          <div className="flex items-center space-x-3 py-1">
            <span className="text-gray-500 w-16">{new Date().toLocaleTimeString('es-ES', { hour12: false })}</span>
            <span className="text-green-400 animate-pulse">█</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SystemLogs