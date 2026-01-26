import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  size: { key: "s", type: "number" as const, default: 6 },
  gridSize: { key: "g", type: "number" as const, default: 30 },
  circleSize: { key: "cs", type: "number" as const, default: 5 },
  offset: { key: "o", type: "number" as const, default: 4 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const MoireCrescentsContainer = () => {
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
        description:
          "A moiré pattern created by overlapping circles with slight offsets, producing crescent moon shapes that radiate from multiple focal points.",
      }}
      controls={[
        {
          key: "size",
          label: "Sections",
          minStepMax: [1, 1, 6],
          value: values.size as number,
          onChange: handleChange,
        },
        {
          key: "gridSize",
          label: "Grid Density",
          minStepMax: [20, 2, 40],
          value: values.gridSize as number,
          onChange: handleChange,
        },
        {
          key: "circleSize",
          label: "Circle Size",
          minStepMax: [3, 1, 12],
          value: values.circleSize as number,
          onChange: handleChange,
        },
        {
          key: "offset",
          label: "Offset",
          minStepMax: [0, 1, 10],
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
      />
    </ArtworkLayout>
  );
};

export default MoireCrescentsContainer;
