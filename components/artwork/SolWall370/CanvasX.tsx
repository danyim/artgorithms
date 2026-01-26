import React from "react";
import { drawBands } from "../SolColorBands/util";

interface Props {
  width?: number;
  height?: number;
  space: number;
  rotation: number;
}

export const Canvas = ({ width, height, space, rotation }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

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

    ctx.clearRect(0, 0, width, height);

    // Art params
    const bandSize = space;

    // Calculate bands needed to fill the canvas
    const backgroundBands = Math.ceil(height / bandSize) + 2;

    drawBands(
      ctx,
      0,
      0,
      bandSize,
      backgroundBands,
      0,
      [
        [0, 0, 0],
        [255, 255, 255],
      ],
      false
    );

    // Calculate bands needed to fill the X shape
    const clipSize = width * 0.7;
    const numBands = Math.ceil(clipSize / bandSize) + 2;
    const size = bandSize * numBands;
    ctx.save();
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
      rotation,
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
    ctx.clearRect(0, 0, width, height);
  };

  React.useEffect(() => {
    draw();
  }, [space, rotation, width, height]);

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
