// components/PageHeader.tsx

import React from 'react'
import styles from './PageHeading.module.scss'

interface PageHeaderProps {
  children: React.ReactNode
  className?: string
}

const PageHeading: React.FC<PageHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <h1
      className={`width-full font-header fw-black fs-900 text-center uppercase ${styles.pageHeading} ${className}`}
    >
      {children}
    </h1>
  )
}

export default PageHeading
