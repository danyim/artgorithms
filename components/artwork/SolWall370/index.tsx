import React from "react";
import Canvas from "./Canvas";
import CanvasSquare from "./CanvasSquare";
import CanvasX from "./CanvasX";
import ArtworkLayout from "../../ArtworkLayout";

export const SolWall370CanvasContainer = () => {
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
        title: "Wall Drawing #370",
        artistName: "Sol LeWitt",
        year: "1982",
        links: [
          {
            label: "NYC MET",
            url: "https://www.metmuseum.org/exhibitions/listings/2014/sol-lewitt",
          },
        ],
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
      <Canvas width={300} height={300} space={space} />
      <CanvasSquare width={300} height={300} space={space} />
      <CanvasX width={300} height={300} space={space} />
    </ArtworkLayout>
  );
};

export default SolWall370CanvasContainer;
