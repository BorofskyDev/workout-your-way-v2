// app/client-portal/page.tsx

'use client'

import React, { useState } from 'react'
import PageHeading from '@/components/typography/page-heading/PageHeading'
import EditProfileModal from '@/components/modals/edit-profile-modal/EditProfileModal'
import styles from './page.module.scss'
import ModalButton from '@/components/ui/buttons/modal-button/ModalButton'

const ClientPortalPage: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)

  const openProfileModal = () => {
    setIsProfileModalOpen(true)
  }

  const closeProfileModal = () => {
    setIsProfileModalOpen(false)
  }

  return (
    <main className={`px-400 py-800 ${styles.profilePage}`} id='client-portal'>
      <PageHeading>Client Portal</PageHeading>
      <div>
        <ModalButton className='background-bg6 border-hl6' onClick={openProfileModal}>View Profile</ModalButton>

        <EditProfileModal
          isOpen={isProfileModalOpen}
          onClose={closeProfileModal}
        />
      </div>
    </main>
  )
}

export default ClientPortalPage
