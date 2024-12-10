'use client'

import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import { useUser } from '@/context/UserContext'
import { Program } from '@/libs/types'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { db } from '@/libs/firebase' // Use the pre-configured db instance
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'
import styles from './StartProgramModal.module.scss'

interface StartProgramModalProps {
  isOpen: boolean
  onClose: () => void
}

const StartProgramModal: React.FC<StartProgramModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useUser()
  const [programs, setPrograms] = useState<Program[]>([])
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true)
      const snapshot = await getDocs(collection(db, 'programs'))
      const fetchedPrograms: Program[] = []
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Program
        fetchedPrograms.push({ ...data, id: docSnap.id })
      })
      setPrograms(fetchedPrograms)
      setLoading(false)
    }

    if (isOpen) {
      fetchPrograms()
    } else {
      // Reset state when modal closes
      setSelectedProgram(null)
    }
  }, [isOpen])

  const handleSelectProgram = (program: Program) => {
    setSelectedProgram(program)
  }

  const handleStartProgram = async () => {
    if (!user || !selectedProgram || !selectedProgram.id) return

    const userProgramRef = doc(collection(db, 'userPrograms'))
    await setDoc(userProgramRef, {
      userId: user.uid,
      programId: selectedProgram.id,
      assignedAt: new Date(),
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Start Program'>
      <div className={styles.container}>
        {loading && <p>Loading programs...</p>}

        {!loading && !selectedProgram && (
          <div className={styles.programList}>
            {programs.length === 0 && <p>No programs available.</p>}
            {programs.map((program) => (
              <div
                key={program.id}
                className={styles.programItem}
                onClick={() => handleSelectProgram(program)}
              >
                <h3>{program.name}</h3>
                <p>{program.description}</p>
                <p>Weeks: {program.numberOfWeeks}</p>
                <p>Phases: {program.numberOfPhases}</p>
              </div>
            ))}
          </div>
        )}

        {selectedProgram && (
          <div className={styles.programDetails}>
            <h2>{selectedProgram.name}</h2>
            <p>{selectedProgram.description}</p>
            <h3>Phases:</h3>
            {selectedProgram.phases.map((phase, pIndex) => (
              <div key={pIndex} className={styles.phase}>
                <h4>{phase.phaseName}</h4>
                <p>Applicable Weeks: {phase.applicableWeeks.join(', ')}</p>
                <h5>Days:</h5>
                <ul>
                  {phase.days.map((dayItem, dIndex) => (
                    <li key={dIndex}>
                      {dayItem.day} -{' '}
                      {dayItem.routine
                        ? dayItem.routine.label
                        : 'No Routine Assigned'}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <SubmitButton type='button' onClick={handleStartProgram}>
              Start Program
            </SubmitButton>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default StartProgramModal
