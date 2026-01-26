import React from "react";

interface Props {
  width?: number;
  height?: number;
  gridSize: number; // Number of squares across
  noiseScale: number; // Scale of the noise pattern
  threshold: number; // Threshold for dark vs light
  amplitude: number; // Wave amplitude (radius of semicircles)
  stretch: number; // Wave shape: 1.0 = circle, >1 = wider oval, <1 = taller oval
  onAmplitudeChange?: (value: number) => void;
  onStretchChange?: (value: number) => void;
  onReset?: () => void;
}

interface WaveParams {
  baseX: number; // Center position of the wave (0-1)
  amplitude: number; // Radius of each semicircle
  frequency: number; // Number of semicircle periods
  phaseOffset: number; // Phase offset (0-1, shifts wave vertically)
  peakWidth: number; // Width of the dark blue stripe
  gradientWidth: number; // Width of the gradient bands
  stretch: number; // Aspect ratio: 1.0 = circle, >1 = wider oval, <1 = taller oval
}

// Calculate color intensity (0-1) for a point based on wave parameters
const getWaveColorT = (
  normX: number,
  normY: number,
  params: WaveParams,
): number => {
  const {
    baseX,
    amplitude,
    frequency,
    phaseOffset,
    peakWidth,
    gradientWidth,
    stretch,
  } = params;

  // Determine which semicircle section this row belongs to
  // Stretch affects vertical period size: stretch>1 = taller periods, stretch<1 = shorter periods
  const sectionHeight = (1.0 / frequency) * stretch;
  const rawSectionIndex = Math.floor(normY / sectionHeight);
  const localY = (normY % sectionHeight) / sectionHeight;

  // Apply phase offset as section offset (phaseOffset=0.5 shifts by half a cycle = 1 section)
  const sectionIndex = rawSectionIndex + Math.round(phaseOffset * 2);

  // Map localY to position on semicircle (-1 to 1)
  const normalizedY = localY * 2 - 1;
  // Circle equation: x = sqrt(1 - y²)
  const sqrtTerm = Math.sqrt(Math.max(0, 1 - normalizedY * normalizedY));

  // Alternate direction for each section (creates connected C-shapes)
  const isRightFacing = sectionIndex % 2 === 0;

  // Calculate wave center x based on semicircle
  const waveCenterX = isRightFacing
    ? baseX + sqrtTerm * amplitude
    : baseX - sqrtTerm * amplitude;

  // Distance from the wave center (positive = right of wave, negative = left)
  const distFromWave = normX - waveCenterX;

  // Map distance to color intensity
  if (distFromWave >= -peakWidth && distFromWave <= 0) {
    return 1; // Within the wave peak = dark blue
  } else if (distFromWave < -peakWidth) {
    // Left of peak = gradient bands
    const distFromPeakEdge = -distFromWave - peakWidth;
    return Math.max(0, 1 - distFromPeakEdge / gradientWidth);
  }
  return 0; // Right of peak = light gray (default)
};

// Control limits
export const AMPLITUDE_MIN = 0.02;
export const AMPLITUDE_MAX = 0.2;
export const STRETCH_MIN = 0.7;
export const STRETCH_MAX = 1.3;
export const THRESHOLD_MIN = 0.3;
export const THRESHOLD_MAX = 3;

export const Canvas = ({
  width = 500,
  height = 500,
  gridSize,
  noiseScale,
  threshold,
  amplitude,
  stretch,
  onAmplitudeChange,
  onStretchChange,
  onReset,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const updateFromPosition = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Map horizontal position to amplitude
    const normX = Math.max(0, Math.min(1, x / rect.width));
    const newAmplitude = Math.round((AMPLITUDE_MIN + normX * (AMPLITUDE_MAX - AMPLITUDE_MIN)) * 1e5) / 1e5;
    onAmplitudeChange?.(newAmplitude);

    // Map vertical position to stretch (inverted so top = max)
    const normY = Math.max(0, Math.min(1, y / rect.height));
    const newStretch = Math.round((STRETCH_MAX - normY * (STRETCH_MAX - STRETCH_MIN)) * 1e5) / 1e5;
    onStretchChange?.(newStretch);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    updateFromPosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      e.preventDefault();
      updateFromPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleDoubleClick = () => {
    onReset?.();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Colors from the Mira Cairo artwork - gradient stops
    const bgColor = "#fff"; // Cream/beige background
    const innerColor = bgColor; // Hollow center same as background

    // Default gray for background
    const defaultGray = { r: 230, g: 230, b: 230 };

    // Blue color palette for waves only (no gray blending)
    const blueColors = [
      { r: 160, g: 170, b: 185 }, // Light blue-gray (outermost)
      { r: 110, g: 130, b: 160 }, // Medium blue
      { r: 61, g: 74, b: 92 }, // Dark blue-gray (wave peak) #3d4a5c
    ];

    // Get color based on value (0-1)
    const getGradientColor = (t: number): string => {
      // Clamp t to [0, 1]
      t = Math.max(0, Math.min(1, t));

      // If below threshold, use default gray
      if (t < 0.1) {
        return `rgb(${defaultGray.r}, ${defaultGray.g}, ${defaultGray.b})`;
      }

      // Map remaining range (0.1-1.0) to blue colors only
      const adjustedT = (t - 0.1) / 0.9;

      // Quantize to create distinct bands
      const bands = 6;
      const quantizedT = Math.floor(adjustedT * bands) / bands;

      // Map to blue color stops
      const numStops = blueColors.length - 1;
      const scaledT = quantizedT * numStops;
      const index = Math.min(Math.floor(scaledT), numStops - 1);

      // Stepped interpolation between blue colors only
      const localT = scaledT - index;
      const steppedLocalT = Math.floor(localT * 2) / 2;

      const c1 = blueColors[index];
      const c2 = blueColors[index + 1];

      const r = Math.round(c1.r + (c2.r - c1.r) * steppedLocalT);
      const g = Math.round(c1.g + (c2.g - c1.g) * steppedLocalT);
      const b = Math.round(c1.b + (c2.b - c1.b) * steppedLocalT);

      return `rgb(${r}, ${g}, ${b})`;
    };

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Calculate grid dimensions based on gridSize
    const cols = gridSize;
    const rows = Math.ceil((height / width) * gridSize);

    // Calculate square size to fit the grid
    const calculatedSquareSize = width / gridSize;
    const spacing = calculatedSquareSize;

    // Calculate stroke width proportional to square size
    const strokeWidth = calculatedSquareSize * 0.25;

    // Center the grid vertically if needed
    const totalHeight = rows * spacing;
    const offsetX = 0;
    const offsetY = (height - totalHeight) / 2;

    // Draw the grid of hollow squares
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * spacing;
        const y = offsetY + row * spacing;

        // Normalize position to [0, 1]
        const normX = col / cols;
        const normY = row / rows;

        // Wave parameters
        const peakWidth = 0.04;
        const gradientWidth = threshold * 0.4;

        // Right wave (main wave)
        const rightWave: WaveParams = {
          baseX: 0.8,
          amplitude: amplitude,
          frequency: noiseScale,
          phaseOffset: 0,
          peakWidth,
          gradientWidth,
          stretch,
        };

        // Left wave (secondary wave on left edge) - proportionally smaller
        const leftWave: WaveParams = {
          baseX: 0.1,
          amplitude: amplitude * 0.6,
          frequency: noiseScale,
          phaseOffset: 0.1, // Offset to create visual interest
          peakWidth,
          gradientWidth,
          stretch,
        };

        // Calculate color intensity from both waves and take the max
        const rightColorT = getWaveColorT(normX, normY, rightWave);
        const leftColorT = getWaveColorT(normX, normY, leftWave);
        const colorT = Math.max(rightColorT, leftColorT);

        // Get gradient color based on wave value
        ctx.strokeStyle = getGradientColor(colorT);
        ctx.lineWidth = strokeWidth;

        // Draw hollow square (stroke only, with inner area matching background)
        const actualSize = calculatedSquareSize * 0.9; // Slight gap between squares
        const innerSize = actualSize - strokeWidth;
        const innerOffset = strokeWidth / 2;
        const gapOffset = (calculatedSquareSize - actualSize) / 2;

        // Draw outer stroke
        ctx.beginPath();
        ctx.rect(
          x + gapOffset + innerOffset,
          y + gapOffset + innerOffset,
          innerSize,
          innerSize,
        );
        ctx.stroke();

        // Fill inner area with background color to create hollow effect
        ctx.fillStyle = innerColor;
        ctx.fillRect(
          x + gapOffset + strokeWidth,
          y + gapOffset + strokeWidth,
          actualSize - strokeWidth * 2,
          actualSize - strokeWidth * 2,
        );
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
  }, [gridSize, noiseScale, threshold, amplitude, stretch, width, height]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
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
