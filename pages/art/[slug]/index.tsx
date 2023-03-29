import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";
import React from "react";
import { manifest } from "constants/art-manifest";
import Head from "components/Head";
import Loader from "components/Loader";
import Header from "components/Header";

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
      <Head />

      <main className={styles.main}>
        <Header />
        <DynamicArtwork />
      </main>
    </div>
  );
};

export default Artwork;
