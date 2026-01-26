import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

const DEFAULT_SIZE = 6;
const DEFAULT_PATTERN = 0;

export const TemplateCanvasContainer = () => {
  const [size, setSize] = React.useState(DEFAULT_SIZE);
  const [pattern, setPattern] = React.useState(DEFAULT_PATTERN);

  const handleReset = () => {
    setSize(DEFAULT_SIZE);
    setPattern(DEFAULT_PATTERN);
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "size":
        setSize(val);
        return;
      case "pattern":
        setPattern(val);
        return;
    }
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
          key: "size",
          label: "Size",
          minStepMax: [2, 1, 10],
          value: size,
          onChange: handleChange,
        },
        {
          key: "pattern",
          label: "Pattern",
          minStepMax: [0, 1, 35],
          value: pattern,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={500} height={500} size={size} pattern={pattern} />
    </ArtworkLayout>
  );
};

export default TemplateCanvasContainer;
