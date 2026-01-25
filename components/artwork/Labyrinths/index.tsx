import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

const DEFAULT_VALUE = 0;

export const TemplateCanvasContainer = () => {
  const [pattern, setPattern] = React.useState(DEFAULT_VALUE);

  const handleReset = () => {
    setPattern(DEFAULT_VALUE);
  };

  const handleChange = (key: string, val: number) => {
    setPattern(val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Hermetic One-way Labyrinths",
        artistName: "Thomas Laubenberger",
        year: "2011",
        links: [
          {
            label: "Thomas Laubenberger",
            url: "https://www.instagram.com/p/B2oFOHcF3qQ",
          },
        ],
      }}
      controls={[
        {
          key: "pattern",
          label: "Pattern",
          minStepMax: [0, 1, 25],
          value: pattern,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={500} height={500} pattern={pattern} />
    </ArtworkLayout>
  );
};

export default TemplateCanvasContainer;
