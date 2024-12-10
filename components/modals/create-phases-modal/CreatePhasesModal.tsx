// components/modals/create-phases-modal/CreatePhasesModal.tsx

'use client'

import React, { useEffect } from 'react'
import Modal from '../modal/Modal'
import InputField from '@/components/ui/inputs/input-field/InputField'
import SelectionInputComponent from '@/components/ui/inputs/selection-input-component/SelectionInputComponent'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'

import useCreatePhases from '@/libs/hooks/useCreatePhases'
import styles from './CreatePhasesModal.module.scss'
import { toast } from 'react-toastify'
import { Option, PhaseTemplate, Program } from '@/libs/types'

interface CreatePhasesModalProps {
  isOpen: boolean
  onClose: () => void
  numberOfPhases: number
  numberOfWeeks: number
  programData: Omit<Program, 'phases'>
}

const CreatePhasesModal: React.FC<CreatePhasesModalProps> = ({
  isOpen,
  onClose,
  numberOfPhases,
  numberOfWeeks,
  programData,
}) => {
  const {
    phases,
    setPhases,
    routines,
    loading,
    formError,
    handlePhaseSave,
    saveAllPhases,
    fetchRoutines,
  } = useCreatePhases(numberOfPhases)

  // Fetch routines when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchRoutines()
    }
  }, [isOpen, fetchRoutines])

  // Function to handle changes in phase details
  const handlePhaseChange = (
    index: number,
    field: keyof PhaseTemplate,
    value: string | number[] | { day: string; routine: Option | null }[]
  ) => {
    const updatedPhases = [...phases]
    updatedPhases[index] = { ...updatedPhases[index], [field]: value }
    setPhases(updatedPhases)
  }

  // Function to handle changes in routine selection
  const handleRoutineChange = (
    phaseIndex: number,
    dayIndex: number,
    selectedOption: Option | null
  ) => {
    const updatedPhases = [...phases]
    updatedPhases[phaseIndex].days[dayIndex].routine = selectedOption
    setPhases(updatedPhases)
  }

  // Function to handle form submission and program creation
  // Function to handle form submission and program creation
  const handleSaveAllPhases = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all phases before saving
    let hasError = false
    phases.forEach((phase, index) => {
      if (!phase.phaseName.trim()) {
        toast.error(`Phase ${index + 1} name is required.`)
        hasError = true
      }
      if (phase.applicableWeeks.length === 0) {
        toast.error(
          `Phase ${index + 1} must have at least one applicable week.`
        )
        hasError = true
      }
      const incompleteRoutine = phase.days.some((day) => !day.routine)
      if (incompleteRoutine) {
        toast.error(
          `Phase ${index + 1} must have a routine selected for each day.`
        )
        hasError = true
      }
    })

    if (hasError) {
      return
    }

    // Construct the full program data including phases
    const fullProgramData: Program = {
      ...programData, // name, numberOfWeeks, etc.
      phases: phases, // add the phases here
    }

    // Proceed to save all phases and create the program
    saveAllPhases(fullProgramData)
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title='Create Phases'>
        <form onSubmit={handleSaveAllPhases} className={styles.form}>
          {phases.length === 0 && (
            <p>
              No phases to display. Please ensure you have selected the number
              of phases correctly.
            </p>
          )}
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className={styles.phaseContainer}>
              <h3>Phase {phaseIndex + 1}</h3>

              {/* Phase Name */}
              <InputField
                id={`phaseName-${phaseIndex}`}
                label='Phase Name'
                type='text'
                value={phase.phaseName}
                onChange={(e) =>
                  handlePhaseChange(phaseIndex, 'phaseName', e.target.value)
                }
                required
                placeholder='Enter phase name'
              />

              {/* Applicable Weeks */}
              <div className={styles.weeksContainer}>
                <label className={styles.label}>Applicable Weeks:</label>
                <SelectionInputComponent
                  options={Array.from({ length: numberOfWeeks }, (_, i) => ({
                    value: (i + 1).toString(),
                    label: `Week ${i + 1}`,
                  }))}
                  value={phase.applicableWeeks.map((week) => ({
                    value: week.toString(),
                    label: `Week ${week}`,
                  }))}
                  onChange={(selectedOptions) => {
                    const weeks = selectedOptions
                      ? selectedOptions.map((option) =>
                          parseInt(option.value, 10)
                        )
                      : []
                    handlePhaseChange(phaseIndex, 'applicableWeeks', weeks)
                  }}
                  isMulti={true}
                  placeholder='Select applicable weeks'
                />
              </div>

              {/* Days and Routines */}
              <div className={styles.daysContainer}>
                <label className={styles.label}>
                  Select Routines for Days:
                </label>
                {phase.days.map((day, dayIndex) => (
                  <div key={dayIndex} className={styles.dayRow}>
                    <span>{day.day}:</span>
                    <SelectionInputComponent
                      options={routines.map((routine) => ({
                        value: routine.id,
                        label: routine.name,
                      }))}
                      value={day.routine}
                      onChange={(option) =>
                        handleRoutineChange(phaseIndex, dayIndex, option)
                      }
                      isMulti={false}
                      placeholder='Select a routine'
                    />
                  </div>
                ))}
              </div>

              {/* Buttons to Add Week or Day */}
              <div className={styles.buttonGroup}>
                <button
                  type='button'
                  onClick={() => {
                    // Add a week (extend applicableWeeks)
                    const newWeek = Math.max(...phase.applicableWeeks, 0) + 1
                    handlePhaseChange(phaseIndex, 'applicableWeeks', [
                      ...phase.applicableWeeks,
                      newWeek,
                    ])
                  }}
                  className={`${styles.addButton} background-bg2 border-hl2`}
                >
                  Add Week
                </button>

                <button
                  type='button'
                  onClick={() => {
                    // Add a day
                    const newDayIndex = phase.days.length + 1
                    const newDay = { day: `Day ${newDayIndex}`, routine: null }
                    handlePhaseChange(phaseIndex, 'days', [
                      ...phase.days,
                      newDay,
                    ])
                  }}
                  className={`${styles.addButton} background-bg2 border-hl2`}
                >
                  Add Day
                </button>
              </div>

              {/* Save Phase Button */}
              <button
                type='button'
                onClick={() => handlePhaseSave(phaseIndex)}
                className={`${styles.saveButton} background-bg1 border-hl1`}
              >
                Complete Phase {phaseIndex + 1}
              </button>

              <hr className={styles.divider} />
            </div>
          ))}

          {/* Display Form Error */}
          {formError && <p className={styles.error}>{formError}</p>}

          {/* Save All Phases Button */}
          <SubmitButton type='submit'>
            {loading ? 'Saving...' : 'Save All Phases'}
          </SubmitButton>
        </form>
      </Modal>
    </>
  )
}

export default CreatePhasesModal
