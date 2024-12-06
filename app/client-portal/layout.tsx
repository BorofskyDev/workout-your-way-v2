// app/client-portal/layout.tsx

'use client'

import React, { useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import { useRouter } from 'next/navigation'

interface ClientPortalLayoutProps {
  children: React.ReactNode
}

const ClientPortalLayout: React.FC<ClientPortalLayoutProps> = ({
  children,
}) => {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default ClientPortalLayout
