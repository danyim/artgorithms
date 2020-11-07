import React from "react";
import { drawBands } from "../SolColorBands/util";

interface Props {
  width?: number;
  height?: number;
  space: number;
}

export const Canvas = ({ width, height, space }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const handleOnMouseMove = () => {
    // draw();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 500, 500);

    // Art params
    const bandSize = 14;

    drawBands(
      ctx,
      0,
      0,
      bandSize,
      width / 10,
      90,
      [
        [0, 0, 0],
        [255, 255, 255],
      ],
      false
    );

    const numBands = 35;
    const size = bandSize * numBands;
    ctx.save();
    const clipSize = width * 0.35;
    const clipX = width / 2 - clipSize / 2;
    const clipY = height / 2 - clipSize / 2;

    // Clip a square and append 4 triangles to the edges to ultimately create a 45deg rotated square
    ctx.rect(clipX, clipY, clipSize, clipSize);
    // Top
    ctx.moveTo(clipX + clipSize, clipY);
    ctx.lineTo(clipX + clipSize / 2, clipY - clipSize / 2);
    ctx.lineTo(clipX, clipY);
    // Right
    ctx.moveTo(clipX + clipSize, clipY);
    ctx.lineTo(clipX + clipSize + clipSize / 2, clipY + clipSize / 2);
    ctx.lineTo(clipX + clipSize, clipY + clipSize);
    // Bottom
    ctx.moveTo(clipX + clipSize, clipY + clipSize);
    ctx.lineTo(clipX + clipSize / 2, clipY + clipSize + clipSize / 2);
    ctx.lineTo(clipX, clipY + clipSize);
    // Left
    ctx.moveTo(clipX, clipY);
    ctx.lineTo(clipX - clipSize / 2, clipY + clipSize / 2);
    ctx.lineTo(clipX, clipY + clipSize);
    ctx.clip();
    drawBands(
      ctx,
      width / 2 - size / 2,
      height / 2 - size / 2,
      bandSize,
      numBands,
      0,
      [
        [0, 0, 0],
        [255, 255, 255],
      ],
      false
    );
    ctx.restore();
  };

  const handleOnClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
  };

  React.useEffect(() => {
    draw();
  }, [space, width, height]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleOnMouseMove}
      />
      {typeof window !== "undefined" && window.localStorage.debug && (
        <>
          <button onClick={draw}>Redraw</button>
          <button onClick={handleOnClear}>Clear</button>
        </>
      )}
    </>
  );
};

export default Canvas;
