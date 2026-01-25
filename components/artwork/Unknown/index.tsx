import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

export const UnknownCanvasContainer = () => {
  const [space, setSpace] = React.useState(10);

  const handleReset = () => {
    setSpace(10);
  };

  const handleChange = (key: string, val: number) => {
    setSpace(val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Unknown",
        artistName: "Unknown",
        year: "Unknown",
      }}
      controls={[
        {
          key: "space",
          label: "Spacing",
          minStepMax: [5, 5, 50],
          value: space,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={500} height={500} space={space} />
    </ArtworkLayout>
  );
};

export default UnknownCanvasContainer;
