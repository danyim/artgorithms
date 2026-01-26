import Canvas from "./Canvas";
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
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const handleCheckboxChange = (key: string, val: boolean) => {
    setValue(key as ParamKey, val);
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
          key: "size",
          label: "Size",
          minStepMax: [2, 1, 12],
          value: values.size as number,
          onChange: handleChange,
        },
        {
          key: "minCoverage",
          label: "Min Coverage",
          minStepMax: [10, 5, 80],
          value: values.minCoverage as number,
          onChange: handleChange,
        },
        {
          key: "minAngle",
          label: "Min Angle",
          minStepMax: [5, 1, 45],
          value: values.minAngle as number,
          onChange: handleChange,
        },
        {
          key: "maxAngle",
          label: "Max Angle",
          minStepMax: [45, 1, 120],
          value: values.maxAngle as number,
          onChange: handleChange,
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
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default UnknownCanvasContainer;
