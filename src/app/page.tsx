'use client'

import PhotoCard from '@/components/PhotoCard/PhotoCard'
import { useAppSelector, useAppDispatch } from '@/redux/Hooks/hook'
import { fetchPosts, setData, sortData } from '@/redux/Slices/photoSlice'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { IPhoto } from '@/Types/Type'
import Pagination from '@/components/Pagination/Pagination'
import { useInView } from 'react-intersection-observer'
import { useSession } from 'next-auth/react'
import styles from './page.module.css'
import { FaSortAmountUpAlt, FaSortAmountDownAlt } from 'react-icons/fa'

export default function Home() {
  const itemsPerPage = 12
  const { data, displayedData, totalPage, categories } = useAppSelector(
    (state: RootState) => state.photo
  )
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sort, setSort] = useState<boolean>(false)
  const { ref, inView } = useInView({
    threshold: 0.6,
  })
  useEffect(() => {
    if (inView && data.length < 120) {
      dispatch(fetchPosts())
    }
  }, [inView])
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = currentPage * itemsPerPage

    dispatch(setData(data.slice(startIndex, endIndex)))
  }, [currentPage, data])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') {
    return <>Loading...</>
  }
  const handleSort = () => {
    setSort(!sort)
    dispatch(sortData(sort ? 'asc' : 'desc'))
  }

  return (
    <div className={styles.container}>
      {sort ? (
        <FaSortAmountDownAlt onClick={handleSort} />
      ) : (
        <FaSortAmountUpAlt onClick={handleSort} />
      )}

      <main className={styles.main}>
        {displayedData.map((i: IPhoto) => {
          return (
            <div ref={ref} className={styles.listOfPhotoCard} key={i.id}>
              <PhotoCard
                description={i.description}
                image={i.image}
                id={i.id}
              />
            </div>
          )
        })}
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={handlePageChange}
      />
      <div ref={ref}></div>
    </div>
  )
}
