import React from "react";
import { drawFrame } from "utils/art";
import { checkDraw } from "./util";

interface Props {
  width?: number;
  height?: number;
  pattern: number;
}

export const Canvas = ({ width, height, pattern }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const handleOnMouseMove = () => {
    draw();
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

    /**
     * The original artwork contains a repeating 16x16 grid of this 3x4 pattern:
     *    ◼◻◻
     *    ◼◼◻
     *    ◻◼◼
     *    ◻◼◻
     * For our algorithm, we'll encode this into a binary string where 1s represent a filled square when reading from left to right and top to bottom:
     *    ◼◻◻ ◼◼◻ ◻◼◼ ◻◼◻
     *    100 110 011 010 (binary) or 2458 (decimal)
     *
     * This means there are 4095 possible combinations (111111111111 in binary) for this 3x4 pattern.
     */

    const patternNumber = pattern;
    const w = 16;
    const h = 16;
    // Columns & rows of the pattern to repeat
    const innerColumns = 3;
    const innerRows = 4;
    const boxSize = 8;

    // Derived values
    const innerWidth = innerColumns * boxSize;
    const innerHeight = innerRows * boxSize;

    for (let k = 0; k < w; k++) {
      for (let j = 0; j < h; j++) {
        const xOffset = innerWidth * k; // + (innerWidth / 2) * k;
        const yOffset = innerHeight * j; // + (innerHeight / 2) * j;
        // drawFrame(ctx, {
        //   xOffset: boxSize * k + (boxSize / 2) * k,
        //   yOffset: boxSize * j + (boxSize / 2) * j,
        //   width: boxSize,
        //   height: boxSize,
        //   thickness: 1,
        // });

        ctx.fillStyle = "black";
        for (let row = 0; row < innerRows; row++) {
          for (let col = 0; col < innerColumns; col++) {
            // if (
            //   // ◼◻◻
            //   (row === 0 && col == 1) ||
            //   (row === 0 && col == 2) ||
            //   // ◼◼◻
            //   (row === 1 && col == 2) ||
            //   // ◻◼◼
            //   (row === 2 && col == 0) ||
            //   // ◻◼◻
            //   (row === 3 && col == 0) ||
            //   (row === 3 && col == 2)
            // ) {
            //   continue;
            // }
            if (!checkDraw([row, col], innerColumns, patternNumber)) {
              continue;
            }
            ctx.fillRect(
              xOffset + boxSize * col,
              yOffset + boxSize * row,
              boxSize,
              boxSize
            );
          }
        }
      }
    }
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
  }, [pattern, width, height]);

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
