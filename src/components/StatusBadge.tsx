import React from 'react'

interface StatusBadgeProps {
  status: string
  className?: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'badge badge-gray'
      case 'active':
        return 'badge badge-info'
      case 'in_progress':
      case 'in-progress':
        return 'badge badge-warning'
      case 'completed':
        return 'badge badge-success'
      case 'archived':
        return 'badge badge-gray'
      case 'pending':
        return 'badge badge-warning'
      case 'failed':
        return 'badge badge-error'
      default:
        return 'badge badge-gray'
    }
  }

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'Borrador'
      case 'active':
        return 'Activo'
      case 'in_progress':
      case 'in-progress':
        return 'En Progreso'
      case 'completed':
        return 'Completado'
      case 'archived':
        return 'Archivado'
      case 'pending':
        return 'Pendiente'
      case 'failed':
        return 'Fallido'
      default:
        return status
    }
  }

  return (
    <span className={`${getStatusStyles(status)} ${className}`}>
      {getStatusText(status)}
    </span>
  )
}

export default StatusBadge