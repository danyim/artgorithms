import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

interface Props {
  width?: number;
  height?: number;
}

const DEFAULT_VALUE = 10;

export const SolCubeFormsCanvasContainer = ({
  width = 500,
  height = 500,
}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [space, setSpace] = React.useState(DEFAULT_VALUE);

  const handleReset = () => {
    setSpace(DEFAULT_VALUE);
  };

  const handleChange = (key: string, val: number) => {
    setSpace(val);
  };

  let mouseOut: ReturnType<typeof setTimeout> | undefined;

  const handleOnMouseMove = (e: React.MouseEvent) => {
    if (mouseOut) {
      clearTimeout(mouseOut);
    }
    if (containerRef.current) {
      const boundingBox = containerRef.current.getBoundingClientRect();
      const clientYCanvas =
        Math.max(e.clientY - boundingBox.top, 0) / boundingBox.height;
      setSpace(Math.floor(clientYCanvas * 50));
    }
  };

  const handleOnMouseOut = () => {
    mouseOut = setTimeout(() => {
      setSpace(10);
    }, 1500);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Forms Derived from a Cube in Color",
        artistName: "Sol LeWitt",
        year: "1985",
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.317.1-6/" },
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
      <div ref={containerRef}>
        <Canvas
          width={width}
          height={height}
          space={space}
          onMouseMove={handleOnMouseMove}
          onMouseOut={handleOnMouseOut}
        />
      </div>
    </ArtworkLayout>
  );
};

export default SolCubeFormsCanvasContainer;
