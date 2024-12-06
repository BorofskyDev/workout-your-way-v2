// components/modals/edit-profile-modal/EditProfileModal.tsx

'use client'

import React from 'react'
import Modal from '../modal/Modal'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'

interface EditProfileModalProps {
 
  isOpen: boolean

  
  onClose: () => void
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useUser()
  const router = useRouter()

  const handleEditProfile = () => {
    onClose()
    router.push('/client-portal/edit-profile')
  }

  return (
    <Modal className='background-bg6 border-3 border-hl6' isOpen={isOpen} onClose={onClose} title='Profile'>
      <div className='flex-col-center gap-400'>
        <p>Email: {user?.email}</p>
        
        <SubmitButton type='button' onClick={handleEditProfile}>
          Edit Profile
        </SubmitButton>
      </div>
    </Modal>
  )
}

export default EditProfileModal
