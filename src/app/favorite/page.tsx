'use client'
import { useLocalStorage } from '@/Hooks/LocalStorage/useLocalStorageAddItem'
import PhotoCard from '@/components/PhotoCard/PhotoCard'
import { useSession } from 'next-auth/react'
import React from 'react'
import styles from './page.module.css'
const FavoritePage = () => {
  const { data: session } = useSession()
  const { data } = useLocalStorage(`${session?.user?.email}`)

  return (
    <div className={styles.listOfPhotoCard}>
      {data.map((i) => (
        <div key={i.id}>
          <PhotoCard description={i.description} image={i.image} id={i.id} />
        </div>
      ))}
      {data.length < 1 && (
        <h1 className={styles.title}>Список избранных пуст</h1>
      )}
    </div>
  )
}

export default FavoritePage
