// components/icons/ClosedIcon.tsx

import React from 'react'
import { icons } from '../icons'
import styles from './CloseIcon.module.scss'

interface ClosedIconProps {
  className?: string
}

const ClosedIcon: React.FC<ClosedIconProps> = ({ className }) => {
  return (
    <svg
      xmlns={icons.close.xmlns}
      viewBox={icons.close.viewBox}
      className={`p-100 bs2 br-3 ${styles.closeIcon} ${className}`}
    >
      <path d={icons.close.path} />
    </svg>
  )
}

export default ClosedIcon
