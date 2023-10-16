import styles from './page.module.css'
import PhotoCard from '@/components/PhotoCard/PhotoCard'
import { useAppSelector, useAppDispatch } from '@/redux/Hooks/hook'
import { fetchPosts, setData, setSearch } from '@/redux/Slices/photoSlice'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { IPhoto } from '@/Types/Type'
import Pagination from '@/components/Pagination/Pagination'
import { useInView } from 'react-intersection-observer'

export default async function Photos() {
  const itemsPerPage = 12
  const { data, displayedData, totalPage, categories } = useAppSelector(
    (state: RootState) => state.photo
  )
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { ref, inView } = useInView({
    threshold: 0.1,
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
  console.log(displayedData, 'data')

  return (
    <div>
      <main className={styles.main}>
        <select
          className="home_select"
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
        {displayedData.map((i: IPhoto) => {
          return (
            <div className={styles.listOfPhotoCard} key={i.id}>
              <PhotoCard description={i.description} image={i.image} />
            </div>
          )
        })}

        <div ref={ref}></div>
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
