'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import { db, storage } from '@/libs/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Program } from '@/libs/types'
import { useRouter } from 'next/navigation'
import PageHeading from '@/components/typography/page-heading/PageHeading'
import BodyText from '@/components/typography/body-text/BodyText'
import SubSectionHeading from '@/components/typography/sub-section-heading/SubSectionHeading'
import SectionHeading from '@/components/typography/section-heading/SectionHeading'
import NumberInputField from '@/components/ui/inputs/number-input-field/NumberInputField'
import styles from './page.module.scss'

const ActiveProgramPage: React.FC = () => {
  const { user } = useUser()
  const router = useRouter()
  const [activeProgram, setActiveProgram] = useState<Program | null>(null)
  const [userProgramDocId, setUserProgramDocId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [bodyMeasurements, setBodyMeasurements] = useState({
    neck: '',
    chest: '',
    biceps: '',
    thighs: '',
    calves: '',
    waist: '',
    glutes: '',
    weight: '',
    bodyFat: '',
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchActiveProgram = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      // Find userProgram for current user
      const userProgramsRef = collection(db, 'userPrograms')
      const q = query(userProgramsRef, where('userId', '==', user.uid))
      const userProgramsSnap = await getDocs(q)

      if (userProgramsSnap.empty) {
        // No active program
        setLoading(false)
        return
      }

      // Just take the first assigned program for now
      const userProgramDoc = userProgramsSnap.docs[0]
      setUserProgramDocId(userProgramDoc.id)
      const userProgramData = userProgramDoc.data()
      const programId = userProgramData.programId

      // Fetch the actual program
      const programRef = doc(db, 'programs', programId)
      const programSnap = await getDoc(programRef)

      if (!programSnap.exists()) {
        setLoading(false)
        return
      }

      const program = programSnap.data() as Program
      setActiveProgram({ ...program, id: programSnap.id })
      setLoading(false)
    }

    fetchActiveProgram()
  }, [user])

   const handleInputChange = (
     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
     const { name, value } = e.target
     setBodyMeasurements((prev) => ({ ...prev, [name]: value }))
   }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0])
    }
  }

  const handleSaveMeasurements = async () => {
    if (!userProgramDocId) return
    if (!user) return // Early return if user is null

    let photoURL = ''
    if (photoFile) {
      const photoRef = ref(
        storage,
        `userProgramPhotos/${user.uid}/${photoFile.name}`
      )
      await uploadBytes(photoRef, photoFile)
      photoURL = await getDownloadURL(photoRef)
    }

    const userProgramRef = doc(db, 'userPrograms', userProgramDocId)
    await updateDoc(userProgramRef, {
      measurements: bodyMeasurements,
      startPhoto: photoURL || null,
    })

    alert('Measurements saved!')
  }


  const goToTodayExercise = () => {
    // For now, route to a placeholder workout page
    router.push('/workout')
  }

  if (loading) return <p>Loading...</p>

  if (!activeProgram) {
    return <p>No active program found. Please assign a program first.</p>
  }

  return (
    <main className={`px-400 py-800 ${styles.activeProgramPage}`}>
      <PageHeading>Active Program: {activeProgram.name}</PageHeading>
      <BodyText>{activeProgram.description}</BodyText>
      <SectionHeading>Phases</SectionHeading>
      {activeProgram.phases.map((phase, index) => (
        <div
          className={`border-4 p-200 bs3 br-4 background-bg4 ${styles.phaseBox}`}
          key={index}
        >
          <SubSectionHeading>{phase.phaseName}</SubSectionHeading>
          <p className='mb-200 mt-200'>
            Applicable Weeks: {phase.applicableWeeks.join(', ')}
          </p>
          <ul>
            {phase.days.map((day, i) => (
              <li key={i}>
                {day.day} - {day.routine ? day.routine.label : 'No Routine'}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <SectionHeading>Record Your Starting Measurements</SectionHeading>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSaveMeasurements()
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
          gap: '0.5rem',
        }}
      >
        <NumberInputField
          id='neck'
          label='Neck'
          value={bodyMeasurements.neck}
          onChange={handleInputChange}
          placeholder='Neck'
        />
        <NumberInputField
          id='chest'
          label='Chest'
          value={bodyMeasurements.chest}
          onChange={handleInputChange}
          placeholder='Chest'
        />
        <NumberInputField
          id='biceps'
          label='Biceps'
          value={bodyMeasurements.biceps}
          onChange={handleInputChange}
          placeholder='Biceps'
        />
        <NumberInputField
          id='thighs'
          label='Thighs'
          value={bodyMeasurements.thighs}
          onChange={handleInputChange}
          placeholder='Thighs'
        />
        <NumberInputField
          id='calves'
          label='Calves'
          value={bodyMeasurements.calves}
          onChange={handleInputChange}
          placeholder='Calves'
        />
        <NumberInputField
          id='waist'
          label='Waist'
          value={bodyMeasurements.waist}
          onChange={handleInputChange}
          placeholder='Waist'
        />
        <NumberInputField
          id='glutes'
          label='Glutes'
          value={bodyMeasurements.glutes}
          onChange={handleInputChange}
          placeholder='Glutes'
        />
        <NumberInputField
          id='weight'
          label='Weight'
          value={bodyMeasurements.weight}
          onChange={handleInputChange}
          placeholder='Weight'
        />
        <NumberInputField
          id='bodyFat'
          label='Body Fat %'
          value={bodyMeasurements.bodyFat}
          onChange={handleInputChange}
          placeholder='Body Fat %'
        />
        <input type='file' accept='image/*' onChange={handlePhotoChange} />

        <button type='submit'>Save Measurements</button>
      </form>

      <button onClick={goToTodayExercise} style={{ marginTop: '1rem' }}>
        Go to today&apos;s exercise
      </button>
    </main>
  )
}

export default ActiveProgramPage
