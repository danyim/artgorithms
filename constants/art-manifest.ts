export interface ArtworkMetadata {
  slug: string;
  path: string;
}
interface Manifest {
  artworks: ArtworkMetadata[];
}
export enum Artwork {
  "WALL_1A",
  "BROKEN_BANDS",
  "COLOR_BANDS",
  "CUBE_FORMS",
  "FARBEN",
  "WALL_370",
  "WALL_610",
  "WALL_1111",
  "UNKNOWN",
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
    { slug: "wall-610", path: "components/SolWall610" },
    { slug: "wall-1111", path: "components/SolWall1111" },
    { slug: "unknown", path: "components/Unknown" },
    // { slug: "wall-565", path: "components/SolWall565" },
  ],
};

export const enumManifest: Record<Artwork, ArtworkMetadata> = {
  [Artwork.WALL_1A]: { slug: "wall-1a", path: "components/SolWall1A" },
  [Artwork.BROKEN_BANDS]: {
    slug: "broken-bands",
    path: "components/SolBrokenBands",
  },
  [Artwork.COLOR_BANDS]: {
    slug: "color-bands",
    path: "components/SolColorBands",
  },
  [Artwork.CUBE_FORMS]: { slug: "cube-forms", path: "components/SolCubeForms" },
  [Artwork.FARBEN]: { slug: "farben", path: "components/Farben" },
  [Artwork.WALL_370]: { slug: "wall-370", path: "components/SolWall370" },
  [Artwork.WALL_610]: { slug: "wall-610", path: "components/SolWall610" },
  [Artwork.WALL_1111]: { slug: "wall-1111", path: "components/SolWall1111" },
  [Artwork.UNKNOWN]: { slug: "unknown", path: "components/Unknown" },
  // { slug: "wall-565", path: "components/SolWall565" },
};

/**
 * Converts a slug to an enum key
 */
export function slugToEnumKey(slug: string) {
  return slug?.replaceAll("-", "_").toUpperCase();
}
