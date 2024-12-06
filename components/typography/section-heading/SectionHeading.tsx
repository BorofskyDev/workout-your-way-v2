import React from 'react'
import styles from './SectionHeading.module.scss'

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  className = '',
}) => {
  return (
    <h2
      className={`font-header fw-extra-bold fs-800 text-center uppercase ${styles.pageHeading} ${className}`}
    >
      {children}
    </h2>
  )
}

export default SectionHeading
