'use client'
import React, { FC, useState } from 'react'
import Image from 'next/image'
import styles from './PhotoCard.module.css'
import { IPhoto } from '@/Types/Type'

const PhotoCard: FC<IPhoto> = ({ description, image }) => {
  const [like, setLike] = useState<boolean>(false)
  return (
    <section className={styles.container}>
      {image ? (
        <Image
          className={styles.image}
          src={image}
          alt="Next.js Logo"
          width={300}
          height={400}
          loading="lazy"
        />
      ) : (
        <h3>Load</h3>
      )}

      <div className={styles.titleContainer}>
        <h4 className={styles.title}>{description}</h4>
        <i
          onClick={() => {
            setLike(!like)
          }}
          className={'fa-solid fa-heart '}
          style={{ color: like ? ' #F96167' : 'grey' }}
        ></i>
      </div>
    </section>
  )
}
export default PhotoCard
