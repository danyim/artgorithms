import React from "react";

interface Props {
  width?: number;
  height?: number;
  size: number; // NxN focal points
  gridSize: number; // total circles across canvas
  circleSize: number;
  offset: number;
}

export const Canvas = ({
  width = 500,
  height = 500,
  size,
  gridSize,
  circleSize,
  offset,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Colors
    const bgColor = "#1a1a1a"; // Dark background
    const lightCircleColor = "#d4cbb8"; // Cream/beige circles
    const darkCircleColor = "#1a1a1a"; // Dark circles (same as background)

    // Fill dark background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Calculate focal point centers (NxN grid of centers)
    const focalCenters: { x: number; y: number }[] = [];
    const sectionWidth = width / size;
    const sectionHeight = height / size;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        focalCenters.push({
          x: col * sectionWidth + sectionWidth / 2,
          y: row * sectionHeight + sectionHeight / 2,
        });
      }
    }

    // Uniform grid spacing across entire canvas
    const spacing = Math.min(width, height) / gridSize;
    const radius = circleSize;

    // The influence radius for each focal point
    const influenceRadius = Math.min(sectionWidth, sectionHeight) / 2;

    // Draw a single continuous grid across the canvas
    const totalCols = Math.ceil(width / spacing) + 1;
    const totalRows = Math.ceil(height / spacing) + 1;

    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalCols; col++) {
        const gridX = col * spacing;
        const gridY = row * spacing;

        // Find the nearest focal center
        let nearestCenter = focalCenters[0];
        let minDist = Infinity;

        for (const center of focalCenters) {
          const dist = Math.sqrt(
            (gridX - center.x) ** 2 + (gridY - center.y) ** 2
          );
          if (dist < minDist) {
            minDist = dist;
            nearestCenter = center;
          }
        }

        // Calculate angle from nearest focal center
        const dx = gridX - nearestCenter.x;
        const dy = gridY - nearestCenter.y;
        const angle = Math.atan2(dy, dx);

        // Offset increases with distance from focal center
        const normalizedDist = Math.min(minDist / influenceRadius, 1);
        const actualOffset = offset * normalizedDist;

        const darkX = gridX - Math.cos(angle) * actualOffset;
        const darkY = gridY - Math.sin(angle) * actualOffset;

        // Random position variation: +/- 1 pixel, only 20% of the time
        const applyRandomness = Math.random() < 0.2;
        const randOffset = () => (Math.random() - 0.5) * 2;
        const darkXRand = applyRandomness ? darkX + randOffset() : darkX;
        const darkYRand = applyRandomness ? darkY + randOffset() : darkY;

        // Draw light circle first
        ctx.beginPath();
        ctx.arc(gridX, gridY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = lightCircleColor;
        ctx.fill();

        // Draw dark circle on top (creates crescent effect)
        ctx.beginPath();
        ctx.arc(darkXRand, darkYRand, radius * 0.9, 0, 2 * Math.PI);
        ctx.fillStyle = darkCircleColor;
        ctx.fill();
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
    ctx?.clearRect(0, 0, width, height);
  };

  React.useEffect(() => {
    draw();
  }, [size, gridSize, circleSize, offset, width, height]);

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
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
