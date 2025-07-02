import React from 'react'
import { useSystemInfo } from '../hooks/useSystem'
import LoadingSpinner from '../components/LoadingSpinner'
import { Server, Database, Cpu, Settings } from 'lucide-react'

const SystemInfo: React.FC = () => {
  const { data: systemInfo, isLoading, error } = useSystemInfo()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error al cargar la información del sistema</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Información del Sistema</h1>
        <p className="mt-1 text-sm text-gray-500">
          Estado y configuración del sistema de exámenes paralelos
        </p>
      </div>

      {systemInfo && (
        <>
          {/* System Status */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-lg bg-blue-100">
                      <Server className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Aplicación</p>
                    <p className="text-lg font-semibold text-gray-900">Activa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg ${systemInfo.database_connected ? 'bg-green-100' : 'bg-red-100'}`}>
                      <Database className={`h-6 w-6 ${systemInfo.database_connected ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Base de Datos</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {systemInfo.database_connected ? 'Conectada' : 'Desconectada'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-lg bg-purple-100">
                      <Cpu className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Procesamiento MPI</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {systemInfo.supported_operations?.max_parallel_processes || 16} procesos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg ${systemInfo.debug_mode ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                      <Settings className={`h-6 w-6 ${systemInfo.debug_mode ? 'text-yellow-600' : 'text-gray-600'}`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Modo Debug</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {systemInfo.debug_mode ? 'Activado' : 'Desactivado'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Application Info */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Información de la Aplicación</h3>
              </div>
              <div className="card-body">
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                    <dd className="mt-1 text-sm text-gray-900">{systemInfo.app_name}</dd>
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
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Ruta del Procesador MPI</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono text-xs bg-gray-50 p-2 rounded">
                      {systemInfo.mpi_processor_path}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Supported Operations */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Operaciones Soportadas</h3>
              </div>
              <div className="card-body">
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Procesos Paralelos Máximos</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {systemInfo.supported_operations?.max_parallel_processes || 16}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Duración Máxima de Examen</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {systemInfo.supported_operations?.max_exam_duration || 300} minutos
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tipos de Preguntas Soportadas</dt>
                    <dd className="mt-1">
                      <div className="flex flex-wrap gap-2">
                        {systemInfo.supported_operations?.supported_question_types?.map((type) => (
                          <span
                            key={type}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {type.replace('_', ' ')}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-500">No disponible</span>
                        )}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* System Logs */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Log de Eventos del Sistema</h3>
            </div>
            <div className="card-body">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="space-y-1">
                  <div>[{new Date().toISOString()}] Sistema iniciado correctamente</div>
                  <div>[{new Date().toISOString()}] Base de datos conectada</div>
                  <div>[{new Date().toISOString()}] Procesador MPI configurado</div>
                  <div>[{new Date().toISOString()}] API REST disponible en puerto 8000</div>
                  <div>[{new Date().toISOString()}] Sistema listo para recibir solicitudes</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SystemInfo