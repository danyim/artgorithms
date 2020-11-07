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
      0,
      [
        [0, 0, 0],
        [255, 255, 255],
      ],
      false
    );

    const numBands = 35;
    const size = bandSize * numBands;
    ctx.save();
    const clipSize = width * 0.7;
    const clipX = width / 2 - clipSize / 2;
    const clipY = height / 2 - clipSize / 2;

    ctx.moveTo(clipX + (0 * clipSize) / 4, clipY + (1 * clipSize) / 4);
    ctx.lineTo(clipX + (1 * clipSize) / 4, clipY + (0 * clipSize) / 4);
    ctx.lineTo(clipX + (2 * clipSize) / 4, clipY + (1 * clipSize) / 4);
    ctx.lineTo(clipX + (3 * clipSize) / 4, clipY + (0 * clipSize) / 4);
    ctx.lineTo(clipX + (4 * clipSize) / 4, clipY + (1 * clipSize) / 4);
    ctx.lineTo(clipX + (3 * clipSize) / 4, clipY + (2 * clipSize) / 4);
    ctx.lineTo(clipX + (4 * clipSize) / 4, clipY + (3 * clipSize) / 4);
    ctx.lineTo(clipX + (3 * clipSize) / 4, clipY + (4 * clipSize) / 4);
    ctx.lineTo(clipX + (2 * clipSize) / 4, clipY + (3 * clipSize) / 4);
    ctx.lineTo(clipX + (1 * clipSize) / 4, clipY + (4 * clipSize) / 4);
    ctx.lineTo(clipX + (0 * clipSize) / 4, clipY + (3 * clipSize) / 4);
    ctx.lineTo(clipX + (1 * clipSize) / 4, clipY + (2 * clipSize) / 4);
    ctx.clip();
    ctx.translate(0, 13);
    drawBands(
      ctx,
      width / 2 - size / 2,
      height / 2 - size / 2,
      bandSize,
      numBands,
      90,
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
