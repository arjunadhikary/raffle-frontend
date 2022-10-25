import Head from 'next/head';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import Header from '../components/Header';
import LotteryEntrance from '../components/LotteryEntrance';
import ManualHeader from '../components/ManualHeader';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Raffle FundMe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LotteryEntrance />
    </div>
  );
}
