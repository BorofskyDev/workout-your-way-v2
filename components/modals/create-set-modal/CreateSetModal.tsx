// components/modals/create-set-modal/CreateSetModal.tsx

'use client'

import React, { useState } from 'react'
import Modal from '../modal/Modal'
import InputField from '@/components/ui/inputs/input-field/InputField'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'
import SelectionInputComponent from '@/components/ui/inputs/selection-input-component/SelectionInputComponent'

import CreateExerciseModal from '../create-exercise-modal/CreateExerciseModal'
import useCreateSet from '@/libs/hooks/useCreateSet'
import styles from './CreateSetModal.module.scss'

import { Option } from '@/libs/types'

interface CreateSetModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateSetModal: React.FC<CreateSetModalProps> = ({ isOpen, onClose }) => {
  const {
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
  } = useCreateSet()

  const [isCreateExerciseModalOpen, setIsCreateExerciseModalOpen] =
    useState<boolean>(false)

  const openCreateExerciseModal = () => {
    setIsCreateExerciseModalOpen(true)
  }

  const closeCreateExerciseModal = () => {
    setIsCreateExerciseModalOpen(false)
    fetchExercises()
  }

  const addExercise = () => {
    setSelectedExercises([...selectedExercises, ''])
  }

  const handleExerciseChange = (
    index: number,
    selectedOption: Option | null
  ) => {
    const updatedExercises = [...selectedExercises]
    updatedExercises[index] = selectedOption ? selectedOption.value : ''
    setSelectedExercises(updatedExercises)
  }

  const removeExercise = (index: number) => {
    const updatedExercises = [...selectedExercises]
    updatedExercises.splice(index, 1)
    setSelectedExercises(updatedExercises)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title='Create Set'>
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField
            id='setName'
            label='Set Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='Enter set name'
          />

          <InputField
            variant='textarea'
            id='setDescription'
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={false}
            placeholder='Enter set description'
          />

          <div className={styles.exercisesContainer}>
            {selectedExercises.map((exerciseId, index) => {
              const foundExercise = exercises.find((ex) => ex.id === exerciseId)
              const selectedOption = foundExercise
                ? { value: foundExercise.id, label: foundExercise.name }
                : null

              return (
                <div key={index} className={styles.exerciseRow}>
                  <SelectionInputComponent
                    options={exercises.map((ex) => ({
                      value: ex.id,
                      label: ex.name,
                    }))}
                    value={selectedOption}
                    onChange={(option) => handleExerciseChange(index, option)}
                    isMulti={false}
                    placeholder='Select an exercise'
                  />
                  <button
                    type='button'
                    onClick={() => removeExercise(index)}
                    className={`py-100 px-200 br-3 bs2 background-bg7 border-hl7 my-400 ${styles.removeButton}`}
                  >
                    Remove
                  </button>
                </div>
              )
            })}
            <button
              type='button'
              onClick={addExercise}
              className={`${styles.addButton} py-100 px-200 br-3 bs2 background-bg1 border-hl1`}
            >
              Add Exercise
            </button>
          </div>

          <button
            type='button'
            onClick={openCreateExerciseModal}
            className={`${styles.createExerciseButton} py-100 px-200 br-3 bs2 background-bg2 border-hl2`}
          >
            Create New Exercise
          </button>

          {formError && <p className={styles.error}>{formError}</p>}

          <SubmitButton className='background-bg4 border-hl4' type='submit'>
            {loading ? 'Creating...' : 'Create Set'}
          </SubmitButton>
        </form>
      </Modal>

      <CreateExerciseModal
        isOpen={isCreateExerciseModalOpen}
        onClose={closeCreateExerciseModal}
      />
    </>
  )
}

export default CreateSetModal
