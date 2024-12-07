// components/modals/create-program-modal/CreateProgramModal.tsx

'use client'

import React, { useState } from 'react'
import Modal from '../modal/Modal'
import InputField from '@/components/ui/inputs/input-field/InputField'
import NumberInputField from '@/components/ui/inputs/number-input-field/NumberInputField'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'
import useCreateProgram from '@/libs/hooks/useCreateProgram'
import CreatePhasesModal from '../create-phases-modal/CreatePhasesModal'
import styles from './CreateProgramModal.module.scss'

const CreateProgramModal: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const {
    name,
    setName,
    numberOfWeeks,
    setNumberOfWeeks,
    numberOfPhases,
    setNumberOfPhases,
    description,
    setDescription,
    formError,
  } = useCreateProgram()

  const [isCreatePhasesModalOpen, setIsCreatePhasesModalOpen] =
    useState<boolean>(false)

  const openCreatePhasesModal = () => {
    // Validate before opening phases modal
    if (!name.trim()) {
      // Handle validation
      alert('Program name is required.')
      return
    }

    const weeks = parseInt(numberOfWeeks, 10)
    if (isNaN(weeks) || weeks <= 0) {
      alert('Number of weeks must be a positive number.')
      return
    }

    const phases = parseInt(numberOfPhases, 10)
    if (isNaN(phases) || phases <= 0) {
      alert('Number of phases must be a positive number.')
      return
    }

    setIsCreatePhasesModalOpen(true)
  }

  const closeCreatePhasesModal = () => {
    setIsCreatePhasesModalOpen(false)
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title='Create Program'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            openCreatePhasesModal()
          }}
          className={styles.form}
        >
          {/* Program Name */}
          <InputField
            id='programName'
            label='Program Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='Enter program name'
          />

          {/* Number of Weeks */}
          <NumberInputField
            id='numberOfWeeks'
            label='Number of Weeks'
            value={numberOfWeeks}
            onChange={(e) => setNumberOfWeeks(e.target.value)}
            required
            placeholder='Enter number of weeks'
          />

          {/* Number of Phases */}
          <NumberInputField
            id='numberOfPhases'
            label='Number of Phases'
            value={numberOfPhases}
            onChange={(e) => setNumberOfPhases(e.target.value)}
            required
            placeholder='Enter number of phases'
          />

          {/* Program Description */}
          <InputField
            variant='textarea'
            id='programDescription'
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={false}
            placeholder='Enter program description'
          />

          {/* Display Form Error */}
          {formError && <p className={styles.error}>{formError}</p>}

          {/* Submit Button */}
          <SubmitButton type='submit'>Create Phases</SubmitButton>
        </form>
      </Modal>

      {/* Create Phases Modal */}
      <CreatePhasesModal
        isOpen={isCreatePhasesModalOpen}
        onClose={closeCreatePhasesModal}
        numberOfPhases={parseInt(numberOfPhases, 10)}
        numberOfWeeks={parseInt(numberOfWeeks, 10)}
      />
    </>
  )
}

export default CreateProgramModal
