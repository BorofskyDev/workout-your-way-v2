// components/ui/inputs/boolean-input-component/BooleanInputComponent.tsx

'use client'

import React from 'react'
import styles from './BooleanInputComponent.module.scss'

interface BooleanInputProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const BooleanInputComponent: React.FC<BooleanInputProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className={`${styles.checkboxContainer}`}>
      <label htmlFor={id} className={styles.checkboxLabel}>
        {label}
      </label>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`my-200 ${styles.checkbox}`}
      />
    </div>
  )
}

export default BooleanInputComponent
