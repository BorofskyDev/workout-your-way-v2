// components/ActionButton.tsx

import React from 'react'
import styles from './ActionButton.module.scss'

interface ActionButtonProps {
  className?: string

  children: React.ReactNode

  onClick: () => void
}

const ActionButton: React.FC<ActionButtonProps> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={`py-2 border-2 br-2 background-bg2 border-hl2 font-header fw-bold ${styles.actionButton} ${className}`}>
      {children}
    </button>
  )
}

export default ActionButton
