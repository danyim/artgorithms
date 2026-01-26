import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

const DEFAULT_SATURATION = 10;
const DEFAULT_BANDS = 16;

export const SolBrokenBandsCanvasContainer = () => {
  const [saturation, setSaturation] = React.useState(DEFAULT_SATURATION);
  const [bands, setBands] = React.useState(DEFAULT_BANDS);

  const handleReset = () => {
    setSaturation(DEFAULT_SATURATION);
    setBands(DEFAULT_BANDS);
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "saturation":
        setSaturation(val);
        return;
      case "bands":
        setBands(val);
        return;
    }
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Broken Color Bands in Four Directions",
        artistName: "Sol LeWitt",
        year: "2005",
        links: [
          {
            label: "Sol LeWitt Prints",
            url: "https://www.sollewittprints.org/artwork/lewitt-raisonne-2005-04/",
          },
        ],
      }}
      controls={[
        {
          key: "saturation",
          label: "Saturation",
          minStepMax: [0, 1, 10],
          value: saturation,
          onChange: handleChange,
        },
        {
          key: "bands",
          label: "Bands",
          minStepMax: [4, 1, 32],
          value: bands,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={800} height={200} saturation={saturation} bands={bands} />
    </ArtworkLayout>
  );
};

export default SolBrokenBandsCanvasContainer;
