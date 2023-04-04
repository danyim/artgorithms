import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React from "react";
import Loader from "components/Loader";
import Layout from "components/Layout";

export const Artwork = () => {
  const router = useRouter();
  let { slug } = router.query;
  if (Array.isArray(slug)) {
    console.log("Slug is an array, taking the first");
    slug = slug[0];
  }

  const DynamicArtwork = dynamic(
    () => {
      // Since dynamic imports must be explicitly written, we'll have to define each piece of art we want to display manually:
      switch (slug) {
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
        case "double-concentric":
          return import("components/DoubleConcentric");
        case "unknown":
          return import("components/Unknown");
      }
      return import("components/NotFound");
    },
    {
      loading: Loader,
    }
  );

  return (
    <Layout>
      <DynamicArtwork />
    </Layout>
  );
};

export default Artwork;
