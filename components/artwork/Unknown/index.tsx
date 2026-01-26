import Canvas, { SIZE_MIN, SIZE_MAX, COVERAGE_MIN, COVERAGE_MAX } from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { Checkbox } from "../../Checkbox";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  size: { key: "sz", type: "number" as const, default: 6 },
  colorMode: { key: "cm", type: "boolean" as const, default: false },
  minCoverage: { key: "mc", type: "number" as const, default: 35 },
  minAngle: { key: "ma", type: "number" as const, default: 8 },
  maxAngle: { key: "xa", type: "number" as const, default: 88 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const UnknownCanvasContainer = () => {
  const { values, setValue, reset, locked, toggleLock } =
    useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const handleCheckboxChange = (key: string, val: boolean) => {
    setValue(key as ParamKey, val);
  };

  const handleToggleLock = (key: string) => {
    toggleLock(key as ParamKey);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Recursive Triangles",
        artistName: "Unknown",
        year: "Unknown",
        instructions:
          "Recursively subdivide triangles within a square. At each level, determine whether to continue subdividing based on coverage thresholds and angle constraints.",
        description:
          "Nested triangles recursively subdivide across the canvas, creating textures reminiscent of shattered glass or crystalline structures.",
      }}
      controls={[
        {
          key: "size",
          label: "Size",
          minStepMax: [SIZE_MIN, 1, SIZE_MAX],
          value: values.size as number,
          onChange: handleChange,
          mouseAxis: "vertical",
          locked: locked.size,
          onToggleLock: handleToggleLock,
        },
        {
          key: "minCoverage",
          label: "Min Coverage",
          minStepMax: [COVERAGE_MIN, 5, COVERAGE_MAX],
          value: values.minCoverage as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
          locked: locked.minCoverage,
          onToggleLock: handleToggleLock,
        },
        {
          key: "minAngle",
          label: "Min Angle",
          minStepMax: [5, 1, 45],
          value: values.minAngle as number,
          onChange: handleChange,
          locked: locked.minAngle,
          onToggleLock: handleToggleLock,
        },
        {
          key: "maxAngle",
          label: "Max Angle",
          minStepMax: [45, 1, 120],
          value: values.maxAngle as number,
          onChange: handleChange,
          locked: locked.maxAngle,
          onToggleLock: handleToggleLock,
        },
      ]}
      customControls={
        <Checkbox
          keyName="colorMode"
          label="Color"
          value={values.colorMode as boolean}
          handleChange={handleCheckboxChange}
        />
      }
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        size={values.size as number}
        colorMode={values.colorMode as boolean}
        minCoverage={(values.minCoverage as number) / 100}
        minAngle={values.minAngle as number}
        maxAngle={values.maxAngle as number}
        onSizeChange={locked.size ? undefined : (val) => setValue("size", val)}
        onMinCoverageChange={locked.minCoverage ? undefined : (val) => setValue("minCoverage", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default UnknownCanvasContainer;
