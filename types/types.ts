/** Metadata defining the artwork */
export interface ArtworkMetadata {
  title: string;
  artistName: string;
  year: number;
  description: string;
  width: number;
  height: number;
  /** [Label, URL] */
  links: [string, string][];
  slug: string;
  renderType: ArtRenderType;
}

/** A numeric control for a single parameter for the art piece */
export interface CanvasControl {
  name: string;
  label: string;
  minStepMax: [number, number, number];
  defaultValue: number;
}

export enum ArtRenderType {
  Canvas,
  Css,
  Background,
}

export type DrawCanvasFn = (
  canvas: HTMLCanvasElement,
  clearCanvas: (ctx: CanvasRenderingContext2D) => void,
  params: {
    width: number;
    height: number;
    controlA: number;
    controlB: number;
    controlC: number;
    controlD: number;
    controlE: number;
  }
) => void;
