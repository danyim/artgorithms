import React from "react";
import { randRange } from "../../../utils/polygon";
import { useCanvasInteraction } from "../../../hooks/useCanvasInteraction";

// Control limits
export const RAY_LENGTH_MIN = 0.2;
export const RAY_LENGTH_MAX = 1.2;
export const SECTIONS_MIN = 4;
export const SECTIONS_MAX = 7;
export const VARIATION_MIN = 0;
export const VARIATION_MAX = 100;

interface Props {
  width: number;
  height: number;
  rayLength: number;
  sections: number;
  variation: number;
  onRayLengthChange?: (value: number) => void;
  onVariationChange?: (value: number) => void;
  onReset?: () => void;
}

export const Canvas = ({
  width,
  height,
  rayLength,
  sections,
  variation,
  onRayLengthChange,
  onVariationChange,
  onReset,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Store random seed for consistent wash texture
  const washSeedRef = React.useRef<number>(Math.random() * 10000);

  // Store random angle offsets for non-uniform section widths
  // These are generated once and persist during interactions
  const angleOffsetsRef = React.useRef<number[]>([]);

  const { handlers } = useCanvasInteraction({
    canvasRef,
    horizontal: {
      min: VARIATION_MIN,
      max: VARIATION_MAX,
      decimals: 0,
      onChange: onVariationChange,
    },
    vertical: {
      min: RAY_LENGTH_MIN,
      max: RAY_LENGTH_MAX,
      decimals: 2,
      onChange: onRayLengthChange,
    },
  });

  // Seeded random for consistent wash patterns
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Base color palette - will cycle through for more sections
  const baseColors: [number, number, number][] = [
    [200, 155, 125], // Orange/salmon
    [165, 185, 200], // Light blue
    [180, 180, 100], // Yellow-green
    [175, 135, 140], // Pink/mauve
    [140, 175, 160], // Sage green
    [190, 165, 175], // Dusty rose
    [160, 160, 190], // Lavender
    [185, 175, 140], // Tan
    [150, 180, 180], // Teal
    [195, 145, 155], // Coral
  ];

  // Get color for a section index
  const getColorForSection = (idx: number): [number, number, number] => {
    return baseColors[idx % baseColors.length];
  };

  // Draw an organic blob shape using bezier curves
  const drawOrganicBlob = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    baseRadius: number,
    seed: number,
    pointCount: number = 8,
  ) => {
    const points: { x: number; y: number; radius: number }[] = [];

    // Generate points around the center with varying radii
    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2;
      // Vary radius by 40-160% of base for organic feel
      const radiusVariation = 0.4 + seededRandom(seed + i * 17.3) * 1.2;
      const r = baseRadius * radiusVariation;
      points.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        radius: r,
      });
    }

    // Draw smooth curve through points using quadratic bezier
    ctx.beginPath();
    ctx.moveTo(
      (points[0].x + points[pointCount - 1].x) / 2,
      (points[0].y + points[pointCount - 1].y) / 2,
    );

    for (let i = 0; i < pointCount; i++) {
      const nextI = (i + 1) % pointCount;
      const midX = (points[i].x + points[nextI].x) / 2;
      const midY = (points[i].y + points[nextI].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
    }

    ctx.closePath();
  };

  // Apply ink wash texture overlay - more organic and tasteful
  const applyInkWashTexture = (
    ctx: CanvasRenderingContext2D,
    clipPath: Path2D | null,
    bounds: { minX: number; maxX: number; minY: number; maxY: number },
    baseColor: [number, number, number],
    seed: number,
  ) => {
    ctx.save();
    if (clipPath) {
      ctx.clip(clipPath);
    }

    const [r, g, b] = baseColor;
    const boundsWidth = bounds.maxX - bounds.minX;
    const boundsHeight = bounds.maxY - bounds.minY;

    // Layer 1: Large soft organic wash pools
    const poolCount = 14;
    for (let i = 0; i < poolCount; i++) {
      const poolSeed = seed + i * 137.5;
      const x = bounds.minX + seededRandom(poolSeed) * boundsWidth;
      const y = bounds.minY + seededRandom(poolSeed + 1) * boundsHeight;
      const baseRadius = 25 + seededRandom(poolSeed + 2) * 60;

      // Slight darkening or lightening
      const variation = (seededRandom(poolSeed + 3) - 0.5) * 28;
      const poolR = Math.max(0, Math.min(255, r + variation));
      const poolG = Math.max(0, Math.min(255, g + variation));
      const poolB = Math.max(0, Math.min(255, b + variation));

      // Draw multiple overlapping organic blobs for softer edges
      for (let j = 0; j < 3; j++) {
        const layerRadius = baseRadius * (1 - j * 0.25);
        const opacity = 0.06 + j * 0.04;
        ctx.fillStyle = `rgba(${poolR}, ${poolG}, ${poolB}, ${opacity})`;
        drawOrganicBlob(ctx, x, y, layerRadius, poolSeed + j * 100, 6 + Math.floor(seededRandom(poolSeed + j) * 4));
        ctx.fill();
      }
    }

    // Layer 2: Medium irregular organic splotches
    const splotchCount = 20;
    for (let i = 0; i < splotchCount; i++) {
      const splotchSeed = seed + 500 + i * 89.3;
      const x = bounds.minX + seededRandom(splotchSeed) * boundsWidth;
      const y = bounds.minY + seededRandom(splotchSeed + 1) * boundsHeight;

      // Color variation towards darker or lighter
      const variation = (seededRandom(splotchSeed + 2) - 0.5) * 32;
      const splotchR = Math.max(0, Math.min(255, r + variation));
      const splotchG = Math.max(0, Math.min(255, g + variation));
      const splotchB = Math.max(0, Math.min(255, b + variation));

      const baseRadius = 8 + seededRandom(splotchSeed + 3) * 22;
      const pointCount = 5 + Math.floor(seededRandom(splotchSeed + 4) * 5);

      ctx.fillStyle = `rgba(${splotchR}, ${splotchG}, ${splotchB}, 0.09)`;
      drawOrganicBlob(ctx, x, y, baseRadius, splotchSeed + 10, pointCount);
      ctx.fill();
    }

    // Layer 3: Soft organic brush marks (curved, not straight)
    const brushCount = 8;
    for (let i = 0; i < brushCount; i++) {
      const brushSeed = seed + 750 + i * 67.3;
      const startX = bounds.minX + seededRandom(brushSeed) * boundsWidth;
      const startY = bounds.minY + seededRandom(brushSeed + 1) * boundsHeight;

      const variation = (seededRandom(brushSeed + 4) - 0.5) * 20;
      const brushR = Math.max(0, Math.min(255, r + variation));
      const brushG = Math.max(0, Math.min(255, g + variation));
      const brushB = Math.max(0, Math.min(255, b + variation));

      // Draw a series of overlapping organic shapes along a curved path
      const curveLength = 35 + seededRandom(brushSeed + 2) * 50;
      const curveAngle = seededRandom(brushSeed + 3) * Math.PI * 2;
      const curveBend = (seededRandom(brushSeed + 5) - 0.5) * 0.8;

      const steps = 4 + Math.floor(seededRandom(brushSeed + 6) * 3);
      for (let j = 0; j < steps; j++) {
        const t = j / (steps - 1);
        const bendOffset = Math.sin(t * Math.PI) * curveLength * curveBend;
        const perpAngle = curveAngle + Math.PI / 2;

        const px = startX + Math.cos(curveAngle) * curveLength * t + Math.cos(perpAngle) * bendOffset;
        const py = startY + Math.sin(curveAngle) * curveLength * t + Math.sin(perpAngle) * bendOffset;

        const blobRadius = 5 + seededRandom(brushSeed + j * 11) * 10;
        const opacity = 0.04 + seededRandom(brushSeed + j * 13) * 0.05;

        ctx.fillStyle = `rgba(${brushR}, ${brushG}, ${brushB}, ${opacity})`;
        drawOrganicBlob(ctx, px, py, blobRadius, brushSeed + j * 50, 5);
        ctx.fill();
      }
    }

    // Layer 4: Fine grain texture (organic stippling)
    const stippleCount = 280;
    for (let i = 0; i < stippleCount; i++) {
      const stippleSeed = seed + 1000 + i * 23.7;
      const x = bounds.minX + seededRandom(stippleSeed) * boundsWidth;
      const y = bounds.minY + seededRandom(stippleSeed + 1) * boundsHeight;

      // Subtle variation
      const variation = (seededRandom(stippleSeed + 2) - 0.5) * 16;
      const stippleR = Math.max(0, Math.min(255, r + variation));
      const stippleG = Math.max(0, Math.min(255, g + variation));
      const stippleB = Math.max(0, Math.min(255, b + variation));

      const opacity = 0.02 + seededRandom(stippleSeed + 3) * 0.05;
      ctx.fillStyle = `rgba(${stippleR}, ${stippleG}, ${stippleB}, ${opacity})`;

      const size = 1 + seededRandom(stippleSeed + 4) * 3.5;
      // Use small organic blobs instead of circles for some stipples
      if (seededRandom(stippleSeed + 5) > 0.65) {
        drawOrganicBlob(ctx, x, y, size, stippleSeed + 20, 4);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Layer 5: Subtle organic edge variation
    const edgeCount = 6;
    for (let i = 0; i < edgeCount; i++) {
      const edgeSeed = seed + 1500 + i * 47.3;
      // Position along edges of bounds
      const edge = Math.floor(seededRandom(edgeSeed) * 4);
      let x: number, y: number;
      if (edge === 0) {
        x = bounds.minX + seededRandom(edgeSeed + 1) * boundsWidth;
        y = bounds.minY;
      } else if (edge === 1) {
        x = bounds.maxX;
        y = bounds.minY + seededRandom(edgeSeed + 1) * boundsHeight;
      } else if (edge === 2) {
        x = bounds.minX + seededRandom(edgeSeed + 1) * boundsWidth;
        y = bounds.maxY;
      } else {
        x = bounds.minX;
        y = bounds.minY + seededRandom(edgeSeed + 1) * boundsHeight;
      }

      const edgeRadius = 12 + seededRandom(edgeSeed + 2) * 25;
      ctx.fillStyle = `rgba(${Math.max(0, r - 18)}, ${Math.max(0, g - 18)}, ${Math.max(0, b - 18)}, 0.06)`;
      drawOrganicBlob(ctx, x, y, edgeRadius, edgeSeed + 10, 6);
      ctx.fill();
    }

    ctx.restore();
  };

  // Apply additional background texture layer (matched to foreground intensity)
  const applyBackgroundTexture = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    baseColor: [number, number, number],
    seed: number,
  ) => {
    const [r, g, b] = baseColor;

    // Large mottled patches for paper-like texture (increased opacity to match foreground)
    const patchCount = 22;
    for (let i = 0; i < patchCount; i++) {
      const patchSeed = seed + 2000 + i * 113.7;
      const x = seededRandom(patchSeed) * w;
      const y = seededRandom(patchSeed + 1) * h;
      const radius = 60 + seededRandom(patchSeed + 2) * 120;

      const variation = (seededRandom(patchSeed + 3) - 0.5) * 24;
      const patchR = Math.max(0, Math.min(255, r + variation));
      const patchG = Math.max(0, Math.min(255, g + variation));
      const patchB = Math.max(0, Math.min(255, b + variation));

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${patchR}, ${patchG}, ${patchB}, 0.14)`);
      gradient.addColorStop(0.6, `rgba(${patchR}, ${patchG}, ${patchB}, 0.08)`);
      gradient.addColorStop(1, `rgba(${patchR}, ${patchG}, ${patchB}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Medium organic splotches on background (matching foreground style)
    const bgSplotchCount = 18;
    for (let i = 0; i < bgSplotchCount; i++) {
      const splotchSeed = seed + 2500 + i * 89.3;
      const x = seededRandom(splotchSeed) * w;
      const y = seededRandom(splotchSeed + 1) * h;

      const variation = (seededRandom(splotchSeed + 2) - 0.5) * 28;
      const splotchR = Math.max(0, Math.min(255, r + variation));
      const splotchG = Math.max(0, Math.min(255, g + variation));
      const splotchB = Math.max(0, Math.min(255, b + variation));

      const baseRadius = 12 + seededRandom(splotchSeed + 3) * 28;
      const pointCount = 5 + Math.floor(seededRandom(splotchSeed + 4) * 5);

      ctx.fillStyle = `rgba(${splotchR}, ${splotchG}, ${splotchB}, 0.1)`;
      drawOrganicBlob(ctx, x, y, baseRadius, splotchSeed + 10, pointCount);
      ctx.fill();
    }

    // Horizontal wash bands (increased opacity)
    const bandCount = 8;
    for (let i = 0; i < bandCount; i++) {
      const bandSeed = seed + 3000 + i * 97.3;
      const y = seededRandom(bandSeed) * h;
      const bandHeight = 25 + seededRandom(bandSeed + 1) * 70;

      const variation = (seededRandom(bandSeed + 2) - 0.5) * 18;
      const bandR = Math.max(0, Math.min(255, r + variation));
      const bandG = Math.max(0, Math.min(255, g + variation));
      const bandB = Math.max(0, Math.min(255, b + variation));

      const gradient = ctx.createLinearGradient(0, y - bandHeight / 2, 0, y + bandHeight / 2);
      gradient.addColorStop(0, `rgba(${bandR}, ${bandG}, ${bandB}, 0)`);
      gradient.addColorStop(0.5, `rgba(${bandR}, ${bandG}, ${bandB}, 0.08)`);
      gradient.addColorStop(1, `rgba(${bandR}, ${bandG}, ${bandB}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, y - bandHeight / 2, w, bandHeight);
    }

    // Corner vignette (increased intensity)
    const corners = [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: 0, y: h },
      { x: w, y: h },
    ];
    for (const corner of corners) {
      const vignetteRadius = Math.max(w, h) * 0.5;
      const gradient = ctx.createRadialGradient(
        corner.x,
        corner.y,
        0,
        corner.x,
        corner.y,
        vignetteRadius,
      );
      gradient.addColorStop(0, `rgba(${Math.max(0, r - 25)}, ${Math.max(0, g - 25)}, ${Math.max(0, b - 25)}, 0.1)`);
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.04)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(corner.x, corner.y, vignetteRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Paper grain texture (increased count and opacity)
    const grainCount = 550;
    for (let i = 0; i < grainCount; i++) {
      const grainSeed = seed + 4000 + i * 31.7;
      const x = seededRandom(grainSeed) * w;
      const y = seededRandom(grainSeed + 1) * h;

      const variation = (seededRandom(grainSeed + 2) - 0.5) * 16;
      const grainR = Math.max(0, Math.min(255, r + variation));
      const grainG = Math.max(0, Math.min(255, g + variation));
      const grainB = Math.max(0, Math.min(255, b + variation));

      const opacity = 0.02 + seededRandom(grainSeed + 3) * 0.05;
      ctx.fillStyle = `rgba(${grainR}, ${grainG}, ${grainB}, ${opacity})`;

      const size = 0.5 + seededRandom(grainSeed + 4) * 3;
      if (seededRandom(grainSeed + 5) > 0.7) {
        drawOrganicBlob(ctx, x, y, size, grainSeed + 20, 4);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Background color - muted blue similar to the original
    const bgColor: [number, number, number] = [145, 170, 190];

    // Fill background with solid color + wash texture
    ctx.fillStyle = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
    ctx.fillRect(0, 0, width, height);
    applyInkWashTexture(
      ctx,
      null,
      { minX: 0, maxX: width, minY: 0, maxY: height },
      bgColor,
      washSeedRef.current,
    );
    // Apply additional background texture layer
    applyBackgroundTexture(ctx, width, height, bgColor, washSeedRef.current + 5000);

    // Apex point of the fan (center-left area) - all triangles share this point
    // Using normalized coordinates (0-1)
    const baseApexX = 0.12;
    const baseApexY = 0.45;

    // Fan angle range (from right sweeping down to lower-left)
    // Start angle decreases (fan widens) as sections increase
    const baseStartAngle = 0.35; // Base start angle at minimum sections
    const anglePerSection = 0.1; // How much to widen per additional section
    const startAngle = baseStartAngle - (sections - SECTIONS_MIN) * anglePerSection;
    const endAngle = 1.92; // ~110 degrees (pointing lower-left)
    const angleSpan = endAngle - startAngle;

    // Generate ray angles with optional variation
    // We need sections + 1 rays to create sections number of triangles
    const numRays = sections + 1;

    // Ensure we have enough random offsets stored (regenerated if sections increases)
    if (angleOffsetsRef.current.length < SECTIONS_MAX + 1) {
      angleOffsetsRef.current = Array(SECTIONS_MAX + 1)
        .fill(0)
        .map((_, i) => {
          // First and last rays stay fixed, interior rays get random offsets
          if (i === 0 || i === SECTIONS_MAX) return 0;
          // Random offset between -1.0 and 1.0 for dramatic variation
          // Use alternating bias to encourage adjacent rays to create thin/wide contrasts
          const baseRandom = seededRandom(washSeedRef.current + i * 73.7) - 0.5;
          const bias = i % 2 === 0 ? 0.3 : -0.3; // Alternate bias direction
          return Math.max(-1, Math.min(1, (baseRandom + bias) * 2.0));
        });
    }

    // Calculate base uniform spacing
    const baseSpacing = angleSpan / (numRays - 1);
    // Maximum offset allows sections to range from very thin slivers to very wide wedges
    const maxOffset = baseSpacing * 0.92;
    // Scale by variation (0-100 -> 0-1)
    const variationScale = variation / 100;

    const rayAngles: number[] = [];
    for (let i = 0; i < numRays; i++) {
      const baseAngle = startAngle + (i / (numRays - 1)) * angleSpan;
      // First and last rays stay fixed to maintain fan bounds
      if (i === 0 || i === numRays - 1) {
        rayAngles.push(baseAngle);
      } else {
        // Apply scaled random offset to interior rays
        const offset = angleOffsetsRef.current[i] * maxOffset * variationScale;
        rayAngles.push(baseAngle + offset);
      }
    }

    // Base uniform ray length (in normalized coordinates)
    const baseLength = 0.7;

    // Calculate bounding box at MAXIMUM ray length and MAXIMUM sections for consistent scaling
    // Use widest angle span (at max sections) for consistent sizing
    const maxStartAngle = baseStartAngle - (SECTIONS_MAX - SECTIONS_MIN) * anglePerSection;
    const maxAngleSpan = endAngle - maxStartAngle;
    const maxNumRays = SECTIONS_MAX + 1;
    const maxRayAngles: number[] = [];
    for (let i = 0; i < maxNumRays; i++) {
      const t = i / (maxNumRays - 1);
      maxRayAngles.push(maxStartAngle + t * maxAngleSpan);
    }
    const maxRays = maxRayAngles.map((angle) => {
      const length = baseLength * RAY_LENGTH_MAX;
      return {
        x: baseApexX + Math.cos(angle) * length,
        y: baseApexY + Math.sin(angle) * length,
      };
    });
    const maxAllPoints = [{ x: baseApexX, y: baseApexY }, ...maxRays];
    const maxMinX = Math.min(...maxAllPoints.map((p) => p.x));
    const maxMaxX = Math.max(...maxAllPoints.map((p) => p.x));
    const maxMinY = Math.min(...maxAllPoints.map((p) => p.y));
    const maxMaxY = Math.max(...maxAllPoints.map((p) => p.y));
    const maxPolygonCenterX = (maxMinX + maxMaxX) / 2;
    const maxPolygonCenterY = (maxMinY + maxMaxY) / 2;
    const maxPolygonWidth = maxMaxX - maxMinX;
    const maxPolygonHeight = maxMaxY - maxMinY;

    // Calculate scale to fit MAXIMUM size within canvas with margin
    const margin = 0.05;
    const availableWidth = 1 - 2 * margin;
    const availableHeight = 1 - 2 * margin;
    const fitScale = Math.min(
      availableWidth / maxPolygonWidth,
      availableHeight / maxPolygonHeight,
    );

    // Generate actual rays with current rayLength
    const scaledRays = rayAngles.map((angle) => {
      const length = baseLength * rayLength;
      return {
        x: baseApexX + Math.cos(angle) * length,
        y: baseApexY + Math.sin(angle) * length,
      };
    });

    // Transform function: centers on max polygon center and applies fixed scale
    const transform = (point: { x: number; y: number }) => {
      // Translate so max polygon center is at origin
      const centeredX = point.x - maxPolygonCenterX;
      const centeredY = point.y - maxPolygonCenterY;
      // Scale (using fixed fitScale based on max size)
      const scaledX = centeredX * fitScale;
      const scaledY = centeredY * fitScale;
      // Translate to canvas center
      const finalX = (0.5 + scaledX) * width;
      const finalY = (0.5 + scaledY) * height;
      return { x: finalX, y: finalY };
    };

    // Transform apex and rays
    const apex = transform({ x: baseApexX, y: baseApexY });
    const fanRays = scaledRays.map(transform);

    // Draw triangles from back to front (last section first)
    for (let idx = sections - 1; idx >= 0; idx--) {
      const color = getColorForSection(idx);
      const [r, g, b] = color;

      // Get the two rays that form this triangle's edges
      const ray1 = fanRays[idx];
      const ray2 = fanRays[idx + 1];

      // Create triangle path
      const triPath = new Path2D();
      triPath.moveTo(apex.x, apex.y);
      triPath.lineTo(ray1.x, ray1.y);
      triPath.lineTo(ray2.x, ray2.y);
      triPath.closePath();

      // Fill with solid color
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fill(triPath);

      // Calculate bounding box for texture
      const bounds = {
        minX: Math.min(apex.x, ray1.x, ray2.x),
        maxX: Math.max(apex.x, ray1.x, ray2.x),
        minY: Math.min(apex.y, ray1.y, ray2.y),
        maxY: Math.max(apex.y, ray1.y, ray2.y),
      };

      // Apply wash texture on top with unique seed per triangle
      applyInkWashTexture(
        ctx,
        triPath,
        bounds,
        color,
        washSeedRef.current + idx * 1000,
      );
    }
  };

  React.useEffect(() => {
    draw();
  }, [rayLength, sections, variation, width, height]);

  const handleDoubleClick = () => {
    onReset?.();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handlers.onMouseMove}
      onTouchMove={handlers.onTouchMove}
      onDoubleClick={handleDoubleClick}
      style={{ touchAction: "none" }}
    />
  );
};

export default Canvas;
