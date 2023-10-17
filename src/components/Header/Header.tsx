'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/Hooks/hook'
import { RootState } from '@/redux/store'
import { setSearch } from '@/redux/Slices/photoSlice'
const Header = () => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector((state: RootState) => state.photo)
  const { data: session, status } = useSession()

  if (session && session.user) {
    return (
      <header className={styles.container}>
        <Link href={'/'}>
          {' '}
          <i
            className="fa-solid fa-camera"
            style={{ fontSize: '30px', color: 'white' }}
          ></i>
        </Link>
        <select
          className={styles.select}
          name="Category"
          onChange={(e) => {
            const selected = e.target.value
            dispatch(setSearch(selected))
          }}
        >
          <option value="All">All</option>
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            )
          })}
        </select>
        <nav className={styles.navWrapper}>
          <ul className={styles.navigation}>
            <li>
              <Link href={'/'}>
                <i
                  className="fa-solid fa-house headerIcon"
                  style={{ fontSize: '30px', color: 'white' }}
                ></i>
              </Link>
            </li>{' '}
            <li>
              <Link href={'/favorite'}>
                <i
                  className={'fa-solid fa-heart '}
                  style={{ fontSize: '30px', color: 'white' }}
                ></i>
              </Link>
            </li>
          </ul>
        </nav>
        <p className={styles.userNameText}>{session.user.email}</p>
        <button className={styles.buttonSing} onClick={() => signOut()}>
          signOut
        </button>
      </header>
    )
  }
}

export default Header
function sortData(arg0: string): any {
  throw new Error('Function not implemented.')
}
