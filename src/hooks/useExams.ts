import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { examApi } from '../services/api'
import toast from 'react-hot-toast'
import type { CreateExamRequest, BulkEnrollRequest } from '../types'

export const useExams = (skip = 0, limit = 100) => {
  return useQuery({
    queryKey: ['exams', skip, limit],
    queryFn: () => examApi.list(skip, limit),
  })
}

export const useExam = (id: string) => {
  return useQuery({
    queryKey: ['exam', id],
    queryFn: () => examApi.get(id),
    enabled: !!id,
  })
}

export const useCreateExam = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateExamRequest) => examApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] })
      toast.success('Examen creado exitosamente')
    },
  })
}

export const useActivateExam = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => examApi.activate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] })
      queryClient.invalidateQueries({ queryKey: ['exam'] })
      toast.success('Examen activado exitosamente')
    },
  })
}

export const useEnrolledApplicants = (examId: string) => {
  return useQuery({
    queryKey: ['enrolled-applicants', examId],
    queryFn: () => examApi.getEnrolledApplicants(examId),
    enabled: !!examId,
  })
}

export const useEnrollApplicants = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ examId, data }: { examId: string; data: BulkEnrollRequest }) =>
      examApi.enrollApplicants(examId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrolled-applicants'] })
      toast.success('Aplicantes inscritos exitosamente')
    },
  })
}

export const useStartAllSessions = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (examId: string) => examApi.startAllSessions(examId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exam'] })
      toast.success('Sesiones iniciadas para todos los aplicantes')
    },
  })
}