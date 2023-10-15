'use client'
import styles from './page.module.css'
import PhotoCard from '@/components/PhotoCard/PhotoCard'
import { useAppSelector, useAppDispatch } from '@/redux/Hooks/hook'
import { fetchPosts } from '@/redux/Slices/photoSlice'
import { RootState } from '@/redux/store'
import { useEffect } from 'react'
import { IPhoto } from '@/Types/Type'

export default function Home() {
  const data = useAppSelector((state: RootState) => state.photo)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <main className={styles.main}>
      {data.data.map((i: IPhoto) => {
        return (
          <div className={styles.listOfPhotoCard} key={i.id}>
            <PhotoCard description={i.description} image={i.image} />
          </div>
        )
      })}
    </main>
  )
}
