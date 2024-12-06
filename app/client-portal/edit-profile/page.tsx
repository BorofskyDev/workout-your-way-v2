// app/client-profile/edit-profile/page.tsx

'use client'

import React from 'react'
import GridCenterSection from '@/components/layouts/sections/GridCenterSection'
import PageHeading from '@/components/typography/page-heading/PageHeading'

const EditProfilePage: React.FC = () => {
  return (
    <GridCenterSection id='edit-profile'>
      <PageHeading>Edit Profile</PageHeading>
      <div>
        <p>You&apos;ll edit your profile here.</p>
        {/* Future form components for editing profile will go here */}
      </div>
    </GridCenterSection>
  )
}

export default EditProfilePage
