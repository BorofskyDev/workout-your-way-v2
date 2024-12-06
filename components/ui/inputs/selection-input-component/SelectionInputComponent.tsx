// components/inputs/selection-input-component/SelectionInputComponent.tsx

'use client'

import React, { Fragment } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import styles from './SelectionInputComponent.module.scss'
import { Option } from '@/libs/types' // Adjust the import path as needed

interface BaseProps {
  label?: string // Make label optional
  options: Option[]
  placeholder?: string
}

interface SingleSelectProps extends BaseProps {
  isMulti: false
  value: Option | null
  onChange: (value: Option | null) => void
}

interface MultiSelectProps extends BaseProps {
  isMulti: true
  value: Option[]
  onChange: (value: Option[]) => void
}

type SelectionInputComponentProps = SingleSelectProps | MultiSelectProps

const SelectionInputComponent: React.FC<SelectionInputComponentProps> = ({
  label,
  options,
  value,
  onChange,
  isMulti,
  placeholder = 'Select an option',
}) => {
  // Display selected items as a comma-separated string
  const displaySelected = () => {
    if (isMulti) {
      // TypeScript knows that value is Option[] here
      return value.length > 0
        ? value.map((part) => part.label).join(', ')
        : placeholder
    }
    // TypeScript knows that value is Option | null here
    return value ? value.label : placeholder
  }

  return (
    <div className={styles.container}>
      {label && (
        <label className={`font-header fw-medium ${styles.internalLabel}`}>
          {label}
        </label>
      )}{' '}
      {/* Conditionally render label */}
      <Listbox value={value} onChange={onChange} multiple={isMulti}>
        <div className={styles.relative}>
          <ListboxButton
            className={`py-100 px-200 font-body background-input br-4 bs2 my-200 border-1 border-input ${styles.button}`}
          >
            <span className={`font-body ${styles.selected}`}>
              {displaySelected()}
            </span>
            <SelectorIcon className={styles.icon} aria-hidden='true' />
          </ListboxButton>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ListboxOptions
              className={`br-3 border-3 border-input bs8  ${styles.options}`}
            >
              {options.map((option) => (
                <ListboxOption key={option.value} value={option} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`${styles.option} ${
                        active ? styles.activeOption : ''
                      } background-input`}
                    >
                      {isMulti && (
                        <input
                          type='checkbox'
                          checked={selected}
                          readOnly
                          className='mr-2'
                        />
                      )}
                      <span
                        className={`${
                          selected ? 'font-semibold' : 'font-normal'
                        } block truncate`}
                      >
                        {option.label}
                      </span>
                      {!isMulti && selected && (
                        <span className={styles.icon}>
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      )}
                    </li>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default SelectionInputComponent
