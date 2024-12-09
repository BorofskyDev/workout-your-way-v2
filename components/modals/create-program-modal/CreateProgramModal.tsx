'use client'

import React, { useState } from 'react'
import Modal from '../modal/Modal'
import InputField from '@/components/ui/inputs/input-field/InputField'
import NumberInputField from '@/components/ui/inputs/number-input-field/NumberInputField'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'
import useCreateProgram from '@/libs/hooks/useCreateProgram'
import CreatePhasesModal from '../create-phases-modal/CreatePhasesModal'
import { useUser } from '@/context/UserContext' // <-- Import useUser
import styles from './CreateProgramModal.module.scss'

const CreateProgramModal: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const { user } = useUser() // <-- Access the user context

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
          <InputField
            id='programName'
            label='Program Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='Enter program name'
          />

          <NumberInputField
            id='numberOfWeeks'
            label='Number of Weeks'
            value={numberOfWeeks}
            onChange={(e) => setNumberOfWeeks(e.target.value)}
            required
            placeholder='Enter number of weeks'
          />

          <NumberInputField
            id='numberOfPhases'
            label='Number of Phases'
            value={numberOfPhases}
            onChange={(e) => setNumberOfPhases(e.target.value)}
            required
            placeholder='Enter number of phases'
          />

          <InputField
            variant='textarea'
            id='programDescription'
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={false}
            placeholder='Enter program description'
          />

          {formError && <p className={styles.error}>{formError}</p>}

          <SubmitButton type='submit'>Create Phases</SubmitButton>
        </form>
      </Modal>

      {/* Pass user.uid as ownerId */}
      {user && (
        <CreatePhasesModal
          isOpen={isCreatePhasesModalOpen}
          onClose={closeCreatePhasesModal}
          numberOfPhases={parseInt(numberOfPhases, 10)}
          numberOfWeeks={parseInt(numberOfWeeks, 10)}
          programData={{
            name: name.trim(),
            description: description.trim(),
            numberOfWeeks: parseInt(numberOfWeeks, 10),
            numberOfPhases: parseInt(numberOfPhases, 10),
            ownerId: user.uid, 
          }}
        />
      )}
    </>
  )
}

export default CreateProgramModal
