import React from "react";
import { checkDraw } from "./util";
import { useCanvasInteraction } from "../../../hooks/useCanvasInteraction";

// Control limits
export const BOX_SIZE_MIN = 4;
export const BOX_SIZE_MAX = 16;
export const PATTERN_MIN = 2;
export const PATTERN_MAX = 4095;

interface Props {
  width?: number;
  height?: number;
  pattern: number;
  boxSize: number;
  onPatternChange?: (value: number) => void;
  onBoxSizeChange?: (value: number) => void;
  onReset?: () => void;
}

export const Canvas = ({ width, height, pattern, boxSize, onPatternChange, onBoxSizeChange, onReset }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { handlers } = useCanvasInteraction({
    canvasRef,
    horizontal: {
      min: PATTERN_MIN,
      max: PATTERN_MAX,
      onChange: onPatternChange,
    },
    vertical: {
      min: BOX_SIZE_MIN,
      max: BOX_SIZE_MAX,
      onChange: onBoxSizeChange,
    },
  });

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    /**
     * The original artwork contains a repeating 16x16 grid of this 3x4 pattern:
     *    ◼◻◻
     *    ◼◼◻
     *    ◻◼◼
     *    ◻◼◻
     * For our algorithm, we'll encode this into a binary string where 1s represent a filled square when reading from left to right and top to bottom.
     * So the picture above becomes:
     *    ◼◻◻ ◼◼◻ ◻◼◼ ◻◼◻
     *    100 110 011 010 (binary) or 2458 (decimal)
     *
     * This also means that there are 4095 possible combinations (111111111111 in binary), which will be the maximum input.
     */

    // Columns & rows of the pattern unit
    const innerColumns = 3;
    const innerRows = 4;

    // Derived values - size of one pattern unit
    const innerWidth = innerColumns * boxSize;
    const innerHeight = innerRows * boxSize;

    // Calculate how many pattern units fit in the canvas
    const w = Math.ceil(width / innerWidth);
    const h = Math.ceil(height / innerHeight);

    // Iterate over rows and columns of the pattern
    for (let k = 0; k < w; k++) {
      for (let j = 0; j < h; j++) {
        const xOffset = innerWidth * k;
        const yOffset = innerHeight * j;

        ctx.fillStyle = "black";
        // Draw the main pattern
        for (let row = 0; row < innerRows; row++) {
          for (let col = 0; col < innerColumns; col++) {
            if (!checkDraw([row, col], innerColumns, pattern)) {
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
  }, [pattern, boxSize, width, height]);

  const handleDoubleClick = () => {
    onReset?.();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handlers.onMouseMove}
        onTouchMove={handlers.onTouchMove}
        onDoubleClick={handleDoubleClick}
        style={{ touchAction: "none" }}
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
