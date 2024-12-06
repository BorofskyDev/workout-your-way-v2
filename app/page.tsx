// app/page.tsx

'use client'

import React, { useState } from 'react'
import { auth, googleProvider } from '@/libs/firebase' // Adjust the import path as necessary
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useUser } from '../context/UserContext'
import classNames from 'classnames'
import GridCenterSection from '@/components/layouts/sections/GridCenterSection'
import PageHeading from '@/components/typography/page-heading/PageHeading'
import ActionButton from '@/components/ui/buttons/action-button/ActionButton'
import InputField from '@/components/ui/inputs/input-field/InputField'
import styles from './page.module.scss'
import SubmitButton from '@/components/ui/buttons/submit-button/SubmitButton'

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
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')

    try {
      await signInWithPopup(auth, googleProvider)
      router.push('/app/client-portal')
    } catch (err: any) {
      setError(err.message)
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
        <ActionButton onClick={handleGoogleLogin} className='mb-'>
          Continue with Google
        </ActionButton>

        {/* Email/Password Login Form */}
        <form onSubmit={handleEmailLogin}>
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

          <SubmitButton type='submit' className={`background-bg4 border-hl4 ${styles.btn}`}>Login</SubmitButton>
        </form>
      </div>
    </GridCenterSection>
  )
}

export default LoginPage
