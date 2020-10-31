import React from "react";
import { randomHueColor } from "../../utils/color";
import { createWrappedRow } from "../../utils/polygon";

interface Props {
  width: number;
  height: number;
  space: number;
}

export const Canvas = ({ width, height, space }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1500, 500);

    const boxWidth = 55;
    const boxHeight = 22;
    const size = 16;

    createWrappedRow({
      numItems: size ** 2,
      numPerLine: size,
      width: boxWidth,
      height: boxHeight,
      padding: space,
      offsetX: 0,
      offsetY: 0,
    }).forEach((point) => {
      fillRect(
        ctx,
        point.x,
        point.y,
        boxWidth,
        boxHeight,
        null,
        randomHueColor({ max: 75, min: 15 }, { max: 75, min: 15 })
      );
    });
  };

  const fillRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    stokeColor: string = "",
    fillColor: string = ""
  ) => {
    ctx.save();
    ctx.translate(x, y);

    if (fillColor) ctx.fillStyle = fillColor;
    if (stokeColor) ctx.strokeStyle = stokeColor;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  };

  const fillRectWithLines = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    lineWidth: number,
    stokeColor: string = "",
    fillColor: string = ""
  ) => {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();

    if (fillColor) ctx.fillStyle = fillColor;
    if (stokeColor) ctx.strokeStyle = stokeColor;
    ctx.lineWidth = lineWidth;

    // Top
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    // Right
    ctx.moveTo(w, 0);
    ctx.lineTo(w, h);
    // Bottom
    ctx.moveTo(0, h);
    ctx.lineTo(w, h);
    // Left
    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);

    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  };

  React.useEffect(() => {
    draw();
  }, [space, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
