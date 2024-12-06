'use client'

import React from 'react'

interface SmallIconProps {
  xmlns: string
  viewBox: string
  path: string
  className?: string
}

const SmallIcon: React.FC<SmallIconProps> = ({
  xmlns,
  viewBox,
  path,
  className,
}) => {
  return (
    <svg xmlns={xmlns} viewBox={viewBox} className={className}>
      <path d={path} />
    </svg>
  )
}

export default SmallIcon
