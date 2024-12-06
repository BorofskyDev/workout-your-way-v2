// hooks/useEditProfile.ts

import { useState } from 'react'
import { auth, db, storage } from '@/libs/firebase'
import { updateEmail, updatePassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FirebaseError } from 'firebase/app'

interface UserProfile {
  name: string
  dateOfBirth: string
  height: string
  gender: string
  email: string
  photoURL?: string
}

const useEditProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    dateOfBirth: '',
    height: '',
    gender: '',
    email: '',
    photoURL: '',
  })

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  const fetchUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        setProfile(userDoc.data() as UserProfile)
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred.')
      }
    }
  }

  const updateUserProfile = async (uid: string) => {
    try {
      await setDoc(doc(db, 'users', uid), profile, { merge: true })
      setSuccess('Profile updated successfully.')
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred.')
      }
    }
  }

  const handleEmailUpdate = async (newEmail: string) => {
    try {
      await updateEmail(auth.currentUser!, newEmail)
      setSuccess('Email updated successfully.')
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred.')
      }
    }
  }

  const handlePasswordUpdate = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    try {
      await updatePassword(auth.currentUser!, password)
      setSuccess('Password updated successfully.')
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred.')
      }
    }
  }

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handlePhotoUpload = async (file: File, uid: string) => {
    setUploading(true)
    try {
      const photoRef = ref(storage, `profiles/${uid}/${file.name}`)
      const snapshot = await uploadBytes(photoRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)

      setProfile((prev) => ({ ...prev, photoURL: downloadURL }))
      await setDoc(
        doc(db, 'users', uid),
        { photoURL: downloadURL },
        { merge: true }
      )
      setSuccess('Profile photo updated successfully.')
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred.')
      }
    } finally {
      setUploading(false)
    }
  }

  return {
    profile,
    setProfile,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    success,
    setSuccess,
    uploading,
    photoFile,
    setPhotoFile,
    fetchUserProfile,
    updateUserProfile,
    handleEmailUpdate,
    handlePasswordUpdate,
    handlePhotoUpload,
    calculateAge,
  }
}

export default useEditProfile
