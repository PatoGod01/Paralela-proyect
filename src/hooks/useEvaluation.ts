import { useMutation } from '@tanstack/react-query'
import { evaluationApi } from '../services/api'
import toast from 'react-hot-toast'
import type { EvaluateExamRequest } from '../types'

export const useEvaluateExam = () => {
  return useMutation({
    mutationFn: (data: EvaluateExamRequest) => evaluationApi.evaluateExam(data),
    onSuccess: () => {
      toast.success('Evaluación iniciada exitosamente')
    },
  })
}