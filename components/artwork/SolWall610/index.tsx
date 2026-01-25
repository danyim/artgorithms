import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

export const SolWall610CanvasContainer = () => {
  const [colorIndex, setColorIndex] = React.useState(0);

  const handleReset = () => {
    setColorIndex(0);
  };

  const handleChange = (key: string, val: number) => {
    setColorIndex(val);
  };

  const handleOnMouseMove = () => {
    setColorIndex((colorIndex + 1) % 10);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing #610",
        artistName: "Sol LeWitt",
        year: "1989",
        links: [
          {
            label: "Artsy",
            url: "https://www.artsy.net/show/yale-university-art-gallery-sol-lewitt-wall-drawings-expanding-a-legacy",
          },
          { label: "MoCA", url: "https://massmoca.org/event/walldrawing610/" },
        ],
      }}
      controls={[
        {
          key: "colorIndex",
          label: "Color",
          minStepMax: [0, 1, 10],
          value: colorIndex,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas
        width={500}
        height={500}
        colorIndex={colorIndex}
        handleOnMouseMove={handleOnMouseMove}
      />
    </ArtworkLayout>
  );
};

export default SolWall610CanvasContainer;
