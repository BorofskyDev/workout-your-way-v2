// app/client-portal/page.tsx

'use client'

import React, { useState } from 'react'
import PageHeading from '@/components/typography/page-heading/PageHeading'
import EditProfileModal from '@/components/modals/edit-profile-modal/EditProfileModal'
import CreateExerciseModal from '@/components/modals/create-exercise-modal/CreateExerciseModal'
import CreateSetModal from '@/components/modals/create-set-modal/CreateSetModal'
import CreateProgramModal from '@/components/modals/create-program-modal/CreateProgramModal' // New Import
import styles from './page.module.scss'
import ModalButton from '@/components/ui/buttons/modal-button/ModalButton'

const ClientPortalPage: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)
  const [isCreateExerciseModalOpen, setIsCreateExerciseModalOpen] =
    useState<boolean>(false)
  const [isCreateSetModalOpen, setIsCreateSetModalOpen] =
    useState<boolean>(false)
  const [isCreateProgramModalOpen, setIsCreateProgramModalOpen] =
    useState<boolean>(false) // New State

  const openProfileModal = () => {
    setIsProfileModalOpen(true)
  }

  const closeProfileModal = () => {
    setIsProfileModalOpen(false)
  }

  const openCreateExerciseModal = () => {
    setIsCreateExerciseModalOpen(true)
  }

  const closeCreateExerciseModal = () => {
    setIsCreateExerciseModalOpen(false)
  }

  const openCreateSetModal = () => {
    setIsCreateSetModalOpen(true)
  }

  const closeCreateSetModal = () => {
    setIsCreateSetModalOpen(false)
  }

  const openCreateProgramModal = () => {
    setIsCreateProgramModalOpen(true)
  }

  const closeCreateProgramModal = () => {
    setIsCreateProgramModalOpen(false)
  }

  return (
    <main className={`px-400 py-800 ${styles.profilePage}`} id='client-portal'>
      <PageHeading>Client Portal</PageHeading>
      <div className={styles.buttonGroup}>
        <ModalButton
          className='background-bg8 border-hl8'
          onClick={openProfileModal}
        >
          View Profile
        </ModalButton>

        <ModalButton
          className='background-bg1 border-hl1'
          onClick={openCreateExerciseModal}
        >
          Create Exercise
        </ModalButton>

        <ModalButton
          className='background-bg3 border-hl3' // Adjust styling as needed
          onClick={openCreateSetModal}
        >
          Manage Sets
        </ModalButton>

        <ModalButton
          className='background-bg5 border-hl5' // Adjust styling as needed
          onClick={openCreateProgramModal}
        >
          Create Program
        </ModalButton>
      </div>

      {/* Existing Edit Profile Modal */}
      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />

      {/* Existing Create Exercise Modal */}
      <CreateExerciseModal
        isOpen={isCreateExerciseModalOpen}
        onClose={closeCreateExerciseModal}
      />

      {/* Existing Create Set Modal */}
      <CreateSetModal
        isOpen={isCreateSetModalOpen}
        onClose={closeCreateSetModal}
      />

      {/* New Create Program Modal */}
      <CreateProgramModal
        isOpen={isCreateProgramModalOpen}
        onClose={closeCreateProgramModal}
      />
    </main>
  )
}

export default ClientPortalPage
