import { useQuery } from '@tanstack/react-query'
import { systemApi } from '../services/api'

export const useSystemInfo = () => {
  return useQuery({
    queryKey: ['system-info'],
    queryFn: () => systemApi.getInfo(),
  })
}