import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Server, Cpu, HardDrive, Wifi } from 'lucide-react'

interface MetricData {
  time: string
  cpu: number
  memory: number
  network: number
}

const SystemMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [currentMetrics, setCurrentMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0
  })

  useEffect(() => {
    // Generar datos de métricas simuladas
    const generateMetrics = () => {
      const now = new Date()
      const newMetrics = Array.from({ length: 20 }, (_, i) => {
        const time = new Date(now.getTime() - (19 - i) * 30000) // Cada 30 segundos
        return {
          time: time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          cpu: Math.floor(Math.random() * 40) + 30, // 30-70%
          memory: Math.floor(Math.random() * 30) + 50, // 50-80%
          network: Math.floor(Math.random() * 100) + 10 // 10-110 MB/s
        }
      })
      setMetrics(newMetrics)
    }

    // Generar métricas actuales
    const generateCurrentMetrics = () => {
      setCurrentMetrics({
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 30) + 50,
        disk: Math.floor(Math.random() * 20) + 60,
        network: Math.floor(Math.random() * 100) + 10
      })
    }

    generateMetrics()
    generateCurrentMetrics()

    // Actualizar cada 30 segundos
    const interval = setInterval(() => {
      generateMetrics()
      generateCurrentMetrics()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const systemStats = [
    {
      name: 'CPU',
      value: currentMetrics.cpu,
      icon: Cpu,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'Memoria',
      value: currentMetrics.memory,
      icon: Server,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      name: 'Disco',
      value: currentMetrics.disk,
      icon: HardDrive,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      name: 'Red',
      value: currentMetrics.network,
      icon: Wifi,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Server className="h-6 w-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Métricas del Sistema</h3>
      </div>

      {/* Current System Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-4`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-5 w-5 ${stat.color}`} />
                <span className={`text-lg font-bold ${stat.color}`}>
                  {stat.value}%
                </span>
              </div>
              <div className="text-sm font-medium text-gray-700">{stat.name}</div>
              <div className="mt-2 bg-white rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.value}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-2 rounded-full ${
                    stat.value > 80 ? 'bg-red-500' : 
                    stat.value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU & Memory Usage */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Uso de CPU y Memoria</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="CPU (%)"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Memoria (%)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Network Usage */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Tráfico de Red</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={metrics.slice(-10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
                formatter={(value) => [`${value} MB/s`, 'Red']}
              />
              <Bar 
                dataKey="network" 
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default SystemMetrics