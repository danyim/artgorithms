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
          return import("components/artwork/SolWall1A");
        case "broken-bands":
          return import("components/artwork/SolBrokenBands");
        case "color-bands":
          return import("components/artwork/SolColorBands");
        case "cube-forms":
          return import("components/artwork/SolCubeForms");
        case "farben":
          return import("components/artwork/Farben");
        case "wall-370":
          return import("components/artwork/SolWall370");
        // case "wall-565":
        //   return import("components/artwork/SolWall565");
        case "wall-610":
          return import("components/artwork/SolWall610");
        case "wall-1111":
          return import("components/artwork/SolWall1111");
        case "double-concentric":
          return import("components/artwork/DoubleConcentric");
        case "50x50":
          return import("components/artwork/50x50");
        case "labyrinths":
          return import("components/artwork/Labyrinths");
        case "unknown":
          return import("components/artwork/Unknown");
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
