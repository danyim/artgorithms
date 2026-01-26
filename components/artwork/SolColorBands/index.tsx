import React from "react";
import Canvas from "./Canvas";
import CirclesCanvas from "./CirclesCanvas";
import { CompositeCanvas1 } from "./CompositeCanvas1";
import { CompositeCanvas2 } from "./CompositeCanvas2";
import ArtworkLayout from "../../ArtworkLayout";

const DEFAULT_SIZE = 10;

export const SolColorBandsCanvasContainer = () => {
  const [size, setSize] = React.useState(DEFAULT_SIZE);

  const handleReset = () => {
    setSize(DEFAULT_SIZE);
  };

  const handleChange = (key: string, val: number) => {
    if (key === "size") {
      setSize(val);
    }
  };

  const canvasSize = 250;

  return (
    <ArtworkLayout
      artwork={{
        title: "Color Bands",
        artistName: "Sol LeWitt",
        year: "2000",
      }}
      controls={[
        {
          key: "size",
          label: "Stroke",
          minStepMax: [3, 1, 50],
          value: size,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={canvasSize} height={canvasSize} size={size} />
      <CirclesCanvas width={canvasSize} height={canvasSize} size={size} />
      <CompositeCanvas1 width={canvasSize} height={canvasSize} size={size} />
      <CompositeCanvas2 width={canvasSize} height={canvasSize} size={size} />
    </ArtworkLayout>
  );
};

export default SolColorBandsCanvasContainer;
