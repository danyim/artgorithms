import Head from "next/head";
import styles from "../styles/Home.module.css";
import Farben from "../components/Farben";
import SolWall1A from "../components/SolWall1A";
import SolWall565 from "../components/SolWall565";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>artgorithms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>artgorithms</h1>
        <p>mixing algorithms and art, building off the shoulders of giants</p>
        <SolWall1A />
        <Farben />
        <SolWall565 />
      </main>
    </div>
  );
};

export default Home;
