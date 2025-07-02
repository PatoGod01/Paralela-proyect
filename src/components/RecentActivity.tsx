import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, Info, User, FileText } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  description: string
  timestamp: Date
  icon: React.ReactNode
}

const RecentActivity: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    // Simular actividades recientes
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'success',
        title: 'Evaluación completada',
        description: 'Examen de Matemáticas - 45 postulantes',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        icon: <CheckCircle className="h-4 w-4" />
      },
      {
        id: '2',
        type: 'info',
        title: 'Nuevo postulante registrado',
        description: 'María González se registró',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        icon: <User className="h-4 w-4" />
      },
      {
        id: '3',
        type: 'success',
        title: 'Examen activado',
        description: 'Examen de Física disponible',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        icon: <FileText className="h-4 w-4" />
      },
      {
        id: '4',
        type: 'warning',
        title: 'Proceso lento detectado',
        description: 'Proceso 3 con baja utilización',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        icon: <AlertCircle className="h-4 w-4" />
      },
      {
        id: '5',
        type: 'info',
        title: 'Sistema iniciado',
        description: 'Todos los servicios operativos',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: <Info className="h-4 w-4" />
      }
    ]

    setActivities(mockActivities)
  }, [])

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'error': return 'text-red-600 bg-red-50 border-red-200'
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Ahora'
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}d`
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="h-6 w-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg border ${getActivityColor(activity.type)}`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.title}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {activity.description}
              </p>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">
              {formatTimeAgo(activity.timestamp)}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
          Ver todas las actividades
        </button>
      </div>
    </div>
  )
}

export default RecentActivity