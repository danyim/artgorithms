import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import { manifest } from "constants/art-manifest";
import Loader from "components/Loader";

export const Artwork = () => {
  const router = useRouter();
  const { slug } = router.query;
  const artwork = manifest.artworks.find((value) => value.slug === slug);
  // const artwork = manifest.artworks[0];
  console.log("found artwork:", artwork);

  const DynamicArtwork = dynamic(
    () => {
      // console.log("inside", artwork.path);
      // return import(`${artwork.path}`);
      return import("components/SolColorBands");
    },
    {
      loading: Loader,
    }
  );

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
        </div>
        <DynamicArtwork />
      </main>
    </div>
  );
};

export default Artwork;
