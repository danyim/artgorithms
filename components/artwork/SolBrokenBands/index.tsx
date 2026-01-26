import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

const DEFAULT_VALUE = 100;

export const SolBrokenBandsCanvasContainer = () => {
  const [saturation, setSaturation] = React.useState(DEFAULT_VALUE);

  const handleReset = () => {
    setSaturation(DEFAULT_VALUE);
  };

  const handleChange = (key: string, val: number) => {
    setSaturation(val);
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
      ]}
      onReset={handleReset}
    >
      <Canvas width={800} height={200} saturation={saturation} />
    </ArtworkLayout>
  );
};

export default SolBrokenBandsCanvasContainer;
