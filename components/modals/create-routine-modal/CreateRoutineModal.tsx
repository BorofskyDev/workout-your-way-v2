// components/modals/create-routine-modal/CreateRoutineModal.tsx

'use client'

import React from 'react'
import Modal from '../modal/Modal'
import InputField from '@/components/ui/inputs/input-field/InputField'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'
import SelectionInputComponent from '@/components/ui/inputs/selection-input-component/SelectionInputComponent'

import useCreateRoutine from '@/libs/hooks/useCreateRoutine'
import styles from './CreateRoutineModal.module.scss'

import { Option } from '@/libs/types'

interface CreateRoutineModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateRoutineModal: React.FC<CreateRoutineModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
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
  } = useCreateRoutine()

  // Function to handle adding a set (allow duplicates)
  const addSet = () => {
    setSelectedSets([...selectedSets, ''])
  }

  // Function to handle selecting a set
  const handleSetChange = (index: number, selectedOption: Option | null) => {
    const updatedSets = [...selectedSets]
    updatedSets[index] = selectedOption ? selectedOption.value : ''
    setSelectedSets(updatedSets)
  }

  // Function to remove a set selection
  const removeSet = (index: number) => {
    const updatedSets = [...selectedSets]
    updatedSets.splice(index, 1)
    setSelectedSets(updatedSets)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title='Create Routine'>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Routine Name */}
          <InputField
            id='routineName'
            label='Routine Name'
            type='text'
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            required
            placeholder='Enter routine name'
          />

          {/* Routine Type */}
          <div className={styles.routineTypeContainer}>
            <label className={styles.label}>Routine Type:</label>
            <SelectionInputComponent
              options={availableRoutineTypes}
              value={routineType}
              onChange={(option) => setRoutineType(option)}
              isMulti={false}
              placeholder='Select routine type'
            />
          </div>

          {/* Routine Description */}
          <InputField
            variant='textarea'
            id='routineDescription'
            label='Description'
            value={routineDescription}
            onChange={(e) => setRoutineDescription(e.target.value)}
            required={false}
            placeholder='Enter routine description'
          />

          {/* Sets - Dynamic List */}
          <div className={styles.setsContainer}>
            <label className={styles.label}>Select Sets:</label>
            {selectedSets.map((setId, index) => {
              // Find the corresponding Option object based on setId
              const foundSet = sets.find((s) => s.id === setId)
              const selectedOption = foundSet
                ? { value: foundSet.id, label: foundSet.name }
                : null

              return (
                <div key={index} className={styles.setRow}>
                  <SelectionInputComponent
                    options={sets.map((s) => ({
                      value: s.id,
                      label: s.name,
                    }))}
                    value={selectedOption}
                    onChange={(option) => handleSetChange(index, option)}
                    isMulti={false}
                    placeholder='Select a set'
                  />
                  <button
                    type='button'
                    onClick={() => removeSet(index)}
                    className={`background-bg8 border-2 border-hl8 p-100 br-6 bs2 ${styles.removeButton}`}
                  >
                    Remove
                  </button>
                </div>
              )
            })}
            <button
              type='button'
              onClick={addSet}
              className={`${styles.addButton} py-100 px-200 br-4 bs2 background-bg2 border-hl2`}
            >
              Add Set
            </button>
          </div>

          {/* Display Form Error */}
          {formError && <p className={styles.error}>{formError}</p>}

          {/* Submit Button */}
          <SubmitButton className='background-bg1 border-hl1' type='submit' >
            {loading ? 'Creating...' : 'Create Routine'}
          </SubmitButton>
        </form>
      </Modal>
    </>
  )
}

export default CreateRoutineModal
