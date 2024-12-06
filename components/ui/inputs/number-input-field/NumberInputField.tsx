// components/ui/inputs/number-input-field/NumberInputField.tsx

import React from 'react'
import InputField from '../input-field/InputField'

interface NumberInputFieldProps {
  id: string
  label: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void // Updated type
  required?: boolean
  placeholder?: string
  className?: string
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  required = false,
  placeholder = '',
  className = '',
}) => {
  return (
    <InputField
      variant='input'
      type='number'
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={className}
    />
  )
}

export default NumberInputField
