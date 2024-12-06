import React from 'react'
import styles from './SubSectionHeading.module.scss'

interface SubSectionHeadingProps {
  children: React.ReactNode
  className?: string
}

const SubSectionHeading: React.FC<SubSectionHeadingProps> = ({
  children,
  className = '',
}) => {
  return (
    <h2
      className={`font-header fw-bold fs-700 text-center capitalize ${styles.pageHeading} ${className}`}
    >
      {children}
    </h2>
  )
}

export default SubSectionHeading
