// app/client-portal/edit-profile/page.tsx

'use client'

import React from 'react'
import EditProfileComponent from '@/components/edit-profile/EditProfileComponent'
import GridCenterSection from '@/components/layouts/sections/GridCenterSection'
import PageHeading from '@/components/typography/page-heading/PageHeading'

const EditProfilePage: React.FC = () => {
  return (
    <GridCenterSection id='edit-profile'>
      <PageHeading>Edit Profile</PageHeading>
      <EditProfileComponent />
    </GridCenterSection>
  )
}

export default EditProfilePage
