interface ArtworkMetadata {
  slug: string;
  path: string;
}
interface Manifest {
  artworks: ArtworkMetadata[];
}

/**
 * This art "manifest" will dyamically load the canvases in the thumbnail gallery
 */
export const manifest: Manifest = {
  artworks: [
    { slug: "wall-1a", path: "components/SolWall1A" },
    { slug: "broken-bands", path: "components/SolBrokenBands" },
    { slug: "color-bands", path: "components/SolColorBands" },
    { slug: "cube-forms", path: "components/SolCubeForms" },
    { slug: "farben", path: "components/Farben" },
    { slug: "wall-370", path: "components/SolWall370" },
    // { slug: "wall-565", path: "components/SolWall565" },
    { slug: "wall-610", path: "components/SolWall610" },
    { slug: "wall-1111", path: "components/SolWall1111" },
    { slug: "unknown", path: "components/Unknown" },
  ],
};
