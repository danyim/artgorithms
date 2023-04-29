export interface ArtworkMetadata {
  title: string;
  artistName: string;
  year: number;
  description: string;
  /** [Label, URL] */
  links: [string, string][];
  slug: string;
}

export interface CanvasControl {
  name: string;
  label: string;
  minStepMax: [number, number, number];
  defaultValue: number;
}

export type DrawCanvasFn = (
  canvas: HTMLCanvasElement,
  clearCanvas: (ctx: CanvasRenderingContext2D) => void,
  params: any
) => void;
