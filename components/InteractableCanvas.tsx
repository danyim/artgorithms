import React from "react";
import { CanvasControl } from "types/types";
import { useCanvasPosition } from "hooks/useCanvasPosition";

interface Props {
  width?: number;
  height?: number;
  controls?: CanvasControl[];
}

/**
 * Accepts a JSON
 * @param param0
 * @returns
 */
export const InteractableCanvas = ({ width, height }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();
  const mousePosition = useCanvasPosition(canvasRef.current);

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
    const numSquares = 64;
    const squareSize = 40;
    const padding = squareSize * 0.2;
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
  }, [width, height]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleOnMouseMove}
      />
      <p>
        x: {mousePosition?.x}, y: {mousePosition?.y}
      </p>
      {typeof window !== "undefined" && window.localStorage.debug && (
        <>
          <button onClick={draw}>Redraw</button>
          <button onClick={handleOnClear}>Clear</button>
        </>
      )}
    </>
  );
};

export default InteractableCanvas;
