'use client'
import { signIn } from 'next-auth/react'
import React, { useRef, useState } from 'react'

const LoginPage = () => {
  const userName = useRef('')
  const pass = useRef('')
  const [isRegistering, setIsRegistering] = useState(false)
  const onSubmit = async () => {
    const result = await signIn('credentials', {
      email: userName.current,
      password: pass.current,
      register: true,
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
    <>
      <div>LoginPage</div>
      <div style={{ background: 'white' }}>
        <input
          type="text"
          onChange={(e) => {
            userName.current = e.target.value
          }}
        />{' '}
        <input
          type="text"
          onChange={(e) => {
            pass.current = e.target.value
          }}
        />
        <button onClick={onSubmit}>submit</button>
        <button onClick={onSubmitGoogle}>google</button>
      </div>
    </>
  )
}

export default LoginPage
