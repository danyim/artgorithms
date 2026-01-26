import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

interface Props {
  width?: number;
  height?: number;
}

const PARAM_CONFIG = {
  space: { key: "sp", type: "number" as const, default: 10 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolCubeFormsCanvasContainer = ({
  width = 500,
  height = 500,
}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  let mouseOut: ReturnType<typeof setTimeout> | undefined;

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const handleOnMouseMove = (e: React.MouseEvent) => {
    if (mouseOut) {
      clearTimeout(mouseOut);
    }
    if (containerRef.current) {
      const boundingBox = containerRef.current.getBoundingClientRect();
      const clientYCanvas =
        Math.max(e.clientY - boundingBox.top, 0) / boundingBox.height;
      setValue("space", Math.floor(clientYCanvas * 50));
    }
  };

  const handleOnMouseOut = () => {
    mouseOut = setTimeout(() => {
      setValue("space", PARAM_CONFIG.space.default);
    }, 1500);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Forms Derived from a Cube in Color",
        artistName: "Sol LeWitt",
        year: "1985",
        instructions:
          "Derive geometric forms from a cube by showing different combinations of its visible faces. Render each form in flat colors representing the three visible planes of a cube.",
        description:
          "A series of isometric cube forms showing various combinations of top, left, and right faces in contrasting colors.",
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.317.1-6/" },
        ],
      }}
      controls={[
        {
          key: "space",
          label: "Spacing",
          minStepMax: [5, 5, 50],
          value: values.space as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <div ref={containerRef}>
        <Canvas
          width={width}
          height={height}
          space={values.space as number}
          onMouseMove={handleOnMouseMove}
          onMouseOut={handleOnMouseOut}
          onReset={reset}
        />
      </div>
    </ArtworkLayout>
  );
};

export default SolCubeFormsCanvasContainer;
