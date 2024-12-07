// hooks/useCreateRoutine.ts

import { useState, useEffect } from 'react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/libs/firebase'
import { Option } from '@/libs/types'
import { useUser } from '@/context/UserContext'
import { toast } from 'react-toastify'

interface UseCreateRoutineReturn {
  routineName: string
  setRoutineName: (value: string) => void
  routineDescription: string
  setRoutineDescription: (value: string) => void
  routineType: Option | null
  setRoutineType: (value: Option | null) => void
  availableRoutineTypes: Option[]
  sets: { id: string; name: string }[]
  selectedSets: string[]
  setSelectedSets: (value: string[]) => void
  loading: boolean
  formError: string
  handleSubmit: (e: React.FormEvent) => void
  fetchSets: () => Promise<void>
  fetchRoutineTypes: () => Promise<void>
}

const useCreateRoutine = (): UseCreateRoutineReturn => {
  const [routineName, setRoutineName] = useState<string>('')
  const [routineDescription, setRoutineDescription] = useState<string>('')
  const [routineType, setRoutineType] = useState<Option | null>(null)
  const [availableRoutineTypes, setAvailableRoutineTypes] = useState<Option[]>(
    []
  )
  const [sets, setSets] = useState<{ id: string; name: string }[]>([])
  const [selectedSets, setSelectedSets] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>('')

  const { user, loading: userLoading } = useUser()

  // Fetch available routine types (could be hardcoded or fetched from Firestore)
  const fetchRoutineTypes = async () => {
    // Example: Hardcoded routine types
    const types: Option[] = [
      { value: 'upper_body', label: 'Upper Body' },
      { value: 'lower_body', label: 'Lower Body' },
      { value: 'cardio', label: 'Cardio' },
      { value: 'yoga', label: 'Yoga' },
      { value: 'stretch', label: 'Stretch' },
      { value: 'total_body', label: 'Total Body' },
      { value: 'core', label: 'Core' },
      { value: 'other', label: 'Other' },
      // Add more types as needed
    ]
    setAvailableRoutineTypes(types)
  }

  // Fetch sets owned by the user
  const fetchSets = async () => {
    if (user) {
      try {
        const setsRef = collection(db, 'sets')
        const q = query(setsRef, where('ownerId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        const fetchedSets: { id: string; name: string }[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          fetchedSets.push({ id: doc.id, name: data.name })
        })
        setSets(fetchedSets)
      } catch (error) {
        console.error('Error fetching sets:', error)
        setFormError('Failed to fetch sets. Please try again.')
      }
    }
  }

  useEffect(() => {
    if (!userLoading && user) {
      fetchSets()
      fetchRoutineTypes()
    }
  }, [user, userLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (userLoading) {
      setFormError('Authentication is still loading. Please try again.')
      return
    }

    if (!user) {
      setFormError('You must be logged in to create a routine.')
      return
    }

    // Basic Validation
    if (!routineName.trim()) {
      setFormError('Routine name is required.')
      return
    }

    if (!routineType) {
      setFormError('Please select a routine type.')
      return
    }

    if (selectedSets.length === 0) {
      setFormError('Please select at least one set.')
      return
    }

    setLoading(true)

    try {
      await addDoc(collection(db, 'routines'), {
        name: routineName.trim(),
        description: routineDescription.trim(),
        type: routineType.value,
        sets: selectedSets,
        ownerId: user.uid,
      })

      // Reset Form
      setRoutineName('')
      setRoutineDescription('')
      setRoutineType(null)
      setSelectedSets([])
      toast.success('Routine created successfully!')
    } catch (error: unknown) {
      console.error('Error adding routine:', error)
      if (error instanceof Error) {
        setFormError(`Failed to create routine: ${error.message}`)
        toast.error(`Failed to create routine: ${error.message}`)
      } else {
        setFormError('Failed to create routine. Please try again.')
        toast.error('Failed to create routine. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    routineName,
    setRoutineName,
    routineDescription,
    setRoutineDescription,
    routineType,
    setRoutineType,
    availableRoutineTypes,
    sets,
    selectedSets,
    setSelectedSets,
    loading,
    formError,
    handleSubmit,
    fetchSets,
    fetchRoutineTypes,
  }
}

export default useCreateRoutine
