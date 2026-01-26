import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

const DEFAULT_VALUE = 12;

export const DoubleConcentricContainer = () => {
  const [bands, setBands] = React.useState(DEFAULT_VALUE);

  const handleReset = () => {
    setBands(DEFAULT_VALUE);
  };

  const handleChange = (key: string, val: number) => {
    setBands(val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Double Concentric: Scramble",
        artistName: "Frank Stella",
        year: "1971",
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.311/" },
        ],
      }}
      controls={[
        {
          key: "bands",
          label: "Bands",
          minStepMax: [2, 1, 20],
          value: bands,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={500} height={250} bands={bands} />
    </ArtworkLayout>
  );
};

export default DoubleConcentricContainer;
