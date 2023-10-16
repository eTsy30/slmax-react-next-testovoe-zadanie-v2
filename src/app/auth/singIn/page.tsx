'use client'
import { signIn } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import styles from './page.module.css'
import { FcGoogle } from 'react-icons/fc'

const LoginPage = () => {
  const userName = useRef('')
  const pass = useRef('')
  const [isRegistering, setIsRegistering] = useState(false)
  const onSubmit = async () => {
    const result = await signIn('credentials', {
      email: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: '/',
    })
  }

  const onSubmitGoogle = async () => {
    const result = await signIn('google', {
      redirect: true,
      callbackUrl: '/',
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>
          {isRegistering ? 'Login' : 'Registrate'}
        </h2>
        <h4 className={styles.supTitle}>Welcome to your memories</h4>
        <label className={styles.textLabel} htmlFor="email">
          Login/Email
        </label>
        <input
          className={styles.inputSing}
          name="email"
          type="text"
          placeholder=" Login/Email"
          onChange={(e) => {
            userName.current = e.target.value
          }}
        />
        <label className={styles.textLabel} htmlFor="pass">
          Password
        </label>
        <input
          placeholder=" Password"
          className={styles.inputSing}
          name="pass"
          type="text"
          onChange={(e) => {
            pass.current = e.target.value
          }}
        />
        <button className={styles.submitButton} onClick={onSubmit}>
          submit
        </button>
        <button className={styles.iconButton} onClick={onSubmitGoogle}>
          <FcGoogle />
        </button>
        <p
          className={styles.titleFooter}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          <b>{!isRegistering ? 'Login' : 'Registrate'}</b> Here
        </p>
      </div>
    </div>
  )
}

export default LoginPage
