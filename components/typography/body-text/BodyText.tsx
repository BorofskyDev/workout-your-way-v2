// components/body-text/BodyText.tsx

import React from 'react'
import styles from './BodyText.module.scss'

interface PageBodyTextProps {
  children: React.ReactNode
  className?: string
}

const BodyText: React.FC<PageBodyTextProps> = ({
  children,
  className = '',
}) => {
  return (
    <p
      className={`max-width-500 py-100 px-200 font-body fs-400 border-1 bs2 br-4 ${styles.pageHeading} ${className}`}
    >
      {children}
    </p>
  )
}

export default BodyText
