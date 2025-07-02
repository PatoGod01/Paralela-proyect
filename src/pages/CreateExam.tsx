import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { useCreateExam } from '../hooks/useExams'
import type { CreateExamRequest } from '../types'

interface QuestionForm {
  content: string
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay'
  options: string[]
  correct_answer: string
  points: number
}

interface ExamForm {
  title: string
  description: string
  duration_minutes: number
  questions: QuestionForm[]
}

const CreateExam: React.FC = () => {
  const navigate = useNavigate()
  const createExamMutation = useCreateExam()

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<ExamForm>({
    defaultValues: {
      title: '',
      description: '',
      duration_minutes: 60,
      questions: [{
        content: '',
        question_type: 'multiple_choice',
        options: ['', '', '', ''],
        correct_answer: '',
        points: 1
      }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  })

  const watchedQuestions = watch('questions')

  const onSubmit = async (data: ExamForm) => {
    try {
      const examData: CreateExamRequest = {
        title: data.title,
        description: data.description || undefined,
        duration_minutes: data.duration_minutes,
        questions: data.questions.map(q => ({
          content: q.content,
          question_type: q.question_type,
          options: q.question_type === 'multiple_choice' ? q.options.filter(opt => opt.trim() !== '') : undefined,
          correct_answer: q.correct_answer,
          points: q.points
        }))
      }

      const exam = await createExamMutation.mutateAsync(examData)
      navigate(`/exams/${exam.id}`)
    } catch (error) {
      console.error('Error creating exam:', error)
    }
  }

  const addQuestion = () => {
    append({
      content: '',
      question_type: 'multiple_choice',
      options: ['', '', '', ''],
      correct_answer: '',
      points: 1
    })
  }

  const removeQuestion = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/exams" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Examen</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configura las preguntas y parámetros del examen
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Información Básica</h3>
          </div>
          <div className="card-body space-y-4">
            <div>
              <label className="form-label">Título del Examen *</label>
              <input
                type="text"
                {...register('title', { required: 'El título es requerido' })}
                className="form-input"
                placeholder="Ej: Examen de Matemáticas Básicas"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Descripción</label>
              <textarea
                {...register('description')}
                rows={3}
                className="form-input"
                placeholder="Descripción opcional del examen"
              />
            </div>

            <div>
              <label className="form-label">Duración (minutos) *</label>
              <input
                type="number"
                {...register('duration_minutes', { 
                  required: 'La duración es requerida',
                  min: { value: 1, message: 'La duración debe ser mayor a 0' }
                })}
                className="form-input"
                min="1"
              />
              {errors.duration_minutes && (
                <p className="mt-1 text-sm text-red-600">{errors.duration_minutes.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Preguntas</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="btn-primary"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Pregunta
            </button>
          </div>
          <div className="card-body space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Pregunta {index + 1}
                  </h4>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Contenido de la Pregunta *</label>
                    <textarea
                      {...register(`questions.${index}.content`, { 
                        required: 'El contenido de la pregunta es requerido' 
                      })}
                      rows={2}
                      className="form-input"
                      placeholder="Escribe tu pregunta aquí..."
                    />
                    {errors.questions?.[index]?.content && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.questions[index]?.content?.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="form-label">Tipo de Pregunta *</label>
                      <select
                        {...register(`questions.${index}.question_type`)}
                        className="form-input"
                      >
                        <option value="multiple_choice">Opción Múltiple</option>
                        <option value="true_false">Verdadero/Falso</option>
                        <option value="short_answer">Respuesta Corta</option>
                        <option value="essay">Ensayo</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Puntos *</label>
                      <input
                        type="number"
                        {...register(`questions.${index}.points`, { 
                          required: 'Los puntos son requeridos',
                          min: { value: 1, message: 'Los puntos deben ser mayor a 0' }
                        })}
                        className="form-input"
                        min="1"
                      />
                      {errors.questions?.[index]?.points && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.questions[index]?.points?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Options for multiple choice */}
                  {watchedQuestions[index]?.question_type === 'multiple_choice' && (
                    <div>
                      <label className="form-label">Opciones</label>
                      <div className="space-y-2">
                        {[0, 1, 2, 3].map((optionIndex) => (
                          <input
                            key={optionIndex}
                            type="text"
                            {...register(`questions.${index}.options.${optionIndex}`)}
                            className="form-input"
                            placeholder={`Opción ${String.fromCharCode(65 + optionIndex)}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="form-label">Respuesta Correcta *</label>
                    {watchedQuestions[index]?.question_type === 'multiple_choice' ? (
                      <select
                        {...register(`questions.${index}.correct_answer`, { 
                          required: 'La respuesta correcta es requerida' 
                        })}
                        className="form-input"
                      >
                        <option value="">Selecciona la respuesta correcta</option>
                        {watchedQuestions[index]?.options?.map((option, optionIndex) => (
                          option.trim() && (
                            <option key={optionIndex} value={option}>
                              {String.fromCharCode(65 + optionIndex)}: {option}
                            </option>
                          )
                        ))}
                      </select>
                    ) : watchedQuestions[index]?.question_type === 'true_false' ? (
                      <select
                        {...register(`questions.${index}.correct_answer`, { 
                          required: 'La respuesta correcta es requerida' 
                        })}
                        className="form-input"
                      >
                        <option value="">Selecciona la respuesta correcta</option>
                        <option value="true">Verdadero</option>
                        <option value="false">Falso</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        {...register(`questions.${index}.correct_answer`, { 
                          required: 'La respuesta correcta es requerida' 
                        })}
                        className="form-input"
                        placeholder="Respuesta correcta"
                      />
                    )}
                    {errors.questions?.[index]?.correct_answer && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.questions[index]?.correct_answer?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end space-x-3">
          <Link to="/exams" className="btn-secondary">
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={createExamMutation.isPending}
            className="btn-primary"
          >
            {createExamMutation.isPending ? 'Creando...' : 'Crear Examen'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateExam