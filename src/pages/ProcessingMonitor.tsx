import React from 'react'
import { motion } from 'framer-motion'
import ProcessingStatus from '../components/ProcessingStatus'
import SystemMetrics from '../components/SystemMetrics'

const ProcessingMonitor: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Monitor de Procesamiento</h1>
        <p className="mt-2 text-gray-600">
          Monitoreo en tiempo real del procesamiento paralelo MPI
        </p>
      </motion.div>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProcessingStatus />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SystemMetrics />
        </motion.div>
      </div>
    </div>
  )
}

export default ProcessingMonitor