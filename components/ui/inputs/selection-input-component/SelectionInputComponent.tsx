// components/inputs/selection-input-component/SelectionInputComponent.tsx

'use client'

import React, { Fragment } from 'react'
import {
  Listbox,
  Label,
  Transition,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import styles from './SelectionInputComponent.module.scss'
import { Option } from '@/libs/types' // Adjust the import path as needed

interface BaseProps {
  label: string
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
      <Listbox value={value} onChange={onChange} multiple={isMulti}>
        <Label className={styles.label}>{label}</Label>
        <div className={styles.relative}>
          <ListboxButton className={styles.button}>
            <span className={styles.selected}>{displaySelected()}</span>
            <SelectorIcon className={styles.icon} aria-hidden='true' />
          </ListboxButton>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ListboxOptions className={styles.options}>
              {options.map((option) => (
                <ListboxOption key={option.value} value={option} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`${active ? styles.activeOption : ''} ${
                        styles.option
                      }`}
                    >
                      {isMulti && (
                        <input
                          type='checkbox'
                          checked={value.some(
                            (selectedOption) =>
                              selectedOption.value === option.value
                          )}
                          readOnly
                          className='mr-2'
                        />
                      )}
                      <span>{option.label}</span>
                      {!isMulti && selected && (
                        <CheckIcon
                          className={styles.checkIcon}
                          aria-hidden='true'
                        />
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
