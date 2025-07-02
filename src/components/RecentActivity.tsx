import React from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, Info, User, FileText } from 'lucide-react'
import { useRealTimeData } from '../hooks/useRealTimeData'

const RecentActivity: React.FC = () => {
  const { activityLogs, isLoading } = useRealTimeData()

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const getActivityIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertCircle className="h-4 w-4" />
      case 'error': return <AlertCircle className="h-4 w-4" />
      case 'info': return <Info className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'error': return 'text-red-600 bg-red-50 border-red-200'
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const logTime = new Date()
    const [hours, minutes, seconds] = timestamp.split(':').map(Number)
    logTime.setHours(hours, minutes, seconds)
    
    const diffInMinutes = Math.floor((now.getTime() - logTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Ahora'
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}d`
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
      </div>

      <div className="space-y-4">
        {activityLogs.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg border ${getActivityColor(activity.level)}`}>
              {getActivityIcon(activity.level)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.level === 'success' && 'Evaluación completada'}
                {activity.level === 'info' && activity.message.includes('postulante') && 'Nuevo postulante registrado'}
                {activity.level === 'info' && activity.message.includes('Examen') && 'Examen activado'}
                {activity.level === 'warning' && 'Proceso lento detectado'}
                {activity.level === 'info' && activity.message.includes('Sistema') && 'Sistema iniciado'}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {activity.message}
              </p>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">
              {formatTimeAgo(activity.timestamp)}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          Ver todas las actividades
        </button>
      </div>
    </div>
  )
}

export default RecentActivity