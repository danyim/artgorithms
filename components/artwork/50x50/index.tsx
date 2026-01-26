import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

const DEFAULT_VALUE = 2458;

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
        title: "50/50",
        artistName: "Tauba Auerbach",
        year: "2008",
        description: (
          <>
            <h4 className="placard-title">Instructions</h4>
            <p className="placard">
              A repeating pattern of 3x4 squares on a 16x16 grid
            </p>
          </>
        ),
        links: [
          {
            label: "Tauba Auerbach",
            url: "https://taubaauerbach.com/view.php?id=133",
          },
        ],
      }}
      controls={[
        {
          key: "pattern",
          label: "Pattern",
          minStepMax: [2, 14, 4095],
          value: pattern,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={384} height={512} pattern={pattern} />
    </ArtworkLayout>
  );
};

export default TemplateCanvasContainer;
