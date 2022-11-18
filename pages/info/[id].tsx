import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../../styles/Detail.module.css';
import { IData } from '..';
import Image from 'next/image';
import numberWithCommas from '../../utils/numberWithCommas';
import EXCHANGE_RATE from '../../constants/rate';

export default function Detail({ res }: InferGetServerSidePropsType<GetServerSideProps>) {
  React.useEffect(() => {
    setData(res);
  }, [res]);
  const [data, setData] = React.useState<IData>();
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.container}>
      <div className={styles.image_box}>
        <h1>{data?.brand}</h1>
        <Image
          className={styles.image}
          src={data?.thumbnail || ''}
          alt="thumbnail"
          width={310}
          height={310}
        />
      </div>
      <p>{data?.description}</p>
      <div className={styles.product_info}>
        <label>가격</label>
        <span>USD {data?.price}</span>
        <span>KRW {numberWithCommas(Math.round(data?.price! * EXCHANGE_RATE))}</span>
        <span>할인{Math.round(data?.discountPercentage!)}%</span>
        <label>평점</label>
        <span>평점 {data?.rating}</span>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await (await fetch(`https://dummyjson.com/products/${params.id}`)).json();
  return {
    props: {
      res,
    },
  };
}
