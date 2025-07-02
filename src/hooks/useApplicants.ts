import { useMutation, useQueryClient } from '@tanstack/react-query'
import { applicantApi } from '../services/api'
import toast from 'react-hot-toast'
import type { CreateApplicantRequest } from '../types'

export const useCreateApplicant = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateApplicantRequest) => applicantApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applicants'] })
      toast.success('Aplicante registrado exitosamente')
    },
  })
}