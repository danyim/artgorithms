import React from "react";
import { DrawCanvasFn } from "types/types";

interface Props {
  width: number;
  height: number;
  drawfn: DrawCanvasFn;
  controlLabels: string[];
  controlA: number;
  controlB: number;
  controlC: number;
  controlD: number;
  controlE: number;
}

export const CanvasRenderer = ({
  width,
  height,
  drawfn,
  controlLabels,
  controlA,
  controlB,
  controlC,
  controlD,
  controlE,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
  };

  React.useEffect(() => {
    drawfn(canvasRef.current, clearCanvas, {
      width,
      height,
      controlLabels,
      controlA,
      controlB,
      controlC,
      controlD,
      controlE,
    });
  }, [
    controlA,
    controlB,
    controlC,
    controlD,
    controlE,
    controlLabels,
    width,
    height,
  ]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default CanvasRenderer;
