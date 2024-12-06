// components/edit-profile/EditProfileComponent.tsx

'use client'

import React, { useEffect, useState } from 'react'
import InputField from '@/components/ui/inputs/input-field/InputField'
import NumberInputField from '@/components/ui/inputs/number-input-field/NumberInputField'
import useEditProfile from '@/libs/hooks/useEditProfile'
import { useUser } from '@/context/UserContext'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'
import Image from 'next/image'

const EditProfileComponent: React.FC = () => {
  const {
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
  } = useEditProfile()

  const { user, loading } = useUser()

  // State to manage email edit mode
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false)
  const [tempEmail, setTempEmail] = useState<string>(profile.email)

  // Fetch user profile when user data is loaded
  useEffect(() => {
    if (!loading && user) {
      fetchUserProfile(user.uid)
    }
  }, [loading, user])

  // Update tempEmail when profile.email changes
  useEffect(() => {
    setTempEmail(profile.email)
  }, [profile.email])

  /**
   * Handles changes for general profile fields (both input and textarea).
   * @param e - The change event from an input or textarea element.
   */
  const handleGeneralChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setProfile((prev) => ({ ...prev, [id]: value }))
  }

  /**
   * Handles changes specifically for NumberInputField.
   * Accepts a broader event type but processes only HTMLInputElement events.
   * @param e - The change event from an input or textarea element.
   */
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Ensure that the event target is an HTMLInputElement
    if (e.target instanceof HTMLInputElement) {
      const { id, value } = e.target
      setProfile((prev) => ({ ...prev, [id]: value }))
    }
    // If it's a textarea, do nothing or handle accordingly
  }

  /**
   * Handles changes to the email input field.
   * @param e - The change event from the email input.
   */
  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Ensure that the event target is an HTMLInputElement
    if (e.target instanceof HTMLInputElement) {
      const { value } = e.target
      setTempEmail(value)
    }
    // If it's a textarea, do nothing or handle accordingly
  }

  /**
   * Handles the submission of the profile form.
   * Updates email if it has been edited and then updates other profile fields.
   * @param e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // If email is being edited and has changed, update it
      if (isEditingEmail && tempEmail !== profile.email) {
        await handleEmailUpdate(tempEmail)
        setProfile((prev) => ({ ...prev, email: tempEmail }))
        setIsEditingEmail(false)
      }

      // Update other profile fields
      await updateUserProfile(user!.uid)
      setSuccess('Profile updated successfully.')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred.')
      }
    }
  }

  /**
   * Handles the submission of the password change form.
   * @param e - The form submission event.
   */
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await handlePasswordUpdate()
      setSuccess('Password updated successfully.')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred.')
      }
    }
  }

  /**
   * Handles the selection of a new profile photo.
   * @param e - The change event from the file input.
   */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0])
    }
  }

  /**
   * Handles the upload of the selected profile photo.
   */
  const handlePhotoUploadClick = async () => {
    if (photoFile && user) {
      try {
        await handlePhotoUpload(photoFile, user.uid)
        setPhotoFile(null) // Reset the file input
        setSuccess('Profile photo uploaded successfully.')
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred during photo upload.')
        }
      }
    }
  }

  return (
    <div>
      <h1>Edit Profile</h1>

      {/* Display Success or Error Messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Profile Information Form */}
      <form onSubmit={handleSubmit}>
        {/* Profile Photo */}
        {profile.photoURL && (
          <div>
            <Image
              src={profile.photoURL}
              alt='Profile Photo'
              width={1260}
              height={1080}
            />
          </div>
        )}
        <div>
          <label htmlFor='photo'>Profile Photo:</label>
          <input
            type='file'
            id='photo'
            accept='image/*'
            onChange={handlePhotoChange}
          />
          <SubmitButton
            type='button'
            onClick={handlePhotoUploadClick}
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </SubmitButton>
        </div>

        {/* Name */}
        <InputField
          id='name'
          label='Name'
          type='text'
          value={profile.name}
          onChange={handleGeneralChange}
          required
          placeholder='Your Name'
        />

        {/* Date of Birth */}
        <InputField
          id='dateOfBirth'
          label='Date of Birth'
          type='date'
          value={profile.dateOfBirth}
          onChange={handleGeneralChange}
          required
          placeholder=''
        />

        {/* Height */}
        <NumberInputField
          id='height'
          label='Height (cm)'
          value={profile.height}
          onChange={handleNumberChange} // Updated handler
          required
          placeholder='e.g., 170'
        />

        {/* Gender */}
        <InputField
          id='gender'
          label='Gender'
          type='text'
          value={profile.gender}
          onChange={handleGeneralChange}
          required
          placeholder='e.g., Male, Female, Other'
        />

        {/* Email */}
        <div>
          <label htmlFor='email'>Email:</label>
          {isEditingEmail ? (
            <InputField
              id='email'
              label=''
              type='email'
              value={tempEmail}
              onChange={handleEmailChange}
              required
              placeholder='you@example.com'
            />
          ) : (
            <p
              onClick={() => setIsEditingEmail(true)}
              style={{
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underline',
              }}
            >
              {profile.email}
            </p>
          )}
        </div>

        {/* Age Display */}
        {profile.dateOfBirth && (
          <p>Age: {calculateAge(profile.dateOfBirth)} years</p>
        )}

        <SubmitButton type='submit'>Update Profile</SubmitButton>
      </form>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordSubmit}>
        <InputField
          id='password'
          label='New Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Enter new password'
        />

        <InputField
          id='confirmPassword'
          label='Confirm Password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder='Confirm new password'
        />

        <SubmitButton type='submit'>Change Password</SubmitButton>
      </form>
    </div>
  )
}

export default EditProfileComponent
