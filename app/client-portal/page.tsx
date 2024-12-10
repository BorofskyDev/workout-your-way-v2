'use client'

import React, { useState } from 'react'
import PageHeading from '@/components/typography/page-heading/PageHeading'
import EditProfileModal from '@/components/modals/edit-profile-modal/EditProfileModal'
import CreateExerciseModal from '@/components/modals/create-exercise-modal/CreateExerciseModal'
import CreateSetModal from '@/components/modals/create-set-modal/CreateSetModal'
import CreateProgramModal from '@/components/modals/create-program-modal/CreateProgramModal'
import CreateRoutineModal from '@/components/modals/create-routine-modal/CreateRoutineModal'
import ModalButton from '@/components/ui/buttons/modal-button/ModalButton'
import { useRouter } from 'next/navigation' // Using Next.js 13+ navigation
import styles from './page.module.scss'

const ClientPortalPage: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isCreateExerciseModalOpen, setIsCreateExerciseModalOpen] =
    useState(false)
  const [isCreateSetModalOpen, setIsCreateSetModalOpen] = useState(false)
  const [isCreateProgramModalOpen, setIsCreateProgramModalOpen] =
    useState(false)
  const [isCreateRoutineModalOpen, setIsCreateRoutineModalOpen] =
    useState(false)

  const router = useRouter()

  return (
    <main className={`px-400 py-800 ${styles.profilePage}`} id='client-portal'>
      <PageHeading>Client Portal</PageHeading>
      <div className={styles.buttonGroup}>
        <ModalButton
          className='background-bg8 border-hl8'
          onClick={() => setIsProfileModalOpen(true)}
        >
          View Profile
        </ModalButton>

        <ModalButton
          className='background-bg1 border-hl1'
          onClick={() => setIsCreateExerciseModalOpen(true)}
        >
          Create Exercise
        </ModalButton>

        <ModalButton
          className='background-bg3 border-hl3'
          onClick={() => setIsCreateSetModalOpen(true)}
        >
          Manage Sets
        </ModalButton>

        <ModalButton
          className='background-bg4 border-hl4'
          onClick={() => setIsCreateRoutineModalOpen(true)}
        >
          Create Routine
        </ModalButton>

        <ModalButton
          className='background-bg5 border-hl5'
          onClick={() => setIsCreateProgramModalOpen(true)}
        >
          Create Program
        </ModalButton>

        {/* New "View Active Program" button */}
        <ModalButton
          className='background-bg6 border-hl6'
          onClick={() => router.push('/active-program')}
        >
          View Active Program
        </ModalButton>
      </div>

      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <CreateExerciseModal
        isOpen={isCreateExerciseModalOpen}
        onClose={() => setIsCreateExerciseModalOpen(false)}
      />
      <CreateSetModal
        isOpen={isCreateSetModalOpen}
        onClose={() => setIsCreateSetModalOpen(false)}
      />
      <CreateProgramModal
        isOpen={isCreateProgramModalOpen}
        onClose={() => setIsCreateProgramModalOpen(false)}
      />
      <CreateRoutineModal
        isOpen={isCreateRoutineModalOpen}
        onClose={() => setIsCreateRoutineModalOpen(false)}
      />
    </main>
  )
}

export default ClientPortalPage
