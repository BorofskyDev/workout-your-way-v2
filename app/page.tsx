// app/page.tsx

'use client'

import React, { useState } from 'react'
import { auth, googleProvider } from '@/libs/firebase' // Adjust the import path as necessary
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useUser } from '../context/UserContext'
import GridCenterSection from '@/components/layouts/sections/GridCenterSection'
import PageHeading from '@/components/typography/page-heading/PageHeading'
import ActionButton from '@/components/ui/buttons/action-button/ActionButton'
import InputField from '@/components/ui/inputs/input-field/InputField'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'
import styles from './page.module.scss'
import { FirebaseError } from 'firebase/app' // Import FirebaseError

const LoginPage: React.FC = () => {
  const router = useRouter()
  const { user, loading } = useUser()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Redirect authenticated users to the client portal
  if (!loading && user) {
    router.push('/app/client-portal')
    return null
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/app/client-portal')
    } catch (err: unknown) {
      // Type the error as unknown
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    }
  }

  const handleGoogleLogin = async () => {
    setError('')

    try {
      await signInWithPopup(auth, googleProvider)
      router.push('/client-portal')
    } catch (err: unknown) {
      // Type the error as unknown
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <GridCenterSection id='login'>
      <PageHeading>Login</PageHeading>
      <div className={styles.loginPage}>
        {error && (
          <div className='bg-red-100 text-red-700 p-3 mb-4 rounded'>
            {error}
          </div>
        )}

        {/* Google Login Button */}
        <ActionButton onClick={handleGoogleLogin} className='mb-4'>
          Continue with Google
        </ActionButton>

        {/* Divider */}
        <div className='flex items-center my-4'>
          <hr className='flex-grow border-gray-300' />
          <span className='mx-2 text-gray-500'>OR</span>
          <hr className='flex-grow border-gray-300' />
        </div>

        {/* Email/Password Login Form */}
        <form className={styles.form} onSubmit={handleEmailLogin}>
          <InputField
            id='email'
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='you@example.com'
          />

          <InputField
            id='password'
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='********'
            className=''
          />

          <SubmitButton
            type='submit'
            className={`background-bg4 border-hl4 ${styles.btn}`}
          >
            Login
          </SubmitButton>
        </form>
      </div>
    </GridCenterSection>
  )
}

export default LoginPage
