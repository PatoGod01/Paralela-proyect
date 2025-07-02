import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Users, PlayCircle, BarChart3, Plus, Activity } from 'lucide-react'
import { examApi, systemApi } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import StatusBadge from '../components/StatusBadge'

const Dashboard: React.FC = () => {
  const { data: exams, isLoading: examsLoading } = useQuery({
    queryKey: ['exams', 0, 5],
    queryFn: () => examApi.list(0, 5),
  })

  const { data: systemInfo, isLoading: systemLoading } = useQuery({
    queryKey: ['system-info'],
    queryFn: () => systemApi.getInfo(),
  })

  const stats = [
    {
      name: 'Total Exámenes',
      value: exams?.length || 0,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Exámenes Activos',
      value: exams?.filter(exam => exam.status === 'active').length || 0,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'En Progreso',
      value: exams?.filter(exam => exam.status === 'in_progress').length || 0,
      icon: PlayCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      name: 'Completados',
      value: exams?.filter(exam => exam.status === 'completed').length || 0,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  const quickActions = [
    {
      name: 'Crear Examen',
      description: 'Crear un nuevo examen con preguntas',
      href: '/exams/create',
      icon: BookOpen,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Registrar Aplicante',
      description: 'Registrar un nuevo aplicante',
      href: '/applicants/create',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'Ver Reportes',
      description: 'Ver estadísticas y reportes',
      href: '/reports',
      icon: BarChart3,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Resumen del sistema de exámenes paralelos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {examsLoading ? <LoadingSpinner size="sm" /> : stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Acciones Rápidas</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.name}
                  to={action.href}
                  className="group relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <span className={`inline-flex rounded-lg p-3 text-white ${action.color}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600">
                      {action.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{action.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Exams */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Exámenes Recientes</h3>
          <Link
            to="/exams"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Ver todos
          </Link>
        </div>
        <div className="card-body">
          {examsLoading ? (
            <div className="flex justify-center py-4">
              <LoadingSpinner />
            </div>
          ) : exams && exams.length > 0 ? (
            <div className="space-y-3">
              {exams.slice(0, 5).map((exam) => (
                <div key={exam.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex-1">
                    <Link
                      to={`/exams/${exam.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-primary-600"
                    >
                      {exam.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                      {exam.total_questions} preguntas • {exam.duration_minutes} min
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={exam.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay exámenes</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza creando tu primer examen.</p>
              <div className="mt-6">
                <Link to="/exams/create" className="btn-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Examen
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Estado del Sistema</h3>
        </div>
        <div className="card-body">
          {systemLoading ? (
            <div className="flex justify-center py-4">
              <LoadingSpinner />
            </div>
          ) : systemInfo ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Aplicación</dt>
                <dd className="mt-1 text-sm text-gray-900">{systemInfo.app_name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Base de Datos</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    systemInfo.database_connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {systemInfo.database_connected ? 'Conectada' : 'Desconectada'}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Procesamiento MPI</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Hasta {systemInfo.supported_operations?.max_parallel_processes || 16} procesos
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Modo Debug</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    systemInfo.debug_mode ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {systemInfo.debug_mode ? 'Activado' : 'Desactivado'}
                  </span>
                </dd>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No se pudo cargar la información del sistema</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard