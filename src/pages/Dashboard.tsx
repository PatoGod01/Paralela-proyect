import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  FileText,
  Activity,
  Clock,
  CheckCircle,
  Cpu
} from 'lucide-react'
import StatsCard from '../components/StatsCard'
import ProcessingStatus from '../components/ProcessingStatus'
import RecentActivity from '../components/RecentActivity'
import SystemMetrics from '../components/SystemMetrics'

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalExams: 0,
    totalApplicants: 0,
    activeProcesses: 0,
    completedEvaluations: 0
  })

  const [systemStatus, setSystemStatus] = useState({
    status: 'active',
    uptime: '2h 34m',
    lastUpdate: new Date().toLocaleTimeString()
  })

  useEffect(() => {
    // Simular carga de datos del dashboard
    const loadDashboardData = async () => {
      // En una implementación real, estas serían llamadas a la API
      setStats({
        totalExams: 12,
        totalApplicants: 1247,
        activeProcesses: 8,
        completedEvaluations: 3456
      })
    }

    loadDashboardData()

    // Actualizar estado del sistema cada 30 segundos
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const statsCards = [
    {
      title: 'Exámenes Totales',
      value: stats.totalExams,
      icon: FileText,
      color: 'blue',
      change: '+2 este mes'
    },
    {
      title: 'Postulantes Registrados',
      value: stats.totalApplicants.toLocaleString(),
      icon: Users,
      color: 'green',
      change: '+156 esta semana'
    },
    {
      title: 'Procesos Activos',
      value: stats.activeProcesses,
      icon: Activity,
      color: 'purple',
      change: 'En tiempo real'
    },
    {
      title: 'Evaluaciones Completadas',
      value: stats.completedEvaluations.toLocaleString(),
      icon: CheckCircle,
      color: 'emerald',
      change: '+89% vs mes anterior'
    }
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Monitoreo en tiempo real del sistema de exámenes paralelos
        </p>
      </motion.div>

      {/* System Status Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-gray-900">Sistema Operativo</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Uptime: {systemStatus.uptime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Cpu className="h-4 w-4" />
                <span>8 procesos MPI activos</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Última actualización: {systemStatus.lastUpdate}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Processing Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <ProcessingStatus />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RecentActivity />
        </motion.div>

        {/* System Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3"
        >
          <SystemMetrics />
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard