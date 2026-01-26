import Canvas, { SIZE_MIN, SIZE_MAX, GRID_SIZE_MIN, GRID_SIZE_MAX, CIRCLE_SIZE_MIN, CIRCLE_SIZE_MAX, OFFSET_MIN, OFFSET_MAX } from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  size: { key: "s", type: "number" as const, default: 6 },
  gridSize: { key: "g", type: "number" as const, default: 30 },
  circleSize: { key: "cs", type: "number" as const, default: 5 },
  offset: { key: "o", type: "number" as const, default: 4 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const BigFlowerContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Big Flower",
        artistName: "Lisbet Friis",
        year: "2012",
        instructions:
          "Draw a grid of circles. Overlay a second grid of circles with a slight offset. The intersection of overlapping circles creates crescent shapes that form a floral moiré pattern.",
        description:
          "A moiré pattern created by overlapping circles with slight offsets, producing crescent moon shapes that radiate from multiple focal points.",
      }}
      controls={[
        {
          key: "size",
          label: "Sections",
          minStepMax: [SIZE_MIN, 1, SIZE_MAX],
          value: values.size as number,
          onChange: handleChange,
        },
        {
          key: "gridSize",
          label: "Grid Density",
          minStepMax: [GRID_SIZE_MIN, 2, GRID_SIZE_MAX],
          value: values.gridSize as number,
          onChange: handleChange,
        },
        {
          key: "circleSize",
          label: "Circle Size",
          minStepMax: [CIRCLE_SIZE_MIN, 1, CIRCLE_SIZE_MAX],
          value: values.circleSize as number,
          onChange: handleChange,
        },
        {
          key: "offset",
          label: "Offset",
          minStepMax: [OFFSET_MIN, 1, OFFSET_MAX],
          value: values.offset as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        size={values.size as number}
        gridSize={values.gridSize as number}
        circleSize={values.circleSize as number}
        offset={values.offset as number}
        onCircleSizeChange={(val) => setValue("circleSize", val)}
        onOffsetChange={(val) => setValue("offset", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default BigFlowerContainer;
