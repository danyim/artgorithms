import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

export const CanvasContainer = () => {
  const [space, setSpace] = React.useState(10);
  const [lineWidth, setLineWidth] = React.useState(3);

  const handleReset = () => {
    setSpace(10);
    setLineWidth(3);
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "space":
        setSpace(val);
        return;
      case "lineWidth":
        setLineWidth(val);
        return;
    }
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing 1: Drawing Series II 18 A",
        artistName: "Sol LeWitt",
        year: "1968",
        description: (
          <>
            <h4 className="placard-title">Instructions</h4>
            <p className="placard">
              Produce a 4x4 grid with a black border around each cell. Draw
              alternating black and white lines of consistent width in each in
              the following orientations starting from top left to bottom right
              (right-to-left): minor diagonal, vertical, vertical, minor
              diagonal, major diagonal, horizontal, horizontal, major diagonal,
              major diagonal, horizontal, horizontal, major diagonal, minor
              diagonal, vertical, vertical, minor diagonal.
            </p>
          </>
        ),
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.474.2" },
          {
            label: "IdeelArt",
            url: "http://www.ideelart.com/module/csblog/post/177-1-sol-lewitt-wall-drawings.html",
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
        {
          key: "lineWidth",
          label: "Thickness",
          minStepMax: [1, 2, 11],
          value: lineWidth,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={500} height={500} space={space} lineWidth={lineWidth} />
    </ArtworkLayout>
  );
};

export default CanvasContainer;
