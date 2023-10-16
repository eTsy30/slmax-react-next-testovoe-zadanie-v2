'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import styles from './Header.module.css'
const Header = () => {
  const { data: session, status } = useSession()
  if (session && session.user) {
    return (
      <header className={styles.container}>
        <i
          className="fa-solid fa-camera"
          style={{ fontSize: '30px', color: 'white' }}
        ></i>
        <nav className={styles.navWrapper}>
          <ul className={styles.navigation}>
            <li>
              <i
                className="fa-solid fa-house headerIcon"
                style={{ fontSize: '30px', color: 'white' }}
              ></i>
            </li>
            <li>
              <i
                className="fa-solid fa-square-plus headerIcon"
                style={{ fontSize: '30px', color: 'white' }}
              ></i>
            </li>
            <li>
              <i
                className="fa-solid fa-id-badge headerIcon"
                style={{ fontSize: '30px', color: 'white' }}
              ></i>
            </li>
          </ul>
        </nav>
        <p className={styles.userNameText}>{session.user.email}</p>
        <button onClick={() => signOut()}>signOut</button>
      </header>
    )
  }
  return <button onClick={() => signIn()}>signIn</button>
}

export default Header
