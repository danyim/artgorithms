import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useEffect, useCallback } from "react";
import Loader from "components/Loader";
import Layout from "components/Layout";
import { manifestArray } from "constants/art-manifest";

// Filter out test/unknown from navigation
const navigableArtworks = manifestArray.filter(
  (m) => m.slug !== "test" && m.slug !== "unknown"
);

export const Artwork = () => {
  const router = useRouter();
  let { slug } = router.query;
  if (Array.isArray(slug)) {
    console.log("Slug is an array, taking the first");
    slug = slug[0];
  }

  const navigateToArtwork = useCallback(
    (direction: "prev" | "next") => {
      const currentIndex = navigableArtworks.findIndex((m) => m.slug === slug);
      if (currentIndex === -1) return;

      let newIndex: number;
      if (direction === "prev") {
        newIndex =
          currentIndex === 0
            ? navigableArtworks.length - 1
            : currentIndex - 1;
      } else {
        newIndex =
          currentIndex === navigableArtworks.length - 1
            ? 0
            : currentIndex + 1;
      }

      router.push(`/art/${navigableArtworks[newIndex].slug}`);
    },
    [slug, router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        navigateToArtwork("prev");
      } else if (e.key === "ArrowRight") {
        navigateToArtwork("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToArtwork]);

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
