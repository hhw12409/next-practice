import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import styles from '../../styles/Detail.module.css'
import { IData } from '..'
import Image from 'next/image'

export default function Detail({
  res,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  React.useEffect(() => {
    setData(res)
  }, [res])
  const [data, setData] = React.useState<IData>()
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={styles.container}>
      <h1>{data?.brand}</h1>
      <Image
        src={data?.thumbnail || ''}
        alt="thumbnail"
        width={310}
        height={310}
      />

      <p>{data?.description}</p>
    </div>
  )
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string }
}) {
  const res = await (
    await fetch(`https://dummyjson.com/products/${params.id}`)
  ).json()
  return {
    props: {
      res,
    },
  }
}
