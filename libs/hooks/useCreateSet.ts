// hooks/useCreateSet.ts

import { useState, useEffect } from 'react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/libs/firebase'
import { useUser } from '@/context/UserContext'
import { toast } from 'react-toastify'

interface UseCreateSetReturn {
  name: string
  setName: (value: string) => void
  description: string
  setDescription: (value: string) => void
  exercises: { id: string; name: string }[]
  selectedExercises: string[]
  setSelectedExercises: (value: string[]) => void
  loading: boolean
  formError: string
  handleSubmit: (e: React.FormEvent) => void
  fetchExercises: () => Promise<void>
}

const useCreateSet = (): UseCreateSetReturn => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [exercises, setExercises] = useState<{ id: string; name: string }[]>([])
  const [selectedExercises, setSelectedExercises] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>('')

  const { user, loading: userLoading } = useUser()

  // Fetch exercises owned by the user
  const fetchExercises = async () => {
    if (user) {
      try {
        const exercisesRef = collection(db, 'exercises')
        const q = query(exercisesRef, where('ownerId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        const fetchedExercises: { id: string; name: string }[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          fetchedExercises.push({ id: doc.id, name: data.name })
        })
        setExercises(fetchedExercises)
      } catch (error) {
        console.error('Error fetching exercises:', error)
        setFormError('Failed to fetch exercises. Please try again.')
      }
    }
  }

  useEffect(() => {
    if (!userLoading && user) {
      fetchExercises()
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
      setFormError('You must be logged in to create a set.')
      return
    }

    // Basic Validation
    if (!name.trim()) {
      setFormError('Set name is required.')
      return
    }

    if (selectedExercises.length === 0) {
      setFormError('Please select at least one exercise.')
      return
    }

    setLoading(true)

    try {
      await addDoc(collection(db, 'sets'), {
        name: name.trim(),
        description: description.trim(),
        exercises: selectedExercises,
        ownerId: user.uid,
      })

      // Reset Form
      setName('')
      setDescription('')
      setSelectedExercises([])
      toast.success('Set created successfully!')
    } catch (error: unknown) {
      console.error('Error adding set:', error)
      if (error instanceof Error) {
        setFormError(`Failed to create set: ${error.message}`)
        toast.error(`Failed to create set: ${error.message}`)
      } else {
        setFormError('Failed to create set. Please try again.')
        toast.error('Failed to create set. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    name,
    setName,
    description,
    setDescription,
    exercises,
    selectedExercises,
    setSelectedExercises,
    loading,
    formError,
    handleSubmit,
    fetchExercises,
  }
}

export default useCreateSet
