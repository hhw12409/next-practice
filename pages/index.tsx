import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import React from 'react'
import Link from 'next/link'

export interface IData {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export default function Home({
  res,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  const [data, setData] = React.useState<IData[]>()
  React.useEffect(() => {
    if (res !== undefined) {
      setData(res.products)
    }
  }, [res])

  return (
    <div className={styles.container}>
      {data?.map((i) => (
        <div className={styles.item_container} key={i.id}>
          <Link href={`/info/${i.id}`}>
            <Image
              className={styles.item_thumbnail}
              src={i.thumbnail}
              alt="thumbnail"
              width={100}
              height={100}
            />
          </Link>
          <span>{i.brand}</span>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await (await fetch('https://dummyjson.com/products')).json()
  return {
    props: {
      res,
    },
  }
}
