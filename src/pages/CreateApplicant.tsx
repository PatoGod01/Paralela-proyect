import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ArrowLeft } from 'lucide-react'
import { useCreateApplicant } from '../hooks/useApplicants'
import type { CreateApplicantRequest } from '../types'

const CreateApplicant: React.FC = () => {
  const navigate = useNavigate()
  const createApplicantMutation = useCreateApplicant()

  const { register, handleSubmit, formState: { errors } } = useForm<CreateApplicantRequest>()

  const onSubmit = async (data: CreateApplicantRequest) => {
    try {
      await createApplicantMutation.mutateAsync(data)
      navigate('/applicants')
    } catch (error) {
      console.error('Error creating applicant:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/applicants" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrar Nuevo Aplicante</h1>
          <p className="mt-1 text-sm text-gray-500">
            Ingresa la información del aplicante
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Información del Aplicante</h3>
          </div>
          <div className="card-body space-y-4">
            <div>
              <label className="form-label">Nombre Completo *</label>
              <input
                type="text"
                {...register('name', { required: 'El nombre es requerido' })}
                className="form-input"
                placeholder="Ej: Juan Pérez"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Correo Electrónico *</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido'
                  }
                })}
                className="form-input"
                placeholder="juan.perez@ejemplo.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Número de Registro</label>
              <input
                type="text"
                {...register('registration_number')}
                className="form-input"
                placeholder="Ej: REG-2024-001"
              />
              <p className="mt-1 text-sm text-gray-500">
                Número de registro opcional para identificación interna
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end space-x-3">
          <Link to="/applicants" className="btn-secondary">
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={createApplicantMutation.isPending}
            className="btn-primary"
          >
            {createApplicantMutation.isPending ? 'Registrando...' : 'Registrar Aplicante'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateApplicant