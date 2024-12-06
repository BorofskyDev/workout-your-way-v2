// app/client-portal/page.tsx

'use client'

import React from 'react'
import GridCenterSection from '@/components/layouts/sections/GridCenterSection' // Adjust the import path as necessary

const ClientPortalPage: React.FC = () => {
  return (
    <GridCenterSection id='client-portal' className='bg-bg1 p-8'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to Your Client Portal</h1>
      <p className='mb-6'>
        Here you can access your personalized dashboard and resources.
      </p>
      {/* Add more client-specific UI components here */}
    </GridCenterSection>
  )
}

export default ClientPortalPage
