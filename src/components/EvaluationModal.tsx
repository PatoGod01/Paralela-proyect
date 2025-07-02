import React, { useState } from 'react'
import { X, Cpu, Play } from 'lucide-react'
import { useEvaluateExam } from '../hooks/useEvaluation'

interface EvaluationModalProps {
  examId: string
  onClose: () => void
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({ examId, onClose }) => {
  const [parallelProcesses, setParallelProcesses] = useState(4)
  
  const evaluateExamMutation = useEvaluateExam()

  const handleEvaluate = async () => {
    try {
      const result = await evaluateExamMutation.mutateAsync({
        exam_id: examId,
        parallel_processes: parallelProcesses
      })
      
      console.log('Evaluation result:', result)
      onClose()
    } catch (error) {
      console.error('Error evaluating exam:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Evaluar Examen</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="form-label">Número de Procesos Paralelos</label>
                <select
                  value={parallelProcesses}
                  onChange={(e) => setParallelProcesses(Number(e.target.value))}
                  className="form-input"
                >
                  <option value={1}>1 proceso</option>
                  <option value={2}>2 procesos</option>
                  <option value={4}>4 procesos</option>
                  <option value={8}>8 procesos</option>
                  <option value={16}>16 procesos</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Más procesos pueden acelerar la evaluación para exámenes grandes
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Cpu className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Evaluación Paralela</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      El sistema utilizará procesamiento MPI para evaluar las respuestas 
                      de manera eficiente y paralela.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <button onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button
              onClick={handleEvaluate}
              disabled={evaluateExamMutation.isPending}
              className="btn-primary"
            >
              <Play className="mr-2 h-4 w-4" />
              {evaluateExamMutation.isPending ? 'Evaluando...' : 'Iniciar Evaluación'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EvaluationModal