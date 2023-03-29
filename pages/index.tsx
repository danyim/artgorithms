import styles from "../styles/Home.module.css";
import React from "react";
import Head from "components/Head";
import ThumbGallery from "components/ThumbGallery";
import Header from "components/Header";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Head />

      <main className={styles.main}>
        <Header />
        <ThumbGallery />
      </main>
    </div>
  );
};

export default Home;
