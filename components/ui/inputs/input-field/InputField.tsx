// components/InputField.tsx

import React from 'react'
import styles from './InputField.module.scss'

type InputVariant = 'input' | 'textarea'

interface InputFieldProps {
  variant?: InputVariant

  type?: string

  id: string

  className?: string

  value: string

  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void

  required?: boolean

  placeholder?: string

  label: string
}

const InputField: React.FC<InputFieldProps> = ({
  variant = 'input',
  type = 'text',
  id,
  className = '',
  value,
  onChange,
  required = false,
  placeholder = '',
  label,
}) => {
  return (
    <div className={`border-2 my-400 p-200 br-4 bs5 background-bg8-500 ${styles.inputField}`}>
      <label className='mr-100' htmlFor={id}>
        {label}
      </label>
      {variant === 'textarea' ? (
        <textarea
          id={id}
          className={`py-100 px-200 background-input border-1 bs2 border-input br-2 ${className}`}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={id}
          className={`py-100 px-200 background-input border-1 bs2 border-input br-2 ${className}`}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}

export default InputField
