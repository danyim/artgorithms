import Head from "next/head";
import styles from "../styles/Home.module.css";
import Farben from "../components/Farben";
import SolWall1A from "../components/SolWall1A";
import SolWall565 from "../components/SolWall565";
import { UnknownCanvasContainer } from "../components/Unknown";
import { SolCubeFormsCanvasContainer } from "../components/SolCubeForms";
import React from "react";
import { SolBrokenBandsCanvasContainer } from "../components/SolBrokenBands";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>◬ artgorithms ◍</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>◬ artgorithms ◍</h1>
          <p>merging algorithms and art</p>
          {/* <p>
            every piece depicted here is programmatically generated to match the
            actual work(s).
          </p> */}
        </div>
        <SolWall1A />
        <Farben />
        <UnknownCanvasContainer />
        <SolCubeFormsCanvasContainer />
        <SolBrokenBandsCanvasContainer />
        {/* <SolWall565 width={500} height={500} /> */}
      </main>
    </div>
  );
};

export default Home;
