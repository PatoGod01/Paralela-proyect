import { useQuery } from '@tanstack/react-query'
import { reportsApi } from '../services/api'

export const useExamStats = (examId: string) => {
  return useQuery({
    queryKey: ['exam-stats', examId],
    queryFn: () => reportsApi.getExamStats(examId),
    enabled: !!examId,
  })
}