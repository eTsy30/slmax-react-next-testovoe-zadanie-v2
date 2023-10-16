'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const SingButton = () => {
  const { data: session, status } = useSession()
  if (session && session.user) {
    return (
      <div>
        <p>{session.user.email}</p>
        <button onClick={() => signOut()}>signOut</button>
      </div>
    )
  }
  return <button onClick={() => signIn()}>signOut</button>
}

export default SingButton
