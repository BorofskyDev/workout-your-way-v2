// hooks/useCreateProgram.ts

import { useState } from 'react'

interface UseCreateProgramReturn {
  name: string
  setName: (value: string) => void
  numberOfWeeks: string
  setNumberOfWeeks: (value: string) => void
  numberOfPhases: string
  setNumberOfPhases: (value: string) => void
  description: string
  setDescription: (value: string) => void
  loading: boolean
  formError: string
}

const useCreateProgram = (): UseCreateProgramReturn => {
  const [name, setName] = useState<string>('')
  const [numberOfWeeks, setNumberOfWeeks] = useState<string>('')
  const [numberOfPhases, setNumberOfPhases] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>('')

  return {
    name,
    setName,
    numberOfWeeks,
    setNumberOfWeeks,
    numberOfPhases,
    setNumberOfPhases,
    description,
    setDescription,
    loading,
    formError,
  }
}

export default useCreateProgram
