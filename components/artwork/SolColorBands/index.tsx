import React from "react";
import Canvas from "./Canvas";
import CirclesCanvas from "./CirclesCanvas";
import { CompositeCanvas1 } from "./CompositeCanvas1";
import { CompositeCanvas2 } from "./CompositeCanvas2";
import ArtworkLayout from "../../ArtworkLayout";

const DEFAULT_SIZE = 10;
const DEFAULT_BANDS = 40;

export const SolColorBandsCanvasContainer = () => {
  const [size, setSize] = React.useState(DEFAULT_SIZE);
  const [bands, setBands] = React.useState(DEFAULT_BANDS);

  const handleReset = () => {
    setSize(DEFAULT_SIZE);
    setBands(DEFAULT_BANDS);
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "bands":
        setBands(val);
        break;
      case "size":
        setSize(val);
        break;
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
          key: "bands",
          label: "Bands",
          minStepMax: [5, 5, 80],
          value: bands,
          onChange: handleChange,
        },
        {
          key: "size",
          label: "Size",
          minStepMax: [1, 2, 50],
          value: size,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={canvasSize} height={canvasSize} size={size} bands={bands} />
      <CirclesCanvas width={canvasSize} height={canvasSize} size={size} bands={bands} />
      <CompositeCanvas1 width={canvasSize} height={canvasSize} size={size} bands={bands} />
      <CompositeCanvas2 width={canvasSize} height={canvasSize} size={size} bands={bands} />
    </ArtworkLayout>
  );
};

export default SolColorBandsCanvasContainer;
