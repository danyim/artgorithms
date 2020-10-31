import React from "react";

interface Props {
  width?: number;
  height?: number;
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

    ctx.clearRect(0, 0, 500, 500);

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
  }, [space]);
  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
      <button onClick={draw}>Redraw</button>
      <button onClick={handleOnClear}>Clear</button>
    </>
  );
};

export default Canvas;
