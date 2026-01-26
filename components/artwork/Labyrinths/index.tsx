import Canvas, { SIZE_MIN, SIZE_MAX, PATTERN_MIN, PATTERN_MAX } from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  size: { key: "sz", type: "number" as const, default: 6 },
  pattern: { key: "pt", type: "number" as const, default: 0 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const TemplateCanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Hermetic One-way Labyrinths",
        artistName: "Thomas Laubenberger",
        year: "2011",
        instructions:
          "Divide a square into a grid. In each cell, draw a quarter-circle arc connecting two adjacent edges. Alternate arc directions following a predetermined pattern to create maze-like paths.",
        description:
          "A grid of quarter-circle arcs that connect to form continuous, flowing labyrinth patterns.",
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
          minStepMax: [SIZE_MIN, 1, SIZE_MAX],
          value: values.size as number,
          onChange: handleChange,
        },
        {
          key: "pattern",
          label: "Pattern",
          minStepMax: [PATTERN_MIN, 1, PATTERN_MAX],
          value: values.pattern as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        size={values.size as number}
        pattern={values.pattern as number}
        onSizeChange={(val) => setValue("size", val)}
        onPatternChange={(val) => setValue("pattern", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default TemplateCanvasContainer;
