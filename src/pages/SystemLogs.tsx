import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Download, Search, Filter, RefreshCw } from 'lucide-react'
import { useRealTimeData } from '../hooks/useRealTimeData'

const SystemLogs: React.FC = () => {
  const { activityLogs, isLoading } = useRealTimeData()
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

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

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-96 bg-gray-900 rounded-xl"></div>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select 
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">Todos los niveles</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
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
          {filteredLogs.map((log, index) => (
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
          
          {filteredLogs.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              No se encontraron logs que coincidan con los filtros
            </div>
          )}
          
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