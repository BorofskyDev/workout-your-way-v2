// app/client-portal/page.tsx

'use client'

import React, { useState } from 'react'
import PageHeading from '@/components/typography/page-heading/PageHeading'
import EditProfileModal from '@/components/modals/edit-profile-modal/EditProfileModal'
import CreateExerciseModal from '@/components/modals/create-exercise-modal/CreateExerciseModal' // Existing Import
import CreateSetModal from '@/components/modals/create-set-modal/CreateSetModal' // New Import
import styles from './page.module.scss'
import ModalButton from '@/components/ui/buttons/modal-button/ModalButton'

const ClientPortalPage: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)
  const [isCreateExerciseModalOpen, setIsCreateExerciseModalOpen] =
    useState<boolean>(false) // Existing State
  const [isCreateSetModalOpen, setIsCreateSetModalOpen] =
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

      {/* New Create Set Modal */}
      <CreateSetModal
        isOpen={isCreateSetModalOpen}
        onClose={closeCreateSetModal}
      />
    </main>
  )
}

export default ClientPortalPage
