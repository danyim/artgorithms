import React from "react";

interface Props {
  width?: number;
  height?: number;
  colorIndex: number;
  handleOnMouseMove: () => void;
}

export const Canvas = ({
  width,
  height,
  colorIndex,
  handleOnMouseMove,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

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
    ctx.translate(50, 120);
    // Staircase
    const staircaseWidth = 80;
    const staircaseHeight = staircaseWidth * 4;
    const numSteps = 4;
    for (let k = 0; k < numSteps; k++) {
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
          -staircaseWidth + k * staircaseWidth
        );
        // Top left corner
        topStairPath.lineTo(
          (k + 1) * staircaseWidth,
          -staircaseWidth + k * staircaseWidth
        );
        const [r, g, b] = colorArray[(colorIndex + k * 2) % colorArray.length];
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
          -staircaseWidth + k * staircaseWidth
        );
        // Bottom right
        sideStairPath.lineTo(
          k * staircaseWidth + staircaseWidth * 2,
          k * staircaseWidth
        );
        // Bottom left
        sideStairPath.lineTo(
          (k + 1) * staircaseWidth,
          (k + 1) * staircaseWidth
        );
        const [r, g, b] = colorArray[
          (colorIndex + k * 2 + 1) % colorArray.length
        ];
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
  }, [colorIndex, width, height]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleOnMouseMove}
      />
      {/* <button onClick={draw}>Redraw</button>
      <button onClick={handleOnClear}>Clear</button> */}
    </>
  );
};

export default Canvas;
