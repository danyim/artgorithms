import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";
import React from "react";
import {
  Artwork as ArtworkEnum,
  manifest,
  enumManifest,
  ArtworkMetadata,
  slugToEnumKey,
} from "constants/art-manifest";
import Head from "components/Head";
import Loader from "components/Loader";
import Header from "components/Header";
import Footer from "components/Footer";

export const Artwork = () => {
  const router = useRouter();
  const { slug } = router.query;
  if (Array.isArray(slug)) {
    console.log("Slug is an array");
    return;
  }

  const enumKey = ArtworkEnum[slugToEnumKey(slug)];
  const artMetadata: ArtworkMetadata = enumManifest[enumKey];
  if (!artMetadata) {
    console.log(`Slug "${slug}" (${enumKey}) not defined in artwork manifest`);
    return;
  }

  const DynamicArtwork = dynamic(
    () => {
      // Since dynamic imports must be explicitly written, we'll define it here
      switch (artMetadata.slug) {
        case "wall-1a":
          return import("components/SolWall1A");
        case "broken-bands":
          return import("components/SolBrokenBands");
        case "color-bands":
          return import("components/SolColorBands");
        case "cube-forms":
          return import("components/SolCubeForms");
        case "farben":
          return import("components/Farben");
        case "wall-370":
          return import("components/SolWall370");
        case "wall-610":
          return import("components/SolWall610");
        case "wall-1111":
          return import("components/SolWall1111");
        case "unknown":
          return import("components/Unknown");
      }
      console.log("inside", artMetadata?.path);
      // return import(`${artMetadata?.path}`);
      // return import("components/SolColorBands");
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
        <Footer />
      </main>
    </div>
  );
};

export default Artwork;
