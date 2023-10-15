'use client'
import styles from './page.module.css'
import PhotoCard from '@/components/PhotoCard/PhotoCard'
import { useAppSelector, useAppDispatch } from '@/redux/Hooks/hook'
import { fetchPosts, setData } from '@/redux/Slices/photoSlice'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { IPhoto } from '@/Types/Type'
import Pagination from '@/components/Pagination/Pagination'

export default function Home() {
  const itemsPerPage = 12
  const { data, displayedData, totalPage } = useAppSelector(
    (state: RootState) => state.photo
  )
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = currentPage * itemsPerPage

    dispatch(setData(data.slice(startIndex, endIndex)))
  }, [currentPage, data])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  console.log(displayedData, 'displayedData')

  return (
    <main className={styles.main}>
      {displayedData.map((i: IPhoto) => {
        return (
          <div className={styles.listOfPhotoCard} key={i.id}>
            <PhotoCard description={i.description} image={i.image} />
          </div>
        )
      })}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={handlePageChange}
      />
    </main>
  )
}
