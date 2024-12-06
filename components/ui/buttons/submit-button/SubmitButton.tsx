// components/SubmitButton.tsx

import React from 'react'
import styles from './SubmitButton.module.scss'

interface SubmitButtonProps {
  type: 'submit' | 'button' | 'reset'

  className?: string

  children: React.ReactNode
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  type,
  className = '',
  children,
}) => {
  return (
    <button type={type} className={`py-100 px-400 fs-500 border-4 br-6 bs2 fw-bold font-header ${styles.submitButton} ${className}`}>
      {children}
    </button>
  )
}

export default SubmitButton
