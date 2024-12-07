// hooks/useCreatePhases.ts

import { useState, useEffect } from 'react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/libs/firebase'
import { PhaseTemplate, Program } from '@/libs/types'
import { useUser } from '@/context/UserContext'
import { toast } from 'react-toastify'

interface UseCreatePhasesReturn {
  phases: PhaseTemplate[]
  setPhases: (phases: PhaseTemplate[]) => void
  routines: { id: string; name: string }[]
  loading: boolean
  formError: string
  handlePhaseSave: (index: number) => void
  saveAllPhases: (programData: Omit<Program, 'phases'>) => void
  fetchRoutines: () => Promise<void>
}

const useCreatePhases = (numberOfPhases: number): UseCreatePhasesReturn => {
  const [phases, setPhases] = useState<PhaseTemplate[]>([])
  const [routines, setRoutines] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>('')

  const { user, loading: userLoading } = useUser()

  // Fetch routines from Firestore
  const fetchRoutines = async () => {
    if (user) {
      try {
        const routinesRef = collection(db, 'routines')
        const q = query(routinesRef, where('ownerId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        const fetchedRoutines: { id: string; name: string }[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          fetchedRoutines.push({ id: doc.id, name: data.name })
        })
        setRoutines(fetchedRoutines)
      } catch (error) {
        console.error('Error fetching routines:', error)
        setFormError('Failed to fetch routines. Please try again.')
      }
    }
  }

  useEffect(() => {
    if (!userLoading && user) {
      fetchRoutines()
    }
  }, [user, userLoading])

  // Initialize phases based on numberOfPhases
  useEffect(() => {
    setPhases(
      Array.from({ length: numberOfPhases }, () => ({
        phaseName: '',
        applicableWeeks: [],
        days: [
          { day: 'Day 1', routine: null },
          { day: 'Day 2', routine: null },
          { day: 'Day 3', routine: null },
          { day: 'Day 4', routine: null },
          { day: 'Day 5', routine: null },
          { day: 'Day 6', routine: null },
          { day: 'Day 7', routine: null },
        ],
      }))
    )
  }, [numberOfPhases])

  // Function to handle saving a single phase (validation only)
  const handlePhaseSave = (index: number) => {
    const phase = phases[index]
    if (!phase.phaseName.trim()) {
      setFormError(`Phase ${index + 1} name is required.`)
      return
    }

    if (phase.applicableWeeks.length === 0) {
      setFormError(`Phase ${index + 1} must have at least one applicable week.`)
      return
    }

    // Validate routines for each day
    const incompleteRoutine = phase.days.some((day) => !day.routine)
    if (incompleteRoutine) {
      setFormError(
        `Phase ${index + 1} must have a routine selected for each day.`
      )
      return
    }

    // If validation passes, mark the phase as saved
    toast.success(`Phase ${index + 1} saved successfully!`)
  }

  // Function to save all phases and create the program in Firestore
  const saveAllPhases = async (programData: Omit<Program, 'phases'>) => {
    setFormError('')
    setLoading(true)

    try {
      if (!user) {
        setFormError('You must be logged in to create a program.')
        return
      }

      // Create the program in Firestore
      const programRef = await addDoc(collection(db, 'programs'), {
        ...programData,
        ownerId: user.uid,
      })

      // Create phases and associate with the program
      const phasesCollection = collection(
        db,
        'programs',
        programRef.id,
        'phases'
      )
      for (const phase of phases) {
        await addDoc(phasesCollection, phase)
      }

      toast.success('Program and phases created successfully!')
    } catch (error: unknown) {
      console.error('Error saving program and phases:', error)
      if (error instanceof Error) {
        setFormError(`Failed to save program: ${error.message}`)
        toast.error(`Failed to save program: ${error.message}`)
      } else {
        setFormError('Failed to save program. Please try again.')
        toast.error('Failed to save program. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    phases,
    setPhases,
    routines,
    loading,
    formError,
    handlePhaseSave,
    saveAllPhases,
    fetchRoutines,
  }
}

export default useCreatePhases
