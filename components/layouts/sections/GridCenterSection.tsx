// components/GridCenterSection.tsx

import React from 'react'
import styles from './GridCenterSection.module.scss'

interface GridCenterSectionProps {
  children: React.ReactNode
    id: string
  className?: string
}

const GridCenterSection: React.FC<GridCenterSectionProps> = ({
  children,
  className,
  id
}) => {
  return (
    <section id={id} className={`${styles.gridCenterSection} ${className}`}>
      {children}
    </section>
  )
}

export default GridCenterSection
