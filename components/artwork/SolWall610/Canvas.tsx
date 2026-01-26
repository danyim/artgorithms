import React from "react";
import { useCanvasInteraction } from "../../../hooks/useCanvasInteraction";

export const SKEW_MIN = 0;
export const SKEW_MAX = 2.0;
export const STEPS_MIN = 2;
export const STEPS_MAX = 8;

interface Props {
  width?: number;
  height?: number;
  skew: number;
  steps: number;
  onSkewChange?: (value: number) => void;
  onStepsChange?: (value: number) => void;
  onReset?: () => void;
}

export const Canvas = ({
  width,
  height,
  skew,
  steps,
  onSkewChange,
  onStepsChange,
  onReset,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { handlers } = useCanvasInteraction({
    canvasRef,
    horizontal: {
      min: STEPS_MIN,
      max: STEPS_MAX,
      onChange: onStepsChange,
    },
    vertical: {
      min: SKEW_MIN,
      max: SKEW_MAX,
      decimals: 2,
      onChange: onSkewChange,
    },
  });

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle = "rgb(197,75,82)";
    ctx.fillRect(0, 0, 500, 500);

    // Art params
    const colorArray = [
      [229, 214, 190],
      [196, 203, 108],
      [232, 205, 117],
      [156, 83, 98],
      [147, 175, 178],
      [138, 159, 102],
      [125, 77, 90],
      [131, 70, 77],
    ];
    const staircaseColor = "rgb(204,91,77)";

    ctx.save();
    // Staircase - adjust width based on number of steps to fit canvas
    const staircaseWidth = 320 / steps;
    const staircaseHeight = staircaseWidth * steps;
    // Total extent includes the side stairs that extend by one staircaseWidth
    const totalWidth = (steps + 1) * staircaseWidth;
    // Skew affects the vertical extent of the isometric projection
    const skewOffset = staircaseWidth * skew;
    const totalHeight = steps * staircaseWidth + skewOffset;
    // Center the staircase on the canvas
    const offsetX = (width - totalWidth) / 2;
    const offsetY = (height - totalHeight) / 2 + skewOffset; // +skewOffset accounts for top stairs above y=0
    ctx.translate(offsetX, offsetY);
    for (let k = 0; k < steps; k++) {
      ctx.fillStyle = staircaseColor;
      ctx.fillRect(
        k * staircaseWidth,
        k * staircaseWidth,
        staircaseWidth,
        staircaseHeight - k * staircaseWidth
      );
      {
        // Top stair
        const topStairPath = new Path2D();
        // Bottom left corner
        topStairPath.moveTo(k * staircaseWidth, k * staircaseWidth);
        // Bottom right corner
        topStairPath.lineTo((k + 1) * staircaseWidth, k * staircaseWidth);
        // Top right corner
        topStairPath.lineTo(
          staircaseWidth * k + staircaseWidth * 2,
          -skewOffset + k * staircaseWidth
        );
        // Top left corner
        topStairPath.lineTo(
          (k + 1) * staircaseWidth,
          -skewOffset + k * staircaseWidth
        );
        const [r, g, b] = colorArray[(k * 2) % colorArray.length];
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill(topStairPath);
      }

      {
        // Side stair
        const sideStairPath = new Path2D();
        // Top left
        sideStairPath.moveTo((k + 1) * staircaseWidth, k * staircaseWidth);
        // Top right
        sideStairPath.lineTo(
          k * staircaseWidth + staircaseWidth * 2,
          -skewOffset + k * staircaseWidth
        );
        // Bottom right - must also account for skew to maintain parallelogram
        sideStairPath.lineTo(
          k * staircaseWidth + staircaseWidth * 2,
          (k + 1) * staircaseWidth - skewOffset
        );
        // Bottom left
        sideStairPath.lineTo(
          (k + 1) * staircaseWidth,
          (k + 1) * staircaseWidth
        );
        const [r, g, b] = colorArray[(k * 2 + 1) % colorArray.length];
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill(sideStairPath);
      }
    }

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
  }, [skew, steps, width, height]);

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
