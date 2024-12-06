// components/ActionButton.tsx

import React from 'react'
import styles from './ModalButton.module.scss'

interface ModalButtonProps {
  className?: string

  children: React.ReactNode

  onClick: () => void
}

const ModalButton: React.FC<ModalButtonProps> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`mt-200 py-100 px-300 border-2 br-2 bs2 font-header fw-bold ${styles.modalButton} ${className}`}
    >
      {children}
    </button>
  )
}

export default ModalButton
