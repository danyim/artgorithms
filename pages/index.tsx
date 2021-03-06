import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import ThumbGallery from "components/ThumbGallery";
import Header from "components/Header";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>◬ artgorithms ◍</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        <ThumbGallery />
      </main>
    </div>
  );
};

export default Home;
