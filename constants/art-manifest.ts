export interface ArtworkMetadata {
  slug: string;
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
export const manifest: Record<Artwork, ArtworkMetadata> = {
  [Artwork.WALL_1A]: { slug: "wall-1a" },
  [Artwork.BROKEN_BANDS]: {
    slug: "broken-bands",
  },
  [Artwork.COLOR_BANDS]: {
    slug: "color-bands",
  },
  [Artwork.CUBE_FORMS]: { slug: "cube-forms" },
  [Artwork.FARBEN]: { slug: "farben" },
  [Artwork.WALL_370]: { slug: "wall-370" },
  [Artwork.WALL_610]: { slug: "wall-610" },
  [Artwork.WALL_1111]: { slug: "wall-1111" },
  [Artwork.UNKNOWN]: { slug: "unknown" },
  // { slug: "wall-565", path: "components/SolWall565" },
};
export const manifestArray = Object.values(manifest);

/**
 * Converts a slug to an enum key
 */
export function slugToEnumKey(slug: string) {
  return slug?.replaceAll("-", "_").toUpperCase();
}
