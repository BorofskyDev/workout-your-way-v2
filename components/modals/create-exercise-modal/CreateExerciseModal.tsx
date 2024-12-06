// components/modals/create-exercise-modal/CreateExerciseModal.tsx

'use client'

import React, { useState, useEffect } from 'react'
import Modal from '../modal/Modal' // Existing Modal Component
import InputField from '@/components/ui/inputs/input-field/InputField'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/libs/firebase' // Ensure correct path
import styles from './CreateExerciseModal.module.scss'
import SelectionInputComponent from '@/components/ui/inputs/selection-input-component/SelectionInputComponent'
import BooleanInputComponent from '@/components/ui/inputs/boolean-input-component/BooleanInputComponent' // Import the new component
import { Option } from '@/libs/types' // Adjust the import path as needed
import { useUser } from '@/context/UserContext' // Import the useUser hook

interface CreateExerciseModalProps {
  isOpen: boolean
  onClose: () => void
}

const bodyPartOptions: Option[] = [
  { value: 'neck', label: 'Neck' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'biceps', label: 'Biceps' },
  { value: 'triceps', label: 'Triceps' },
  { value: 'forearms', label: 'Forearms' },
  { value: 'back', label: 'Back' },
  { value: 'hamstrings', label: 'Hamstrings' },
  { value: 'quadriceps', label: 'Quadriceps' },
  { value: 'glutes', label: 'Glutes' },
  { value: 'calves', label: 'Calves' },
  { value: 'chest', label: 'Chest' },
  { value: 'abs', label: 'Abs' },
  // Add more as needed
]

const measurementOptions: Option[] = [
  { value: 'reps', label: 'Reps' },
  { value: 'amap', label: 'AMAP' },
  { value: 'laps', label: 'Laps' },
  { value: 'seconds', label: 'Seconds' },
  { value: 'minutes', label: 'Minutes' },
  // Add more as needed
]

const CreateExerciseModal: React.FC<CreateExerciseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState<string>('')
  const [selectedBodyParts, setSelectedBodyParts] = useState<Option[]>([])
  const [measurement, setMeasurement] = useState<Option | null>(null)
  const [isTimed, setIsTimed] = useState<boolean>(false)
  const [canUseWeights, setCanUseWeights] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>('')

  // Utilize the UserContext to get the authenticated user
  const { user, loading: userLoading } = useUser()

  // Focus on the first input when modal opens
  useEffect(() => {
    if (isOpen) {
      const firstInput = document.getElementById('name')
      firstInput?.focus()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    // Prevent form submission if user is still loading
    if (userLoading) {
      setFormError('Authentication is still loading. Please try again.')
      return
    }

    // Check if user is authenticated
    if (!user) {
      setFormError('You must be logged in to create an exercise.')
      return
    }

    // Basic Validation
    if (!name.trim()) {
      setFormError('Exercise name is required.')
      return
    }

    if (selectedBodyParts.length === 0) {
      setFormError('Please select at least one body part.')
      return
    }

    if (!measurement) {
      setFormError('Please select a measurement.')
      return
    }

    setLoading(true)

    try {
      await addDoc(collection(db, 'exercises'), {
        name: name.trim(),
        bodyParts: selectedBodyParts.map((part) => part.value),
        measurement: measurement.value,
        timed: isTimed,
        weights: canUseWeights,
        description: description.trim(),
        ownerId: user.uid, // Correctly set ownerId from context
      })

      // Reset Form
      setName('')
      setSelectedBodyParts([])
      setMeasurement(null)
      setIsTimed(false)
      setCanUseWeights(false)
      setDescription('')
      onClose()
    } catch (error: unknown) {
      console.error('Error adding exercise:', error)
      if (error instanceof Error) {
        setFormError(`Failed to create exercise: ${error.message}`)
      } else {
        setFormError('Failed to create exercise. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create Exercise'>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Exercise Name */}
        <InputField
          id='name'
          label='Exercise Name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder='Enter exercise name'
        />

        {/* Body Parts - Multi-Select */}
        <SelectionInputComponent
          label='Targeted Body Parts:'
          options={bodyPartOptions}
          value={selectedBodyParts}
          onChange={setSelectedBodyParts}
          isMulti={true}
          placeholder='Select body parts'
        />

        {/* Measurement - Single Select */}
        <SelectionInputComponent
          label='Measurement:'
          options={measurementOptions}
          value={measurement}
          onChange={setMeasurement}
          isMulti={false} // Explicitly set to false
          placeholder='Select measurement type'
        />

        {/* Is Timed */}
        <BooleanInputComponent
          id='isTimed'
          label='Is there a time limit?'
          checked={isTimed}
          onChange={setIsTimed}
        />

        {/* Can Use Weights */}
        <BooleanInputComponent
          id='canUseWeights'
          label='Can you use weights?'
          checked={canUseWeights}
          onChange={setCanUseWeights}
        />

        {/* Description */}
        <InputField
          variant='textarea'
          id='description'
          label='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={false}
          placeholder='Enter exercise description'
        />

        {/* Display Form Error */}
        {formError && <p className={styles.error}>{formError}</p>}

        {/* Submit Button */}
        <SubmitButton className='background-bg5 border-hl5' type='submit' >
          {loading ? 'Creating...' : 'Create Exercise'}
        </SubmitButton>
      </form>
    </Modal>
  )
}

export default CreateExerciseModal
