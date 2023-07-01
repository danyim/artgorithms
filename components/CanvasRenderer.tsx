import React from "react";
import { DrawCanvasFn } from "types/types";

interface Props {
  width: number;
  height: number;
  space: number;
  lineWidth: number;
  drawfn: DrawCanvasFn;
}

export const CanvasRenderer = ({
  width,
  height,
  drawfn,
  space,
  lineWidth,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
  };

  React.useEffect(() => {
    drawfn(canvasRef.current, clearCanvas, { space, lineWidth, width, height });
  }, [space, lineWidth, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default CanvasRenderer;
