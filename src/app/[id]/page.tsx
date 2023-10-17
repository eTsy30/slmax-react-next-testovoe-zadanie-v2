'use client'
import { useAppDispatch, useAppSelector } from '@/redux/Hooks/hook'
import { getOnePhoto } from '@/redux/Slices/photoSlice'
import { RootState } from '@/redux/store'
import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from './page.module.css'
const OnePost = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getOnePhoto(params.id))
  }, [dispatch, params.id])
  const { displayedData } = useAppSelector((state: RootState) => state.photo)

  return (
    <section className={styles.container}>
      {displayedData && (
        <Image
          className={styles.image}
          src={displayedData[0]?.image}
          alt={'Some photo'}
          width={450}
          height={400}
        />
      )}
      <div>
        <h2 className={styles.title}>{displayedData[0]?.description}</h2>
        <p className={styles.description}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem,
          voluptates necessitatibus eveniet iusto distinctio omnis, quia,
          dignissimos nesciunt eius velit veritatis sit. Mollitia deleniti
          molestias hic corporis voluptate voluptas asperiores. Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Dolorem, voluptates
          necessitatibus eveniet iusto distinctio omnis, quia, dignissimos
          nesciunt eius velit veritatis sit. Mollitia deleniti molestias hic
          corporis voluptate voluptas asperiores. Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Dolorem, voluptates necessitatibus
          eveniet iusto distinctio omnis, quia, dignissimos nesciunt eius velit
          veritatis sit. Mollitia deleniti molestias hic corporis voluptate
          voluptas asperiores. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Dolorem, voluptates necessitatibus eveniet iusto
          distinctio omnis, quia, dignissimos nesciunt eius velit veritatis sit.
          Mollitia deleniti molestias hic corporis voluptate voluptas
          asperiores.
        </p>
      </div>
    </section>
  )
}
export default OnePost
