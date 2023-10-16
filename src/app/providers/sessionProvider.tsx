'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
interface Props {
  children?: React.ReactNode
}
const NextAuth = ({ children }: Props) => (
  <SessionProvider>{children} </SessionProvider>
)

export default NextAuth
