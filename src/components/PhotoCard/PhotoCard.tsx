'use client'
import React, { FC, useState } from 'react'
import Image from 'next/image'
import styles from './PhotoCard.module.css'
import { IPhoto } from '@/Types/Type'
import Link from 'next/link'
import { useLocalStorage } from '@/Hooks/LocalStorage/useLocalStorageAddItem'
import { useSession } from 'next-auth/react'
const PhotoCard: FC<IPhoto> = ({ description, image, id }) => {
  const { data: session } = useSession()
  const [like, setLike] = useState<boolean>(false)
  const { data, setLocalStorageData, setRemveLocalStorageData } =
    useLocalStorage(`${session?.user?.email}`)
  const handleAddToLocalStorage = () => {
    setLike(!like)
    !like
      ? setLocalStorageData({
          description: description,
          image: image,
          id: id,
        })
      : setRemveLocalStorageData(id)
  }

  return (
    <section
      className={styles.container}
      style={{
        transform: `rotate(${Math.floor(Math.random() * 21) - 10}deg)`,
      }}
    >
      {image ? (
        <Link href={`/${id}`}>
          <Image
            className={styles.image}
            src={image}
            alt="Next.js Logo"
            width={300}
            height={400}
            loading="lazy"
          />
        </Link>
      ) : (
        <h3>Load</h3>
      )}

      <div className={styles.titleContainer}>
        <h4 className={styles.title}>{description}</h4>
        <i
          onClick={handleAddToLocalStorage}
          className={'fa-solid fa-heart '}
          style={{
            color:
              like || Boolean(data.find((i) => i.id === id))
                ? ' #F96167'
                : 'grey',
          }}
        ></i>
      </div>
    </section>
  )
}
export default PhotoCard
