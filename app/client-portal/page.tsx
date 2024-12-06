// app/client-portal/page.tsx

'use client'

import React, { useState } from 'react'
import GridCenterSection from '@/components/layouts/sections/GridCenterSection'
import PageHeading from '@/components/typography/page-heading/PageHeading'
import EditProfileModal from '@/components/modals/edit-profile-modal/EditProfileModal'

const ClientPortalPage: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)

  const openProfileModal = () => {
    setIsProfileModalOpen(true)
  }

  const closeProfileModal = () => {
    setIsProfileModalOpen(false)
  }

  return (
    <GridCenterSection id='client-portal'>
      <PageHeading>Welcome to the Client Portal</PageHeading>
      <div>
        <button onClick={openProfileModal}>View Profile</button>

        <EditProfileModal
          isOpen={isProfileModalOpen}
          onClose={closeProfileModal}
        />
      </div>
    </GridCenterSection>
  )
}

export default ClientPortalPage
